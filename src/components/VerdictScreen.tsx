import { useGame } from '../state/GameContext';
import { useGsapOverlay } from '../anim/useGsap';

export default function VerdictScreen() {
  const { state, dispatch } = useGame();
  const outcome = state.outcome;
  const session = state.session;
  const ref = useGsapOverlay<HTMLDivElement>();
  if (!outcome || !session) return null;

  return (
    <div className="overlay" ref={ref}>
      <div className="card verdict">
        <h2>Değerlendirme Sonucu</h2>
        <div className="patient-mini">
          <span className="avatar sm">{session.patient.avatar}</span>
          <div>
            <strong>{session.patient.name}</strong>, {session.patient.age}
            <div className="profile-reveal">Gerçek profil: <em>{session.patient.profile.name}</em></div>
            <div className="profile-desc">{session.patient.profile.description}</div>
          </div>
        </div>
        <p className={`outcome ${outcome.correct ? 'ok' : 'bad'}`}>
          {outcome.correct ? '✓ Doğru karar' : '✗ Yanlış karar'}
        </p>
        <p className="reason">{outcome.reason}</p>
        <div className={`delta ${outcome.delta >= 0 ? 'positive' : 'negative'}`}>
          {outcome.delta >= 0 ? '+' : ''}{outcome.delta} ₺
        </div>
        {outcome.energyDelta !== 0 && (
          <div className={`delta energy ${outcome.energyDelta > 0 ? 'positive' : 'negative'}`}>
            {outcome.energyDelta > 0 ? '+' : ''}{outcome.energyDelta} Prestij
          </div>
        )}
        <button className="btn primary" onClick={() => dispatch({ type: 'ACK_OUTCOME' })}>
          Sonraki Hasta
        </button>
      </div>
    </div>
  );
}
