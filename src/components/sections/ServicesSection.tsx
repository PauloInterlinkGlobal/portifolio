/**
 * @file ServicesSection.tsx
 * @description Seção de Serviços interativa com cards de vidro cibernético e efeitos de hover.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../../types';
import { SERVICES_DATA } from '../../data/portfolioData';
import { LayoutGrid, Smartphone, Server, Boxes, CheckCircle2, ArrowRight } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface ServicesSectionProps {
  lang: Language;
}

export default function ServicesSection({ lang }: ServicesSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'LayoutGrid': return LayoutGrid;
      case 'Smartphone': return Smartphone;
      case 'Server': return Server;
      case 'Boxes': return Boxes;
      default: return LayoutGrid;
    }
  };

  return (
    <section id="services" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Cabeçalho */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono tracking-widest uppercase">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{lang === 'pt' ? '05 // SERVIÇOS PRESTADOS' : '05 // SERVICES OFFERED'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
            {lang === 'pt' ? 'Soluções Tecnológicas Especializadas' : 'Specialized Engineering Services'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'pt'
              ? 'Desenvolvimento sob medida projetado para impulsionar o seu negócio com performance e segurança.'
              : 'Custom software solutions designed to scale your business with speed, security, and beauty.'}
          </p>
        </div>

        {/* Grade de Cards de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_DATA.map((service, idx) => {
            const Icon = getIcon(service.icon);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                onMouseEnter={() => soundEngine.playHover()}
                className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-[#00E5FF]/60 transition-all duration-300 space-y-6 group hover:shadow-[0_0_35px_rgba(0,229,255,0.15)] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Ícone e Título */}
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-[#00E5FF] group-hover:bg-[#00E5FF] group-hover:text-black group-hover:scale-110 transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold font-display text-white group-hover:text-[#00E5FF] transition-colors">
                      {service.title[lang]}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {service.description[lang]}
                  </p>

                  {/* Bullet Points de Entregáveis */}
                  <ul className="space-y-2.5 pt-2">
                    {service.features[lang].map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#00FF88] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags da Stack */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {service.techList.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-900 text-slate-400 border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      soundEngine.playClick();
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#00E5FF] group-hover:translate-x-1 transition-transform"
                  >
                    <span>{lang === 'pt' ? 'Solicitar' : 'Request'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
