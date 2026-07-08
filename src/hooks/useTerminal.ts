import { useState, useRef, useEffect } from 'react';

export function useTerminal() {
  const [startupLogs, setStartupLogs] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(true);
  const [history, setHistory] = useState<string[]>(["welcome"]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [pointer, setPointer] = useState(-1);

  const terminalInputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollTop = terminalEndRef.current.scrollHeight;
    }
  }, [history, startupLogs, inputVal]);

  const handleTerminalClick = () => {
    if (terminalInputRef.current) {
      terminalInputRef.current.focus();
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = inputVal.trim();
    if (!cleanInput) return;

    if (cleanInput.toLowerCase() === "clear") {
      setHistory([]);
      setStartupLogs([]);
    } else {
      setHistory(prev => [...prev, cleanInput]);
    }

    setCmdHistory(prev => [cleanInput, ...prev]);
    setInputVal("");
    setPointer(-1);
  };

  const handleTerminalKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (pointer + 1 < cmdHistory.length) {
        const nextPointer = pointer + 1;
        setPointer(nextPointer);
        setInputVal(cmdHistory[nextPointer]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (pointer > 0) {
        const nextPointer = pointer - 1;
        setPointer(nextPointer);
        setInputVal(cmdHistory[nextPointer]);
      } else if (pointer === 0) {
        setPointer(-1);
        setInputVal("");
      }
    }
  };

  return {
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
  };
}
