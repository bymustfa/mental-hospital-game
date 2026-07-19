# Akıl Hastanesi

Tek oyunculu web tabanlı psikiyatri simülasyonu.

## Oynanış

- Bir akıl hastanesinde doktorsun. Gelen hastalara 5-6 soru sorarsın.
- Sorular otomatik akar (700ms aralıkla). İstediğin an **Taburcu Et** ya da **Yatış Ver** kararını verebilirsin.
- Sorular bitince karar vermek zorundasın.
- **Doğru Taburcu:** +200 | **Yanlış Taburcu:** −250
- **Doğru Yatış:** +100 | **Yanlış Yatış:** −100
- Arada rastgele olaylar (yönetimsel, medikal, kariyer) maaşını etkiler.
- Negatif etkili olaylar ayrıca **prestij** de düşürür; kayıp miktarı olayın ağırlığıyla doğru orantılıdır (örn. −600₺'lik dava −6 prestij).
- Amaç: **1.000.000 ₺** birikimle emekli olmak.
- −5.000 ₺ altı = iflas (kaybetme).

## Prestij (Enerji) Sistemi

- Doktor **10 prestij** ile başlar ve bu puan tüm seanslar boyunca taşınır (her seansta sıfırlanmaz).
- Her soru sormak **−1 prestij** düşürür.
- Doğru işlem (doğru taburcu ya da doğru yatış) yaparak **+3 prestij** kazanırsın.
- Yanlış işlemde prestij kazanmazsın.
- Prestij **0** olursa ve paran (0'dan büyük) varsa: **+4 prestij karşılığında 200 ₺** ödeme yapma seçeneği çıkar (Evet/Hayır).
- Prestij 0 iken paran yoksa ya da "Hayır" dersen **oyunu kaybedersin**.

## Başlatma

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```
