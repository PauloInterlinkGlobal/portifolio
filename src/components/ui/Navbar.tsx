/**
 * @file Navbar.tsx
 * @description Barra de navegação flutuante futurista em vidro com alternador de idioma (PT/EN), som e CV.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, Theme3DMode } from '../../types';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { triggerCVDownload } from '../../utils/cvGenerator';
import { soundEngine } from '../../utils/audio';
import {
  Globe,
  Volume2,
  VolumeX,
  FileDown,
  Menu,
  X,
  Sparkles,
  Terminal,
  Palette
} from 'lucide-react';

interface NavbarProps {
  currentSection: string;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  themeMode: Theme3DMode;
  onThemeChange: (theme: Theme3DMode) => void;
}

export default function Navbar({
  currentSection,
  lang,
  onLanguageChange,
  themeMode,
  onThemeChange,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(soundEngine.isEnabled());
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: { pt: 'Início', en: 'Home' } },
    { id: 'about', label: { pt: 'Sobre Mim', en: 'About' } },
    { id: 'skills', label: { pt: 'Skills', en: 'Skills' } },
    { id: 'experience', label: { pt: 'Experiência', en: 'Experience' } },
    { id: 'projects', label: { pt: 'Projetos', en: 'Projects' } },
    { id: 'services', label: { pt: 'Serviços', en: 'Services' } },
    { id: 'achievements', label: { pt: 'Conquistas', en: 'Achievements' } },
    { id: 'certificates', label: { pt: 'Formação', en: 'Education' } },
    { id: 'github', label: { pt: 'GitHub', en: 'GitHub' } },
    { id: 'contact', label: { pt: 'Contacto', en: 'Contact' } },
  ];

  const handleNavClick = (id: string) => {
    soundEngine.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const newState = soundEngine.toggleAmbient();
    setSoundActive(newState);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-3 bg-[#030712]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Marca / Logotipo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="flex items-center gap-2 group"
          onMouseEnter={() => soundEngine.playHover()}
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00E5FF] to-[#6C63FF] p-[1px] shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            <div className="w-full h-full bg-[#030712] rounded-[7px] flex items-center justify-center text-[#00E5FF] font-mono font-extrabold text-sm group-hover:bg-transparent group-hover:text-black transition-all">
              PB
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base tracking-wide text-white group-hover:text-[#00E5FF] transition-colors">
              PAULO BUNGA
            </span>
            <span className="text-[10px] font-mono text-slate-400 -mt-1">
              FULL STACK DEV
            </span>
          </div>
        </a>

        {/* Links de Navegação Desktop */}
        <nav className="hidden lg:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/10">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`relative px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-[#00E5FF]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-[#00E5FF]/15 border border-[#00E5FF]/40 rounded-full shadow-[0_0_12px_rgba(0,229,255,0.3)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label[lang]}</span>
              </button>
            );
          })}
        </nav>

        {/* Controles do Lado Direito (Idioma, Tema, Som, CV) */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Alternador de Idioma */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onLanguageChange(lang === 'pt' ? 'en' : 'pt');
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-slate-700 hover:border-[#00E5FF] text-xs font-mono text-slate-200 hover:text-white transition-all"
            title="Alternar Idioma / Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="uppercase font-bold">{lang}</span>
          </button>

          {/* Efeitos Sonoros Ambientais */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => soundEngine.playHover()}
            className={`p-2 rounded-full glass-panel border transition-all ${
              soundActive
                ? 'border-[#00E5FF] text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                : 'border-slate-800 text-slate-400 hover:text-white'
            }`}
            title={soundActive ? 'Mudar/Desativar Som Ambient' : 'Ativar Efeitos Sonoros Ambientais'}
          >
            {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Download do CV */}
          <button
            onClick={() => {
              soundEngine.playClick();
              triggerCVDownload(lang);
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#6C63FF] text-slate-950 font-bold text-xs hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] active:scale-95 transition-all"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>
        </div>

        {/* Botão de Menu Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => {
              soundEngine.playClick();
              onLanguageChange(lang === 'pt' ? 'en' : 'pt');
            }}
            className="px-2.5 py-1 rounded-full glass-panel border border-slate-700 text-xs font-mono font-bold text-[#00E5FF]"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-xl glass-panel border border-slate-700 text-slate-200 hover:text-[#00E5FF]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Overlay Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#030712]/95 backdrop-blur-2xl border-b border-slate-800 px-6 py-6 space-y-4 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    currentSection === item.id
                      ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  {item.label[lang]}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  triggerCVDownload(lang);
                }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#6C63FF] text-slate-950 font-bold text-sm"
              >
                <FileDown className="w-4 h-4" />
                <span>{lang === 'pt' ? 'Baixar Currículo PDF' : 'Download CV PDF'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
