import type { Question } from '../types';

export const QUESTIONS: Question[] = [
  { id: 'q1', text: 'Bugün kendini nasıl hissediyorsun?' },
  { id: 'q2', text: 'Son zamanlarda uyku düzeninde değişiklik oldu mu?' },
  { id: 'q3', text: 'Başkalarının senin hakkında konuştuğunu düşünüyor musun?' },
  { id: 'q4', text: 'Birilerinin sana zarar vermeye çalıştığı oluyor mu?' },
  { id: 'q5', text: 'Sesler duyuyor musun? Kim konuşuyor?' },
  { id: 'q6', text: 'Görülmeyen varlıkların varlığına inanıyor musun?' },
  { id: 'q7', text: 'Gün içinde enerjin nasıl?' },
  { id: 'q8', text: 'Normalde yaptığın işlere şu an ilgi duyuyor musun?' },
  { id: 'q9', text: 'Kendine zarar verme düşüncelerin oluyor mu?' },
  { id: 'q10', text: 'Geleceğe dair umudun var mı?' },
  { id: 'q11', text: 'Çok sevinçli ya da çok öfkeli dönemlerin oluyor?' },
  { id: 'q12', text: 'Plansız büyük harcamalar yaptın mı son zamanlarda?' },
  { id: 'q13', text: 'İnsanların senin düşüncelerini okuyabildiğini hissediyor musun?' },
  { id: 'q14', text: 'Panik atak yaşadın mı? Ne sıklıkla?' },
  { id: 'q15', text: 'Çıkıp gitmek, kaçmak istediğin oluyor mu?' },
  { id: 'q16', text: 'Birisiyle konuşurken takip edildiğini düşünür müsün?' },
  { id: 'q17', text: 'Evden çıkmakta zorlanıyor musun?' },
  { id: 'q18', text: 'Yemek yeme alışkanlığında değişiklik var mı?' },
  { id: 'q19', text: 'Konsantre olmada güçlük çekiyor musun?' },
  { id: 'q20', text: 'İnsanların seni izlediğini hissediyor musun?' },
  { id: 'q21', text: 'Yalnız hissediyor musun kendini?' },
  { id: 'q22', text: 'Geçmişte ağır bir travma yaşadın mı?' },
  { id: 'q23', text: 'Bazen neşeli bazen ağlamaklı hissediyor musun kendini?' },
  { id: 'q24', text: 'Plan yapabiliyor musun? Yoksa plansız davranıyor musun?' },
];

export function pickQuestions(n: number): Question[] {
  const pool = [...QUESTIONS];
  const result: Question[] = [];
  for (let i = 0; i < n && pool.length; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    result.push(pool.splice(idx, 1)[0]);
  }
  return result;
}
