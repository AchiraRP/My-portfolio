import React from 'react';
import { renderCommandOutput, cmdSectionMap, headerSectionMap } from '../../services/terminalService';
import { useTerminal } from '../../hooks/useTerminal';

interface TerminalWindowProps {
  onSectionChange: (section: string) => void;
}

export function TerminalWindow({ onSectionChange }: TerminalWindowProps) {
  const {
    startupLogs,
    isReady,
    history,
    inputVal,
    setInputVal,
    terminalInputRef,
    terminalEndRef,
    handleTerminalClick,
    handleCommandSubmit,
    handleTerminalKeyDown
  } = useTerminal();

  // Parse plain-text command output into highlighted, linked JSX
  const renderTerminalText = (text: string, cmd: string) => {
    const targetSection = cmdSectionMap[cmd.trim().toLowerCase()];
    const lines = text.split('\n');
    return (
      <>
        {lines.map((line, i) => {
          // [SECTION HEADER] — bright primary + bold, clickable if section known
          if (/^\[.+\]$/.test(line.trim())) {
            const dest = headerSectionMap[line.trim()];
            if (dest) {
              return (
                <button
                  key={i}
                  onClick={() => onSectionChange(dest)}
                  className="block text-left text-primary font-bold tracking-wider mt-1 hover:brightness-125 transition-all cursor-pointer"
                >
                  {line} <span className="text-primary/50 text-[10px] font-normal no-underline ml-1">↗ go to section</span>
                </button>
              );
            }
            return (
              <div key={i} className="text-primary font-bold tracking-wider mt-1">{line}</div>
            );
          }
          // Numbered list items: "1. Title" — link to command's target section
          if (/^\d+\.\s/.test(line.trim())) {
            const match = line.match(/^(\d+\.\s)(.+)$/);
            if (targetSection) {
              return (
                <button
                  key={i}
                  onClick={() => onSectionChange(targetSection)}
                  className="flex items-baseline gap-0.5 mt-2 group cursor-pointer w-full text-left"
                >
                  <span className="text-primary font-bold">{match?.[1]}</span>
                  <span className="text-primary font-semibold group-hover:brightness-125 transition-all">
                    {match?.[2]}
                  </span>
                  <span className="text-primary/40 text-[10px] ml-1 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </button>
              );
            }
            return (
              <div key={i} className="mt-2">
                <span className="text-primary font-bold">{match?.[1]}</span>
                <span className="text-primary font-semibold">{match?.[2]}</span>
              </div>
            );
          }
          // Category headings ending with colon: "Cybersecurity:", "TryHackMe:"
          if (/^[A-Za-z][\w\s&\/()]+:$/.test(line.trim()) && !line.trim().startsWith('•')) {
            return (
              <div key={i} className="text-primary font-semibold mt-3">{line}</div>
            );
          }
          // Tool/key-value lines like "Network Analysis: Wireshark"
          if (/^[A-Za-z][\w\s&\/()]+:\s.+/.test(line.trim()) && !line.trim().startsWith('•')) {
            const colonIdx = line.indexOf(':');
            return (
              <div key={i} className="mt-1">
                <span className="text-primary font-semibold">{line.slice(0, colonIdx + 1)}</span>
                <span className="text-green-dark">{line.slice(colonIdx + 1)}</span>
              </div>
            );
          }
          // Bullet points
          if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
            return <div key={i} className="text-green-dark pl-2">{line}</div>;
          }
          // Status keyword highlights
          if (/COMPLETED|IN PROGRESS|ACTIVE|LOADED|CLEAN|LOW|AUTHORIZED/.test(line)) {
            const parts = line.split(/(COMPLETED|IN PROGRESS|ACTIVE|LOADED|CLEAN|LOW|AUTHORIZED)/);
            return (
              <div key={i} className="text-green-dark">
                {parts.map((part, pi) =>
                  /COMPLETED|IN PROGRESS|ACTIVE|LOADED|CLEAN|LOW|AUTHORIZED/.test(part)
                    ? <span key={pi} className="text-primary font-bold">{part}</span>
                    : part
                )}
              </div>
            );
          }
          // Empty spacer
          if (line.trim() === '') return <div key={i} className="h-2" />;
          // Default body text
          return <div key={i} className="text-green-dark">{line}</div>;
        })}
      </>
    );
  };

  return (
    <div className="cyber-border bg-black-light/50 rounded-lg p-8">
      <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-primary/20">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-primary"></div>
        <span className="ml-4 font-mono text-sm text-muted-foreground">terminal.app</span>
      </div>

      <div 
        onClick={handleTerminalClick}
        className="text-left space-y-2 font-mono h-80 overflow-y-auto custom-scrollbar select-text cursor-text relative"
        ref={terminalEndRef}
      >
        {/* Startup logs */}
        {startupLogs.map((log, i) => (
          <div key={i} className="text-green-dark">{log}</div>
        ))}
      
        {/* Command History */}
        {isReady && history.map((cmd, idx) => (
          <div key={idx} className="space-y-1">
            <div className="text-primary">
              <span className="text-muted-foreground">$</span> {cmd}
            </div>
            <div className="mb-3 leading-relaxed">
              {renderTerminalText(renderCommandOutput(cmd), cmd)}
            </div>
          </div>
        ))}
      
        {/* Active Input Line */}
        {isReady && (
          <form onSubmit={handleCommandSubmit} className="flex items-center text-primary mt-1">
            <span className="text-muted-foreground mr-2">$</span>
            <input
              ref={terminalInputRef}
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={handleTerminalKeyDown}
              className="flex-grow bg-transparent border-none outline-none text-primary font-mono select-text"
              autoComplete="off"
              spellCheck={false}
              autoFocus
            />
          </form>
        )}
      </div>
    </div>
  );
}
