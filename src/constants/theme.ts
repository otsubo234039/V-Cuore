// src/constants/theme.ts

export const THEME_CONFIG = {
  // 🛡️ 初期値：司令官指定の BE2152 を死守
  DEFAULT_COLOR: 'BE2152',
  
  // 🌸 透過率：20%（16進数で 33）
  ALPHA_20: '33',
  
  PROTOCOL_VERSION: 'v8.8-STABLE',
} as const;

export const toSafeHex = (color: string): string => {
  const clean = color.replace('#', '');
  return /^[0-9a-fA-F]{3,6}$/.test(clean) ? `#${clean}` : `#${THEME_CONFIG.DEFAULT_COLOR}`;
};