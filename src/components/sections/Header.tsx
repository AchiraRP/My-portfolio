import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Terminal, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: 'home', label: 'home.exe' },
  { id: 'about', label: 'about.sys' },
  { id: 'proof', label: 'proof.dat' },
  { id: 'projects', label: 'projects.log' },
  { id: 'blogs', label: 'blogs.md' },
  { id: 'contact', label: 'contact.sh' }
];

export function Header({ activeSection, onSectionChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black-deep/80 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Terminal className="w-6 h-6 text-primary hidden sm:block" />
            <span className="font-mono text-primary terminal-cursor">achira@portfolio</span>
          </div>

          {/* Desktop Navigation & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-1">
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
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="text-primary hover:bg-primary/10"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="text-primary hover:bg-primary/10"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            )}
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
  );
}