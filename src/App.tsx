import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PortfolioGrid } from './components/PortfolioGrid';
import { ContactSection } from './components/ContactSection';
import { AboutSection } from './components/AboutSection';
import { ProofSection } from './components/ProofSection';
import { BlogsSection } from './components/BlogsSection';

import { portfolioData } from './data/portfolio';

const sectionIds = ['home', 'about', 'proof', 'projects', 'blogs', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Track active section via IntersectionObserver as user scrolls
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Smooth-scroll to section when nav link clicked
  const handleSectionChange = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Matrix-style background effect */}
      <div className="fixed inset-0 pointer-events-none opacity-5 overflow-hidden select-none z-0">
        <div className="text-primary font-mono text-xs leading-relaxed break-all h-full w-full">
          {Array.from({ length: 15000 }, () => (Math.random() > 0.5 ? '1' : '0')).join(' ')}
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