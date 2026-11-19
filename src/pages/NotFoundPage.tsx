import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { Terminal as TerminalIcon, CornerDownLeft } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { EASING, staggerContainerVariants } from '../lib/animation';

export const NotFoundPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();

  const missingPath = location.pathname;
  const [typedLines, setTypedLines] = useState<string[]>(() =>
    prefersReduced
      ? [
        `$ cd ${missingPath}`,
        `bash: cd: ${missingPath}: No such file or directory`,
        'Type a command to continue: home · projects · resume · contact · blogs',
      ]
      : []
  );
  const [currentLineText, setCurrentLineText] = useState('');
  const [typingDone, setTypingDone] = useState(Boolean(prefersReduced));
  const [inputVal, setInputVal] = useState('');
  const [outputHistory, setOutputHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // SEO & robots noindex
  useEffect(() => {
    const prevTitle = document.title;
    document.title = '404 | Mohak Agrawal';

    let metaRobots = document.querySelector('meta[name="robots"]');
    let createdMeta = false;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
      createdMeta = true;
    }
    const prevRobots = metaRobots.getAttribute('content');
    metaRobots.setAttribute('content', 'noindex');

    return () => {
      document.title = prevTitle;
      if (createdMeta && metaRobots) {
        metaRobots.remove();
      } else if (metaRobots && prevRobots) {
        metaRobots.setAttribute('content', prevRobots);
      }
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (prefersReduced) return;

    const fullLines = [
      `$ cd ${missingPath}`,
      `bash: cd: ${missingPath}: No such file or directory`,
      'Type a command to continue: home · projects · resume · contact · blogs',
    ];

    let lineIdx = 0;
    let charIdx = 0;
    let cancelled = false;

    const step = () => {
      if (cancelled) return;
      if (lineIdx >= fullLines.length) {
        setTypingDone(true);
        setTimeout(() => inputRef.current?.focus(), 100);
        return;
      }

      const targetLine = fullLines[lineIdx];
      if (charIdx < targetLine.length) {
        charIdx++;
        setCurrentLineText(targetLine.slice(0, charIdx));
        setTimeout(step, 18);
      } else {
        setTypedLines((prev) => [...prev, targetLine]);
        setCurrentLineText('');
        lineIdx++;
        charIdx = 0;
        setTimeout(step, 100);
      }
    };

    const initialTimer = setTimeout(step, 300);

    return () => {
      cancelled = true;
      clearTimeout(initialTimer);
    };
  }, [missingPath, prefersReduced]);

  const runCommand = (cmd: string) => {
    const cleaned = cmd.trim().toLowerCase();
    if (!cleaned) return;

    if (cleaned === 'home') {
      navigate('/');
    } else if (cleaned === 'projects') {
      navigate('/projects');
    } else if (cleaned === 'resume') {
      navigate('/resume');
    } else if (cleaned === 'contact') {
      navigate('/#contact');
    } else if (cleaned === 'blogs' || cleaned === 'notes') {
      navigate('/blogs');
    } else if (cleaned === 'help') {
      setOutputHistory((prev) => [
        ...prev,
        `$ ${cleaned}`,
        'Available commands: home · projects · resume · contact · blogs · help · clear',
      ]);
    } else if (cleaned === 'clear') {
      setOutputHistory([]);
    } else {
      setOutputHistory((prev) => [
        ...prev,
        `$ ${cleaned}`,
        `bash: command not found: ${cleaned}. Type 'help' for options.`,
      ]);
    }
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(inputVal);
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col selection:bg-burnt-orange selection:text-white">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20 px-4 sm:px-6">
        <div className="w-full max-w-2xl text-center space-y-8">
          {/* Serif 404 Headline */}
          <m.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASING }}
            className="space-y-3"
          >
            <h1 className="font-serif text-7xl sm:text-9xl font-normal text-charcoal tracking-tighter select-none">
              404
            </h1>
            <p className="font-serif text-xl sm:text-2xl text-charcoal">
              This page isn't{' '}
              <span className="italic text-burnt-orange font-normal">
                built
              </span>{' '}
              yet.
            </p>
          </m.div>

          {/* Always-dark terminal card */}
          <m.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.15, ease: EASING }}
            className="bg-[#1E1E1E] text-white/90 rounded-[8px] p-5 sm:p-6 shadow-2xl border border-white/10 text-left font-mono text-xs sm:text-sm leading-relaxed backdrop-blur-md"
          >
            {/* Terminal Window Dots */}
            <div className="flex items-center space-x-1.5 mb-4 select-none pb-2 border-b border-white/10" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
              <span className="ml-2 text-[11px] text-white/40 flex items-center gap-1">
                <TerminalIcon className="w-3 h-3" />
                <span>bash — 404 error</span>
              </span>
            </div>

            {/* Terminal typed lines */}
            <div className="space-y-1.5 text-white/80">
              {typedLines.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    idx === 1
                      ? 'text-rose-400 font-semibold'
                      : idx === 2
                        ? 'text-burnt-orange'
                        : 'text-emerald-400'
                  }
                >
                  {line}
                </div>
              ))}
              {!typingDone && (
                <div className="text-emerald-400">
                  {currentLineText}
                  <span className="inline-block w-1.5 h-3.5 bg-burnt-orange ml-0.5 animate-pulse" />
                </div>
              )}

              {/* User output history */}
              {outputHistory.map((line, idx) => (
                <div
                  key={`hist-${idx}`}
                  className={line.startsWith('$') ? 'text-white/90' : 'text-white/60'}
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Interactive Command Input */}
            <form onSubmit={handleSubmit} className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
              <span className="text-emerald-400 select-none">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type 'home', 'projects', 'resume'..."
                aria-label="Terminal command"
                autoFocus
                className="flex-grow bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder:text-white/30"
              />
              <button
                type="submit"
                aria-label="Run command"
                className="p-1 text-white/40 hover:text-burnt-orange transition-colors cursor-pointer"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Tappable Touch Chips */}
            <m.div
              variants={prefersReduced ? undefined : staggerContainerVariants(0.06, 0.3)}
              initial={prefersReduced ? false : "hidden"}
              animate="visible"
              className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 flex-wrap text-xs"
            >
              <span className="text-white/40 text-[11px] select-none">Quick jump:</span>
              {(['home', 'projects', 'resume', 'contact', 'blogs'] as const).map((cmd) => (
                <m.button
                  key={cmd}
                  variants={prefersReduced ? undefined : { hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={prefersReduced ? undefined : { scale: 1.05 }}
                  whileTap={prefersReduced ? undefined : { scale: 0.95 }}
                  type="button"
                  onClick={() => runCommand(cmd)}
                  className="px-2 py-1 rounded bg-white/10 hover:bg-burnt-orange hover:text-white text-white/80 transition-colors font-mono cursor-pointer"
                >
                  {cmd}
                </m.button>
              ))}
            </m.div>
          </m.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;

