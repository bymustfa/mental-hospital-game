import {
  createContext,
  useReducer,
  useContext,
  type ReactNode,
  type Dispatch,
} from 'react';
import type {
  Decision,
  GameEvent,
  GamePhase,
  Outcome,
  Patient,
  Session,
} from '../types';
import { generatePatient } from '../logic/generatePatient';
import { answerFor } from '../data/answers';
import { generatePool, MAX_QUESTIONS } from '../logic/session';
import {
  applyEvent,
  checkEndState,
  evaluateDecision,
  START_MONEY,
  START_ENERGY,
  ENERGY_COST_PER_QUESTION,
  ENERGY_PURCHASE_AMOUNT,
  ENERGY_PURCHASE_COST,
} from '../logic/scoring';
import { rollEvent } from '../data/events';

interface State {
  phase: GamePhase;
  money: number;
  day: number;
  energy: number;
  session: Session | null;
  outcome: Outcome | null;
  pendingEvent: GameEvent | null;
  lossStreak: number;
  stats: {
    treated: number;
    correct: number;
    wrong: number;
  };
}

type Action =
  | { type: 'START' }
  | { type: 'NEW_PATIENT' }
  | { type: 'ASK'; questionId: string }
  | { type: 'DECIDE'; decision: Decision }
  | { type: 'ACK_OUTCOME' }
  | { type: 'DISMISS_EVENT' }
  | { type: 'CHECK_ENERGY' }
  | { type: 'BUY_ENERGY' }
  | { type: 'DECLINE_ENERGY' }
  | { type: 'RESET' };

const initialState: State = {
  phase: 'intro',
  money: START_MONEY,
  day: 1,
  energy: START_ENERGY,
  session: null,
  outcome: null,
  pendingEvent: null,
  lossStreak: 0,
  stats: { treated: 0, correct: 0, wrong: 0 },
};

function buildSession(): Session {
  const patient: Patient = generatePatient();
  return {
    id: `s${Date.now()}`,
    patient,
    pool: generatePool(),
    asked: [],
    maxQuestions: MAX_QUESTIONS,
    decision: null,
    resolved: false,
  };
}

function runEventPhase(money: number, energy: number): Pick<State, 'pendingEvent' | 'money' | 'phase' | 'energy'> {
  const ev = rollEvent(0.4);
  if (ev) {
    const newMoney = applyEvent(money, ev);
    const newEnergy = Math.max(0, energy - (ev.energyPenalty ?? 0));
    return { pendingEvent: ev, money: newMoney, energy: newEnergy, phase: 'event' };
  }
  return { pendingEvent: null, money, energy, phase: 'hub' };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START': {
      const session = buildSession();
      return {
        ...state,
        phase: 'session',
        session,
        outcome: null,
      };
    }
    case 'NEW_PATIENT': {
      const session = buildSession();
      return {
        ...state,
        phase: 'session',
        session,
        outcome: null,
      };
    }
    case 'ASK': {
      if (!state.session || state.session.resolved) return state;
      if (state.session.asked.length >= state.session.maxQuestions) return state;
      if (state.energy <= 0) return state;
      const q = state.session.pool.find((x) => x.id === action.questionId);
      if (!q) return state;
      const qa = answerFor(state.session.patient.profile, q);
      const asked = [...state.session.asked, qa];
      const remainingPool = state.session.pool.filter((x) => x.id !== action.questionId);
      const pool =
        asked.length < state.session.maxQuestions
          ? remainingPool.length > 0
            ? remainingPool
            : generatePool().filter((x) => !asked.some((a) => a.question.id === x.id))
          : [];
      return {
        ...state,
        energy: state.energy - ENERGY_COST_PER_QUESTION,
        session: {
          ...state.session,
          pool,
          asked,
        },
      };
    }
    case 'DECIDE': {
      if (!state.session || state.session.resolved) return state;
      const outcome = evaluateDecision(
        action.decision,
        state.session.patient.profile,
        state.energy,
        state.lossStreak
      );
      const newMoney = state.money + outcome.delta;
      const newEnergy = state.energy + outcome.energyDelta;
      const newLossStreak = outcome.correct ? 0 : state.lossStreak + 1;
      const penalizedEnergy = !outcome.correct && newLossStreak >= 3 ? Math.max(0, newEnergy - 4) : newEnergy;
      const finalOutcome = { ...outcome, energyDelta: penalizedEnergy - state.energy };
      const end = checkEndState(newMoney);
      const newStats = {
        treated: state.stats.treated + 1,
        correct: state.stats.correct + (outcome.correct ? 1 : 0),
        wrong: state.stats.wrong + (outcome.correct ? 0 : 1),
      };
      if (end === 'win') {
        return { ...state, phase: 'win', money: newMoney, energy: penalizedEnergy, outcome: finalOutcome, stats: newStats, lossStreak: newLossStreak };
      }
      if (end === 'lose') {
        return { ...state, phase: 'lose', money: newMoney, energy: penalizedEnergy, outcome: finalOutcome, stats: newStats, lossStreak: newLossStreak };
      }
      return {
        ...state,
        money: newMoney,
        energy: penalizedEnergy,
        outcome: finalOutcome,
        session: { ...state.session, decision: action.decision, resolved: true },
        phase: 'verdict',
        stats: newStats,
        lossStreak: newLossStreak,
      };
    }
    case 'BUY_ENERGY': {
      if (state.money <= 0) return state;
      const newMoney = state.money - ENERGY_PURCHASE_COST;
      const newEnergy = state.energy + ENERGY_PURCHASE_AMOUNT;
      return {
        ...state,
        money: newMoney,
        energy: newEnergy,
        phase: state.session ? 'session' : 'hub',
      };
    }
    case 'DECLINE_ENERGY': {
      return { ...state, phase: 'lose' };
    }
    case 'ACK_OUTCOME': {
      if (!state.session || !state.outcome) return state;
      const eventPhase = runEventPhase(state.money, state.energy);
      return {
        ...state,
        ...eventPhase,
        day: state.day + 1,
        session: null,
        outcome: null,
      };
    }
    case 'DISMISS_EVENT': {
      if (state.energy <= 0) {
        if (state.money <= 0) return { ...state, phase: 'lose', pendingEvent: null };
        return { ...state, phase: 'energyPurchase', pendingEvent: null };
      }
      return { ...state, phase: 'hub', pendingEvent: null };
    }
    case 'CHECK_ENERGY': {
      if (state.energy > 0) return state;
      if (state.money <= 0) return { ...state, phase: 'lose' };
      return { ...state, phase: 'energyPurchase' };
    }
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

export interface ContextValue {
  state: State;
  dispatch: Dispatch<Action>;
}

const GameContext = createContext<ContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): ContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
