import { useEffect, useRef } from 'react';
import { useGame } from '../state/GameContext';
import { CONFIG } from '../state/config';
import { sessionPreview, prestigeCostOf } from '../logic/scoring';
import { useGsapEnter } from '../anim/useGsap';
import { gsap } from 'gsap';

export default function SessionScreen() {
  const { state, dispatch } = useGame();
  const session = state.session;
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastAsked = session?.asked.length ?? 0;

  const rootRef = useGsapEnter<HTMLDivElement>('.patient-card, .decision-bar', {
    direction: 'up',
    stagger: 0.12,
  });

  const maxReached = session ? session.asked.length >= session.maxQuestions : false;
  const noQuestionsLeft = session ? session.pool.length === 0 : false;
  const noEnergy = state.energy <= 0;
  const cheapestCost = session
    ? session.pool.reduce((min, q) => Math.min(min, prestigeCostOf(q)), Infinity)
    : Infinity;
  const allUnaffordable = !noEnergy && state.energy < cheapestCost;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [session?.asked.length, session?.pool.length]);

  useEffect(() => {
    if (!session || session.resolved) return;
    if (state.energy <= 0 && session.pool.length > 0 && !maxReached) {
      dispatch({ type: 'CHECK_ENERGY' });
    }
  }, [state.energy, session, session?.pool.length, maxReached, dispatch]);

  if (!session) return null;

  const preview = sessionPreview(session.patient.profile, state.energy, state.lossStreak);

  function ask(questionId: string) {
    dispatch({ type: 'ASK', questionId });
  }

  function decide(decision: 'discharge' | 'admit') {
    dispatch({ type: 'DECIDE', decision });
  }

  return (
    <div className="session" ref={rootRef}>
      <aside className="patient-card">
        <div className="avatar">{session.patient.avatar}</div>
        <div className="patient-info">
          <h3>{session.patient.name}</h3>
          <span>Yaş: {session.patient.age}</span>
          <span className="counter">
            Sorulan: {session.asked.length}/{session.maxQuestions}
          </span>
          <span className="counter energy">
            Prestij: {state.energy}/{CONFIG.START_ENERGY}
          </span>
          <div className="preliminary">
            <span className="preliminary-label">Ön Tanı:</span> {session.patient.preliminary}
          </div>
        </div>
      </aside>

      <div className="transcript" ref={scrollRef}>
        {session.asked.length === 0 && (
          <div className="typing">Yeni hasta geldi. Aşağıdan bir soru seçip sorabilirsin.</div>
        )}
        {session.asked.map((qa, i) => (
          <QaBlock key={i} qa={qa} patientName={session.patient.name} isNew={i === lastAsked - 1} />
        ))}
        {!maxReached && !noQuestionsLeft && (
          <div className="typing">...hasta cevabını verdi, sıradaki soruyu seç.</div>
        )}
        {maxReached && (
          <div className="typing warn">En fazla {session.maxQuestions} soru soruldu. Karar vermen gerekiyor.</div>
        )}
      </div>

      <div className="question-pool">
        <h4>Sorulabilecek sorular</h4>
        {noQuestionsLeft && !maxReached && (
          <div className="typing">Başka soru kalmadı, karar verebilirsin.</div>
        )}
        {noEnergy && !maxReached && (
          <div className="typing warn">Prestijin bitti! Karar vermen ya da prestij alman gerekiyor.</div>
        )}
        {allUnaffordable && !maxReached && (
          <div className="typing warn">Kalan prestijle sorulabilecek soru kalmadı. Karar vermen gerekiyor.</div>
        )}
        {session.pool.map((q) => {
          const cost = prestigeCostOf(q);
          const tooExpensive = state.energy < cost;
          return (
            <button
              key={q.id}
              className="question-btn"
              disabled={maxReached || noEnergy || tooExpensive}
              onClick={() => ask(q.id)}
            >
              <span className="question-text">{q.text}</span>
              <span className={`cost-badge${tooExpensive ? ' unaffordable' : ''}`}>
                −{cost} Prestij
              </span>
            </button>
          );
        })}
      </div>

      <div className="reward-preview">
        <span className="rp-label">Bu hasta için olası sonuç:</span>
        <span className="rp ok">
          ✓ Doğru karar: +{preview.correctMin}~+{preview.correctMax} ₺, ≈%{Math.round(preview.prestigeChance * 100)} şansla +{preview.prestige} prestij
        </span>
        <span className="rp bad">
          ✗ Yanlış karar: −{preview.wrongMin}~−{preview.wrongMax} ₺
        </span>
        <span className="rp info">
          Kalan prestij: {state.energy}
          {!maxReached && Number.isFinite(cheapestCost) ? ` · En ucuz soru: −${cheapestCost}` : ''}
        </span>
      </div>

      <div className="decision-bar">
        <button className="btn discharge" onClick={() => decide('discharge')}>
          TABURCU ET
        </button>
        <button className="btn admit" onClick={() => decide('admit')}>
          YATIŞ VER
        </button>
        <span className="hint">
          {maxReached
            ? 'Soru hakkın doldu, lütfen karar ver.'
            : 'İstediğin an karar verebilirsin.'}
        </span>
      </div>
    </div>
  );
}

function QaBlock({
  qa,
  patientName,
  isNew,
}: {
  qa: { question: { text: string }; answer: string };
  patientName: string;
  isNew: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isNew || !ref.current) return;
    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.msg'),
        { autoAlpha: 0, y: 16, scale: 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.12,
          ease: 'power2.out',
          clearProps: 'all',
        }
      );
    }, el);
    return () => ctx.revert();
  }, [isNew]);

  return (
    <div key={qa.question.text} className="qa-block" ref={ref}>
      <div className="msg doctor">
        <span className="who">Sen:</span> {qa.question.text}
      </div>
      <div className="msg patient-m">
        <span className="who">{patientName}:</span> {qa.answer}
      </div>
    </div>
  );
}

