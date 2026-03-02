import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ProjectCard } from '../components/ProjectCard';
import { Category, Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Portfolio = () => {
  const { projects } = useAppContext();
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const categories: { label: string; value: Category | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Residential', value: 'residential' },
    { label: 'Hotel', value: 'hotel' },
  ];

  const allImages = selectedProject ? [selectedProject.imageUrl, ...(selectedProject.images || [])] : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="pt-40 pb-32 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif mb-8"
          >
            Portfolio
          </motion.h1>
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat.value 
                    ? 'bg-black text-white' 
                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </header>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <div key={project.id} onClick={() => { setSelectedProject(project); setCurrentImageIndex(0); }} className="cursor-pointer">
                <ProjectCard project={project} />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-40 text-center text-stone-400">
            등록된 프로젝트가 없습니다.
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
            >
              <X size={32} />
            </button>

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-10 items-center overflow-y-auto max-h-full py-10">
              <div className="lg:col-span-2 relative aspect-[3/2] bg-black rounded-2xl overflow-hidden group">
                <img 
                  src={allImages[currentImageIndex]} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  alt={selectedProject.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/placeholder/1200/800';
                  }}
                />
                
                {allImages.length > 1 && (
                  <>
                    <button 
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                      {allImages.map((_, idx) => (
                        <div 
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/30'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="text-white space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/40">{selectedProject.category}</span>
                  <h2 className="text-4xl font-serif mt-2">{selectedProject.title}</h2>
                </div>
                <p className="text-white/60 leading-relaxed whitespace-pre-wrap">
                  {selectedProject.description}
                </p>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-xs text-white/40">Completion Date: {selectedProject.date}</p>
                </div>
                
                {allImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 pt-4">
                    {allImages.map((img, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-white' : 'border-transparent opacity-40 hover:opacity-100'}`}
                      >
                        <img 
                          src={img} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/error/200/200';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
