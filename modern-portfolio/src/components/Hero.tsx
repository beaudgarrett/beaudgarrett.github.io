import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import { Mail, ChevronDown, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import Typewriter from './Typewriter';
import MagneticButton from './MagneticButton';

function ParallaxOrb({ className, speed, style }: { className: string; speed: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * speed]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className="absolute">
      <motion.div style={{ y: smoothY, ...style }} className={className} />
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const smoothTextY = useSpring(heroTextY, { stiffness: 80, damping: 25 });
  const smoothImageY = useSpring(imageY, { stiffness: 80, damping: 25 });

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden aurora-hero grid-bg">
      {/* Single background orb for parallax */}
      <ParallaxOrb
        speed={0.5}
        className="top-[10%] left-[5%] w-[600px] h-[600px] bg-indigo-500/[0.08] rounded-full blur-[150px] animate-breathe"
      />

      <motion.div
        style={{ y: smoothTextY, opacity: heroOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-32"
      >
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left column - Typography */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-mono text-indigo-300 mb-8 border border-indigo-500/15"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <Typewriter text="Computer Science & AI · Clemson University" speed={35} delay={600} />
            </motion.div>

            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85]"
              >
                <span className="text-white block">Beau</span>
              </motion.h1>
            </div>

            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.23, 1, 0.32, 1] }}
                className="text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85]"
              >
                <span className="text-shimmer block">Garrett</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="w-32 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 mx-auto lg:mx-0 mb-6 origin-left"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="flex items-center gap-2 mb-10 justify-center lg:justify-start"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-text-dim">Open to opportunities</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-xl sm:text-2xl text-text-dim max-w-lg mx-auto lg:mx-0 mb-12 leading-relaxed font-light"
            >
              Building intelligent systems at the intersection of{' '}
              <span className="text-white font-medium">AI</span>,{' '}
              <span className="text-white font-medium">software engineering</span>, and{' '}
              <span className="text-white font-medium">automation</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
            >
              <MagneticButton strength={0.2}>
                <a
                  href="#projects"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-semibold text-sm transition-all shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 relative overflow-hidden inline-flex items-center"
                >
                  <span className="relative z-10">View Projects</span>
                </a>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl glass text-white font-medium text-sm transition-all hover:bg-white/[0.08] flex items-center gap-2 border border-white/[0.06]"
                >
                  <FileText className="w-4 h-4" />
                  Resume
                </a>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="flex gap-3 justify-center lg:justify-start"
            >
              {[
                { icon: GithubIcon, href: 'https://github.com/beaudgarrett', label: 'GitHub' },
                { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/beau-garrett-42675832b/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:garrett.ai.automation@gmail.com', label: 'Email' },
              ].map((link) => (
                <MagneticButton key={link.label} strength={0.4}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center text-text-dim hover:text-white hover:bg-white/[0.08] transition-all border border-white/[0.04]"
                    aria-label={link.label}
                  >
                    <link.icon className="w-4 h-4" />
                  </a>
                </MagneticButton>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Image with parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <motion.div
              style={{ y: smoothImageY }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-violet-500/15 to-cyan-500/10 rounded-[2.5rem] blur-3xl" />

              <div className="relative w-64 h-72 sm:w-72 sm:h-80 lg:w-80 lg:h-[22rem] xl:w-96 xl:h-[26rem] rounded-[2.5rem] overflow-hidden border border-white/[0.06] shadow-2xl animate-float mx-auto">
                <img
                  src="/images/headshot.png"
                  alt="Beau Garrett"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-violet-500/10" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        style={{ opacity: heroOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-text-muted hover:text-text-dim transition-colors group">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
