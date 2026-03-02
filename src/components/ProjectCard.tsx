import React from 'react';
import { Project } from '../types';
import { motion } from 'motion/react';
import { ArrowUpRight, Image as ImageIcon } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const imageCount = 1 + (project.images?.length || 0);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 rounded-2xl">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/placeholder/800/1000';
          }}
        />
        
        {imageCount > 1 && (
          <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-md rounded-md text-[10px] text-white font-bold flex items-center gap-1 z-10">
            <ImageIcon size={10} />
            {imageCount}
          </div>
        )}

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <ArrowUpRight size={20} className="text-black" />
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400">
            {project.category}
          </span>
          <span className="text-[10px] text-stone-400">{project.date}</span>
        </div>
        <h3 className="text-xl font-serif group-hover:underline underline-offset-4 decoration-1">
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
};
