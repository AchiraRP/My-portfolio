import { Button } from '../ui/button';
import { ChevronDown, Code } from 'lucide-react';
import { TerminalWindow } from '../shared/TerminalWindow';

interface HeroSectionProps {
  onSectionChange: (section: string) => void;
}

export function HeroSection({ onSectionChange }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex flex-col justify-center relative matrix-bg pt-28 pb-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Terminal Window */}
          <div className="relative mb-12 group transition-all duration-500 z-10">
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
        <div className="flex flex-col items-center space-y-2 text-primary animate-bounce">
          <span className="font-mono text-sm">scroll_down()</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
}