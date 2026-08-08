/**
 * @file AdContainer.tsx
 * @description Container responsivo de Anúncios. Preserva o layout do portfólio,
 * evita estouro horizontal em dispositivos móveis e provê rótulo discreto de transparência.
 */

import React from 'react';
import AdBanner, { AdBannerProps } from './AdBanner';
import { ADS_CONFIG } from '../../config/ads.config';

interface AdContainerProps extends AdBannerProps {
  showLabel?: boolean;
  containerClassName?: string;
  lang?: 'pt' | 'en';
}

export default function AdContainer({
  adSlot,
  format = 'auto',
  responsive = true,
  className = '',
  containerClassName = '',
  showLabel = true,
  lang = 'pt',
  network,
}: AdContainerProps) {
  if (!ADS_CONFIG.enabled) {
    return null;
  }

  return (
    <div
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-12 overflow-hidden flex flex-col items-center justify-center transition-all ${containerClassName}`}
    >
      <div className="w-full relative glass-panel p-2 sm:p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors flex flex-col items-center min-h-[90px] justify-center">
        {showLabel && (
          <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-slate-800/60 text-[10px] font-mono text-slate-500 tracking-widest uppercase select-none">
            <span>{lang === 'pt' ? 'PUBLICIDADE' : 'ADVERTISEMENT'}</span>
            <span className="text-slate-600">GOOGLE ADSENSE</span>
          </div>
        )}

        <AdBanner
          adSlot={adSlot}
          format={format}
          responsive={responsive}
          className={className}
          network={network}
        />
      </div>
    </div>
  );
}
