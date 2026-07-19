import { useGame } from '../state/GameContext';
import { useGsapOverlay } from '../anim/useGsap';

export default function EndScreen() {
  const { state, dispatch } = useGame();
  const won = state.phase === 'win';
  const ref = useGsapOverlay<HTMLDivElement>();
  return (
    <div className="overlay" ref={ref}>
      <div className="card end">
        <h2>{won ? '🎉 Emekli Oldun!' : '💀 İflas Ettin'}</h2>
        <p>
          {won
            ? `Tebrikler! 1.000.000 ₺ hedefine ulaştın ve emekli oldun.`
            : `Bakiyen -5.000 ₺'yi aştığı için meslekten men edildin.`}
        </p>
        <div className="stats">
          <div><span>Gün:</span> {state.day}</div>
          <div><span>Toplam tedavi:</span> {state.stats.treated}</div>
          <div><span>Doğru:</span> {state.stats.correct}</div>
          <div><span>Yanlış:</span> {state.stats.wrong}</div>
          <div><span>Bakiye:</span> {state.money.toLocaleString('tr-TR')} ₺</div>
        </div>
        <button className="btn primary" onClick={() => dispatch({ type: 'RESET' })}>
          Yeni Oyun
        </button>
      </div>
    </div>
  );
}
