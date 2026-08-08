/**
 * @file PrivacyModal.tsx
 * @description Modal de Política de Privacidade e Cookies em estilo Cyberpunk.
 * Necessário para conformidade com o Google AdSense e regulamentações (GDPR, LGPD).
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Cookie, X, CheckCircle, ExternalLink } from 'lucide-react';
import { Language } from '../../types';
import { soundEngine } from '../../utils/audio';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export default function PrivacyModal({ isOpen, onClose, lang }: PrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop escuro com blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl glass-panel-glow p-6 sm:p-8 rounded-3xl border border-[#00E5FF]/40 bg-[#030712]/95 text-white shadow-2xl space-y-6 z-10 max-h-[85vh] overflow-y-auto"
        >
          {/* Cabeçalho */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold font-display text-xl text-white">
                  {lang === 'pt' ? 'Política de Privacidade & Cookies' : 'Privacy Policy & Cookies'}
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  {lang === 'pt' ? 'Transparência de dados e monetização' : 'Data transparency and monetization rules'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Conteúdo */}
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-mono font-bold text-[#00E5FF] text-xs">
                <Cookie className="w-4 h-4 text-[#00E5FF]" />
                <span>{lang === 'pt' ? 'USO DE COOKIES E PUBLICIDADE' : 'USE OF COOKIES & ADVERTISING'}</span>
              </div>
              <p>
                {lang === 'pt'
                  ? 'Este site utiliza cookies e identificadores de terceiros, incluindo o Google AdSense, para veicular anúncios relevantes aos visitantes. Fornecedores de terceiros utilizam cookies para veicular anúncios com base em visitas anteriores dos usuários a este e outros sites.'
                  : 'This website uses third-party cookies and identifiers, including Google AdSense, to serve relevant ads. Third-party vendors use cookies to serve ads based on prior visits to this and other websites.'}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white font-mono text-xs uppercase tracking-wider text-[#00FF88]">
                {lang === 'pt' ? '1. Coleta e Finalidade de Dados' : '1. Data Collection & Purpose'}
              </h4>
              <p>
                {lang === 'pt'
                  ? 'Nenhum dado pessoal sensível é vendido ou divulgado diretamente pelo proprietário do site. As tecnologias de anúncios do Google podem utilizar cookies do DoubleClick e de personalização para melhorar a experiência do usuário.'
                  : 'No sensitive personal data is directly sold or disclosed by the website owner. Google ad technology may use DoubleClick cookies and personalization features to improve user experience.'}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white font-mono text-xs uppercase tracking-wider text-[#6C63FF]">
                {lang === 'pt' ? '2. Preferências do Usuário' : '2. User Preferences'}
              </h4>
              <p>
                {lang === 'pt'
                  ? 'Você pode desativar a publicidade personalizada acessando as Configurações de Anúncios do Google ou visitando www.aboutads.info para gerenciar preferências de fornecedores de terceiros.'
                  : 'You can opt out of personalized advertising by visiting Google Ad Settings or by accessing www.aboutads.info to manage third-party preferences.'}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#00E5FF] hover:underline"
              >
                <span>Google Privacy & Terms</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span>{lang === 'pt' ? 'Atualizado em 2026' : 'Updated 2026'}</span>
            </div>
          </div>

          {/* Botão de Fechar / Aceitar */}
          <div className="pt-2">
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#6C63FF] text-slate-950 font-extrabold text-xs font-mono uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Entendido e Fechar' : 'Understood & Close'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
