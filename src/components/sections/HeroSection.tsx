import { useEffect, useState, useRef } from 'react';
import { Button } from '../ui/button';
import { ChevronDown, Code, Terminal } from 'lucide-react';
import { TerminalWindow } from '../shared/TerminalWindow';

interface HeroSectionProps {
  onSectionChange: (section: string) => void;
}

export function HeroSection({ onSectionChange }: HeroSectionProps) {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    const handleStartTour = () => {
      setTimeout(() => setShowTour(true), 600);
    };

    window.addEventListener('start-terminal-tour', handleStartTour);

    const hasSeenThemeTour = localStorage.getItem('theme-tour-seen');
    const hasSeenTerminalTour = localStorage.getItem('terminal-tour-seen');
    if (hasSeenThemeTour && !hasSeenTerminalTour) {
      handleStartTour();
    }

    return () => window.removeEventListener('start-terminal-tour', handleStartTour);
  }, []);

  const dismissTour = () => {
    setShowTour(false);
    localStorage.setItem('terminal-tour-seen', 'true');
  };

  useEffect(() => {
    if (showTour) {
      const handleInteraction = () => dismissTour();
      const handleScroll = () => {
        if (scrollIndicatorRef.current) {
          const rect = scrollIndicatorRef.current.getBoundingClientRect();
          // Dismiss when scroll_down() reaches near the top of the screen
          if (rect.top <= 150) {
            dismissTour();
          }
        }
      };

      window.addEventListener('click', handleInteraction);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [showTour]);

  return (
    <section className="min-h-screen flex flex-col justify-center relative matrix-bg pt-28 pb-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Terminal Window */}
          {showTour && (
            <div className="absolute inset-0 z-40 bg-background/60 backdrop-blur-sm transition-all" />
          )}
          <div className={`relative mb-12 group transition-all duration-500 ${showTour ? 'z-50 ring-2 ring-primary ring-offset-4 ring-offset-background rounded-lg' : 'z-10'}`}>
            
            {/* Terminal Tour Overlay */}
            {showTour && (
              <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-black-deep border border-primary/50 p-5 rounded shadow-2xl z-50 w-[90%] max-w-[340px] animate-fade-in pointer-events-auto">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-primary/50" />
                <div className="flex items-center gap-2 mb-2 text-primary font-bold text-lg">
                  <Terminal className="w-5 h-5" />
                  <span>TERMINAL.APP</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  Type commands like <span className="text-primary font-bold">help</span>, <span className="text-primary font-bold">about</span>, or <span className="text-primary font-bold">projects</span> to navigate the site like a real geek, or simply scroll down to navigate like a normal website.
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); dismissTour(); }}
                  className="w-full text-center text-primary hover:text-primary/80 border border-primary/40 rounded px-3 py-2 transition-all hover:bg-primary/10 font-bold text-sm tracking-wide"
                >
                  Start ✓
                </button>
              </div>
            )}

            <TerminalWindow onSectionChange={onSectionChange} />
          </div>
        </div>

        {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <Button
              onClick={() => onSectionChange('about')}
              className="cyber-border bg-black-light hover:bg-primary/10 text-primary border-primary p-6 h-auto flex flex-col items-center space-y-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              variant="outline"
            >
              <Code className="w-8 h-8" />
              <span>./about.sys</span>
              <span className="text-xs text-muted-foreground">Analyst Background</span>
            </Button>

            <Button
              onClick={() => onSectionChange('projects')}
              className="cyber-border bg-black-light hover:bg-primary/10 text-primary border-primary p-6 h-auto flex flex-col items-center space-y-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              variant="outline"
            >
              <Code className="w-8 h-8" />
              <span>./projects.log</span>
              <span className="text-xs text-muted-foreground">Portfolio Projects</span>
            </Button>

            <Button
              onClick={() => onSectionChange('blogs')}
              className="cyber-border bg-black-light hover:bg-primary/10 text-primary border-primary p-6 h-auto flex flex-col items-center space-y-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              variant="outline"
            >
              <Code className="w-8 h-8" />
              <span>./blogs.md</span>
              <span className="text-xs text-muted-foreground">Blogs & Writeups</span>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div ref={scrollIndicatorRef} className="flex flex-col items-center space-y-2 text-primary animate-bounce">
            <span className="font-mono text-sm">scroll_down()</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  );
}