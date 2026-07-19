import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

const OFFSETS: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  scale: { scale: 0.92 },
  fade: {},
};

/**
 * Bileşen mount edildiğinde seçilen hedefleri staggered giriş animasyonuyla
 * belirginleştirir. Dönüş ref'i, animasyonu iptal etmek için kullanılır.
 */
export function useGsapEnter<T extends HTMLElement = HTMLDivElement>(
  selector = ':scope > *',
  options: { direction?: Direction; duration?: number; stagger?: number; delay?: number } = {}
) {
  const ref = useRef<T>(null);
  const { direction = 'up', duration = 0.5, stagger = 0.08, delay = 0 } = options;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const offset = OFFSETS[direction];
    const targets = el.querySelectorAll<HTMLElement>(selector);
    if (targets.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          autoAlpha: 0,
          x: offset.x ?? 0,
          y: offset.y ?? 0,
          scale: offset.scale ?? 1,
        },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: 'power2.out',
          stagger,
          clearProps: 'all',
        }
      );
    }, el);
    return () => ctx.revert();
  }, [selector, direction, duration, stagger, delay]);

  return ref;
}

/**
 * Overlay (modal) bileşenleri için arka plan ve içerik giriş animasyonu.
 */
export function useGsapOverlay<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const overlay = el;
    const card = el.querySelector<HTMLElement>('.card, .overlay-card');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlay,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.25, ease: 'power1.out', clearProps: 'all' }
      );
      if (card) {
        gsap.fromTo(
          card,
          { scale: 0.9, y: 20, autoAlpha: 0 },
          {
            scale: 1,
            y: 0,
            autoAlpha: 1,
            duration: 0.4,
            ease: 'back.out(1.6)',
            clearProps: 'all',
          }
        );
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Liste öğelerine (mesaj balonları, soru butonları) eklendikçe
 * basit bir giriş animasyonu uygular.
 */
export function useGsapItemEnter<T extends HTMLElement = HTMLDivElement>(
  deps: unknown[] = []
) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 14, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
      );
    }, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/**
 * Metni karakter karakter yazan (typing) animasyonu. Elemanda mevcut metni
 * okur ve GSAP ile yazma efekti oluşturur.
 */
export function useGsapTypewriter<T extends HTMLElement = HTMLDivElement>(
  text: string,
  options: { speed?: number; cursor?: boolean; delay?: number } = {}
) {
  const ref = useRef<T>(null);
  const { speed = 0.02, cursor = false, delay = 0 } = options;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const obj = { i: 0 };
      el.textContent = '';
      gsap.to(obj, {
        i: text.length,
        duration: text.length * speed,
        delay,
        ease: 'none',
        onUpdate: () => {
          el.textContent = text.slice(0, Math.floor(obj.i)) + (cursor ? '▍' : '');
        },
        onComplete: () => {
          el.textContent = text + (cursor ? '▍' : '');
        },
      });
    }, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return ref;
}
