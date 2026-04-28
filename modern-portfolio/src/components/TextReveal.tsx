import { motion } from 'motion/react';
import { type ReactNode } from 'react';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '100%', rotate: 2 }}
        whileInView={{ y: 0, rotate: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.23, 1, 0.32, 1],
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
