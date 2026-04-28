import { Terminal } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Terminal className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <span className="text-sm font-semibold text-white block">Beau Garrett</span>
            <span className="text-[10px] text-text-muted font-mono">AI & Software Engineering</span>
          </div>
        </div>

        <p className="text-xs text-text-muted">
          © {year} Beau Garrett. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          <a href="https://github.com/beaudgarrett" target="_blank" rel="noopener noreferrer" className="text-xs text-text-muted hover:text-white transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/beau-garrett-42675832b/" target="_blank" rel="noopener noreferrer" className="text-xs text-text-muted hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="mailto:garrett.ai.automation@gmail.com" className="text-xs text-text-muted hover:text-white transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
