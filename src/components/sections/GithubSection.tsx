/**
 * @file GithubSection.tsx
 * @description Seção GitHub com matriz de contribuições simulada, repositórios principais e métricas ativas.
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Language } from '../../types';
import { GITHUB_REPOS_MOCK, PERSONAL_INFO } from '../../data/portfolioData';
import { Github, Star, GitFork, ExternalLink, GitCommit, Code2, Terminal } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface GithubSectionProps {
  lang: Language;
}

export default function GithubSection({ lang }: GithubSectionProps) {
  // Gera grid de contribuição estilo GitHub (52 semanas x 7 dias)
  const contributionGrid = useMemo(() => {
    const grid: number[] = [];
    const totalDays = 52 * 7;
    for (let i = 0; i < totalDays; i++) {
      // Valor randômico simulando contagem de commits de 0 a 4
      const rand = Math.random();
      if (rand > 0.65) grid.push(Math.floor(Math.random() * 3) + 2);
      else if (rand > 0.35) grid.push(1);
      else grid.push(0);
    }
    return grid;
  }, []);

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-slate-900 border-slate-800/60';
      case 1: return 'bg-[#00E5FF]/20 border-[#00E5FF]/30';
      case 2: return 'bg-[#00E5FF]/50 border-[#00E5FF]/60';
      case 3: return 'bg-[#00E5FF] border-[#00E5FF] shadow-[0_0_8px_rgba(0,229,255,0.6)]';
      default: return 'bg-[#00FF88] border-[#00FF88] shadow-[0_0_10px_rgba(0,255,136,0.8)]';
    }
  };

  return (
    <section id="github" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Cabeçalho */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono tracking-widest uppercase">
            <Github className="w-3.5 h-3.5" />
            <span>{lang === 'pt' ? '08 // GITHUB & CÓDIGO ABERTO' : '08 // GITHUB & OPEN SOURCE'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
            {lang === 'pt' ? 'Atividade de Código & Repositórios' : 'Live Code Activity & Open Source'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'pt'
              ? 'Acompanhe meu histórico diário de commits, arquitetura de software e projetos no GitHub.'
              : 'Track my daily commit heatmaps, code structure, and open-source contributions.'}
          </p>
        </div>

        {/* Heatmap de Contribuições Animado */}
        <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-[#00E5FF]/30 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-slate-900 text-[#00E5FF] border border-slate-800">
                <GitCommit className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg font-display text-white">
                  500+ {lang === 'pt' ? 'Commits no Último Ano' : 'Commits in the Last Year'}
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  @{PERSONAL_INFO.githubUsername} • GitHub Activity
                </p>
              </div>
            </div>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => soundEngine.playClick()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#00E5FF] text-slate-200 hover:text-black font-mono font-bold text-xs border border-slate-700 transition-all"
            >
              <span>{lang === 'pt' ? 'Ver Perfil Oficial' : 'View Official Profile'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Renderização do Grid de 52 Semanas */}
          <div className="overflow-x-auto pb-2">
            <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 min-w-[700px]">
              {contributionGrid.map((level, i) => (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-sm border transition-all duration-300 hover:scale-125 ${getHeatmapColor(
                    level
                  )}`}
                  title={`Day ${i + 1}: ${level * 3} commits`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2">
            <span>{lang === 'pt' ? 'Menos Atividade' : 'Less Activity'}</span>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-slate-900 border border-slate-800" />
              <div className="w-3 h-3 rounded-sm bg-[#00E5FF]/30 border border-[#00E5FF]/40" />
              <div className="w-3 h-3 rounded-sm bg-[#00E5FF]/60 border border-[#00E5FF]/70" />
              <div className="w-3 h-3 rounded-sm bg-[#00E5FF] border border-[#00E5FF]" />
              <div className="w-3 h-3 rounded-sm bg-[#00FF88] border border-[#00FF88]" />
            </div>
            <span>{lang === 'pt' ? 'Mais Atividade' : 'More Activity'}</span>
          </div>
        </div>

        {/* Grade de Repositórios em Destaque */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GITHUB_REPOS_MOCK.map((repo, idx) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => soundEngine.playHover()}
              className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-[#00E5FF] transition-all duration-300 space-y-4 group hover:shadow-[0_0_25px_rgba(0,229,255,0.15)] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#00E5FF]">
                    <Code2 className="w-5 h-5" />
                    <h3 className="font-bold font-mono text-lg text-white group-hover:text-[#00E5FF] transition-colors">
                      {repo.name}
                    </h3>
                  </div>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {repo.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{repo.stars}</span>
                  </span>
                  <span className="flex items-center gap-1 text-[#6C63FF]">
                    <GitFork className="w-3.5 h-3.5" />
                    <span>{repo.forks}</span>
                  </span>
                </div>
                <span className="text-[#00FF88]">{repo.language}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
