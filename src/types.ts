export type ProfileId =
  | 'schizophrenia'
  | 'bipolar'
  | 'depressive'
  | 'anxiety'
  | 'healthy';

export interface Profile {
  id: ProfileId;
  name: string;
  description: string;
  correctAction: Decision;
  baseConfidence: number;
}

export type Decision = 'discharge' | 'admit';

export type QuestionDomain = 'psychosis' | 'risk' | 'mood' | 'anxiety' | 'general';

export interface Question {
  id: string;
  text: string;
  domain: QuestionDomain;
}

export interface QaPair {
  question: Question;
  answer: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  avatar: string;
  profile: Profile;
  preliminary: string;
}

export interface Session {
  id: string;
  patient: Patient;
  pool: Question[];
  asked: QaPair[];
  maxQuestions: number;
  decision: Decision | null;
  resolved: boolean;
}

export type GamePhase =
  | 'intro'
  | 'hub'
  | 'session'
  | 'verdict'
  | 'event'
  | 'energyPurchase'
  | 'win'
  | 'lose';

export type EventCategory = 'managerial' | 'medical' | 'career';

export interface GameEvent {
  id: string;
  category: EventCategory;
  title: string;
  text: string;
  effect: number;
  energyPenalty?: number;
}

export interface Outcome {
  decision: Decision;
  correct: boolean;
  delta: number;
  energyDelta: number;
  reason: string;
}
