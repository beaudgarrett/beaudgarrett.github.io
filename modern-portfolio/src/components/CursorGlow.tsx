import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const visibleRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const glow = glowRef.current;
    const dot = dotRef.current;
    if (!glow || !dot) return;

    let ticking = false;

    const onMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      visibleRef.current = true;

      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          const { x, y } = posRef.current;
          glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
          dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    const onLeave = () => {
      visibleRef.current = false;
      glow.style.opacity = '0';
      dot.style.opacity = '0';
    };

    const onEnter = () => {
      visibleRef.current = true;
      glow.style.opacity = '1';
      dot.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.body.addEventListener('mouseleave', onLeave);
    document.body.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.removeEventListener('mouseleave', onLeave);
      document.body.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full will-change-transform"
        style={{
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, rgba(168,85,247,0.03) 40%, transparent 70%)',
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          opacity: 0,
          transition: 'opacity 0.2s',
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full will-change-transform"
        style={{
          width: 6,
          height: 6,
          background: 'rgba(165,180,252,0.7)',
          boxShadow: '0 0 10px 2px rgba(129,140,248,0.4)',
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          opacity: 0,
          transition: 'opacity 0.2s',
        }}
      />
    </>
  );
}
