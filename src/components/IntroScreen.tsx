import { useGame } from '../state/GameContext';
import { CONFIG } from '../state/config';
import { useGsapEnter } from '../anim/useGsap';

export default function IntroScreen() {
  const { dispatch } = useGame();
  const ref = useGsapEnter<HTMLElement>('.card.intro > *', { direction: 'up', stagger: 0.1 });
  return (
    <section className="card intro" ref={ref}>
      <h1>Akıl Hastanesi</h1>
      <p className="subtitle">Bir psikiyatri uzmanısın. Hedefin <strong>1.000.000 TL</strong> birikimle emekli olmak.</p>
      <ul className="rules">
        <li>Her seansta hastaya 5-6 soru sorulur. Sorular akıcı şekilde gelir.</li>
        <li>Seans süresince istediğin an <strong>TABURCU</strong> ya da <strong>YATIŞ</strong> kararını verebilirsin.</li>
        <li>Kararı seans bitince vermek zorundasın (yoksa otomatik bekletilir).</li>
        <li>Ödüller <strong>vaka zorluğuna göre değişir</strong>: teşhisi belirsiz, zor hastaları doğru tedavi edene daha çok para ve prestij verilir.</li>
        <li>Kabaca: doğru kararda <strong>+130~+380 TL</strong> ve (her zaman değil, şansa bağlı) prestij kazanırsın; yanlış kararda <strong>−130~−475 TL</strong> kaybedersin. Kesin tutar her hastanın seans ekranında gösterilir.</li>
        <li>Başlangıç bakiye: {CONFIG.START_MONEY} TL. &nbsp;Emeklilik: {CONFIG.TARGET.toLocaleString('tr-TR')} TL. &nbsp;İflas: {CONFIG.BANKRUPTCY.toLocaleString('tr-TR')} TL.</li>
        <li>Aralarda beklenmedik olaylar seni etkileyebilir.</li>
        <li>Üst üste 3 yanlış kararda ekstra <strong>−4 prestij</strong> cezası uygulanır; dikkatli ol.</li>
      </ul>
      <button className="btn primary" onClick={() => dispatch({ type: 'START' })}>
        İlk Hastayı Kabul Et
      </button>
    </section>
  );
}
