import { useMemo, useCallback } from 'react';
import { Header } from './components/sections/Header';
import { HeroSection } from './components/sections/HeroSection';
import { PortfolioGrid } from './components/sections/PortfolioGrid';
import { ContactSection } from './components/sections/ContactSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProofSection } from './components/sections/ProofSection';
import { BlogsSection } from './components/sections/BlogsSection';

import { portfolioData } from './constants/portfolio';
import { sectionIds } from './constants';
import { useActiveSection } from './hooks/useActiveSection';

export default function App() {
  const activeSection = useActiveSection(sectionIds);

  // Smooth-scroll to section when nav link clicked
  const handleSectionChange = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const matrixBackground = useMemo(() => {
    return Array.from({ length: 15000 }, () => (Math.random() > 0.5 ? '1' : '0')).join(' ');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Matrix-style background effect */}
      <div className="fixed inset-0 pointer-events-none opacity-5 overflow-hidden select-none z-0">
        <div className="text-primary font-mono text-xs leading-relaxed break-all h-full w-full">
          {matrixBackground}
        </div>
      </div>

      <Header activeSection={activeSection} onSectionChange={handleSectionChange} />

      <main className="relative z-10">
        {/* Each section has an id anchor and pt-20 to clear the fixed header */}
        <section id="home">
          <HeroSection onSectionChange={handleSectionChange} />
        </section>

        <div className="border-t border-primary/10" />

        <section id="about" className="pt-20">
          <AboutSection />
        </section>

        <div className="border-t border-primary/10" />

        <section id="proof" className="pt-20">
          <ProofSection />
        </section>

        <div className="border-t border-primary/10" />

        <section id="projects" className="pt-20">
          <PortfolioGrid items={portfolioData.projects} type="projects" />
        </section>

        <div className="border-t border-primary/10" />

        <section id="blogs" className="pt-20">
          <BlogsSection />
        </section>

        <div className="border-t border-primary/10" />

        <section id="contact" className="pt-20">
          <ContactSection />
        </section>
      </main>

      <footer className="relative z-10 border-t border-primary/20 py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="font-mono text-muted-foreground text-sm">
            © 2026 Achira Pathiraja
          </p>
          <p className="font-mono text-muted-foreground text-sm mt-1">
            Cybersecurity Student | Aspiring SOC Analyst
          </p>
          <p className="font-mono text-xs text-muted-foreground mt-4">
            System.Status: <span className="text-primary">ONLINE</span> | 
            Current.Focus: <span className="text-primary">Blue Team Operations</span> |
            Threat.Level: <span className="text-primary">MONITORING</span> |
            Build.Version: <span className="text-primary">v1.0.0</span>
          </p>
        </div>
      </footer>
    </div>
  );
}