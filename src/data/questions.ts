import type { Question } from '../types';

export const QUESTIONS: Question[] = [
  { id: 'q1', text: 'Bugün kendini nasıl hissediyorsun?', domain: 'general' },
  { id: 'q2', text: 'Son zamanlarda uyku düzeninde değişiklik oldu mu?', domain: 'general' },
  { id: 'q3', text: 'Başkalarının senin hakkında konuştuğunu düşünüyor musun?', domain: 'psychosis' },
  { id: 'q4', text: 'Birilerinin sana zarar vermeye çalıştığı oluyor mu?', domain: 'psychosis' },
  { id: 'q5', text: 'Sesler duyuyor musun? Kim konuşuyor?', domain: 'psychosis' },
  { id: 'q6', text: 'Görülmeyen varlıkların varlığına inanıyor musun?', domain: 'psychosis' },
  { id: 'q7', text: 'Gün içinde enerjin nasıl?', domain: 'general' },
  { id: 'q8', text: 'Normalde yaptığın işlere şu an ilgi duyuyor musun?', domain: 'mood' },
  { id: 'q9', text: 'Kendine zarar verme düşüncelerin oluyor mu?', domain: 'risk' },
  { id: 'q10', text: 'Geleceğe dair umudun var mı?', domain: 'mood' },
  { id: 'q11', text: 'Çok sevinçli ya da çok öfkeli dönemlerin oluyor?', domain: 'mood' },
  { id: 'q12', text: 'Plansız büyük harcamalar yaptın mı son zamanlarda?', domain: 'mood' },
  { id: 'q13', text: 'İnsanların senin düşüncelerini okuyabildiğini hissediyor musun?', domain: 'psychosis' },
  { id: 'q14', text: 'Panik atak yaşadın mı? Ne sıklıkla?', domain: 'anxiety' },
  { id: 'q15', text: 'Çıkıp gitmek, kaçmak istediğin oluyor mu?', domain: 'anxiety' },
  { id: 'q16', text: 'Birisiyle konuşurken takip edildiğini düşünür müsün?', domain: 'psychosis' },
  { id: 'q17', text: 'Evden çıkmakta zorlanıyor musun?', domain: 'anxiety' },
  { id: 'q18', text: 'Yemek yeme alışkanlığında değişiklik var mı?', domain: 'general' },
  { id: 'q19', text: 'Konsantre olmada güçlük çekiyor musun?', domain: 'general' },
  { id: 'q20', text: 'İnsanların seni izlediğini hissediyor musun?', domain: 'psychosis' },
  { id: 'q21', text: 'Yalnız hissediyor musun kendini?', domain: 'mood' },
  { id: 'q22', text: 'Geçmişte ağır bir travma yaşadın mı?', domain: 'general' },
  { id: 'q23', text: 'Bazen neşeli bazen ağlamaklı hissediyor musun kendini?', domain: 'mood' },
  { id: 'q24', text: 'Plan yapabiliyor musun? Yoksa plansız davranıyor musun?', domain: 'mood' },
  { id: 'q25', text: 'Dışarıdan birinin sana emir verdiğini hissediyor musun?', domain: 'psychosis' },
  { id: 'q26', text: 'Televizyondaki programlar sana özel mesajlar mı veriyor?', domain: 'psychosis' },
  { id: 'q27', text: 'Kendini bazen yenilmez ya da çok güçlü mü hissediyorsun?', domain: 'mood' },
  { id: 'q28', text: 'Hiçbir şeye sebepsiz yere aşırı sevinç duyduğun oldu mu?', domain: 'mood' },
  { id: 'q29', text: 'Çevrendekilere zarar verme isteği oluyor mu?', domain: 'risk' },
  { id: 'q30', text: 'Kalabalık bir yerde nefes almakta zorlanıyor musun?', domain: 'anxiety' },
  { id: 'q31', text: 'Yeni insanlarla tanışırken aşırı geriliyor musun?', domain: 'anxiety' },
  { id: 'q32', text: 'Son zamanlarda kilo değişimi fark ettin mi?', domain: 'general' },
  { id: 'q33', text: 'Hobilerine zaman ayırabiliyor musun?', domain: 'general' },
  { id: 'q34', text: 'Sabahları akşama göre daha mı kötüsün?', domain: 'mood' },
  { id: 'q35', text: 'Zihninde bazen yabancı düşünceler beliriyor mu?', domain: 'psychosis' },
  { id: 'q36', text: 'Günlük rutinlerini sürdürmekte zorlanıyor musun?', domain: 'general' },
  { id: 'q37', text: 'Gün içinde dikkatini bir şeye verebiliyor musun?', domain: 'general' },
  { id: 'q38', text: 'Bilinmeyen bir yere girince tedirginlik hissediyor musun?', domain: 'anxiety' },
  { id: 'q39', text: 'Eskiden keyif aldığın şeyler artık ilgini çekmiyor mu?', domain: 'mood' },
  { id: 'q40', text: 'Çevrendeki insanların seninle alay ettiğini düşünüyor musun?', domain: 'psychosis' },
  { id: 'q41', text: 'Ölümü düşünmek seni rahatlatan bir şey mi?', domain: 'risk' },
  { id: 'q42', text: 'Duygusal olarak çok hızlı değiştiğin oluyor mu?', domain: 'mood' },
  { id: 'q43', text: 'Sosyal ortamlarda yargılanmaktan korkuyor musun?', domain: 'anxiety' },
  { id: 'q44', text: 'Fiziksel bir rahatsızlığın (ağrı, halsizlik) var mı?', domain: 'general' },
  { id: 'q45', text: 'Zihninde bazı düşüncelerin sana ait olmadığını hissediyor musun?', domain: 'psychosis' },
  { id: 'q46', text: 'Kendine aşırı güvendiğin, sınır tanımadığın dönemler oluyor mu?', domain: 'mood' },
  { id: 'q47', text: 'Günlük sorumluluklarını (iş/okul) yerine getirebiliyor musun?', domain: 'general' },
  { id: 'q48', text: 'Beklenmedik bir telefon ya da kapı sesi seni sıçratıyor mu?', domain: 'anxiety' },
  { id: 'q49', text: 'Öfkeyle birine zarar verme dürtüsü oluyor mu?', domain: 'risk' },
  { id: 'q50', text: 'Uykuya dalmakta mı yoksa uykuyu sürdürmekte mi zorlanıyorsun?', domain: 'general' },
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
