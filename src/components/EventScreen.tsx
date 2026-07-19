import { useGame } from '../state/GameContext';
import { useGsapOverlay } from '../anim/useGsap';

const CATEGORY_LABEL: Record<string, string> = {
  managerial: 'Yönetimsel',
  medical: 'Medikal',
  career: 'Kariyer',
};

export default function EventScreen() {
  const { state, dispatch } = useGame();
  const ev = state.pendingEvent;
  const ref = useGsapOverlay<HTMLDivElement>();
  if (!ev) return null;

  return (
    <div className="overlay" ref={ref}>
      <div className="card event">
        <span className={`badge ${ev.category}`}>{CATEGORY_LABEL[ev.category]}</span>
        <h2>{ev.title}</h2>
        <p>{ev.text}</p>
      <div className={`delta ${ev.effect >= 0 ? 'positive' : 'negative'}`}>
        {ev.effect >= 0 ? '+' : ''}{ev.effect} ₺
      </div>
      {ev.energyPenalty ? (
        <div className="delta energy negative">
          -{ev.energyPenalty} Prestij
        </div>
      ) : null}
      <button className="btn primary" onClick={() => dispatch({ type: 'DISMISS_EVENT' })}>
          Kabul Et
        </button>
      </div>
    </div>
  );
}
