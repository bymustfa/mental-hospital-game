import type { GameEvent } from '../types';

export const EVENTS: GameEvent[] = [
  {
    id: 'mgmt_quota',
    category: 'managerial',
    title: 'Başhekim Talimatı',
    text: 'Başhekim çağırdı: "Bu hafta hver bölüm doldu, 2 hastayı taburcu etmek zorundasın."',
    effect: 0,
  },
  {
    id: 'mgmt_inspection_afford',
    category: 'managerial',
    title: 'Sağlık Bakanlığı Teftişi',
    text: 'Geçmişte verdiğin "yanlış yatış" kararlarından biri affedildi. Hesabına +400 yatay.',
    effect: 400,
  },
  {
    id: 'mgmt_overtime',
    category: 'managerial',
    title: 'Mesai Ücreti',
    text: 'Geçen hafta yaptığın fazla mesainin karşılığı: +250.',
    effect: 250,
  },
  {
    id: 'mgmt_complaint',
    category: 'managerial',
    title: 'Hasta Yakını Şikayeti',
    text: 'Taburcu ettiğin bir hastanın yakınları şikayette bulundu. -150 kesinti yapıldı.',
    effect: -150,
    energyPenalty: 2,
  },
  {
    id: 'med_crisis_admit',
    category: 'medical',
    title: 'Acil Yatış',
    text: 'Bekleme salonundaki bir hasta kriz geçirdi, kendiliğinden yatışa alındı. Doğru müdahale: +150.',
    effect: 150,
  },
  {
    id: 'med_court_discharge',
    category: 'medical',
    title: 'Mahkeme Kararı',
    text: 'Yatırdığın bir hastanın avukatı mahkemeye başvurdu, hasta zorla taburcu edildi. Yine de süreç sana eklemlendi: -200.',
    effect: -200,
    energyPenalty: 2,
  },
  {
    id: 'med_family_info',
    category: 'medical',
    title: 'Aileden Ek Bilgi',
    text: 'Bir hasta adayının ailesi geldi, hastanın geçmişte psikoz geçirdiğini söyledi. Bu bilgiyi kullanabileceksin: +100 sözde danışmanlık ücreti.',
    effect: 100,
  },
  {
    id: 'car_peer_review',
    category: 'career',
    title: 'Akran Değerlendirme Ödülü',
    text: 'Meslektaşların son kararlarını överek değerlendirdi. +300 prim.',
    effect: 300,
  },
  {
    id: 'car_malpractice',
    category: 'career',
    title: 'Malpraxis Şikayeti',
    text: 'Taburcu ettiğin hastanın eski bir yakınını kaybetmesine neden olmuş olabilirsin, davaya konu oldu. -350.',
    effect: -350,
    energyPenalty: 4,
  },
  {
    id: 'car_promotion_bonus',
    category: 'career',
    title: 'Ki�i Üst Kademe Bonusu',
    text: 'Bölüm sorumluluğu sana verildi, bir kerelik terfi bonusu: +500.',
    effect: 500,
  },
  {
    id: 'car_private_practice',
    category: 'career',
    title: 'Yardımcı Özel Klinik',
    text: 'Yandan özel danışmanlık yaptın: +200.',
    effect: 200,
  },
  {
    id: 'mgmt_budget_cut',
    category: 'managerial',
    title: 'Bütçe Kesintisi',
    text: 'Klinik bütçesinden dolaylı maaş kesintisi: -100.',
    effect: -100,
    energyPenalty: 1,
  },
  {
    id: 'med_remission',
    category: 'medical',
    title: 'Remisyon Haberi',
    text: 'Daha önce yatırdığın bir hastadan iyi haber geldi, tam remisyon. Moral verici: +200.',
    effect: 200,
  },
  {
    id: 'car_sued',
    category: 'career',
    title: 'Tazminat Davası',
    text: 'Mahkeme, yanlış yatış kararına karşın tazminat hükmetti. -600.',
    effect: -600,
    energyPenalty: 6,
  },
];

export function rollEvent(onceEvery = 0.25): GameEvent | null {
  if (Math.random() > onceEvery) return null;
  return EVENTS[Math.floor(Math.random() * EVENTS.length)];
}
