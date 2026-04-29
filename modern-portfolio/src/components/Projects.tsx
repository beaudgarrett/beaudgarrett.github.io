import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink, Terminal, Sparkles, Gamepad2, Dumbbell, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import TiltCard from './TiltCard';
import TextReveal from './TextReveal';
import TextScramble from './TextScramble';
import ParallaxImage from './ParallaxImage';

const projects = [
  {
    id: 'beaucli',
    name: 'BeauCLI',
    tagline: 'AI Coding Harness',
    description:
      'Multi-agent terminal coding harness with AST-based code indexing, SQLite-backed symbol search, and local mixture-of-experts routing. Built in Rust for memory-safe async execution. Scored 79.2 on TermBench, placing it in the top 5 worldwide.',
    image: '/images/beaucli.png',
    icon: Terminal,
    size: 'large',
    glowColor: 'rgba(52, 211, 153, 0.1)',
    borderColor: 'border-emerald-500/15',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    accentColor: 'text-emerald-400',
    tech: ['Rust', 'Python', 'SQLite', 'Tokio', 'OpenAI API'],
    github: 'https://github.com/beaudgarrett/bgCLI',
    stats: '79.2 TermBench • Top 5 worldwide',
  },
  {
    id: 'celestiml',
    name: 'CelestiML',
    tagline: 'Neural Celestial Explorer',
    description:
      'Interactive 3D astronomy platform with ML-based orbit prediction and planetary alignment rarity scoring.',
    image: '/images/celestiml.png',
    icon: Sparkles,
    size: 'small',
    glowColor: 'rgba(192, 132, 252, 0.1)',
    borderColor: 'border-violet-500/15',
    badgeColor: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    accentColor: 'text-violet-400',
    tech: ['TypeScript', 'React', 'Three.js', 'Python'],
    github: 'https://github.com/beaudgarrett/celestiml',
    stats: '3D visualization',
  },
  {
    id: 'echo-runner',
    name: 'Echo Runner',
    tagline: 'Cyberpunk Platformer',
    description:
      'High-energy action platformer with custom physics, particle systems, and tight game-loop architecture.',
    image: '/images/echo_runner.png',
    icon: Gamepad2,
    size: 'small',
    glowColor: 'rgba(244, 114, 182, 0.1)',
    borderColor: 'border-pink-500/15',
    badgeColor: 'bg-pink-500/10 text-pink-300 border-pink-500/20',
    accentColor: 'text-pink-400',
    tech: ['Python', 'Pygame', 'Custom Physics'],
    github: 'https://github.com/beaudgarrett/echo_runner',
    stats: 'Custom engine',
  },
  {
    id: 'gain',
    name: 'gAIn',
    tagline: 'ML Hypertrophy Predictor',
    description:
      'Machine learning system that analyzes training variables to predict hypertrophy outcomes and recommend personalized progression strategies.',
    image: '/images/gain.png',
    icon: Dumbbell,
    size: 'medium',
    glowColor: 'rgba(251, 191, 36, 0.1)',
    borderColor: 'border-amber-500/15',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    accentColor: 'text-amber-400',
    tech: ['Python', 'scikit-learn', 'Pandas'],
    github: 'https://github.com/beaudgarrett/gAIn',
    stats: 'Predictive modeling',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const smoothHeadingY = useSpring(headingY, { stiffness: 100, damping: 30 });

  const largeProject = projects.find((p) => p.size === 'large')!;
  const smallProjects = projects.filter((p) => p.size === 'small');
  const mediumProject = projects.find((p) => p.size === 'medium')!;

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 sm:py-40 overflow-hidden">
      {/* Single parallax background orb */}
      <ParallaxOrb speed={0.3} className="top-[20%] left-[10%] w-[500px] h-[500px] bg-indigo-500/[0.03] rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header with parallax */}
        <motion.div style={{ y: smoothHeadingY }} className="mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.3em] block mb-6"
          >
            <TextScramble text="02 — Portfolio" duration={1200} />
          </motion.span>

          <TextReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
              <span className="text-white">Featured</span>
              <br />
              <span className="text-gradient">Projects</span>
            </h2>
          </TextReveal>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-24 h-[2px] bg-gradient-to-r from-indigo-500 to-violet-500 mt-8 origin-left"
          />
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-auto md:auto-rows-[280px]">
          {/* Large featured card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2 md:row-span-2"
          >
            <TiltCard glowColor={largeProject.glowColor} className="h-full">
              <ProjectCard project={largeProject} featured />
            </TiltCard>
          </motion.div>

          {/* Two small cards stacked */}
          {smallProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.15 * (i + 1) }}
              className="md:col-span-1"
            >
              <TiltCard glowColor={project.glowColor} className="h-full">
                <ProjectCard project={project} />
              </TiltCard>
            </motion.div>
          ))}

          {/* Bottom medium card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="md:col-span-3"
          >
            <TiltCard glowColor={mediumProject.glowColor} className="h-full">
              <ProjectCard project={mediumProject} wide />
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ParallaxOrb({ speed, className }: { speed: number; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * speed]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className="absolute pointer-events-none">
      <motion.div style={{ y: smoothY }} className={className} />
    </div>
  );
}

function ProjectCard({
  project,
  featured = false,
  wide = false,
}: {
  project: (typeof projects)[0];
  featured?: boolean;
  wide?: boolean;
}) {
  return (
    <article
      className={`group glass rounded-2xl overflow-hidden border ${project.borderColor} h-full flex ${
        wide ? 'flex-col md:flex-row' : featured ? 'flex-col' : 'flex-col'
      } relative`}
    >
      {/* Image with parallax */}
      <div
        className={`relative overflow-hidden ${
          featured ? 'h-48 md:h-3/5' : wide ? 'w-full md:w-2/5 h-48 md:h-full' : 'h-48 md:h-1/2'
        }`}
      >
        <ParallaxImage
          src={project.image}
          alt={project.name}
          className="w-full h-full"
          speed={featured ? 0.5 : 0.3}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />
        {wide && <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-[#0a0a0f]/80" />}

        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${project.badgeColor} backdrop-blur-sm`}>
            <project.icon className="w-3.5 h-3.5" />
            {project.tagline}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 flex-1 flex flex-col ${wide ? 'justify-center' : ''}`}>
        <div className="flex items-start justify-between mb-3">
          <h3 className={`font-bold text-white ${featured ? 'text-3xl' : 'text-xl'}`}>{project.name}</h3>
          {project.stats && (
            <span className={`text-[10px] font-mono ${project.accentColor} bg-white/5 px-2 py-1 rounded-md border border-white/5`}>
              {project.stats}
            </span>
          )}
        </div>

        <p className={`text-text-muted leading-relaxed mb-5 flex-1 ${featured ? 'text-base max-w-lg' : 'text-sm'}`}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md bg-white/5 text-xs font-mono text-text-dim border border-white/5"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white transition-all hover:border-white/20 group/link"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Source</span>
            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
          </a>
        </div>
      </div>
    </article>
  );
}
