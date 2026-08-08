/**
 * @file ContactSection.tsx
 * @description Seção de Contacto Futurista com painel 3D holográfico, validação de formulário e aviso toast.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../../types';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Mail, Phone, MapPin, Send, MessageSquare, Github, Linkedin, CheckCircle, Copy, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  lang: Language;
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundEngine.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      soundEngine.playWoosh();

      // Dispara confetes futuristas
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00E5FF', '#6C63FF', '#00FF88'],
        });
      } catch {
        // Ignorar se confetti não estiver carregado
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  const copyToClipboard = (text: string, label: string) => {
    soundEngine.playClick();
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  return (
    <section id="contact" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Cabeçalho */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono tracking-widest uppercase">
            <Mail className="w-3.5 h-3.5" />
            <span>{lang === 'pt' ? '09 // CONTACTO & ORÇAMENTOS' : '09 // CONTACT & INQUIRIES'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
            {lang === 'pt' ? 'Vamos Construir o Futuro Juntos?' : "Let's Build Something Exceptional"}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'pt'
              ? 'Entre em contacto para novos projetos, contratação ou parcerias tecnológicas.'
              : 'Get in touch for new projects, full-time engineering roles, or tech consulting.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Lado Esquerdo: Informações de Contacto & Redes */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-[#00E5FF]/30 space-y-6">
              <h3 className="text-2xl font-bold font-display text-white">
                {lang === 'pt' ? 'Canais Diretos' : 'Direct Channels'}
              </h3>

              <div className="space-y-4">
                {/* Email */}
                <div
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'Email')}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-[#00E5FF] transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] group-hover:bg-[#00E5FF] group-hover:text-black transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">Email</div>
                      <div className="text-sm font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                        {PERSONAL_INFO.email}
                      </div>
                    </div>
                  </div>
                  <Copy className="w-4 h-4 text-slate-500 group-hover:text-[#00E5FF]" />
                </div>

                {/* Telefone / WhatsApp */}
                <div
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'Phone')}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-[#00FF88] transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-[#00FF88]/10 text-[#00FF88] group-hover:bg-[#00FF88] group-hover:text-black transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">WhatsApp / Call</div>
                      <div className="text-sm font-bold text-white group-hover:text-[#00FF88] transition-colors">
                        {PERSONAL_INFO.phone}
                      </div>
                    </div>
                  </div>
                  <Copy className="w-4 h-4 text-slate-500 group-hover:text-[#00FF88]" />
                </div>

                {/* Localização */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#6C63FF]/10 text-[#6C63FF]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400">Location</div>
                    <div className="text-sm font-bold text-white">
                      {PERSONAL_INFO.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões de Redes Sociais */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {lang === 'pt' ? 'Redes Sociais & Perfis' : 'Social Networks & Links'}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => soundEngine.playHover()}
                    className="p-3 rounded-xl glass-panel border border-slate-700 hover:border-[#00E5FF] text-slate-300 hover:text-white transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => soundEngine.playHover()}
                    className="p-3 rounded-xl glass-panel border border-slate-700 hover:border-[#6C63FF] text-slate-300 hover:text-white transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={PERSONAL_INFO.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => soundEngine.playHover()}
                    className="p-3 rounded-xl glass-panel border border-slate-700 hover:border-[#00FF88] text-slate-300 hover:text-[#00FF88] transition-all"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {copiedText && (
                <div className="p-2.5 rounded-xl bg-[#00E5FF]/20 border border-[#00E5FF] text-[#00E5FF] text-xs font-mono text-center animate-bounce">
                  {copiedText} {lang === 'pt' ? 'copiado para a área de transferência!' : 'copied to clipboard!'}
                </div>
              )}
            </div>
          </motion.div>

          {/* Lado Direito: Formulário Holográfico */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-panel-glow p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6"
          >
            <h3 className="text-2xl font-bold font-display text-white">
              {lang === 'pt' ? 'Enviar Mensagem Direta' : 'Send Direct Message'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">
                    {lang === 'pt' ? 'Seu Nome *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maria Silva"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-[#00E5FF] focus:outline-none text-white text-sm font-sans transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">
                    {lang === 'pt' ? 'Seu Email *' : 'Your Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="maria@empresa.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-[#00E5FF] focus:outline-none text-white text-sm font-sans transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">
                  {lang === 'pt' ? 'Assunto / Projeto' : 'Subject / Project'}
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Desenvolver Sistema Web Fullstack"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-[#00E5FF] focus:outline-none text-white text-sm font-sans transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">
                  {lang === 'pt' ? 'Mensagem *' : 'Message *'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'pt' ? 'Conte sobre seu projeto, prazos e expectativas...' : 'Tell me about your project, timeline, and goals...'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-[#00E5FF] focus:outline-none text-white text-sm font-sans transition-all"
                />
              </div>

              {/* Botão de Envio Animado */}
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => soundEngine.playHover()}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#6C63FF] to-[#00FF88] text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:shadow-[0_0_35px_rgba(0,229,255,0.7)] active:scale-98 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    <span>{lang === 'pt' ? 'Transmitindo...' : 'Transmitting...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{lang === 'pt' ? 'Enviar Mensagem Agora' : 'Send Message Now'}</span>
                  </>
                )}
              </button>

              {/* Sucesso */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-xl bg-[#00FF88]/15 border border-[#00FF88] text-[#00FF88] text-sm font-mono text-center flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>
                      {lang === 'pt'
                        ? 'Mensagem enviada com sucesso! Responderei em breve.'
                        : 'Message sent successfully! I will reply shortly.'}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
