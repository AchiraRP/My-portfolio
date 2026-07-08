import { ChevronRight, Shield, Brain, Code, Network, Terminal, Database } from 'lucide-react';

import { skillGroups, certBadges } from '../../constants/portfolio';

export function SkillsSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* Section Header Box */}
        <div className="text-center mb-12">
          <div className="inline-block cyber-border bg-black-light/50 rounded px-6 py-3 mb-4">
            <h2 className="font-mono text-primary">SKILLS.DLL</h2>
          </div>
          <p className="font-mono text-muted-foreground max-w-2xl mx-auto">
            Technical capabilities across cybersecurity, development, and machine learning
          </p>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.title} className="cyber-border bg-black-light/30 border-primary/20 rounded-lg p-5">
                {/* Card header */}
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-primary/20">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="font-mono text-primary text-sm font-bold">{group.title}</span>
                </div>
                {/* Skill bars */}
                <div className="space-y-3">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between font-mono text-xs mb-1">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <ChevronRight className="w-3 h-3 text-primary" />
                          {skill.name}
                        </span>
                        <span className="text-primary">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-primary/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-700"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications / Badges */}
        <div className="cyber-border bg-black-light/30 border-primary/20 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-primary/20">
            <span className="font-mono text-primary text-sm font-bold">
              <ChevronRight className="w-4 h-4 inline mr-1" />
              CERTIFICATIONS.LOG
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certBadges.map((cert) => (
              <div
                key={cert.name}
                className="flex items-center justify-between font-mono text-xs border border-primary/20 rounded px-4 py-2 hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <span className="text-muted-foreground">{cert.name}</span>
                <span className={`ml-2 flex-shrink-0 ${cert.status === 'COMPLETED' ? 'text-primary' : 'text-yellow-400'}`}>
                  {cert.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
