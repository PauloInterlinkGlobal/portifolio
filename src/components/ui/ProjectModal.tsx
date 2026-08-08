/**
 * @file ProjectModal.tsx
 * @description Modal em tela cheia futurista para detalhamento completo do projeto selecionado.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, Language } from '../../types';
import { X, ExternalLink, Github, CheckCircle, Cpu, Network, Sparkles, Layers } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  lang: Language;
  onClose: () => void;
}

export default function ProjectModal({ project, lang, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop escuro com blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-[#030712]/80 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel-glow rounded-3xl border border-[#00E5FF]/40 text-slate-100 shadow-[0_0_50px_rgba(0,229,255,0.2)] z-10 p-6 sm:p-8 space-y-6"
        >
          {/* Botão Fechar */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full glass-panel border border-slate-700 text-slate-400 hover:text-white hover:border-[#00E5FF] transition-all"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Imagem de Capa */}
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-white/10">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00E5FF]/20 border border-[#00E5FF] text-[#00E5FF] backdrop-blur-md">
                {project.category.toUpperCase()}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white text-glow-cyan">
                {project.title}
              </h2>
              <p className="text-sm text-slate-300 font-mono">
                {project.subtitle[lang]}
              </p>
            </div>
          </div>

          {/* Métricas Relevantes */}
          {project.metrics && (
            <div className="p-4 rounded-xl glass-panel border border-[#00FF88]/40 bg-[#00FF88]/5 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#00FF88] shrink-0" />
              <p className="text-xs sm:text-sm font-semibold text-[#00FF88]">
                {project.metrics[lang]}
              </p>
            </div>
          )}

          {/* Descrição Detalhada */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#00E5FF]" />
              <span>{lang === 'pt' ? 'Visão Geral do Projeto' : 'Project Overview'}</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.longDescription[lang]}
            </p>
          </div>

          {/* Diagrama de Arquitetura / Módulos */}
          {project.architectureDiagram && (
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
                <Network className="w-4 h-4 text-[#6C63FF]" />
                <span>{lang === 'pt' ? 'Módulos & Arquitetura' : 'Architecture & Modules'}</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {project.architectureDiagram.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl glass-panel border border-slate-800 text-center text-xs font-mono text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tecnologias Utilizadas */}
          <div className="space-y-3 pt-2">
            <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#00E5FF]" />
              <span>{lang === 'pt' ? 'Stack de Tecnologias' : 'Technology Stack'}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700 text-[#00E5FF]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Ações / Links */}
          <div className="pt-4 flex flex-wrap gap-4 border-t border-slate-800">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => soundEngine.playClick()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#6C63FF] text-slate-950 font-bold text-sm hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{lang === 'pt' ? 'Ver Demonstração ao Vivo' : 'Live Demo'}</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => soundEngine.playClick()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl glass-panel border border-slate-700 hover:border-[#00E5FF] text-white font-bold text-sm transition-all"
              >
                <Github className="w-4 h-4 text-[#00E5FF]" />
                <span>{lang === 'pt' ? 'Repositório GitHub' : 'GitHub Code'}</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
