import React, { useState, useRef, useEffect } from 'react';
import { profileData } from '../../data/profile';
import { projectsData } from '../../data/projects';
import { handsOnSkills } from '../../data/skills';
import { experienceData } from '../../data/experience';
import { useFinePointer } from '../../hooks/useFinePointer';

interface TerminalOutputItem {
  id: string;
  command: string;
  content: React.ReactNode;
}

export const InteractiveTerminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalOutputItem[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const isFinePointer = useFinePointer();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll output container to bottom on new output
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Track command history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryPointer(-1);

    const cmdLower = trimmed.toLowerCase();
    const itemId = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    if (cmdLower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let outputContent: React.ReactNode;

    switch (cmdLower) {
      case 'help':
        outputContent = (
          <div className="space-y-1 text-[#D4D4D4]">
            <p className="text-[#C94F17] font-semibold">Available commands:</p>
            <p>
              <span className="text-[#9CDCFE]">about</span> ·{' '}
              <span className="text-[#9CDCFE]">projects</span> ·{' '}
              <span className="text-[#9CDCFE]">skills</span> ·{' '}
              <span className="text-[#9CDCFE]">experience</span> ·{' '}
              <span className="text-[#9CDCFE]">contact</span> ·{' '}
              <span className="text-[#9CDCFE]">notes</span> ·{' '}
              <span className="text-[#9CDCFE]">resume</span> ·{' '}
              <span className="text-[#9CDCFE]">github</span> ·{' '}
              <span className="text-[#9CDCFE]">clear</span>
            </p>
            <p className="text-[11px] text-white/50">Bonus: try <span className="text-[#CE9178]">sudo hire mohak</span></p>
          </div>
        );
        break;

      case 'about':
        outputContent = (
          <p className="text-[#D4D4D4]">
            Mohak Agrawal. AI/ML &amp; Full-Stack Developer. B.Tech AIML, expected 2028.
          </p>
        );
        break;

      case 'projects':
        outputContent = (
          <div className="space-y-1.5 text-[#D4D4D4]">
            <p className="text-[#C94F17] font-semibold">Featured &amp; In-Progress Projects:</p>
            {projectsData.map((p) => (
              <div key={p.slug} className="text-xs">
                <span className="text-white font-medium">{p.title}</span>
                <span className="text-white/50"> [{p.status}]</span>: {' '}
                {p.githubUrl ? (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9CDCFE] hover:underline underline-offset-2 break-all"
                  >
                    {p.githubUrl}
                  </a>
                ) : (
                  <span className="text-white/40 italic">Repo private</span>
                )}
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        outputContent = (
          <div className="space-y-1 text-[#D4D4D4]">
            <p className="text-[#C94F17] font-semibold">Applied Technical Competencies:</p>
            {handsOnSkills.map((grp) => (
              <div key={grp.category} className="text-xs">
                <span className="text-[#CE9178] font-medium">{grp.category}:</span>{' '}
                <span className="text-white/80">{grp.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'experience': {
        const rigAi = experienceData.find((e) => e.organization.toLowerCase().includes('rigai'));
        const visionTech = experienceData.find((e) => e.organization.toLowerCase().includes('vision'));

        outputContent = (
          <div className="space-y-1.5 text-[#D4D4D4] text-xs">
            <p className="text-[#C94F17] font-semibold">Work &amp; Engineering Experience:</p>
            <div>
              <p className="text-white font-medium">
                {rigAi ? `${rigAi.role} · ${rigAi.organization}` : 'Software Intern, AI Platforms Engineering · RigAI'}
              </p>
              <p className="text-white/60">Nov 2026 – Present · Remote</p>
            </div>
            <div className="pt-1">
              <p className="text-white font-medium">
                {visionTech ? `${visionTech.role} · ${visionTech.organization}` : 'AI Intern - UC17 · Vision Technology'}
              </p>
              <p className="text-white/60">Nov 2024 – Dec 2024 · Remote</p>
            </div>
          </div>
        );
        break;
      }

      case 'contact':
        outputContent = (
          <div className="space-y-1 text-[#D4D4D4] text-xs">
            <p className="text-[#C94F17] font-semibold">Get In Touch:</p>
            <p>
              Email:{' '}
              <a
                href={`mailto:${profileData.email}`}
                className="text-[#9CDCFE] hover:underline"
              >
                {profileData.email}
              </a>
            </p>
            <p>
              LinkedIn:{' '}
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9CDCFE] hover:underline"
              >
                {profileData.linkedin}
              </a>
            </p>
            <p>
              GitHub:{' '}
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9CDCFE] hover:underline"
              >
                {profileData.github}
              </a>
            </p>
          </div>
        );
        break;

      case 'notes':
        if (typeof window !== 'undefined') {
          window.location.href = '/notes';
        }
        outputContent = (
          <p className="text-[#D4D4D4] text-xs">
            Navigating to Notes &amp; Technical Write-ups...
          </p>
        );
        break;

      case 'resume':
        if (typeof window !== 'undefined') {
          window.open('/Mohak_Agrawal_Resume.pdf', '_blank', 'noopener,noreferrer');
        }
        outputContent = (
          <p className="text-[#D4D4D4]">
            Opening resume in a new tab... (or view at{' '}
            <a
              href="/Mohak_Agrawal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9CDCFE] hover:underline"
            >
              /Mohak_Agrawal_Resume.pdf
            </a>
            )
          </p>
        );
        break;

      case 'github':
        if (typeof window !== 'undefined') {
          window.open(profileData.github, '_blank', 'noopener,noreferrer');
        }
        outputContent = (
          <p className="text-[#D4D4D4]">
            Opening GitHub profile in a new tab... ({profileData.github})
          </p>
        );
        break;

      case 'sudo hire mohak':
        outputContent = (
          <div className="text-[#D4D4D4] space-y-1">
            <p className="text-[#4EC9B0] font-semibold">Permission granted.</p>
            <p>
              Please email{' '}
              <a
                href={`mailto:${profileData.email}`}
                className="text-burnt-orange font-semibold underline underline-offset-2"
              >
                {profileData.email}
              </a>
            </p>
          </div>
        );
        break;

      default:
        outputContent = (
          <p className="text-white/70">
            command not found: <span className="text-[#F44747]">{trimmed}</span>. Type <span className="text-[#9CDCFE]">help</span>.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: itemId,
        command: trimmed,
        content: outputContent,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextPointer =
        historyPointer === -1 ? commandHistory.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextPointer);
      setInputVal(commandHistory[nextPointer]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextPointer = historyPointer + 1;
      if (nextPointer >= commandHistory.length) {
        setHistoryPointer(-1);
        setInputVal('');
      } else {
        setHistoryPointer(nextPointer);
        setInputVal(commandHistory[nextPointer]);
      }
    }
  };

  const commandChips = ['help', 'projects', 'skills', 'contact'];

  return (
    <div className="pt-2 font-mono text-xs sm:text-[13px] leading-relaxed text-[#D4D4D4] space-y-2 border-t border-white/10 mt-2">
      {/* Scrollable Output Area with fixed max-height (about 9 lines) so hero layout never jumps */}
      {history.length > 0 && (
        <div
          ref={scrollContainerRef}
          aria-live="polite"
          aria-atomic="false"
          className="max-h-[140px] sm:max-h-[160px] overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-white/20 select-text"
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-1.5 text-white/60">
                <span className="text-[#C94F17]">mohak@portfolio</span>
                <span className="text-white/40">~ $</span>
                <span className="text-white font-medium">{item.command}</span>
              </div>
              <div className="pl-3 border-l border-burnt-orange/40">{item.content}</div>
            </div>
          ))}
        </div>
      )}

      {/* Real Interactive Prompt Line */}
      <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-1 shrink-0 select-none">
          <span className="text-[#C94F17] font-semibold">mohak@portfolio</span>
          <span className="text-white/40">~ $</span>
        </div>

        <div className="relative flex-grow flex items-center min-w-[120px]">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Terminal command input"
            spellCheck={false}
            autoCapitalize="none"
            autoComplete="off"
            className="w-full bg-transparent text-white focus:outline-none font-mono text-xs sm:text-[13px] caret-burnt-orange py-0.5"
            placeholder=""
          />

          {inputVal === '' && (
            <span
              onClick={() => inputRef.current?.focus()}
              className="absolute left-0 text-white/30 text-[11px] pointer-events-none select-none transition-opacity duration-300"
            >
              type help
            </span>
          )}
        </div>
      </div>

      {/* Mobile/Touch Command Chips */}
      {!isFinePointer && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-white/5">
          <span className="text-[10px] text-white/40 uppercase tracking-wider">Quick:</span>
          {commandChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => executeCommand(chip)}
              className="px-2 py-0.5 text-[11px] bg-white/10 hover:bg-burnt-orange text-white rounded active:scale-95 transition-all"
            >
              {chip}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default InteractiveTerminal;

