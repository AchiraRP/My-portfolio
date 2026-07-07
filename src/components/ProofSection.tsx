import { useState } from 'react';
import { Award, BadgeCheck, ExternalLink, ChevronRight, Shield, Maximize2, X } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

import { certs, allCerts, platformBadges, allBadges } from '../data/portfolio';

export function ProofSection() {
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [showAllBadges, setShowAllBadges] = useState(false);
  const [certFilter, setCertFilter] = useState('All');
  const [badgeFilter, setBadgeFilter] = useState('All');

  // Derived unique categories
  const certCategories = ['All', 'Cybersecurity', 'AI', 'Networking', 'Programming', 'Incident Response'];
  const badgeCategories = ['All', 'TryHackMe', 'BTLO', 'Internal'];

  // Helper to render a single cert card
  const renderCertCard = (cert: CertItem, idx: number) => (
    <Card
      key={idx}
      className="cyber-border bg-black-light/30 border-primary/20 hover:border-primary/50 transition-all duration-300 p-5 flex flex-col relative group overflow-hidden"
    >
      {/* Existing Card Content */}
      <div className="flex items-center justify-between mb-3 z-0 relative">
        <span
          className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
            cert.status === 'COMPLETED'
              ? 'border-primary/50 text-primary'
              : 'border-yellow-400/50 text-yellow-400'
          }`}
        >
          {cert.status}
        </span>
        {cert.credentialUrl && (
          <span className="text-primary/50 group-hover:text-primary transition-colors">
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        )}
      </div>

      <div className="flex items-start gap-2 flex-1 z-0 relative">
        <BadgeCheck className={`w-4 h-4 mt-0.5 shrink-0 ${cert.status === 'COMPLETED' ? 'text-primary' : 'text-yellow-400'}`} />
        <div>
          <p className="font-mono text-primary text-sm font-semibold leading-snug mb-1">{cert.title}</p>
          <p className="font-mono text-muted-foreground text-xs">{cert.issuer} · {cert.date}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mt-3 z-0 relative">
        {cert.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="text-[10px] font-mono border-primary/20 text-muted-foreground"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Hover Overlay */}
      {cert.credentialUrl && (
        <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 z-10 backdrop-blur-sm">
          <div className="h-24 w-full flex items-center justify-center mb-4">
            {cert.image && (
              <img src={cert.image} alt={cert.title} className="max-h-full max-w-full object-contain rounded bg-white/5 p-1" />
            )}
          </div>
          <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/20" asChild>
            <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Verify Credential
            </a>
          </Button>
        </div>
      )}
    </Card>
  );

  // Helper to render a single badge card
  const renderBadgeCard = (badge: BadgeItem, idx: number) => (
    <Card
      key={idx}
      className="cyber-border bg-black-light/30 border-primary/20 hover:border-primary/50 transition-all duration-300 p-5 relative group overflow-hidden flex flex-col"
    >
      <div className="flex items-start gap-3 z-0 relative flex-1">
        {/* Emoji icon */}
        <div className="text-2xl w-10 h-10 flex items-center justify-center bg-primary/10 border border-primary/20 rounded shrink-0">
          {badge.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-mono text-[10px] text-muted-foreground">{badge.platform}</span>
            <span
              className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                badge.status === 'EARNED'
                  ? 'border-primary/50 text-primary'
                  : 'border-yellow-400/50 text-yellow-400'
              }`}
            >
              {badge.status}
            </span>
          </div>
          <p className="font-mono text-primary text-xs font-semibold mb-1 leading-snug">{badge.name}</p>
          <p className="font-mono text-muted-foreground text-[11px] leading-relaxed">{badge.description}</p>
        </div>
      </div>
      {/* Progress bar for in-progress badges */}
      {badge.status === 'IN PROGRESS' && (
        <div className="mt-3 h-1 rounded-full bg-primary/10 overflow-hidden z-0 relative">
          <div className="h-full w-[55%] bg-yellow-400/70 rounded-full" />
        </div>
      )}

      {/* Hover Overlay */}
      {badge.credentialUrl && (
        <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 z-10 backdrop-blur-sm">
          <div className="h-20 w-full flex items-center justify-center mb-4">
            {badge.image && (
              <img src={badge.image} alt={badge.name} className="max-h-full max-w-full object-contain rounded bg-white/5 p-1" />
            )}
          </div>
          <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/20" asChild>
            <a href={badge.credentialUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Badge
            </a>
          </Button>
        </div>
      )}
    </Card>
  );
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* Section Header Box */}
        <div className="text-center mb-12">
          <div className="inline-block cyber-border bg-black-light/50 rounded px-6 py-3 mb-4">
            <h2 className="font-mono text-primary">PROOF.DAT</h2>
          </div>
          <p className="font-mono text-muted-foreground max-w-2xl mx-auto">
            Verified certificates, platform badges, and earned achievements
          </p>
        </div>

        {/* Certificates */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-4">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              <h3 className="font-mono text-primary font-bold text-sm tracking-widest">CERTIFICATES.LOG</h3>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {certCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCertFilter(cat)}
                  className={`font-mono text-[10px] px-2 py-1 rounded border transition-colors ${
                    certFilter === cat 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'border-primary/30 text-muted-foreground hover:border-primary hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certs
              .filter(cert => {
                if (cert.isMoreLink) return true; // Always show View More card in grid
                if (certFilter === 'All') return true;
                return cert.tags.some(t => t.toLowerCase().includes(certFilter.toLowerCase()));
              })
              .map((cert, idx) => {
              if (cert.isMoreLink) {
                return (
                  <button
                    key={idx}
                    onClick={() => setShowAllCerts(true)}
                    className="cyber-border bg-primary/10 border-primary/30 hover:bg-primary/20 hover:border-primary/70 transition-all duration-300 p-5 flex flex-col items-center justify-center text-center group cursor-pointer w-full h-full"
                  >
                    <Maximize2 className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <p className="font-mono text-primary font-bold">{cert.title}</p>
                    <p className="font-mono text-primary/70 text-xs mt-1">{cert.issuer}</p>
                  </button>
                );
              }
              return renderCertCard(cert, idx);
            })}
          </div>
        </div>

        {/* Platform Badges */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <h3 className="font-mono text-primary font-bold text-sm tracking-widest">PLATFORM_BADGES.LOG</h3>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {badgeCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setBadgeFilter(cat)}
                  className={`font-mono text-[10px] px-2 py-1 rounded border transition-colors ${
                    badgeFilter === cat 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'border-primary/30 text-muted-foreground hover:border-primary hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {platformBadges
              .filter(badge => {
                if (badge.isMoreLink) return true; // Always show View More card in grid
                if (badgeFilter === 'All') return true;
                return badge.platform === badgeFilter;
              })
              .map((badge, idx) => {
              if (badge.isMoreLink) {
                return (
                  <button
                    key={idx}
                    onClick={() => setShowAllBadges(true)}
                    className="cyber-border bg-primary/10 border-primary/30 hover:bg-primary/20 hover:border-primary/70 transition-all duration-300 p-5 flex flex-col items-center justify-center text-center group cursor-pointer w-full h-full"
                  >
                    <Maximize2 className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <p className="font-mono text-primary font-bold">{badge.name}</p>
                    <p className="font-mono text-primary/70 text-[11px] mt-1">{badge.description}</p>
                  </button>
                );
              }
              return renderBadgeCard(badge, idx);
            })}
          </div>
        </div>

        {/* Terminal footer */}
        <div className="mt-10 cyber-border bg-black-light/20 border-primary/10 rounded p-4">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <ChevronRight className="w-3 h-3 text-primary" />
            <span>
              Verified credentials updated as of 2025. More certifications in progress.
            </span>
          </div>
        </div>

        {/* Modal: All Certificates */}
        {showAllCerts && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAllCerts(false)}>
            <div className="cyber-border bg-black-light rounded-lg max-w-5xl w-full max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="p-4 border-b border-primary/20 flex justify-between items-center bg-black/50 rounded-t-lg shrink-0">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  <h3 className="font-mono text-primary text-lg">ALL_CERTIFICATES.LOG</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowAllCerts(false)} className="text-primary hover:bg-primary/10">
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                {/* Modal Cert Filters */}
                <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-primary/10">
                  {certCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCertFilter(cat)}
                      className={`font-mono text-[10px] px-2 py-1 rounded border transition-colors ${
                        certFilter === cat 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'border-primary/30 text-muted-foreground hover:border-primary hover:text-primary'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allCerts
                    .filter(cert => certFilter === 'All' || cert.tags.some(t => t.toLowerCase().includes(certFilter.toLowerCase())))
                    .map((cert, idx) => renderCertCard(cert, idx))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: All Badges */}
        {showAllBadges && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAllBadges(false)}>
            <div className="cyber-border bg-black-light rounded-lg max-w-5xl w-full max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="p-4 border-b border-primary/20 flex justify-between items-center bg-black/50 rounded-t-lg shrink-0">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="font-mono text-primary text-lg">ALL_PLATFORM_BADGES.LOG</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowAllBadges(false)} className="text-primary hover:bg-primary/10">
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                {/* Modal Badge Filters */}
                <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-primary/10">
                  {badgeCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setBadgeFilter(cat)}
                      className={`font-mono text-[10px] px-2 py-1 rounded border transition-colors ${
                        badgeFilter === cat 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'border-primary/30 text-muted-foreground hover:border-primary hover:text-primary'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allBadges
                    .filter(badge => badgeFilter === 'All' || badge.platform === badgeFilter)
                    .map((badge, idx) => renderBadgeCard(badge, idx))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
