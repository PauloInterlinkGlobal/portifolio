/**
 * @file App.tsx
 * @description Aplicação Principal Portfólio 3D Interativo e Currículo de Paulo Bunga.
 */

import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Language, Theme3DMode } from './types';
import CanvasContainer from './components/3d/CanvasContainer';
import CustomCursor from './components/ui/CustomCursor';
import Loader from './components/ui/Loader';
import Navbar from './components/ui/Navbar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ServicesSection from './components/sections/ServicesSection';
import AchievementsSection from './components/sections/AchievementsSection';
import CertificatesSection from './components/sections/CertificatesSection';
import GithubSection from './components/sections/GithubSection';
import ContactSection from './components/sections/ContactSection';
import FooterSection from './components/sections/FooterSection';
import AdContainer from './components/ads/AdContainer';
import PrivacyModal from './components/ui/PrivacyModal';
import { ADS_CONFIG } from './config/ads.config';
import { soundEngine } from './utils/audio';
import { Palette, Sparkles } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Language>('pt');
  const [currentSection, setCurrentSection] = useState<string>('hero');
  const [themeMode, setThemeMode] = useState<Theme3DMode>('cyber-cyan');
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Inicializa Lenis Smooth Scroll para movimento cinematográfico
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Observador de Seção Visível para atualizar câmera 3D e cabeçalho
  useEffect(() => {
    const sectionIds = [
      'hero',
      'about',
      'skills',
      'experience',
      'projects',
      'services',
      'achievements',
      'certificates',
      'github',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setCurrentSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const themes: { id: Theme3DMode; name: string; color: string }[] = [
    { id: 'cyber-cyan', name: 'Cyber Cyan', color: '#00E5FF' },
    { id: 'matrix-green', name: 'Matrix Emerald', color: '#00FF88' },
    { id: 'neon-purple', name: 'Neon Purple', color: '#6C63FF' },
    { id: 'deep-void', name: 'Deep Azure', color: '#38BDF8' },
  ];

  return (
    <div className="relative bg-[#030712] text-slate-100 min-h-screen selection:bg-[#00E5FF] selection:text-black font-sans antialiased overflow-x-hidden">
      {/* Preloader Cinematográfico */}
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <>
          {/* Cursor Magnético Futurista */}
          <CustomCursor />

          {/* Fundo de Tela 3D em Canvas (Three.js / R3F) */}
          <CanvasContainer currentSection={currentSection} themeMode={themeMode} />

          {/* Cabeçalho / Menu de Navegação Flutuante */}
          <Navbar
            currentSection={currentSection}
            lang={lang}
            onLanguageChange={setLang}
            themeMode={themeMode}
            onThemeChange={setThemeMode}
          />

          {/* Seletor de Tema 3D Flutuante no Canto Inferior Esquerdo */}
          <div className="fixed bottom-6 left-6 z-30 hidden sm:block">
            <div className="relative">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setShowThemePicker(!showThemePicker);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className="p-3 rounded-full glass-panel border border-[#00E5FF]/30 text-[#00E5FF] hover:border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all flex items-center gap-2"
                title="Change 3D Cyber Atmosphere"
              >
                <Palette className="w-5 h-5" />
              </button>

              {showThemePicker && (
                <div className="absolute bottom-14 left-0 glass-panel-glow p-3 rounded-2xl border border-[#00E5FF]/40 space-y-2 min-w-[160px] shadow-2xl animate-float">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-1">
                    3D Atmosphere
                  </div>
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        soundEngine.playClick();
                        setThemeMode(t.id);
                        setShowThemePicker(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-2 transition-all ${
                        themeMode === t.id
                          ? 'bg-slate-900 font-bold text-white border border-[#00E5FF]'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: t.color }}
                      />
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Conteúdo Principal do Portfólio (1 Coluna Única Contínua) */}
          <main className="relative z-10">
            <HeroSection lang={lang} />
            <AboutSection lang={lang} />

            {/* ESPAÇO PUBLICITÁRIO ÁREA 1: Entre Sobre e Habilidades */}
            <AdContainer adSlot={ADS_CONFIG.slots.betweenSections} lang={lang} />

            <SkillsSection lang={lang} />
            <ExperienceSection lang={lang} />
            <ProjectsSection lang={lang} />

            {/* ESPAÇO PUBLICITÁRIO ÁREA 2: Entre Projetos e Serviços */}
            <AdContainer adSlot={ADS_CONFIG.slots.projects} lang={lang} />

            <ServicesSection lang={lang} />
            <AchievementsSection lang={lang} />
            <CertificatesSection lang={lang} />
            <GithubSection lang={lang} />
            <ContactSection lang={lang} />

            {/* ESPAÇO PUBLICITÁRIO ÁREA 3: Antes do Rodapé */}
            <AdContainer adSlot={ADS_CONFIG.slots.beforeFooter} lang={lang} />
          </main>

          {/* Rodapé Futurista com Suporte a Modal de Privacidade */}
          <FooterSection lang={lang} onOpenPrivacy={() => setShowPrivacyModal(true)} />

          {/* Modal de Política de Privacidade e Cookies */}
          <PrivacyModal
            isOpen={showPrivacyModal}
            onClose={() => setShowPrivacyModal(false)}
            lang={lang}
          />
        </>
      )}
    </div>
  );
}
