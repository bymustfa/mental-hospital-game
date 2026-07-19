import type { Patient, Profile, ProfileId, Decision } from '../types';
import { PROFILES } from '../data/profiles';
import { PRELIMINARY_NOTES } from '../data/preliminary';

const FIRST_NAMES = [
  'Ahmet', 'Ayşe', 'Mehmet', 'Fatma', 'Mustafa', 'Emine', 'Hüseyin',
  'Hatice', 'İbrahim', 'Zeynep', 'Hasan', 'Elif', 'Murat', 'Meryem',
  'Ali', 'Sultan', 'Hülya', 'Kemal', 'Derya', 'Okan', 'Sevgi', 'Burak',
];
const LAST_NAMES = [
  'Yılmaz', 'Kaya', 'Demir', 'Şahin', 'Çelik', 'Yıldız', 'Yıldırım',
  'Öztürk', 'Aydın', 'Özdemir', 'Arslan', 'Doğan', 'Kılıç', 'Aslan',
  'Çetin', 'Kara', 'Koç', 'Kurt', 'Özkan', 'Şimşek', 'Polat',
];
const AVATARS = ['🧑', '👩', '🧔', '👨‍🦰', '👵', '👱‍♀️', '🧓', '👩‍🦱', '👲', '👳'];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

let seq = 0;
export function generatePatient(): Patient {
  const profileIds = Object.keys(PROFILES) as ProfileId[];
  const profileId = pick(profileIds);
  const profile: Profile = PROFILES[profileId];
  const name = `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
  const age = 18 + Math.floor(Math.random() * 62);
  const avatar = pick(AVATARS);
  const preliminary = pick(PRELIMINARY_NOTES);
  return {
    id: `p${++seq}`,
    name,
    age,
    avatar,
    profile,
    preliminary,
  };
}

export function correctDecisionFor(profile: Profile): Decision {
  return profile.correctAction;
}
