import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import { Cpu, Brain, Code2, Zap } from 'lucide-react';
import TiltCard from './TiltCard';
import TextReveal from './TextReveal';
import TextScramble from './TextScramble';

const highlights = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    desc: 'Neural networks, predictive modeling, and data pipelines from research to production.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    glow: 'rgba(192, 132, 252, 0.12)',
  },
  {
    icon: Code2,
    title: 'Software Engineering',
    desc: 'Full-stack systems with React, Node.js, Python, and Rust — built for scale.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    glow: 'rgba(129, 140, 248, 0.12)',
  },
  {
    icon: Cpu,
    title: 'Agentic Systems',
    desc: 'Autonomous coding agents, multi-agent orchestration, and benchmark optimization.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    glow: 'rgba(6, 182, 212, 0.12)',
  },
  {
    icon: Zap,
    title: 'Automation',
    desc: 'Workflow automation, CI/CD pipelines, and cloud infrastructure with AWS & Power Automate.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    glow: 'rgba(251, 191, 36, 0.12)',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const cardParallax = [0.1, 0.15, 0.08, 0.12];

  const smoothHeadingY = useSpring(headingY, { stiffness: 60, damping: 20 });

  return (
    <section ref={sectionRef} id="about" className="relative py-32 sm:py-40 aurora-copper grid-bg-dense overflow-hidden">
      {/* Background orb */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/[0.03] rounded-full blur-[150px] pointer-events-none animate-breathe"
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left - Large typography with parallax */}
          <motion.div style={{ y: smoothHeadingY }} className="lg:col-span-5">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-mono text-orange-400 uppercase tracking-[0.3em] block mb-6"
            >
              <TextScramble text="01 — About" duration={1200} />
            </motion.span>

            <TextReveal>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
                <span className="text-white">Who</span>
                <br />
                <span className="text-gradient-copper">I Am</span>
              </h2>
            </TextReveal>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-24 h-[2px] bg-gradient-to-r from-orange-500 to-amber-500 mt-8 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-text-dim leading-relaxed mt-10"
            >
              I hold a degree in Computer Science from{' '}
              <span className="text-white font-medium">Clemson University</span> with deep expertise in artificial intelligence, machine learning, and software engineering.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-text-muted leading-relaxed mt-6"
            >
              My work lives at the boundary between research and shipped product — from training neural networks to architecting multi-agent coding systems.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-text-muted leading-relaxed mt-6"
            >
              I&apos;m drawn to hard problems: autonomous agents, data-driven decision making, and systems that make developers more productive.
            </motion.p>
          </motion.div>

          {/* Right - Highlight cards with individual parallax */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <ParallaxCard
                  key={item.title}
                  item={item}
                  index={i}
                  speed={cardParallax[i]}
                  offset={i % 2 === 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ParallaxCard({
  item,
  index,
  speed,
  offset,
}: {
  item: (typeof highlights)[0];
  index: number;
  speed: number;
  offset: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60 * speed, -60 * speed]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ y: smoothY }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className={offset ? 'mt-0 sm:mt-8' : ''}
    >
      <TiltCard glowColor={item.glow} className="h-full">
        <div className={`glass p-7 rounded-2xl h-full border ${item.border} card-hover group`}>
          <div className={`w-12 h-12 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center mb-5 transition-transform group-hover:scale-110`}>
            <item.icon className={`w-6 h-6 ${item.color}`} />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
          <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
        </div>
      </TiltCard>
    </motion.div>
  );
}
