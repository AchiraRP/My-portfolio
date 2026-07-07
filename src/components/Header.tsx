import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Terminal, Menu, X, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const themes = [
  {
    id: 'dark',
    name: 'Hacker Green',
    color: 'bg-[#00ff41]',
    border: '',
    ring: 'ring-[#00ff41]',
  },
  {
    id: 'light',
    name: 'Ghost White',
    color: 'bg-white',
    border: 'border border-gray-300',
    ring: 'ring-gray-400',
  },
  {
    id: 'monochrome',
    name: 'Monochrome Dark',
    color: 'bg-[#222222]',
    border: 'border border-gray-600',
    ring: 'ring-gray-400',
  },
];

export function Header({ activeSection, onSectionChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const hasSeenTour = localStorage.getItem('theme-tour-seen');
    if (!hasSeenTour) {
      const timer = setTimeout(() => setShowTour(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissTour = () => {
    setShowTour(false);
    localStorage.setItem('theme-tour-seen', 'true');
    window.dispatchEvent(new Event('start-terminal-tour'));
  };

  const sections = [
    { id: 'home', label: 'home.exe' },
    { id: 'about', label: 'about.sys' },
    { id: 'proof', label: 'proof.dat' },
    { id: 'projects', label: 'projects.log' },
    { id: 'blogs', label: 'blogs.md' },
    { id: 'contact', label: 'contact.sh' }
  ];

  return (
    <>
      {/* Full-page tour overlay — blurs everything behind, click to dismiss */}
      {showTour && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm animate-fade-in cursor-pointer"
          onClick={dismissTour}
        />
      )}

      <header
        className="fixed top-0 left-0 right-0 bg-black-deep/80 backdrop-blur-sm border-b border-primary/20"
        style={{ zIndex: showTour ? 110 : 50 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between relative">

            {/* Theme Dot Controls */}
            {mounted && (
              <div
                className="absolute left-0 flex items-center space-x-2"
                style={{ zIndex: 120 }}
              >
                {/* Glow halo behind dots during tour */}
                {showTour && (
                  <div className="absolute -inset-4 rounded-full bg-primary/15 border border-primary/40 animate-pulse pointer-events-none" />
                )}

                {/* Tour tooltip card */}
                {showTour && (
                  <div
                    className="absolute top-9 left-0 w-64 font-mono text-xs rounded-lg border border-primary/50 bg-black-deep shadow-2xl shadow-primary/20 p-3 animate-fade-in"
                    style={{ zIndex: 130 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Upward arrow */}
                    <div className="absolute -top-2 left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-primary/50" />

                    <div className="flex items-center gap-2 mb-2 text-primary font-bold">
                      <Monitor className="w-3 h-3" />
                      <span>3 THEME MODES</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      Use these dots to switch between interface themes.
                    </p>
                    <div className="space-y-1.5 mb-3">
                      {themes.map((t) => (
                        <div key={t.id} className="flex items-center gap-2 text-muted-foreground">
                          <span className={`w-2.5 h-2.5 rounded-full inline-block flex-shrink-0 ${t.color} ${t.border}`} />
                          <span>{t.name}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={dismissTour}
                      className="w-full text-center text-primary hover:text-primary/80 border border-primary/40 rounded px-2 py-1.5 transition-all hover:bg-primary/10 font-bold"
                    >
                      Got it! ✓
                    </button>
                  </div>
                )}

                {/* The three dots */}
                {themes.map((t) => (
                  <div key={t.id} className="relative">
                    <button
                      onClick={() => { setTheme(t.id); dismissTour(); }}
                      onMouseEnter={() => setHoveredDot(t.id)}
                      onMouseLeave={() => setHoveredDot(null)}
                      className={`
                        w-3.5 h-3.5 rounded-full transition-all duration-200 hover:scale-125
                        ${t.color} ${t.border}
                        ${theme === t.id
                          ? `ring-2 ${t.ring} ring-offset-1 ring-offset-background`
                          : 'opacity-70 hover:opacity-100'}
                        ${showTour ? 'scale-125 opacity-100' : ''}
                      `}
                      aria-label={t.name}
                    />
                    {/* Hover label (hidden while tour is active) */}
                    {!showTour && hoveredDot === t.id && (
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] bg-black-deep border border-primary/30 text-primary rounded px-2 py-1 shadow-lg pointer-events-none animate-fade-in z-50">
                        {t.name}
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-primary/30" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Logo — fades during tour */}
            <div className={`flex items-center space-x-2 pl-20 transition-opacity duration-300 ${showTour ? 'opacity-0' : ''}`}>
              <Terminal className="w-6 h-6 text-primary hidden sm:block" />
              <span className="font-mono text-primary terminal-cursor">achira@portfolio</span>
            </div>

            {/* Desktop Navigation — fades during tour */}
            <nav className={`hidden md:flex space-x-1 transition-opacity duration-300 ${showTour ? 'opacity-0' : ''}`}>
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onSectionChange(section.id)}
                  className={`
                    font-mono text-sm transition-all duration-200
                    ${activeSection === section.id
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                      : 'text-primary hover:bg-primary/10 hover:text-primary'
                    }
                  `}
                >
                  ./{section.label}
                </Button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className={`md:hidden flex items-center space-x-2 transition-opacity duration-300 ${showTour ? 'opacity-0' : ''}`}>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 py-4 border-t border-primary/20">
              <div className="space-y-2">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      onSectionChange(section.id);
                      setIsMenuOpen(false);
                    }}
                    className={`
                      w-full justify-start font-mono text-sm
                      ${activeSection === section.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-primary hover:bg-primary/10'
                      }
                    `}
                  >
                    ./{section.label}
                  </Button>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}