/**
 * @file ProjectsSection.tsx
 * @description Seção de Projetos com Carrossel 3D interativo, filtros por categoria e suporte a modal de detalhes.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, Project } from '../../types';
import { PROJECTS_DATA } from '../../data/portfolioData';
import ProjectCarousel3D from '../3d/ProjectCarousel3D';
import ProjectModal from '../ui/ProjectModal';
import { FolderGit2, LayoutGrid, Layers, ExternalLink, Github, ArrowRight } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface ProjectsSectionProps {
  lang: Language;
}

export default function ProjectsSection({ lang }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [displayMode, setDisplayMode] = useState<'3d' | 'grid'>('3d');

  const categories = [
    { id: 'all', label: { pt: 'Todos', en: 'All' } },
    { id: 'fullstack', label: { pt: 'Fullstack', en: 'Fullstack' } },
    { id: 'backend', label: { pt: 'Backend & APIs', en: 'Backend & APIs' } },
    { id: 'frontend', label: { pt: 'Frontend', en: 'Frontend' } },
    { id: 'mobile', label: { pt: 'Mobile', en: 'Mobile' } },
    { id: 'wordpress', label: { pt: 'WordPress & PHP', en: 'WordPress & PHP' } },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Cabeçalho */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono tracking-widest uppercase">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>{lang === 'pt' ? '04 // PROJETOS EM DESTAQUE' : '04 // FEATURED PROJECTS'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
            {lang === 'pt' ? 'Portfólio & Experiências 3D' : 'Showcase & Product Portfolio'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'pt'
              ? 'Navegue pelo carrossel 3D para explorar sistemas corporativos, microsserviços e soluções mobile.'
              : 'Explore the 3D carousel featuring enterprise ERPs, backend APIs, and cross-platform apps.'}
          </p>
        </div>

        {/* Filtros e Alternador de Exibição */}
        <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-3 rounded-2xl border border-white/10">
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-[#00E5FF] text-slate-950 font-bold shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat.label[lang]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                soundEngine.playClick();
                setDisplayMode('3d');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                displayMode === '3d' ? 'bg-[#6C63FF] text-white shadow-[0_0_10px_rgba(108,99,255,0.4)]' : 'text-slate-400 hover:text-white'
              }`}
            >
              3D Carousel
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setDisplayMode('grid');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                displayMode === 'grid' ? 'bg-[#6C63FF] text-white shadow-[0_0_10px_rgba(108,99,255,0.4)]' : 'text-slate-400 hover:text-white'
              }`}
            >
              Grid View
            </button>
          </div>
        </div>

        {/* Carrossel 3D vs Grade */}
        {displayMode === '3d' ? (
          <ProjectCarousel3D
            projects={filteredProjects}
            lang={lang}
            onSelectProject={(proj) => setSelectedProject(proj)}
          />
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => {
                  soundEngine.playWoosh();
                  setSelectedProject(project);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className="glass-panel rounded-2xl border border-white/10 hover:border-[#00E5FF] transition-all cursor-pointer group overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-950/80 text-[#00E5FF] border border-[#00E5FF]/40">
                    {project.category.toUpperCase()}
                  </span>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-bold font-display text-lg text-white group-hover:text-[#00E5FF] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2">
                      {project.description[lang]}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-[#00E5FF]">
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {lang === 'pt' ? 'Detalhes' : 'Details'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Modal em Tela Cheia para o Projeto Selecionado */}
      <ProjectModal
        project={selectedProject}
        lang={lang}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
