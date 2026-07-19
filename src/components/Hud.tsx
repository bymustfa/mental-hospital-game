import { useEffect, useRef, useState } from 'react';
import { useGame } from '../state/GameContext';
import { CONFIG } from '../state/config';
import { gsap } from 'gsap';

function fmt(n: number): string {
  return Math.round(n).toLocaleString('tr-TR');
}

export default function Hud() {
  const { state } = useGame();
  const ratio = Math.max(0, Math.min(1, (state.money - CONFIG.BANKRUPTCY) / (CONFIG.TARGET - CONFIG.BANKRUPTCY)));
  const energyRatio = Math.max(0, Math.min(1, state.energy / CONFIG.START_ENERGY));
  const moneyRef = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(state.money);

  useEffect(() => {
    const obj = { v: display };
    const tween = gsap.to(obj, {
      v: state.money,
      duration: 0.7,
      ease: 'power2.out',
      onUpdate: () => setDisplay(obj.v),
    });
    return () => {
      tween.kill();
    };
  }, [state.money]);

  useEffect(() => {
    if (!moneyRef.current) return;
    const flashColor = state.money >= 0 ? 'var(--good)' : 'var(--bad)';
    const tween = gsap.fromTo(
      moneyRef.current,
      { color: flashColor },
      { color: state.money < 0 ? 'var(--bad)' : 'var(--text)', duration: 0.8, ease: 'power1.out' }
    );
    return () => {
      tween.kill();
    };
  }, [state.money]);

  return (
    <header className="hud">
      <div className="hud-item">
        <span className="label">Gün</span>
        <span className="value">{state.day}</span>
      </div>
      <div className="hud-item money">
        <span className="label">Maaş Bakiyesi</span>
        <span ref={moneyRef} className={`value ${state.money < 0 ? 'negative' : ''}`}>{fmt(display)} ₺</span>
      </div>
      <div className="hud-item">
        <span className="label">Tedavi</span>
        <span className="value">{state.stats.treated}</span>
      </div>
      <div className="hud-item">
        <span className="label">Doğru / Yanlış</span>
        <span className="value">
          <span className="ok">{state.stats.correct}</span> / <span className="bad">{state.stats.wrong}</span>
        </span>
      </div>
      <div className="hud-item energy">
        <span className="label">Prestij</span>
        <span className="value">{state.energy}/{CONFIG.START_ENERGY}</span>
      </div>
      <div className="hud-progress">
        <div className="hud-bar" style={{ width: `${ratio * 100}%` }} />
      </div>
      <div className="hud-progress energy-bar">
        <div className="hud-bar energy" style={{ width: `${energyRatio * 100}%` }} />
      </div>
    </header>
  );
}
