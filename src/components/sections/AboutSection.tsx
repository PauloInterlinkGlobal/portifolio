/**
 * @file AboutSection.tsx
 * @description Seção Sobre Mim com card de vidro futurista, animação de terminal e contadores de métricas.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../../types';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { UserCheck, Award, Code, Cpu, MapPin, Terminal, Shield, Zap, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface AboutSectionProps {
  lang: Language;
}

export default function AboutSection({ lang }: AboutSectionProps) {
  const stats = [
    {
      value: `${PERSONAL_INFO.stats.yearsExperience}+`,
      label: { pt: 'Anos de Experiência', en: 'Years Experience' },
      icon: Award,
      color: '#00E5FF',
    },
    {
      value: `${PERSONAL_INFO.stats.projectsCount}+`,
      label: { pt: 'Projetos Concluídos', en: 'Projects Completed' },
      icon: Code,
      color: '#6C63FF',
    },
    {
      value: `${PERSONAL_INFO.stats.technologiesCount}+`,
      label: { pt: 'Tecnologias & Ferramentas', en: 'Techs & Tools' },
      icon: Cpu,
      color: '#00FF88',
    },
    {
      value: `${PERSONAL_INFO.stats.githubCommits}+`,
      label: { pt: 'Commits & Repositórios', en: 'Commits & Repos' },
      icon: Terminal,
      color: '#38BDF8',
    },
  ];

  const pillars = [
    {
      title: { pt: 'Alta Performance', en: 'High Performance' },
      desc: { pt: 'Código otimizado, tempos de carregamento mínimos e arquitetura limpa.', en: 'Clean architecture, sub-second load times, and optimized execution.' },
      icon: Zap,
    },
    {
      title: { pt: 'Segurança & Escalabilidade', en: 'Security & Scale' },
      desc: { pt: 'Práticas avançadas de autenticação JWT, proteção contra vulnerabilidades e suporte a multitenancy.', en: 'JWT authentication, robust data security, and multitenant scaling.' },
      icon: Shield,
    },
    {
      title: { pt: 'Foco no Usuário (UI/UX)', en: 'User-Centric (UI/UX)' },
      desc: { pt: 'Interfaces extremamente fluidas com animações de 60 FPS e responsividade impecável.', en: 'Silky 60 FPS animations, responsive design, and intuitive user experiences.' },
      icon: UserCheck,
    },
  ];

  return (
    <section id="about" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Cabeçalho da Seção */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono tracking-widest uppercase">
            <UserCheck className="w-3.5 h-3.5" />
            <span>{lang === 'pt' ? '01 // SOBRE MIM' : '01 // ABOUT ME'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
            {lang === 'pt' ? 'Engenharia de Software & Paixão por Inovação' : 'Software Engineering & Passion for Innovation'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'pt'
              ? 'Conheça minha trajetória, princípios de desenvolvimento e métricas de impacto.'
              : 'Discover my journey, software engineering principles, and track record.'}
          </p>
        </div>

        {/* Card de Vidro com Terminal & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Lado Esquerdo: Terminal Simulado */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-panel-glow rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between border border-white/10"
          >
            {/* Topo do Terminal */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">paulo-bunga-profile.sh</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Conteúdo da Bio */}
            <div className="space-y-4 font-sans text-slate-200 text-sm sm:text-base leading-relaxed">
              <p>
                {lang === 'pt'
                  ? 'Olá! Sou Paulo Bunga, desenvolvedor Fullstack baseado em Luanda, Angola. Tenho mais de 6 anos de experiência prática construindo ecossistemas digitais escaláveis, APIs RESTful de alta resiliência e aplicativos mobile nativos e híbridos.'
                  : 'Hello! I am Paulo Bunga, a Fullstack Developer based in Luanda, Angola. I have 6+ years of hands-on experience building scalable web ecosystems, resilient RESTful APIs, and cross-platform mobile apps.'}
              </p>
              <p>
                {lang === 'pt'
                  ? 'Minha especialidade abrange todo o ciclo de vida do desenvolvimento de software: desde a modelagem de bancos de dados relacionais (MySQL/PostgreSQL), criação de backends em Node.js e Laravel, até a entrega de interfaces web de altíssima performance com React.js e Next.js.'
                  : 'My expertise covers the entire software development lifecycle: from relational database architecture (MySQL/PostgreSQL), backend services with Node.js and Laravel, to delivering ultra-fast frontend applications using React.js and Next.js.'}
              </p>
            </div>

            {/* Destaques Rápidos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
                <span>{lang === 'pt' ? 'Arquitetura Limpa & MVC' : 'Clean Architecture & MVC'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#6C63FF]" />
                <span>{lang === 'pt' ? 'Conteinerização Docker' : 'Docker Containerization'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#00FF88]" />
                <span>{lang === 'pt' ? 'Integração de Pagamentos' : 'Payment Integration'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                <span>{lang === 'pt' ? 'Aplicações Mobile React Native' : 'React Native Mobile Apps'}</span>
              </div>
            </div>
          </motion.div>

          {/* Lado Direito: Pilares de Trabalho */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-[#00E5FF]/50 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] group-hover:bg-[#00E5FF] group-hover:text-black transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-white text-base group-hover:text-[#00E5FF] transition-colors">
                        {pillar.title[lang]}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {pillar.desc[lang]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Grade de Estatísticas Animadas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => soundEngine.playHover()}
                className="glass-panel p-6 rounded-2xl border border-white/10 text-center space-y-2 hover:border-[#00E5FF]/50 transition-all group"
              >
                <div className="inline-flex p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 group-hover:text-[#00E5FF] group-hover:scale-110 transition-all">
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-display text-white text-glow-cyan">
                  {stat.value}
                </div>
                <div className="text-xs font-mono text-slate-400">
                  {stat.label[lang]}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
