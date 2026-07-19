import type { Question } from '../types';
import { pickQuestions } from '../data/questions';

export const MAX_QUESTIONS = 6;
export const POOL_SIZE = 4;

export function generatePool(): Question[] {
  return pickQuestions(POOL_SIZE);
}
