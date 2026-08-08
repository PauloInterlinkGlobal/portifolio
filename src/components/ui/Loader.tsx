/**
 * @file Loader.tsx
 * @description Carregador inicial cinematográfico 3D com porcentagem animada, som e logotipo.
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Terminal } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [soundChoice, setSoundChoice] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (soundChoice) {
              soundEngine.setSoundEnabled(true);
              soundEngine.playWoosh();
            }
            onComplete();
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete, soundChoice]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-white selection:bg-[#00E5FF]"
    >
      {/* Luzes de Fundo Animadas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00E5FF]/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 space-y-8 text-center">
        {/* Logotipo Inicial PAULO BUNGA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono tracking-widest uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive 3D Resume</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#00E5FF]">
            PAULO BUNGA
          </h1>
          <p className="text-xs font-mono text-slate-400">
            FULL STACK DEVELOPER • ANGOLA
          </p>
        </motion.div>

        {/* Anel 3D de Carregamento */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="currentColor"
              strokeWidth="4"
              className="text-slate-800/80"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="url(#loaderGradient)"
              strokeWidth="4"
              strokeDasharray={264}
              strokeDashoffset={264 - (264 * progress) / 100}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-150 ease-out"
            />
            <defs>
              <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="50%" stopColor="#6C63FF" />
                <stop offset="100%" stopColor="#00FF88" />
              </linearGradient>
            </defs>
          </svg>

          {/* Porcentagem no Centro */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold font-mono text-white text-glow-cyan">
              {progress}%
            </span>
          </div>
        </div>

        {/* Barra de Progresso Adicional */}
        <div className="w-full space-y-2">
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00E5FF] via-[#6C63FF] to-[#00FF88]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>Initializing 3D World...</span>
            <span>60 FPS Target</span>
          </div>
        </div>

        {/* Opção de Áudio Futurista */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => {
            setSoundChoice(!soundChoice);
            soundEngine.setSoundEnabled(!soundChoice);
          }}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-[#00E5FF] transition-colors py-1 px-3 rounded-full border border-slate-800 bg-slate-950/50"
        >
          {soundChoice ? (
            <>
              <Volume2 className="w-4 h-4 text-[#00E5FF]" />
              <span>Cyber SFX Enabled</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-500" />
              <span>SFX Muted</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
