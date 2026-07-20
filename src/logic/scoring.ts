import type { Decision, Profile, Outcome, GameEvent, Question, QuestionDomain } from '../types';

export const TARGET = 1_000_000;
export const START_MONEY = 50;
export const BANKRUPTCY = -5_000;
export const START_ENERGY = 10;
export const ENERGY_REWARD_CORRECT = 3;
export const ENERGY_PURCHASE_AMOUNT = 4;
export const ENERGY_PURCHASE_COST = 200;

export const PRESTIGE_COST_BY_DOMAIN: Record<QuestionDomain, number> = {
  psychosis: 3,
  risk: 3,
  mood: 2,
  anxiety: 2,
  general: 1,
};

export function prestigeCostOf(q: Question): number {
  return PRESTIGE_COST_BY_DOMAIN[q.domain];
}

export const SCORING = {
  correctDischarge: 200,
  wrongDischarge: -250,
  correctAdmit: 100,
  wrongAdmit: -100,
};

export function difficultyMultiplier(profile: Profile): number {
  return 1 + (1 - profile.baseConfidence) * 2;
}

export const MAX_PRESTIGE_GAIN = 3;

export function prestigeChance(energy: number, lossStreak: number): number {
  const energyFactor = Math.max(0.15, 1 - energy / (START_ENERGY * 1.5));
  const errorBoost = Math.min(lossStreak * 0.1, 0.35);
  const p = 0.7 * energyFactor + errorBoost;
  return Math.min(0.95, Math.max(0.1, p));
}

export interface RewardPreview {
  correctMin: number;
  correctMax: number;
  wrongMin: number;
  wrongMax: number;
  prestige: number;
  prestigeChance: number;
}

export function sessionPreview(profile: Profile, energy: number, lossStreak: number): RewardPreview {
  const m = difficultyMultiplier(profile);
  return {
    correctMin: Math.round(SCORING.correctAdmit * m),
    correctMax: Math.round(SCORING.correctDischarge * m),
    wrongMin: Math.round(Math.abs(SCORING.wrongAdmit) * m),
    wrongMax: Math.round(Math.abs(SCORING.wrongDischarge) * m),
    prestige: MAX_PRESTIGE_GAIN,
    prestigeChance: prestigeChance(energy, lossStreak),
  };
}

export function evaluateDecision(
  decision: Decision,
  profile: Profile,
  energy: number,
  lossStreak: number
): Outcome {
  const correct = profile.correctAction === decision;
  const mult = difficultyMultiplier(profile);
  let delta = 0;
  let reason = '';

  if (correct) {
    if (decision === 'discharge') {
      delta = SCORING.correctDischarge;
      reason = `Doğru taburcu. Hasta ${profile.name} tedaviye ihtiyaç duymuyor.`;
    } else {
      delta = SCORING.correctAdmit;
      reason = `Doğru yatış. Hasta ${profile.name} tedavi edilmeli.`;
    }
  } else {
    if (decision === 'discharge') {
      delta = SCORING.wrongDischarge;
      reason = `Yanlış taburcu! Hasta ${profile.name} tedaviye muhtaç.`;
    } else {
      delta = SCORING.wrongAdmit;
      reason = `Yanlış yatış. Hasta ${profile.name} aslında sağlıklı.`;
    }
  }

  delta = Math.round(delta * mult);
  const grantPrestige = correct && Math.random() < prestigeChance(energy, lossStreak);
  const energyDelta = grantPrestige ? MAX_PRESTIGE_GAIN : 0;

  return { decision, correct, delta, energyDelta, reason };
}

export function applyEvent(money: number, ev: GameEvent): number {
  return money + ev.effect;
}

export function checkEndState(money: number): 'win' | 'lose' | null {
  if (money >= TARGET) return 'win';
  if (money <= BANKRUPTCY) return 'lose';
  return null;
}
