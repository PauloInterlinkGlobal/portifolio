/**
 * @file ExperienceSection.tsx
 * @description Seção de Experiência com linha do tempo futurista interativa e conectada por feixes de luz.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../../types';
import { EXPERIENCE_DATA } from '../../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle, ChevronRight, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface ExperienceSectionProps {
  lang: Language;
}

export default function ExperienceSection({ lang }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Cabeçalho */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono tracking-widest uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{lang === 'pt' ? '03 // EXPERIÊNCIA PROFISSIONAL' : '03 // WORK EXPERIENCE'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
            {lang === 'pt' ? 'Linha do Tempo de Carreira & Projetos' : 'Career Timeline & Enterprise Impact'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'pt'
              ? 'Empresas, papéis e contribuições de alto impacto no desenvolvimento de software.'
              : 'Companies, technical roles, and high-impact software engineering contributions.'}
          </p>
        </div>

        {/* Linha do Tempo Futurista */}
        <div className="relative max-w-4xl mx-auto">
          {/* Feixe Conector Central Cibernético */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-[#00E5FF] via-[#6C63FF] to-[#00FF88] shadow-[0_0_15px_rgba(0,229,255,0.5)]" />

          <div className="space-y-12">
            {EXPERIENCE_DATA.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Nó Central Neon Flutuante */}
                  <div className="absolute left-4 sm:left-1/2 top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-[#030712] border-2 border-[#00E5FF] flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.8)]">
                      <Sparkles className="w-4 h-4 text-[#00E5FF] animate-pulse" />
                    </div>
                  </div>

                  {/* Espaçamento em telas maiores */}
                  <div className="w-full sm:w-1/2" />

                  {/* Card da Empresa */}
                  <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${isEven ? 'sm:pr-12' : 'sm:pl-12'}`}>
                    <div
                      onMouseEnter={() => soundEngine.playHover()}
                      className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-[#00E5FF]/60 transition-all duration-300 space-y-4 group hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]"
                    >
                      {/* Topo do Card */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                        <div>
                          <span className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-wider">
                            {exp.company}
                          </span>
                          <h3 className="text-xl font-bold font-display text-white group-hover:text-[#00E5FF] transition-colors">
                            {exp.role[lang]}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                          <Calendar className="w-3.5 h-3.5 text-[#6C63FF]" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {exp.description[lang]}
                      </p>

                      {/* Lista de Conquistas/Bullets */}
                      <ul className="space-y-2 pt-1">
                        {exp.highlights[lang].map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <ChevronRight className="w-3.5 h-3.5 text-[#00FF88] shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tags de Tecnologias */}
                      <div className="flex flex-wrap gap-1.5 pt-3">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-slate-300 border border-slate-700/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
