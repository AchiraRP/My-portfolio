import { useMemo, useCallback, lazy, Suspense, useState, useEffect } from 'react';
import { Header } from './components/sections/Header';
import { HeroSection } from './components/sections/HeroSection';

const PortfolioGrid = lazy(() => import('./components/sections/PortfolioGrid').then(m => ({ default: m.PortfolioGrid })));
const ContactSection = lazy(() => import('./components/sections/ContactSection').then(m => ({ default: m.ContactSection })));
const AboutSection = lazy(() => import('./components/sections/AboutSection').then(m => ({ default: m.AboutSection })));
const ProofSection = lazy(() => import('./components/sections/ProofSection').then(m => ({ default: m.ProofSection })));
const BlogsSection = lazy(() => import('./components/sections/BlogsSection').then(m => ({ default: m.BlogsSection })));

import { portfolioData } from './constants/portfolio';
import { sectionIds } from './constants';
import { useActiveSection } from './hooks/useActiveSection';
import { getProjects } from './services/sanityService';
import type { PortfolioItem } from './types';

export default function App() {
  const activeSection = useActiveSection(sectionIds);
  const [projects, setProjects] = useState<PortfolioItem[]>(portfolioData.projects);

  useEffect(() => {
    getProjects()
      .then(data => {
        if (data && data.length > 0) setProjects(data);
      })
      .catch(err => console.error("Failed to load projects from Sanity:", err));
  }, []);

  // Smooth-scroll to section when nav link clicked
  const handleSectionChange = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  }, []);

  const matrixBackground = useMemo(() => {
    return Array.from({ length: 15000 }, () => (Math.random() > 0.5 ? '1' : '0')).join(' ');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Matrix-style background effect */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none opacity-5 overflow-hidden select-none z-0">
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
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-mono text-primary animate-pulse">Loading about...</div>}>
            <AboutSection />
          </Suspense>
        </section>

        <div className="border-t border-primary/10" />

        <section id="proof" className="pt-20">
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-mono text-primary animate-pulse">Loading proof...</div>}>
            <ProofSection />
          </Suspense>
        </section>

        <div className="border-t border-primary/10" />

        <section id="projects" className="pt-20">
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-mono text-primary animate-pulse">Loading projects...</div>}>
            <PortfolioGrid items={projects} type="projects" />
          </Suspense>
        </section>

        <div className="border-t border-primary/10" />

        <section id="blogs" className="pt-20">
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-mono text-primary animate-pulse">Loading blogs...</div>}>
            <BlogsSection />
          </Suspense>
        </section>

        <div className="border-t border-primary/10" />

        <section id="contact" className="pt-20">
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-mono text-primary animate-pulse">Loading contact...</div>}>
            <ContactSection />
          </Suspense>
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