import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { client } from '../lib/sanity';
import type { SanityPhase } from '../types/roadmap';

export default function PhaseDetail() {
  const { slug, phaseSlug } = useParams();
  const [phase, setPhase] = useState<SanityPhase | null>(null);
  const [loading, setLoading] = useState(true);

  // We'll also want to load related projects, blogs, etc.
  const [relatedItems, setRelatedItems] = useState({
    projects: [],
    posts: [],
    badges: [],
    certs: []
  });

  useEffect(() => {
    if (!slug || !phaseSlug) return;
    
    // Quick query to get phase + related items in parallel
    const fetchData = async () => {
      try {
        // Fetch Phase
        let phaseQuery = `*[_type == "phase" && slug.current == $phaseSlug][0]`;
        // Fallback for phaseNumber if slug is a number
        if (!isNaN(Number(phaseSlug))) {
          phaseQuery = `*[_type == "phase" && phaseNumber == ${Number(phaseSlug)} && roadmap->slug.current == $slug][0]`;
        }
        
        const phaseData = await client.fetch(phaseQuery, { phaseSlug, slug });
        setPhase(phaseData);

        if (phaseData) {
          // Fetch related items referencing this phase
          const pId = phaseData._id;
          const [projects, posts, badges, certs] = await Promise.all([
            client.fetch(`*[_type == "project" && phase._ref == $pId]`, { pId }),
            client.fetch(`*[_type == "post" && phase._ref == $pId]`, { pId }),
            client.fetch(`*[_type == "badge" && phase._ref == $pId]`, { pId }),
            client.fetch(`*[_type == "certification" && phase._ref == $pId]`, { pId })
          ]);
          setRelatedItems({ projects, posts, badges, certs });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, phaseSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-primary animate-pulse">
        Loading phase details...
      </div>
    );
  }

  if (!phase) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-mono text-primary">
        <h2 className="text-2xl mb-4">Phase not found</h2>
        <Link to={`/roadmaps/${slug}`} className="underline hover:text-white">Go back</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to={`/roadmaps/${slug}`} className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors font-mono text-sm">
          <ArrowLeft size={16} className="mr-2" /> Back to Roadmap
        </Link>

        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 mb-12 backdrop-blur-sm">
          <div className="text-primary font-mono text-sm mb-4 font-bold tracking-wider">
            PHASE {phase.phaseNumber}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{phase.title}</h1>
          {phase.description && (
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {phase.description}
            </p>
          )}


        </div>

        {/* Dynamic Sections */}
        <div className="space-y-16">
          {relatedItems.certs.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                🏆 Certifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedItems.certs.map((cert: any) => (
                  <div key={cert._id} className="p-4 border border-primary/20 rounded-xl bg-black/20">
                    {cert.title} - {cert.issuer}
                  </div>
                ))}
              </div>
            </section>
          )}

          {relatedItems.projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                💻 Projects
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedItems.projects.map((proj: any) => (
                  <div key={proj._id} className="p-4 border border-primary/20 rounded-xl bg-black/20">
                    <h3 className="font-bold mb-2">{proj.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {relatedItems.posts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                📝 Documentation & Posts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedItems.posts.map((post: any) => (
                  <div key={post._id} className="p-4 border border-primary/20 rounded-xl bg-black/20">
                    <h3 className="font-bold mb-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.summary}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {relatedItems.badges.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                🏅 Badges
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedItems.badges.map((badge: any) => (
                  <div key={badge._id} className="p-4 border border-primary/20 rounded-xl bg-black/20">
                    {badge.name} - {badge.platform}
                  </div>
                ))}
              </div>
            </section>
          )}

          {Object.values(relatedItems).every(arr => arr.length === 0) && (
            <div className="text-center py-12 text-muted-foreground border border-dashed border-primary/20 rounded-2xl">
              No content has been linked to this phase yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
