/// <reference types="vite/client" />

/**
 * @file ads.config.ts
 * @description Configuração central do Sistema de Anúncios (Monetização).
 * Suporta Google AdSense e arquitetura extensível para outras redes (Adsterra, PropellerAds, etc).
 */

export interface AdSystemConfig {
  /** Indica se os anúncios estão globalmente ativados */
  enabled: boolean;
  /** Identificador de cliente oficial do Google AdSense (ex: ca-pub-XXXXXXXXXXXXXXXX) */
  adsenseClientId: string;
  /** Blocos de Anúncio configurados por posição na interface */
  slots: {
    betweenSections: string;
    beforeFooter: string;
    projects: string;
  };
  /** Rede de anúncios ativa por padrão */
  activeNetwork: 'google_adsense' | 'adsterra' | 'propellerads';
  /** Se deve exibir o card de demonstração em modo de desenvolvimento */
  showDevPlaceholder: boolean;
}

const envMeta = (import.meta as unknown as { env?: Record<string, any> }).env || {};

const getEnvVar = (key: string, fallback: string = ''): string => {
  return (envMeta[key] as string) || fallback;
};

export const ADS_CONFIG: AdSystemConfig = {
  enabled: getEnvVar('VITE_ADS_ENABLED', 'true') !== 'false',
  adsenseClientId: getEnvVar('VITE_ADSENSE_CLIENT_ID', 'ca-pub-7181975776917703'),
  slots: {
    betweenSections: getEnvVar('VITE_AD_SLOT_BETWEEN_SECTIONS', ''),
    beforeFooter: getEnvVar('VITE_AD_SLOT_BEFORE_FOOTER', ''),
    projects: getEnvVar('VITE_AD_SLOT_PROJECTS', ''),
  },
  activeNetwork: (getEnvVar('VITE_AD_NETWORK', 'google_adsense') as AdSystemConfig['activeNetwork']),
  showDevPlaceholder: envMeta.DEV ?? true,
};

/**
 * Verifica se o ID do AdSense é válido e real (não é placeholder ou vazio).
 */
export const isRealAdSenseClient = (clientId: string = ADS_CONFIG.adsenseClientId): boolean => {
  if (!clientId) return false;
  const isPlaceholder =
    clientId === 'ca-pub-0000000000000000' ||
    clientId === 'ca-pub-XXXXXXXXXXXX' ||
    clientId.includes('XXXX') ||
    clientId.includes('00000000');
  return clientId.startsWith('ca-pub-') && !isPlaceholder;
};
