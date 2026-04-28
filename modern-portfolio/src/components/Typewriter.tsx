import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
  onComplete?: () => void;
}

export default function Typewriter({ text, speed = 45, delay = 0, className = '', cursor = true, onComplete }: TypewriterProps) {
  const [display, setDisplay] = useState('');
  const [showCursor, setShowCursor] = useState(cursor);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplay(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
        if (cursor) {
          setTimeout(() => setShowCursor(false), 2000);
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed, cursor, onComplete]);

  return (
    <span className={className}>
      {display}
      {showCursor && (
        <span className="inline-block w-[2px] h-[1em] bg-indigo-400 ml-0.5 align-middle animate-pulse" />
      )}
    </span>
  );
}
