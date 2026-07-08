import { User, GraduationCap, Target, MapPin, Clock, Network, ChevronRight, Download } from 'lucide-react';
import { Button } from '../ui/button';


export function AboutSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* Section Header Box */}
        <div className="text-center mb-12">
          <div className="inline-block cyber-border bg-black-light/50 rounded px-6 py-3 mb-4">
            <h2 className="font-mono text-primary">ABOUT.SYS</h2>
          </div>
          <p className="font-mono text-muted-foreground max-w-2xl mx-auto">
            Information Technology undergraduate | Aspiring SOC Analyst | Blue Team Enthusiast
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT SIDE - MAIN CONTENT */}
          <div className="lg:col-span-2">
            <div className="cyber-border bg-black-light/50 rounded-lg p-6 lg:p-8 h-full flex flex-col">
              {/* Window Controls */}
              <div className="flex items-center space-x-2 mb-8 pb-4 border-b border-primary/20">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="ml-4 font-mono text-sm text-primary">about.sys - Analyst Profile</span>
              </div>

              {/* Title & Resume Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h1 className="font-mono text-3xl md:text-4xl text-primary flex items-center">
                  ABOUT ME<span className="animate-pulse">_</span>
                </h1>
                <Button 
                  variant="outline"
                  className="shimmer-btn font-mono border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
                  onClick={() => window.open('/resume', '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </div>

              {/* Subtitle Box */}
              <div className="border border-primary/20 bg-primary/5 p-4 rounded mb-8">
                <p className="font-mono text-primary text-sm">
                  Get to know the analyst behind the keyboard
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-8 flex-grow">
                {/* Text Column */}
                <div className="order-2 md:order-1 flex-1 font-mono text-sm leading-loose text-muted-foreground space-y-6">
                  <div className="space-y-4">
                    <p className="text-lg text-primary border-l-2 border-primary pl-4 bg-primary/5 py-2">
                      <span className="font-bold text-xl">Achira Pathiraja</span> <br/> 
                      Aspiring SOC Analyst & Blue Team Enthusiast
                    </p>
                    <p>
                      Passionate about <span className="text-primary font-bold">Threat Detection, Incident Response, and Digital Forensics</span>. My core focus is understanding how attacks happen to build stronger defenses.
                    </p>
                    <p>
                      Actively learning through real-world simulations on <span className="text-primary font-bold">TryHackMe</span> and <span className="text-primary font-bold">Blue Team Labs Online</span> while exploring the intersection of Cybersecurity and AI.
                    </p>
                  </div>
                  
                  {/* Quick Stats / Focus */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="cyber-border bg-black-deep p-4 rounded-lg text-center hover:shadow-[0_0_10px_rgba(0,255,0,0.1)] transition-all group">
                      <div className="text-primary text-2xl font-bold mb-1 group-hover:scale-105 transition-transform">SOC</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Primary Focus</div>
                    </div>
                    <div className="cyber-border bg-black-deep p-4 rounded-lg text-center hover:shadow-[0_0_10px_rgba(0,255,0,0.1)] transition-all group">
                      <div className="text-primary text-2xl font-bold mb-1 group-hover:scale-105 transition-transform">AI & ML</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Secondary Interest</div>
                    </div>
                  </div>
                </div>

                {/* Profile Card Column */}
                <div className="order-1 md:order-2 w-full md:w-72 shrink-0">
                  <div className="cyber-border bg-black-deep border-primary/40 rounded-lg p-4 group relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,0,0.15)] shadow-[0_0_10px_rgba(0,255,0,0.05)]">
                    {/* Scanline overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.02)_1px,transparent_1px)] bg-[size:4px_4px] opacity-50"></div>
                    
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-primary/30 relative z-10">
                      <span className="font-mono text-primary text-xs flex items-center">
                        <ChevronRight className="w-3 h-3 mr-1" /> analyst.profile
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                    </div>
                    
                    <div className="relative mb-5 border border-primary/30 p-1 rounded group-hover:border-primary/60 transition-colors z-10 bg-black-light overflow-hidden group/img cursor-crosshair">
                      <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,255,0,0.15)] pointer-events-none z-20"></div>
                      
                      <div className="relative rounded overflow-hidden">
                        {/* Base Image (Without Mask) */}
                        <img 
                          src="/profile-without-mask.png" 
                          alt="Achira Pathiraja - Unmasked" 
                          className="w-full h-auto relative z-10 object-cover aspect-square grayscale" 
                        />

                        {/* Scanner Reveal Image (With Mask) */}
                        <div className="absolute top-0 left-0 right-0 z-15 overflow-hidden transition-all duration-[1200ms] ease-in-out h-0 group-hover/img:h-full opacity-90 group-hover/img:opacity-100 bg-black/20">
                          <img 
                            src="/profile-with-mask.png" 
                            alt="Achira Pathiraja - Masked" 
                            className="w-full h-auto object-cover aspect-square grayscale"
                          />
                          {/* Scanner Line Effect */}
                          <div 
                            className="absolute bottom-0 left-0 w-full h-[3px] bg-primary"
                            style={{ boxShadow: '0 0 15px 2px var(--primary)' }}
                          />
                        </div>
                        
                        {/* Theme Color Tint Overlay */}
                        <div
                          className="absolute inset-0 bg-primary/40 pointer-events-none transition-opacity duration-300 z-20 group-hover/img:opacity-20"
                          style={{ mixBlendMode: 'color' }}
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT SIDEBAR - WIDGETS */}
          <div className="space-y-6 flex flex-col">
            
            {/* Widget 1: QUICK INFO */}
            <div className="cyber-border bg-black-light/30 border-primary/20 rounded-lg p-5">
              <div className="flex justify-between items-center mb-5 pb-2 border-b border-primary/20">
                <span className="font-mono text-primary text-sm flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2" /> QUICK INFO
                </span>
                <div className="w-2 h-2 border border-primary"></div>
              </div>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-start">
                  <User className="w-4 h-4 text-primary mr-3 mt-1" />
                  <div>
                    <span className="text-primary">Name:</span> <span className="text-muted-foreground">Achira Pathiraja</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <GraduationCap className="w-4 h-4 text-primary mr-3 mt-1" />
                  <div>
                    <span className="text-primary">Role:</span> <span className="text-muted-foreground">Cybersecurity Student</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Target className="w-4 h-4 text-primary mr-3 mt-1" />
                  <div>
                    <span className="text-primary">Goal:</span> <span className="text-muted-foreground">SOC Analyst</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-primary mr-3 mt-1" />
                  <div>
                    <span className="text-primary">Location:</span> <span className="text-muted-foreground">Sri Lanka</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-4 h-4 text-primary mr-3 mt-1" />
                  <div>
                    <span className="text-primary">Status:</span> <span className="text-muted-foreground">Learning • Investigating • Building</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Network className="w-4 h-4 text-primary mr-3 mt-1" />
                  <div>
                    <span className="text-primary">Connection:</span> <span className="text-muted-foreground">ESTABLISHED (127.0.0.1)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Widget 2: CURRENT FOCUS */}
            <div className="cyber-border bg-black-light/30 border-primary/20 rounded-lg p-5">
              <div className="flex justify-between items-center mb-5 pb-2 border-b border-primary/20">
                <span className="font-mono text-primary text-sm flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2" /> CURRENT FOCUS
                </span>
              </div>
              <ul className="space-y-3 font-mono text-sm text-muted-foreground">
                <li className="flex items-center">
                  <ChevronRight className="w-3 h-3 text-primary mr-2" /> SOC Operations
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-3 h-3 text-primary mr-2" /> Threat Detection
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-3 h-3 text-primary mr-2" /> Log Analysis
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-3 h-3 text-primary mr-2" /> Digital Forensics
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-3 h-3 text-primary mr-2" /> AI & Machine Learning
                </li>
              </ul>
            </div>

            {/* Widget 3: TRAINING STATUS */}
            <div className="cyber-border bg-black-light/30 border-primary/20 rounded-lg p-5">
              <div className="flex justify-between items-center mb-5 pb-2 border-b border-primary/20">
                <span className="font-mono text-primary text-sm flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2" /> TRAINING_STATUS.LOG
                </span>
              </div>
              <div className="space-y-2 font-mono text-sm flex flex-col text-muted-foreground">
                <div className="flex justify-between">
                  <span>TryHackMe</span> <span className="text-primary">ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span>BTLO</span> <span className="text-primary">ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span>Python</span> <span className="text-primary">ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span>Machine Learning</span> <span className="text-primary">ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span>SOC Learning</span> <span className="text-primary">ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Widget 4: SYSTEM STATUS */}
            <div className="cyber-border bg-black-light/30 border-primary/20 rounded-lg p-5">
              <div className="flex justify-between items-center mb-5 pb-2 border-b border-primary/20">
                <span className="font-mono text-primary text-sm flex items-center">
                  <ChevronRight className="w-4 h-4 mr-2" /> SYSTEM STATUS
                </span>
              </div>
              <div className="space-y-2 font-mono text-sm flex flex-col text-muted-foreground">
                <div className="flex justify-between">
                  <span>Analyst Profile</span> <span className="text-primary">LOADED</span>
                </div>
                <div className="flex justify-between">
                  <span>Background Check</span> <span className="text-primary">CLEAN</span>
                </div>
                <div className="flex justify-between">
                  <span>Threat Level</span> <span className="text-primary">LOW</span>
                </div>
                <div className="flex justify-between">
                  <span>Access Status</span> <span className="text-primary">AUTHORIZED</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-6 cyber-border bg-black-light/30 border-primary/20 rounded-lg p-5">
          <div className="font-mono text-sm text-primary mb-2">
            $ cat mission.txt
          </div>
          <div className="font-mono text-muted-foreground text-sm flex flex-col md:flex-row justify-between items-start md:items-center">
            <span className="mb-2 md:mb-0 text-primary">
              Learn. Investigate. Defend. Improve.
            </span>
            <span className="text-green-dark">
              [ End of File ]
            </span>
          </div>
        </div>
        
      </div>
    </section>
  );
}
