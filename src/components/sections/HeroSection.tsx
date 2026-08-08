/**
 * @file HeroSection.tsx
 * @description Seção Hero 100vh com título animado letra por letra, botões interativos e canvas 3D.
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Language } from '../../types';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { triggerCVDownload } from '../../utils/cvGenerator';
import { soundEngine } from '../../utils/audio';
import HeroScene from '../3d/HeroScene';
import { ArrowDown, FileDown, FolderGit2, Mail, Sparkles, Terminal } from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const titleText = PERSONAL_INFO.name;
  const roleText = PERSONAL_INFO.title[lang];
  const [displayedTitle, setDisplayedTitle] = useState('');

  // Animação do título letra por letra
  useEffect(() => {
    let index = 0;
    setDisplayedTitle('');
    const timer = setInterval(() => {
      if (index <= titleText.length) {
        setDisplayedTitle(titleText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [titleText]);

  const scrollToSection = (id: string) => {
    soundEngine.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center pt-20 pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Coluna de Texto Principal */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
        >
          {/* Badge de Boas-Vindas */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
            <span>{lang === 'pt' ? 'Disponível para Projetos & Contratação' : 'Available for Projects & Hiring'}</span>
          </div>

          {/* Título Principal com efeito de máquina de escrever */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight font-display text-white">
              {displayedTitle}
              <span className="text-[#00E5FF] animate-pulse">|</span>
            </h1>
            <h2 className="text-xl sm:text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#6C63FF] to-[#00FF88]">
              {roleText}
            </h2>
          </div>

          {/* Subtítulo & Pílulas da Stack */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
            {PERSONAL_INFO.roles.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-900/80 border border-slate-700/80 text-slate-300 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {PERSONAL_INFO.bio[lang]}
          </p>

          {/* Botões de Ação (CTA) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            {/* Ver Projetos */}
            <button
              onClick={() => scrollToSection('projects')}
              onMouseEnter={() => soundEngine.playHover()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#6C63FF] text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:shadow-[0_0_35px_rgba(0,229,255,0.7)] hover:scale-105 active:scale-95 transition-all"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Ver Projetos' : 'View Projects'}</span>
            </button>

            {/* Baixar CV */}
            <button
              onClick={() => {
                soundEngine.playClick();
                triggerCVDownload(lang);
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className="px-6 py-3.5 rounded-xl glass-panel border border-slate-700 hover:border-[#00E5FF] text-white font-bold text-sm flex items-center gap-2 hover:bg-[#00E5FF]/10 active:scale-95 transition-all"
            >
              <FileDown className="w-4 h-4 text-[#00E5FF]" />
              <span>{lang === 'pt' ? 'Baixar CV' : 'Download CV'}</span>
            </button>

            {/* Contactar Me */}
            <button
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => soundEngine.playHover()}
              className="px-6 py-3.5 rounded-xl glass-panel border border-slate-700 hover:border-[#6C63FF] text-slate-200 hover:text-white font-bold text-sm flex items-center gap-2 hover:bg-[#6C63FF]/10 active:scale-95 transition-all"
            >
              <Mail className="w-4 h-4 text-[#6C63FF]" />
              <span>{lang === 'pt' ? 'Contactar Me' : 'Contact Me'}</span>
            </button>
          </div>
        </motion.div>

        {/* Coluna da Cena 3D Futurista */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center"
        >
          <HeroScene />
        </motion.div>
      </div>

      {/* Indicador de Scroll para baixo */}
      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-mono text-slate-400 hover:text-[#00E5FF] transition-colors cursor-pointer group"
      >
        <span className="tracking-widest uppercase text-[10px]">SCROLL DOWN</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-[#00E5FF]" />
      </button>
    </section>
  );
}
