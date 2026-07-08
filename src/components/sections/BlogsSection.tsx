import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { BookOpen, FileText, ExternalLink, Clock, Tag, ChevronRight, Search } from 'lucide-react';

type PostType = 'blog' | 'writeup' | 'documentation';

import { posts } from '../../constants/portfolio';

const typeConfig: Record<PostType, { label: string; icon: typeof BookOpen; color: string }> = {
  blog: { label: 'BLOG', icon: BookOpen, color: 'text-primary border-primary/40' },
  writeup: { label: 'WRITEUP', icon: FileText, color: 'text-yellow-400 border-yellow-400/40' },
  documentation: { label: 'DOCS', icon: FileText, color: 'text-blue-400 border-blue-400/40' },
};

const filters: Array<'all' | PostType> = ['all', 'blog', 'writeup', 'documentation'];

export function BlogsSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | PostType>('all');
  const [search, setSearch] = useState('');
  const [showAllModal, setShowAllModal] = useState(false);

  const realPosts = posts.filter(p => !p.isMoreLink);
  const displayPosts = realPosts.slice(0, 5);
  const moreLinkItem = posts.find(p => p.isMoreLink);
  if (moreLinkItem) displayPosts.push(moreLinkItem);

  const filteredModalPosts = realPosts.filter((p) => {
    const matchFilter = activeFilter === 'all' || p.type === activeFilter;
    const matchSearch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* Section Header Box */}
        <div className="text-center mb-12">
          <div className="inline-block cyber-border bg-black-light/50 rounded px-6 py-3 mb-4">
            <h2 className="font-mono text-primary">BLOGS.MD</h2>
          </div>
          <p className="font-mono text-muted-foreground max-w-2xl mx-auto">
            Lab writeups, technical blogs, and project documentation from my cybersecurity journey
          </p>
        </div>

        {/* Filter + Search Bar (Moved to Modal) */}
        <div className="flex justify-between items-center mb-8">
           <p className="font-mono text-sm text-primary/70">Showing {displayPosts.length - 1} most recent posts...</p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPosts.map((post, idx) => {
            if (post.isMoreLink) {
              return (
                <button
                  key={post.id}
                  onClick={() => setShowAllModal(true)}
                  className="cyber-border bg-primary/10 border-primary/30 hover:bg-primary/20 hover:border-primary/70 transition-all duration-300 p-5 flex flex-col items-center justify-center text-center group cursor-pointer w-full h-full min-h-[250px]"
                  style={{ animationDelay: `${idx * 0.07}s` }}
                >
                  <BookOpen className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-mono text-primary font-bold text-lg mb-2">{post.title}</h3>
                  <p className="font-mono text-primary/70 text-sm max-w-[80%] mx-auto">{post.summary}</p>
                </button>
              );
            }
            const cfg = typeConfig[post.type];
            const Icon = cfg.icon;
            return (
              <Card
                key={post.id}
                className="cyber-border bg-black-light/30 border-primary/20 hover:border-primary/50 transition-all duration-300 group flex flex-col"
                style={{ animationDelay: `${idx * 0.07}s` }}
              >
                {/* Card top bar */}
                <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-primary/10">
                  <span className={`font-mono text-[10px] border rounded px-1.5 py-0.5 ${cfg.color}`}>
                    {cfg.label}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start gap-2 mb-2">
                    <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <h3 className="font-mono text-primary text-sm leading-snug">{post.title}</h3>
                  </div>
                  <p className="font-mono text-muted-foreground text-xs leading-relaxed mb-3 flex-1">
                    {post.summary}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px] font-mono border-primary/25 text-muted-foreground">
                        <Tag className="w-2 h-2 mr-1" />{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-mono text-[10px] text-muted-foreground">{post.date}</span>
                    <div className="flex gap-2">
                      {post.link && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-[10px] font-mono h-7 px-2 border-primary/30 text-primary hover:bg-primary/10"
                          asChild
                        >
                          <a href={post.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            {post.type === 'documentation' ? 'View on Drive' : 'Read on Medium'}
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Modal: All Blogs */}
        {showAllModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAllModal(false)}>
            <div className="cyber-border bg-black-light rounded-lg max-w-6xl w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="p-4 border-b border-primary/20 flex justify-between items-center bg-black/50 rounded-t-lg shrink-0">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="font-mono text-primary text-lg">ALL_PUBLICATIONS.MD</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowAllModal(false)} className="text-primary hover:bg-primary/10">
                  ✕
                </Button>
              </div>
              
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                {/* Modal Filters & Search */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8 pb-4 border-b border-primary/10">
                  <div className="flex gap-2 flex-wrap">
                    {filters.map((f) => (
                      <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`font-mono text-xs px-3 py-1.5 rounded border transition-all duration-200 ${
                          activeFilter === f
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-primary/30 text-muted-foreground hover:border-primary/60 hover:text-primary'
                        }`}
                      >
                        {f === 'all' ? 'ALL' : typeConfig[f].label}
                      </button>
                    ))}
                  </div>
                  <div className="relative flex-1 max-w-xs sm:ml-auto">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search posts or tags..."
                      className="w-full pl-8 pr-3 py-1.5 font-mono text-xs bg-black-light border border-primary/20 rounded focus:outline-none focus:border-primary text-primary placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredModalPosts.length === 0 && (
                    <div className="col-span-3 text-center font-mono text-muted-foreground py-16">
                      <ChevronRight className="w-6 h-6 mx-auto mb-2 text-primary" />
                      No posts found matching your criteria.
                    </div>
                  )}
                  {filteredModalPosts.map((post, idx) => {
                    const cfg = typeConfig[post.type];
                    const Icon = cfg.icon;
                    return (
                      <Card
                        key={post.id}
                        className="cyber-border bg-black-light/30 border-primary/20 hover:border-primary/50 transition-all duration-300 group flex flex-col"
                      >
                        {/* Card top bar */}
                        <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-primary/10">
                          <span className={`font-mono text-[10px] border rounded px-1.5 py-0.5 ${cfg.color}`}>
                            {cfg.label}
                          </span>
                          <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </div>
                        </div>

                        {/* Body */}
                        <div className="p-4 flex flex-col flex-1">
                          <div className="flex items-start gap-2 mb-2">
                            <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <h3 className="font-mono text-primary text-sm leading-snug">{post.title}</h3>
                          </div>
                          <p className="font-mono text-muted-foreground text-xs leading-relaxed mb-3 flex-1">
                            {post.summary}
                          </p>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-[10px] font-mono border-primary/25 text-muted-foreground">
                                <Tag className="w-2 h-2 mr-1" />{tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between mt-auto">
                            <span className="font-mono text-[10px] text-muted-foreground">{post.date}</span>
                            <div className="flex gap-2">
                              {post.link && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-[10px] font-mono h-7 px-2 border-primary/30 text-primary hover:bg-primary/10"
                                  asChild
                                >
                                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-3 h-3 mr-1" />
                                    {post.type === 'documentation' ? 'View on Drive' : 'Read on Medium'}
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Removed internal Detail Modal as requested */}
      </div>
    </section>
  );
}
