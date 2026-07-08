import { useState, useMemo } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../shared/ImageWithFallback';
import { ExternalLink, Github, Play, Eye, Maximize2, X, Terminal } from 'lucide-react';
import { PortfolioItem } from '../../types';

interface PortfolioGridProps {
  items: PortfolioItem[];
  type: 'projects' | 'labs';
}

const getIcon = (type: 'projects' | 'labs') => {
  switch (type) {
    case 'labs':
      return <Play className="w-4 h-4" />;
    case 'projects':
      return <Eye className="w-4 h-4" />;
    default:
      return <ExternalLink className="w-4 h-4" />;
  }
};

const getTypeLabel = (type: 'projects' | 'labs') => {
  switch (type) {
    case 'projects':
      return 'PROJECTS.LOG';
    case 'labs':
      return 'LABS.SEC';
    default:
      return 'PORTFOLIO';
  }
};

export function PortfolioGrid({ items, type }: PortfolioGridProps) {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [showAllModal, setShowAllModal] = useState(false);
  const [filter, setFilter] = useState('All');

  const { realItems, moreLinkItem, displayItems, allTags } = useMemo(() => {
    const real = items.filter(i => !i.isMoreLink);
    const more = items.find(i => i.isMoreLink);
    const display = real.slice(0, 5);
    if (more) display.push(more);
    const tags = ['All', ...Array.from(new Set(real.flatMap(i => i.tags)))];
    return { realItems: real, moreLinkItem: more, displayItems: display, allTags: tags };
  }, [items]);

  const filteredModalItems = useMemo(() => {
    return realItems.filter(item => 
      filter === 'All' || item.tags.includes(filter)
    );
  }, [realItems, filter]);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block cyber-border bg-black-light/50 rounded px-6 py-3 mb-4">
            <h2 className="font-mono text-primary">{getTypeLabel(type)}</h2>
          </div>
          <p className="font-mono text-muted-foreground max-w-2xl mx-auto">
            {type === 'projects' && 'A collection of cybersecurity, artificial intelligence, software development, and academic projects demonstrating practical problem-solving and continuous learning.'}
            {type === 'labs' && 'Hands-on cybersecurity exercises, investigations, writeups, and practical learning experiences.'}
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item, index) => {
            if (item.isMoreLink) {
              return (
                <button
                  key={item.id}
                  onClick={() => setShowAllModal(true)}
                  className="cyber-border bg-primary/10 border-primary/30 hover:bg-primary/20 hover:border-primary/70 transition-all duration-300 p-5 flex flex-col items-center justify-center text-center group cursor-pointer w-full h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Maximize2 className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-mono text-primary font-bold text-lg mb-2">{item.title}</h3>
                  <p className="font-mono text-primary/70 text-sm max-w-[80%] mx-auto">{item.description}</p>
                </button>
              );
            }

            return (
              <Card
                key={item.id}
                className="cyber-border bg-black-light/30 border-primary/20 hover:border-primary/50 transition-all duration-300 group overflow-hidden flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden shrink-0">
                  {/* Grayscale image — the color overlay below tints it to the theme */}
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110 grayscale"
                  />
                  {/* Theme-color tint: mix-blend-mode:color makes it adopt the primary color */}
                  <div
                    className="absolute inset-0 bg-primary/40 mix-blend-color pointer-events-none transition-opacity duration-300 group-hover:opacity-60"
                    style={{ mixBlendMode: 'color' }}
                  />
                  {/* Dark scanline overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Hover action buttons */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4 z-10 backdrop-blur-sm">
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 w-36"
                      onClick={() => setSelectedItem(item)}
                    >
                      {getIcon(type)}
                      <span className="ml-2">View Details</span>
                    </Button>
                    
                    {item.links?.live && (
                      <Button size="sm" variant="outline" className="border-primary/50 text-primary hover:bg-primary/20 w-36" asChild>
                        <a href={item.links.live} target="_blank" rel="noopener noreferrer">
                          <Play className="w-4 h-4 mr-2" />
                          Watch Demo
                        </a>
                      </Button>
                    )}
                    
                    {item.links?.github && (
                      <Button size="sm" variant="outline" className="border-primary/50 text-primary hover:bg-primary/20 w-36" asChild>
                        <a href={item.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub Code
                        </a>
                      </Button>
                    )}
                  </div>

                  {/* Terminal-style index badge */}
                  <div className="absolute top-2 left-2">
                    <div className="bg-background/80 backdrop-blur-sm border border-primary/20 rounded px-2 py-1">
                      <span className="font-mono text-xs text-primary">#{String(index + 1).padStart(2, '0')}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-mono text-primary mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3 font-mono flex-1">{item.description}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs font-mono border-primary/30 text-green-dark"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {item.links && (
                    <div className="flex space-x-2 mt-auto">
                      {item.links.live && (
                        <Button size="sm" variant="outline" className="text-xs font-mono border-primary/30 text-primary" asChild>
                          <a href={item.links.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />Live
                          </a>
                        </Button>
                      )}
                      {item.links.github && (
                        <Button size="sm" variant="outline" className="text-xs font-mono border-primary/30 text-primary" asChild>
                          <a href={item.links.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-3 h-3 mr-1" />Code
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Modal: All Projects */}
        {showAllModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAllModal(false)}>
            <div className="cyber-border bg-black-light rounded-lg max-w-6xl w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="p-4 border-b border-primary/20 flex justify-between items-center bg-black/50 rounded-t-lg shrink-0">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-primary" />
                  <h3 className="font-mono text-primary text-lg">ALL_PROJECTS.LOG</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowAllModal(false)} className="text-primary hover:bg-primary/10">
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                {/* Modal Filters */}
                <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-primary/10">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setFilter(tag)}
                      className={`font-mono text-[10px] px-2 py-1 rounded border transition-colors ${
                        filter === tag 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'border-primary/30 text-muted-foreground hover:border-primary hover:text-primary'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredModalItems.map((item, index) => (
                    <Card
                      key={item.id}
                      className="cyber-border bg-black-light/30 border-primary/20 hover:border-primary/50 transition-all duration-300 group overflow-hidden flex flex-col"
                    >
                      <div className="relative overflow-hidden shrink-0">
                        {/* Grayscale image */}
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110 grayscale"
                        />
                        {/* Theme-color tint */}
                        <div
                          className="absolute inset-0 bg-primary/40 mix-blend-color pointer-events-none transition-opacity duration-300 group-hover:opacity-60"
                          style={{ mixBlendMode: 'color' }}
                        />
                        {/* Dark scanline overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                        {/* Hover action buttons */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4 z-10 backdrop-blur-sm">
                          <Button
                            size="sm"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 w-36"
                            onClick={() => setSelectedItem(item)}
                          >
                            {getIcon(type)}
                            <span className="ml-2">View Details</span>
                          </Button>
                          
                          {item.links?.live && (
                            <Button size="sm" variant="outline" className="border-primary/50 text-primary hover:bg-primary/20 w-36" asChild>
                              <a href={item.links.live} target="_blank" rel="noopener noreferrer">
                                <Play className="w-4 h-4 mr-2" />
                                Watch Demo
                              </a>
                            </Button>
                          )}
                          
                          {item.links?.github && (
                            <Button size="sm" variant="outline" className="border-primary/50 text-primary hover:bg-primary/20 w-36" asChild>
                              <a href={item.links.github} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" />
                                GitHub Code
                              </a>
                            </Button>
                          )}
                        </div>

                        {/* Terminal-style index badge */}
                        <div className="absolute top-2 left-2">
                          <div className="bg-background/80 backdrop-blur-sm border border-primary/20 rounded px-2 py-1">
                            <span className="font-mono text-xs text-primary">#{String(index + 1).padStart(2, '0')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-mono text-primary mb-2 text-sm">{item.title}</h3>
                        <p className="text-muted-foreground text-xs mb-3 font-mono flex-1 line-clamp-2">{item.description}</p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {item.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-[10px] font-mono border-primary/30 text-green-dark"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {item.links && (
                          <div className="flex space-x-2 mt-auto">
                            {item.links.live && (
                              <Button size="sm" variant="outline" className="text-[10px] font-mono border-primary/30 text-primary h-7 px-2" asChild>
                                <a href={item.links.live} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-3 h-3 mr-1" />Live
                                </a>
                              </Button>
                            )}
                            {item.links.github && (
                              <Button size="sm" variant="outline" className="text-[10px] font-mono border-primary/30 text-primary h-7 px-2" asChild>
                                <a href={item.links.github} target="_blank" rel="noopener noreferrer">
                                  <Github className="w-3 h-3 mr-1" />Code
                                </a>
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal for detailed view */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="cyber-border bg-black-light rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-mono text-primary text-xl">{selectedItem.title}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedItem(null)}
                    className="text-primary hover:bg-primary/10"
                  >
                    ✕
                  </Button>
                </div>

                <ImageWithFallback
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-64 md:h-96 object-cover rounded mb-4"
                />

                <p className="font-mono text-muted-foreground mb-4">{selectedItem.description}</p>

                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="font-mono border-primary/30 text-green-dark"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}