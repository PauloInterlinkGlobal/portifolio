/**
 * @file AchievementsSection.tsx
 * @description Seção de Conquistas Chave e Métricas de Alto Impacto.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../../types';
import { ACHIEVEMENTS_DATA } from '../../data/portfolioData';
import { Award, Network, Code2, ShieldCheck, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface AchievementsSectionProps {
  lang: Language;
}

export default function AchievementsSection({ lang }: AchievementsSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Network': return Network;
      case 'Code2': return Code2;
      case 'Award': return Award;
      default: return ShieldCheck;
    }
  };

  return (
    <section id="achievements" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Cabeçalho */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono tracking-widest uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>{lang === 'pt' ? '06 // CONQUISTAS CHAVE' : '06 // KEY ACHIEVEMENTS'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
            {lang === 'pt' ? 'Resultados & Engenharia Sob Medida' : 'Proven Results & Engineering Excellence'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'pt'
              ? 'Métricas comprovadas de desempenho, integração de APIs e arquitetura resiliente.'
              : 'Proven metrics of API performance, custom integrations, and software reliability.'}
          </p>
        </div>

        {/* Grade de Conquistas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ACHIEVEMENTS_DATA.map((item, idx) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                onMouseEnter={() => soundEngine.playHover()}
                className="glass-panel-glow p-8 rounded-3xl border border-[#00E5FF]/30 hover:border-[#00E5FF] transition-all duration-300 space-y-6 text-center group hover:-translate-y-2 shadow-[0_0_30px_rgba(0,229,255,0.1)]"
              >
                {/* Ícone com Brilho Pulsante */}
                <div className="inline-flex p-4 rounded-2xl bg-slate-900 border border-slate-800 text-[#00E5FF] group-hover:scale-110 group-hover:bg-[#00E5FF] group-hover:text-black transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                  <Icon className="w-8 h-8" />
                </div>

                {/* Métricas e Título */}
                <div className="space-y-2">
                  <div className="text-4xl sm:text-5xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#6C63FF] to-[#00FF88] text-glow-cyan">
                    {item.metric}
                  </div>
                  <div className="text-xs font-mono font-bold text-[#00E5FF] uppercase">
                    {item.metricLabel[lang]}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-display text-white group-hover:text-[#00E5FF] transition-colors">
                    {item.title[lang]}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description[lang]}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
