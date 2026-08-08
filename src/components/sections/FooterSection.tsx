/**
 * @file FooterSection.tsx
 * @description Rodapé futurista com relógio digital de Luanda, status online e botão de retorno ao topo.
 */

import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { soundEngine } from '../../utils/audio';
import { ArrowUp, Clock, Globe, Terminal, Sparkles } from 'lucide-react';

interface FooterSectionProps {
  lang: Language;
  onOpenPrivacy?: () => void;
}

export default function FooterSection({ lang, onOpenPrivacy }: FooterSectionProps) {
  const [luandaTime, setLuandaTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Luanda',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setLuandaTime(new Date().toLocaleTimeString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-[#030712]/90 backdrop-blur-xl py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Marca / Identidade */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-display font-extrabold text-xl text-white">PAULO BUNGA</span>
              <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
            </div>
            <p className="text-xs font-mono text-slate-400">
              Full Stack Developer • Luanda, Angola
            </p>
          </div>

          {/* Relógio Digital de Luanda & Status */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="px-4 py-2 rounded-xl glass-panel border border-slate-800 flex items-center gap-2 text-xs font-mono text-slate-300">
              <Clock className="w-4 h-4 text-[#00E5FF]" />
              <span>Luanda Time: <strong className="text-white">{luandaTime || '19:56'}</strong> (WAT)</span>
            </div>

            <div className="px-4 py-2 rounded-xl glass-panel border border-slate-800 flex items-center gap-2 text-xs font-mono text-[#00FF88]">
              <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
              <span>System Status: 100% Operational</span>
            </div>
          </div>

          {/* Botão de Retorno ao Topo */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundEngine.playHover()}
            className="p-3 rounded-full glass-panel border border-slate-700 text-[#00E5FF] hover:border-[#00E5FF] hover:scale-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)]"
            title="Return to Top"
            aria-label="Return to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Paulo Bunga. {lang === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {onOpenPrivacy && (
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenPrivacy();
                }}
                className="text-[#00E5FF] hover:underline cursor-pointer"
              >
                {lang === 'pt' ? 'Privacidade & Cookies' : 'Privacy & Cookies'}
              </button>
            )}
            <span>•</span>
            <span>
              {lang === 'pt' ? 'Construído com React 19, Three.js & Tailwind CSS' : 'Engineered with React 19, Three.js & Tailwind CSS'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
