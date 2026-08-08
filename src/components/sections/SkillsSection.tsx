/**
 * @file SkillsSection.tsx
 * @description Seção de Tecnologias com Esfera 3D interativa, filtros por categoria e suporte a visualização em grade.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, TechSkill } from '../../types';
import { SKILLS_DATA } from '../../data/portfolioData';
import TechSphere from '../3d/TechSphere';
import { Cpu, LayoutGrid, Globe, Server, Smartphone, Database, Wrench, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface SkillsSectionProps {
  lang: Language;
}

export default function SkillsSection({ lang }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<TechSkill | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');

  const categories = [
    { id: 'all', label: { pt: 'Todas', en: 'All' }, icon: LayoutGrid },
    { id: 'frontend', label: { pt: 'Frontend', en: 'Frontend' }, icon: Globe },
    { id: 'backend', label: { pt: 'Backend', en: 'Backend' }, icon: Server },
    { id: 'mobile', label: { pt: 'Mobile', en: 'Mobile' }, icon: Smartphone },
    { id: 'database', label: { pt: 'Banco de Dados', en: 'Database' }, icon: Database },
    { id: 'devops', label: { pt: 'DevOps & Ferramentas', en: 'DevOps & Tools' }, icon: Wrench },
  ];

  const filteredSkills = activeCategory === 'all'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === activeCategory || (activeCategory === 'devops' && s.category === 'tools'));

  return (
    <section id="skills" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Cabeçalho */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono tracking-widest uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>{lang === 'pt' ? '02 // TECH STACK' : '02 // TECH STACK'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
            {lang === 'pt' ? 'Ecossistema Tecnológico Interativo' : 'Interactive Technology Stack'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'pt'
              ? 'Explore o universo de linguagens, frameworks e ferramentas que utilizo na construção de software.'
              : 'Explore the universe of frameworks, languages, and tools I use to craft high-scale applications.'}
          </p>
        </div>

        {/* Filtros e Alternador de Modo (3D vs Grade) */}
        <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-3 rounded-2xl border border-white/10">
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveCategory(cat.id);
                  }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                    isActive
                      ? 'bg-[#00E5FF] text-slate-950 font-bold shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label[lang]}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                soundEngine.playClick();
                setViewMode('3d');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                viewMode === '3d' ? 'bg-[#6C63FF] text-white shadow-[0_0_10px_rgba(108,99,255,0.4)]' : 'text-slate-400 hover:text-white'
              }`}
            >
              3D Sphere
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setViewMode('grid');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                viewMode === 'grid' ? 'bg-[#6C63FF] text-white shadow-[0_0_10px_rgba(108,99,255,0.4)]' : 'text-slate-400 hover:text-white'
              }`}
            >
              Grid View
            </button>
          </div>
        </div>

        {/* Exibição: Esfera 3D ou Grade Futurista */}
        {viewMode === '3d' ? (
          <div className="relative glass-panel rounded-3xl border border-white/10 p-4">
            <TechSphere selectedCategory={activeCategory} onSelectSkill={setSelectedSkill} />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-400 pointer-events-none">
              {lang === 'pt' ? 'Passe o cursor ou clique nas habilidades na esfera 3D' : 'Hover or click skills inside the 3D sphere'}
            </div>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedSkill(skill);
                }}
                className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-[#00E5FF] transition-all cursor-pointer group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#00E5FF] group-hover:scale-110 transition-transform">
                    <Sparkles className="w-4 h-4" style={{ color: skill.color }} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {skill.experienceYears} {lang === 'pt' ? 'anos' : 'yrs'}
                  </span>
                </div>

                <div>
                  <div className="font-mono font-bold text-sm text-white group-hover:text-[#00E5FF] transition-colors">
                    {skill.name}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    {skill.category}
                  </div>
                </div>

                {/* Barra de Proficiência */}
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${skill.level}%`,
                      backgroundColor: skill.color,
                      boxShadow: `0 0 10px ${skill.color}`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Modal / Card de Detalhes da Habilidade Selecionada */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass-panel-glow p-6 rounded-2xl border border-[#00E5FF]/40 max-w-xl mx-auto space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-[#00E5FF] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#00E5FF]" style={{ color: selectedSkill.color }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white font-display">
                      {selectedSkill.name}
                    </h4>
                    <p className="text-xs font-mono text-slate-400 uppercase">
                      Category: {selectedSkill.category}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300 hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2 border-t border-slate-800">
                <div>
                  <span className="text-slate-400">Proficiency: </span>
                  <span className="text-[#00E5FF] font-bold">{selectedSkill.level}%</span>
                </div>
                <div>
                  <span className="text-slate-400">Practical Experience: </span>
                  <span className="text-[#00FF88] font-bold">{selectedSkill.experienceYears} Years</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
