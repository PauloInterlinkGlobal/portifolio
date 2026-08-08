/**
 * @file GoogleAdSense.tsx
 * @description Componente oficial de integração com Google AdSense.
 * Gerencia o carregamento assíncrono do script oficial, prevenção de requisições duplicadas,
 * suporte responsivo e exibição segura de placeholders em modo de desenvolvimento.
 */

import React, { useEffect, useRef, useState } from 'react';
import { ADS_CONFIG, isRealAdSenseClient } from '../../config/ads.config';
import { Terminal, ShieldCheck, Sparkles } from 'lucide-react';

interface GoogleAdSenseProps {
  adSlot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export default function GoogleAdSense({
  adSlot,
  format = 'auto',
  responsive = true,
  className = '',
  style = { display: 'block' },
}: GoogleAdSenseProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const clientId = ADS_CONFIG.adsenseClientId;
  const isRealClient = isRealAdSenseClient(clientId);
  const isDev = ADS_CONFIG.showDevPlaceholder;

  // Carrega o script oficial do Google AdSense
  useEffect(() => {
    if (!ADS_CONFIG.enabled || !isRealClient) return;

    const scriptId = 'google-adsense-script';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
      scriptTag.async = true;
      scriptTag.crossOrigin = 'anonymous';
      scriptTag.onload = () => setScriptLoaded(true);
      document.head.appendChild(scriptTag);
    } else {
      setScriptLoaded(true);
    }
  }, [clientId, isRealClient]);

  // Executa o push({}) do adsbygoogle com segurança
  useEffect(() => {
    if (!ADS_CONFIG.enabled || !isRealClient || !adSlot || pushedRef.current) return;

    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        pushedRef.current = true;
      }
    } catch (err) {
      console.warn('AdSense push notice:', err);
    }
  }, [scriptLoaded, isRealClient, adSlot]);

  // Se os anúncios estiverem desativados, não renderiza nada
  if (!ADS_CONFIG.enabled) {
    return null;
  }

  // Se estiver em MODO DESENVOLVIMENTO ou se o Client ID/Slot não for real, exibe o Placeholder Cyberpunk
  if (!isRealClient || !adSlot) {
    if (!isDev) return null; // Em produção sem credenciais reais: retorne nulo silenciosamente

    return (
      <div className="w-full my-6 p-4 rounded-2xl glass-panel border border-[#00E5FF]/20 bg-slate-950/60 text-slate-300 transition-all flex flex-col items-center justify-center text-center space-y-2 select-none">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-[#00E5FF]/40 text-[#00E5FF] text-[11px] font-mono uppercase tracking-wider">
          <Terminal className="w-3.5 h-3.5" />
          <span>Espaço Publicitário • Modo de Desenvolvimento (AdSense)</span>
        </div>
        <p className="text-xs text-slate-400 font-mono max-w-lg">
          Para ver anúncios reais em produção, insira seu <strong className="text-white">VITE_ADSENSE_CLIENT_ID</strong> (ex: ca-pub-XXXXXXXX) e o <strong className="text-white">VITE_AD_SLOT_*</strong> no arquivo <code className="text-[#00E5FF]">.env</code>.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-mono text-slate-500 pt-1">
          <span>Client ID: <code className="text-slate-400">{clientId || 'Não configurado'}</code></span>
          <span>•</span>
          <span>Ad Slot: <code className="text-slate-400">{adSlot || 'Não definido'}</code></span>
          <span>•</span>
          <span>Format: <code className="text-slate-400">{format}</code></span>
        </div>
      </div>
    );
  }

  // Em Produção com credenciais válidas: Renderiza o elemento <ins> oficial
  return (
    <div className={`w-full overflow-hidden flex justify-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={style}
        data-ad-client={clientId}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
