import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { getRoadmapBySlug } from '../services/sanityService';
import type { SanityRoadmap, SanityPhase } from '../types/roadmap';

export default function RoadmapDetail() {
  const { slug } = useParams();
  const [roadmap, setRoadmap] = useState<SanityRoadmap | null>(null);
  const [phases, setPhases] = useState<SanityPhase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getRoadmapBySlug(slug).then((data) => {
      setRoadmap(data.roadmap);
      setPhases(data.phases);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-primary animate-pulse">
        Loading roadmap...
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-mono text-primary">
        <h2 className="text-2xl mb-4">Roadmap not found</h2>
        <Link to="/roadmaps" className="underline hover:text-white">Go back</Link>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <Link to="/roadmaps" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors font-mono text-sm">
          <ArrowLeft size={16} className="mr-2" /> Back to Roadmaps
        </Link>
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
            {roadmap.title}
          </h1>
          {roadmap.description && (
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-8">
              {roadmap.description}
            </p>
          )}

          {/* Stats Bar */}
          <div className="flex flex-wrap gap-8 p-6 rounded-2xl bg-primary/5 border border-primary/20 backdrop-blur-sm">
            <div>
              <div className="text-sm text-muted-foreground mb-1 font-mono">Total Phases</div>
              <div className="text-2xl font-bold">{phases.length}</div>
            </div>



          </div>
        </div>

        {/* Timeline */}
        <div className="relative py-10">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent -translate-x-1/2 rounded-full" />

          <div className="space-y-12">
            {phases.length === 0 && (
              <div className="text-center text-muted-foreground border border-dashed border-primary/30 p-12 rounded-2xl bg-primary/5">
                No phases added yet for this roadmap. Add some in Sanity Studio!
              </div>
            )}
            
            {phases.map((phase, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div 
                  key={phase._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center justify-start md:justify-center ${
                    isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary -translate-x-1/2 flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.5)] z-10">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>

                  {/* Spacer for alternating layout (Desktop only) */}
                  <div className="hidden md:block w-1/2 px-8" />

                  {/* Card */}
                  <div className="w-full md:w-1/2 pl-12 pr-4 md:px-8">
                    <Link
                      to={`/roadmaps/${slug}/phase/${phase.slug?.current || phase.phaseNumber}`}
                      className="group block bg-black/40 border border-primary/20 p-6 rounded-2xl hover:bg-primary/5 hover:border-primary/50 transition-all hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.2)] hover:-translate-y-1 relative overflow-hidden"
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="relative z-10">
                        <div className="text-primary font-mono text-sm mb-2 font-bold tracking-wider">
                          PHASE {phase.phaseNumber}
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{phase.title}</h3>
                        
                        {phase.description && (
                          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            {phase.description}
                          </p>
                        )}



                        {/* Dummy Stats for now, will connect to real data later */}
                        <div className="mt-6 pt-4 border-t border-primary/10 flex flex-wrap gap-4 text-xs font-mono text-muted-foreground">
                          <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                            ✓ Explore Phase <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
