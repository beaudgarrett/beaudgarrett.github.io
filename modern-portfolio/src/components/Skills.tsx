import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import { Code, Brain, Globe, Cloud } from 'lucide-react';
import Marquee from './Marquee';
import TextReveal from './TextReveal';
import TextScramble from './TextScramble';
import TiltCard from './TiltCard';

const skillTags = [
  'Python', 'Rust', 'TypeScript', 'JavaScript', 'Java', 'C / C++', 'SQL',
  'Machine Learning', 'Neural Networks', 'Data Pipelines', 'scikit-learn', 'TensorFlow',
  'React', 'Node.js', 'Express', 'REST APIs', 'Tailwind CSS',
  'Git', 'AWS', 'Docker', 'CI/CD', 'SQLite',
];

const categories = [
  {
    icon: Code,
    title: 'Languages',
    skills: ['Python', 'Rust', 'TypeScript', 'JavaScript', 'Java', 'C / C++', 'SQL'],
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    glow: 'rgba(52, 211, 153, 0.12)',
  },
  {
    icon: Brain,
    title: 'AI / ML',
    skills: ['Machine Learning', 'Neural Networks', 'Data Pipelines', 'scikit-learn', 'TensorFlow'],
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    glow: 'rgba(192, 132, 252, 0.12)',
  },
  {
    icon: Globe,
    title: 'Web & Backend',
    skills: ['React', 'Node.js', 'Express', 'REST APIs', 'Tailwind CSS'],
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    glow: 'rgba(6, 182, 212, 0.12)',
  },
  {
    icon: Cloud,
    title: 'Cloud & Tools',
    skills: ['Git / GitHub', 'AWS', 'Docker', 'CI/CD', 'SQLite'],
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    glow: 'rgba(251, 191, 36, 0.12)',
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const smoothHeadingY = useSpring(headingY, { stiffness: 60, damping: 20 });

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 sm:py-40 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[150px] pointer-events-none animate-breathe"
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header with parallax */}
        <motion.div style={{ y: smoothHeadingY }} className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] block mb-6"
          >
            <TextScramble text="03 — Toolbox" duration={1200} />
          </motion.span>

          <TextReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
              <span className="text-white">Skills &</span>
              <br />
              <span className="text-gradient-cyan">Technologies</span>
            </h2>
          </TextReveal>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-24 h-[2px] bg-gradient-to-r from-cyan-500 to-indigo-500 mt-8 origin-left"
          />
        </motion.div>

        {/* Infinite skill marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 -mx-6"
        >
          <Marquee speed={40} pauseOnHover>
            {skillTags.map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="inline-flex items-center mx-3 px-5 py-2.5 rounded-full glass text-sm font-mono text-text-dim border border-white/[0.08] whitespace-nowrap hover:text-white hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all"
              >
                {skill}
              </span>
            ))}
          </Marquee>
        </motion.div>

        {/* Category cards with staggered parallax */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <ParallaxSkillCard key={cat.title} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ParallaxSkillCard({ cat, index }: { cat: (typeof categories)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const speeds = [0.08, 0.12, 0.06, 0.1];
  const y = useTransform(scrollYProgress, [0, 1], [30 * speeds[index], -30 * speeds[index]]);
  const smoothY = useSpring(y, { stiffness: 60, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ y: smoothY }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <TiltCard glowColor={cat.glow} className="h-full">
        <div className={`glass-cyan p-7 rounded-2xl border ${cat.border} h-full group hover:border-white/10 transition-colors`}>
          <div className={`w-12 h-12 rounded-xl ${cat.bg} border ${cat.border} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
            <cat.icon className={`w-6 h-6 ${cat.color}`} />
          </div>
          <h3 className="text-white font-semibold text-lg mb-5">{cat.title}</h3>
          <div className="flex flex-wrap gap-2">
            {cat.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg bg-white/5 text-xs font-mono text-text-dim border border-white/5 transition-colors hover:bg-white/10 hover:text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
