import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import { Mail, ArrowUpRight, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import MagneticButton from './MagneticButton';
import TextReveal from './TextReveal';
import TextScramble from './TextScramble';

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'garrett.ai.automation@gmail.com',
    href: 'mailto:garrett.ai.automation@gmail.com',
    description: 'For project inquiries, collaborations, or opportunities.',
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'github.com/beaudgarrett',
    href: 'https://github.com/beaudgarrett',
    description: 'Source code for all my projects and experiments.',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/beau-garrett',
    href: 'https://www.linkedin.com/in/beau-garrett-42675832b/',
    description: 'Professional background and connections.',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);
  const smoothHeadingY = useSpring(headingY, { stiffness: 60, damping: 20 });

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 sm:py-40 overflow-hidden">
      {/* Vibrant gradient background with parallax scale */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-gradient-to-r from-indigo-500/[0.06] via-violet-500/[0.05] to-cyan-500/[0.06] rounded-full blur-[150px]" />
      </div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div style={{ y: smoothHeadingY }} className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.3em] block mb-6"
          >
            <TextScramble text="05 — Connect" duration={1200} />
          </motion.span>

          <TextReveal>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
              <span className="text-white">Let&apos;s Build</span>
              <br />
              <span className="text-gradient-hero">Something</span>
            </h2>
          </TextReveal>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-24 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 mx-auto mt-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-text-dim mt-8 max-w-lg mx-auto text-lg"
          >
            I&apos;m always open to discussing new projects, research collaborations, or opportunities in AI and software engineering.
          </motion.p>
        </motion.div>

        {/* Contact cards with parallax */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-16 px-2 sm:px-0">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group glass p-7 rounded-2xl border border-white/[0.06] text-left transition-all hover:border-indigo-500/20 hover:bg-white/[0.03] hover:shadow-[0_0_40px_-12px_rgba(99,102,241,0.15)]"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center transition-transform group-hover:scale-110">
                  <link.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-text-muted group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">{link.label}</h3>
              <p className="text-sm text-indigo-300 font-mono mb-3 break-words">{link.value}</p>
              <p className="text-xs text-text-muted">{link.description}</p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <MagneticButton strength={0.15}>
            <a
              href="mailto:garrett.ai.automation@gmail.com"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 hover:from-indigo-400 hover:via-violet-400 hover:to-cyan-400 text-white font-bold text-sm transition-all shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/40 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <MessageSquare className="w-5 h-5" />
                Start a Conversation
              </span>
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
