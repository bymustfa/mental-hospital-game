import { useGame } from '../state/GameContext';
import { CONFIG } from '../state/config';
import { useGsapEnter } from '../anim/useGsap';

export default function HubScreen() {
  const { state, dispatch } = useGame();
  const ref = useGsapEnter<HTMLElement>('.card.hub > *', { direction: 'up', stagger: 0.09 });
  return (
    <section className="card hub" ref={ref as React.RefObject<HTMLElement>}>
      <h2>Gün {state.day} — Bekleme Odası</h2>
      <p>
        Birikimin <strong>{state.money.toLocaleString('tr-TR')} ₺</strong>.
        Hedef <strong>{CONFIG.TARGET.toLocaleString('tr-TR')} ₺</strong>,
        iflas sınırı <strong>{CONFIG.BANKRUPTCY.toLocaleString('tr-TR')} ₺</strong>.
      </p>
      <p className="hub-stats">
        Bugüne kadar <strong>{state.stats.treated}</strong> hastaya baktın.
        ({state.stats.correct} doğru, {state.stats.wrong} yanlış)
      </p>
      <div className="nurse">
        <span className="bubble">Hemşere: "Sıradaki hazır doktor!"</span>
      </div>
      <button className="btn primary" onClick={() => dispatch({ type: 'NEW_PATIENT' })}>
        Sıradaki Hastayı Al
      </button>
    </section>
  );
}
