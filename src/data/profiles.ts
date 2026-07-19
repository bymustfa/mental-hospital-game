import type { Profile, ProfileId, Decision } from '../types';

export const PROFILES: Record<ProfileId, Profile> = {
  schizophrenia: {
    id: 'schizophrenia',
    name: 'Şizofreni',
    description: 'Sanrılar, halüsinasyonlar, paranoiya. Yatış uygun.',
    correctAction: 'admit',
    baseConfidence: 0.85,
  },
  bipolar: {
    id: 'bipolar',
    name: 'Bipolar Bozukluk',
    description: 'Manik/depresif ataklar. Akut dönemde yatış.',
    correctAction: 'admit',
    baseConfidence: 0.7,
  },
  depressive: {
    id: 'depressive',
    name: 'Majör Depresif Bozukluk',
    description: 'Ağır depresyon, intihar riski. Yatış uygun olabilir.',
    correctAction: 'admit',
    baseConfidence: 0.55,
  },
  anxiety: {
    id: 'anxiety',
    name: 'Anksiyete Bozukluğu',
    description: 'Panik atak, genel anksiyete. Ayaktan tedavi yeterli.',
    correctAction: 'discharge',
    baseConfidence: 0.55,
  },
  healthy: {
    id: 'healthy',
    name: 'Sağlıklı Birey',
    description: 'Yanlışlıkla sevk edilmiş veya sağlıklı. Taburcu.',
    correctAction: 'discharge',
    baseConfidence: 0.8,
  },
};

export function correctDecisionFor(profile: Profile): Decision {
  return profile.correctAction;
}
