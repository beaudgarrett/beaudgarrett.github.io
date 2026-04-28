import { useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawValue = useTransform(
    scrollYProgress,
    [0, 1],
    [-100 * speed, 100 * speed]
  );

  const smoothValue = useSpring(rawValue, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return { ref, value: smoothValue };
}

export function useParallaxRange(
  inputRange: [number, number],
  outputRange: [number, number]
) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawValue = useTransform(scrollYProgress, inputRange, outputRange);

  const smoothValue = useSpring(rawValue, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return { ref, value: smoothValue };
}
