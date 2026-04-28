import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';
import MagneticButton from './MagneticButton';
import TextReveal from './TextReveal';
import TextScramble from './TextScramble';

export default function Resume() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const headingY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  const smoothCardY = useSpring(cardY, { stiffness: 60, damping: 20 });
  const smoothHeadingY = useSpring(headingY, { stiffness: 60, damping: 20 });

  return (
    <section ref={sectionRef} id="resume" className="relative py-32 sm:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left - Text with parallax */}
          <motion.div style={{ y: smoothHeadingY }} className="lg:col-span-5">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.3em] block mb-6"
            >
              <TextScramble text="04 — Credentials" duration={1200} />
            </motion.span>

            <TextReveal>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
                <span className="text-white">My</span>
                <br />
                <span className="text-gradient">Resume</span>
              </h2>
            </TextReveal>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-24 h-[2px] bg-gradient-to-r from-indigo-500 to-violet-500 mt-8 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-text-dim leading-relaxed mt-10"
            >
              Computer Science & AI professional with experience in machine learning research, full-stack development, automation engineering, and agentic system design.
            </motion.p>
          </motion.div>

          {/* Right - Resume card with parallax rotation */}
          <motion.div
            style={{ y: smoothCardY }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="glow-border rounded-3xl p-[1px]">
              <div className="bg-[#0a0a0f] rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 flex items-center justify-center mx-auto mb-8">
                  <FileText className="w-10 h-10 text-indigo-400" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">Beau Garrett</h3>
                <p className="text-sm text-text-muted font-mono mb-10">
                  Clemson University · B.S. Computer Science & AI
                </p>

                <div className="flex flex-wrap gap-3 justify-center">
                  <MagneticButton strength={0.2}>
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-semibold text-sm transition-all shadow-xl shadow-indigo-500/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Resume
                    </a>
                  </MagneticButton>

                  <MagneticButton strength={0.2}>
                    <a
                      href="/resume.pdf"
                      download
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass text-white font-medium text-sm transition-all hover:bg-white/[0.08] border border-white/[0.06]"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
