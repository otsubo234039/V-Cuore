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

type Rgb = { r: number; g: number; b: number };

const hexToRgb = (hex: string): Rgb => {
  const clean = hex.replace('#', '');
  const normalized = clean.length === 3
    ? clean.split('').map((c) => `${c}${c}`).join('')
    : clean.padEnd(6, '0').slice(0, 6);

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
};

const rgbToHex = ({ r, g, b }: Rgb): string => {
  const toHex = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const rgbToHsl = ({ r, g, b }: Rgb): { h: number; s: number; l: number } => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rn) h = ((gn - bn) / delta) % 6;
    else if (max === gn) h = (bn - rn) / delta + 2;
    else h = (rn - gn) / delta + 4;
  }

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return { h: (h * 60 + 360) % 360, s, l };
};

const hslToRgb = (h: number, s: number, l: number): Rgb => {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));

  let rn = 0;
  let gn = 0;
  let bn = 0;

  if (0 <= hp && hp < 1) {
    rn = c; gn = x;
  } else if (1 <= hp && hp < 2) {
    rn = x; gn = c;
  } else if (2 <= hp && hp < 3) {
    gn = c; bn = x;
  } else if (3 <= hp && hp < 4) {
    gn = x; bn = c;
  } else if (4 <= hp && hp < 5) {
    rn = x; bn = c;
  } else {
    rn = c; bn = x;
  }

  const m = l - c / 2;
  return {
    r: (rn + m) * 255,
    g: (gn + m) * 255,
    b: (bn + m) * 255,
  };
};

const toLinear = (channel: number): number => {
  const v = channel / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

const relativeLuminance = (rgb: Rgb): number => {
  const r = toLinear(rgb.r);
  const g = toLinear(rgb.g);
  const b = toLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrastRatio = (a: Rgb, b: Rgb): number => {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
};

export const toReadableHex = (color: string, isDarkMode: boolean, minContrast = 4.5): string => {
  const safe = toSafeHex(color);
  const bg = isDarkMode ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 };
  const original = hexToRgb(safe);

  if (contrastRatio(original, bg) >= minContrast) {
    return safe;
  }

  const { h, s, l } = rgbToHsl(original);
  let candidateL = l;

  if (isDarkMode) {
    let low = l;
    let high = 1;

    for (let i = 0; i < 20; i += 1) {
      const mid = (low + high) / 2;
      const midRgb = hslToRgb(h, s, mid);
      if (contrastRatio(midRgb, bg) >= minContrast) {
        candidateL = mid;
        high = mid;
      } else {
        low = mid;
      }
    }
  } else {
    let low = 0;
    let high = l;

    for (let i = 0; i < 20; i += 1) {
      const mid = (low + high) / 2;
      const midRgb = hslToRgb(h, s, mid);
      if (contrastRatio(midRgb, bg) >= minContrast) {
        candidateL = mid;
        low = mid;
      } else {
        high = mid;
      }
    }
  }

  return rgbToHex(hslToRgb(h, s, candidateL));
};