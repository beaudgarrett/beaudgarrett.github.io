import { useRef, useEffect } from 'react';

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  opacity?: number;
}

export default function Spotlight({ children, className = '', size = 600, opacity = 0.06 }: SpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const onMove = (e: MouseEvent) => {
      const rect = div.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      div.style.setProperty('--spotlight-x', `${x}px`);
      div.style.setProperty('--spotlight-y', `${y}px`);
    };

    const onLeave = () => {
      div.style.setProperty('--spotlight-x', '-9999px');
      div.style.setProperty('--spotlight-y', '-9999px');
    };

    div.addEventListener('mousemove', onMove);
    div.addEventListener('mouseleave', onLeave);
    onLeave();

    return () => {
      div.removeEventListener('mousemove', onMove);
      div.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={divRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(${size}px circle at var(--spotlight-x, -9999px) var(--spotlight-y, -9999px), rgba(255,255,255,${opacity}), transparent 40%)`,
      }}
    >
      {children}
    </div>
  );
}
