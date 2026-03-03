import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  // 비어있는 이미지 주소는 제외하고 목록 만들기
  const allImages = [project.imageUrl, ...(project.images || [])].filter(img => img && img.trim() !== '');

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
        onClick={onClose}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
        >
          <X size={32} />
        </button>

        <div 
          className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-10 items-center overflow-y-auto max-h-full py-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="lg:col-span-2 relative aspect-[3/2] bg-black rounded-2xl overflow-hidden group">
            <img 
              src={allImages[currentImageIndex]} 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
              alt={project.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/placeholder/1200/800';
              }}
            />
            
            {allImages.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          <div className="text-white space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">{project.category}</span>
              <h2 className="text-4xl font-serif mt-2">{project.title}</h2>
            </div>
            <p className="text-white/60 leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
            <div className="pt-6 border-t border-white/10">
              <p className="text-xs text-white/40">Completion Date: {project.date}</p>
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
                      onError={(e) => (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/error/200/200'}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
