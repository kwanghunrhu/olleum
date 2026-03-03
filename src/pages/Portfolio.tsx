import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { Category, Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const Portfolio = () => {
  const { projects } = useAppContext();
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const categories: { label: string; value: Category | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Residential', value: 'residential' },
    { label: 'Hotel', value: 'hotel' },
  ];

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
              <div key={project.id} onClick={() => setSelectedProject(project)} className="cursor-pointer">
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

      {/* 공통 팝업창 사용 */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};

export default Portfolio;
