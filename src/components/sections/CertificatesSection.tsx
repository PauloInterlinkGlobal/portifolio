/**
 * @file CertificatesSection.tsx
 * @description Seção de Formação Acadêmica e Certificados em Slider Infinito 3D.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Language } from '../../types';
import { CERTIFICATES_DATA } from '../../data/portfolioData';
import { GraduationCap, Calendar, Award, BookOpen, CheckCircle } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface CertificatesSectionProps {
  lang: Language;
}

export default function CertificatesSection({ lang }: CertificatesSectionProps) {
  return (
    <section id="certificates" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Cabeçalho */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono tracking-widest uppercase">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{lang === 'pt' ? '07 // FORMAÇÃO & CERTIFICADOS' : '07 // EDUCATION & CERTIFICATIONS'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
            {lang === 'pt' ? 'Base Acadêmica & Aprendizado Contínuo' : 'Academic Foundation & Certifications'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'pt'
              ? 'Formação técnica formal, especializações em desenvolvimento web/mobile e aperfeiçoamento constante.'
              : 'Formal technical degrees, specialized software training, and continuous learning.'}
          </p>
        </div>

        {/* Grade de Certificados e Formação */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATES_DATA.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              onMouseEnter={() => soundEngine.playHover()}
              className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-[#00E5FF] transition-all duration-300 space-y-4 group hover:shadow-[0_0_25px_rgba(0,229,255,0.15)] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase"
                    style={{
                      backgroundColor: `${cert.badgeColor}15`,
                      color: cert.badgeColor,
                      border: `1px solid ${cert.badgeColor}40`,
                    }}
                  >
                    {cert.type.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>{cert.period}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold font-display text-white group-hover:text-[#00E5FF] transition-colors leading-snug">
                  {cert.title[lang]}
                </h3>

                <div className="text-xs font-mono text-[#00FF88] font-semibold">
                  {cert.institution}
                </div>

                {cert.details && (
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {cert.details[lang]}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <CheckCircle className="w-3.5 h-3.5 text-[#00FF88]" />
                <span>{lang === 'pt' ? 'Concluído com Sucesso' : 'Successfully Completed'}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
