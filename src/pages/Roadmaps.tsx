import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRoadmaps } from '../services/sanityService';
import type { SanityRoadmap } from '../types/roadmap';
import { Map, Clock, ArrowRight } from 'lucide-react';

export default function Roadmaps() {
  const [roadmaps, setRoadmaps] = useState<SanityRoadmap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoadmaps().then((data) => {
      setRoadmaps(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-primary animate-pulse">
        Loading roadmaps...
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-block cyber-border bg-black-light/50 rounded px-6 py-3 mb-4">
            <h2 className="font-mono text-primary">ROADMAPS.EXE</h2>
          </div>
          <p className="font-mono text-muted-foreground max-w-2xl mx-auto">
            Explore my learning journey and career progression through interactive roadmaps.
            Select a path to see the phases, certifications, and skills I've acquired.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map((roadmap) => (
            <Link
              key={roadmap._id}
              to={`/roadmaps/${roadmap.slug.current}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.3)] hover:-translate-y-1"
            >
              <div>
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/20 p-3 text-primary">
                  {/* If icon exists use it, else fallback */}
                  <Map size={24} />
                </div>
                <h3 className="mb-2 text-xl font-bold">{roadmap.title}</h3>
                {roadmap.description && (
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                    {roadmap.description}
                  </p>
                )}
              </div>
              
              <div className="mt-6 flex items-center justify-between border-t border-primary/10 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{roadmap.estimatedDuration || 'Ongoing'}</span>
                </div>
                <div className="flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100 font-mono">
                  Explore <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
          {roadmaps.length === 0 && (
            <div className="col-span-full text-center py-12 border border-dashed border-primary/20 rounded-2xl text-muted-foreground">
              No roadmaps have been added to Sanity yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
