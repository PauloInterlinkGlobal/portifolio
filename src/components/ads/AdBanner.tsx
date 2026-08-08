/**
 * @file AdBanner.tsx
 * @description Componente abstrato e reutilizável de Banners de Anúncios.
 * Suporta múltiplos provedores (Google AdSense por padrão) e possui arquitetura preparada
 * para futuras expansões para Adsterra, PropellerAds, Media.net etc.
 */

import React from 'react';
import GoogleAdSense from './GoogleAdSense';
import { ADS_CONFIG } from '../../config/ads.config';

export interface AdBannerProps {
  adSlot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
  network?: 'google_adsense' | 'adsterra' | 'propellerads';
  label?: string;
}

export default function AdBanner({
  adSlot,
  format = 'auto',
  responsive = true,
  className = '',
  network = ADS_CONFIG.activeNetwork,
}: AdBannerProps) {
  if (!ADS_CONFIG.enabled) {
    return null;
  }

  switch (network) {
    case 'google_adsense':
    default:
      return (
        <GoogleAdSense
          adSlot={adSlot}
          format={format}
          responsive={responsive}
          className={className}
        />
      );

    case 'adsterra':
      // Arquitetura preparada para integração Adsterra
      return (
        <div className="text-center p-4 text-xs font-mono text-slate-500 border border-slate-800 rounded-xl">
          [Adsterra Banner Placeholder - Slot: {adSlot}]
        </div>
      );

    case 'propellerads':
      // Arquitetura preparada para integração PropellerAds
      return (
        <div className="text-center p-4 text-xs font-mono text-slate-500 border border-slate-800 rounded-xl">
          [PropellerAds Banner Placeholder - Slot: {adSlot}]
        </div>
      );
  }
}
