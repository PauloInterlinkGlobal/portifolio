/**
 * @file ProjectCarousel3D.tsx
 * @description Carrossel 3D interativo para os Projetos com suporte a drag de mouse/touch, rotação e tilt.
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, Language } from '../../types';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Layers, ArrowRight } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface ProjectCarousel3DProps {
  projects: Project[];
  lang: Language;
  onSelectProject: (project: Project) => void;
}

export default function ProjectCarousel3D({ projects, lang, onSelectProject }: ProjectCarousel3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    soundEngine.playClick();
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    soundEngine.playClick();
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="relative w-full py-8 overflow-hidden select-none" ref={containerRef}>
      {/* Botões de Navegação Flutuantes */}
      <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-6 z-30">
        <button
          onClick={handlePrev}
          onMouseEnter={() => soundEngine.playHover()}
          className="p-3 sm:p-4 rounded-full glass-panel border border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/20 hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)]"
          aria-label="Previous Project"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-6 z-30">
        <button
          onClick={handleNext}
          onMouseEnter={() => soundEngine.playHover()}
          className="p-3 sm:p-4 rounded-full glass-panel border border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/20 hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)]"
          aria-label="Next Project"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>

      {/* Palco 3D do Carrossel */}
      <div className="flex items-center justify-center min-h-[460px] sm:min-h-[540px] perspective-[1200px] px-4">
        {projects.map((project, idx) => {
          // Calcula a posição relativa em relação ao ativo
          let offset = idx - activeIndex;
          if (offset < -Math.floor(projects.length / 2)) offset += projects.length;
          if (offset > Math.floor(projects.length / 2)) offset -= projects.length;

          const isCenter = offset === 0;
          const isAdjacent = Math.abs(offset) === 1;

          // Se estiver longe, esconde para manter 60 FPS
          if (Math.abs(offset) > 2) return null;

          return (
            <motion.div
              key={project.id}
              initial={false}
              animate={{
                x: offset * 280,
                scale: isCenter ? 1 : isAdjacent ? 0.82 : 0.65,
                rotateY: offset * -25,
                z: isCenter ? 100 : isAdjacent ? -50 : -200,
                opacity: isCenter ? 1 : isAdjacent ? 0.6 : 0.2,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: isCenter ? 'relative' : 'absolute',
                zIndex: isCenter ? 20 : 10 - Math.abs(offset),
              }}
              className="w-[300px] sm:w-[380px] lg:w-[440px] cursor-pointer"
              onClick={() => {
                if (isCenter) {
                  soundEngine.playWoosh();
                  onSelectProject(project);
                } else {
                  soundEngine.playClick();
                  setActiveIndex(idx);
                }
              }}
              onMouseEnter={() => soundEngine.playHover()}
            >
              <div
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 border glass-panel ${
                  isCenter
                    ? 'border-[#00E5FF]/60 shadow-[0_0_40px_rgba(0,229,255,0.3)] hover:border-[#00E5FF]'
                    : 'border-white/10 opacity-80'
                }`}
              >
                {/* Imagem do Projeto com Efeito Hover */}
                <div className="relative h-52 sm:h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent" />

                  {/* Badge de Categoria */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-950/80 border border-[#00E5FF]/40 text-[#00E5FF] backdrop-blur-md">
                    {project.category.toUpperCase()}
                  </div>

                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#6C63FF]/80 text-white backdrop-blur-md">
                      FEATURED
                    </div>
                  )}
                </div>

                {/* Conteúdo do Card */}
                <div className="p-5 sm:p-6 space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-[#00E5FF] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                    {project.description[lang]}
                  </p>

                  {/* Tags de Tecnologias */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900/90 text-slate-300 border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900/90 text-[#00E5FF]">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Botão de Ver Detalhes */}
                  <div className="pt-3 flex items-center justify-between text-xs font-mono text-[#00E5FF] font-semibold border-t border-slate-800/80">
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {lang === 'pt' ? 'Ver Detalhes do Projeto' : 'View Project Details'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <Layers className="w-4 h-4 opacity-70" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Indicadores de Posição em Pílulas */}
      <div className="flex justify-center gap-2 mt-6 z-20 relative">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              soundEngine.playClick();
              setActiveIndex(i);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'w-8 bg-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.8)]'
                : 'w-2 bg-slate-700 hover:bg-slate-500'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
