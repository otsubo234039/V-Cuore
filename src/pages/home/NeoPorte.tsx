// src/pages/home/NeoPorte.tsx
import React from 'react';

interface NeoPorteProps { viewMode: 'web' | 'mobile'; }

export const NeoPorte: React.FC<NeoPorteProps> = ({ viewMode }) => {
  // 🚀 粛清 1: ハードコードされた色の定義をパージ。
  // 全ては var(--oshi-primary) という名の「実弾」に委ねる。

  return (
    <div className={`absolute flex items-center justify-center transition-all duration-1000 pointer-events-none overflow-visible z-[-1] ${
      viewMode === 'web' 
        ? 'w-[40%] aspect-square top-[4%] right-[2%] opacity-60' 
        : 'w-[60%] aspect-square top-[18%] right-[2%] opacity-70'
    }`}>
      
      {/* 1. ポータルの基底：bg-oshi-primary-20 を活用 */}
      <div className="absolute w-[130%] h-[130%] bg-oshi-primary-20 rounded-full blur-[100px] animate-pulse" />

      {/* 2. 扉本体 */}
      <div className="relative w-full h-full animate-portal-breathe">
        <svg 
          viewBox="0 0 400 400" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
          // 🚀 影の色も変数を参照して同期。
          style={{ filter: `drop-shadow(0 0 20px var(--oshi-primary-20))` }}
        >
          <defs>
            <filter id="portalGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* 🚀 粛清 2: ポータル専用グラデーションを var(--oshi-primary) に同期。
               開始と終了を同じ色（あるいは微差）にすることで、純粋な「推し色」で回転させる。 */}
            <linearGradient id="portalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--oshi-primary)" />
              <stop offset="100%" stopColor="var(--oshi-primary)" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          <g filter="url(#portalGlow)">
            {/* 外枠：時計回り（CW） */}
            <path 
              d="M 200 30 L 350 115 L 350 285 L 200 370 L 50 285 L 50 115 Z" 
              stroke="url(#portalGrad)" 
              strokeWidth="12" 
              strokeLinejoin="round"
              fill="none"
              className="animate-portal-spin-slow"
              style={{ transformOrigin: 'center' }}
            />

            {/* 内枠：反時計回り（CCW） */}
            <path 
              d="M 200 80 L 300 135 L 300 265 L 200 320 L 100 265 L 100 135 Z" 
              stroke="white" 
              strokeWidth="2" 
              strokeDasharray="20 15"
              // 🚀 粛清 3: 内側の塗りも 20% 透過の気配と同期。
              fill="var(--oshi-primary-20)"
              className="animate-portal-spin-reverse"
              style={{ transformOrigin: 'center' }}
            />

            {/* コア（反時計回り ＋ パルス発光） */}
            <path 
              d="M 200 150 L 245 175 L 245 225 L 200 250 L 155 225 L 155 175 Z" 
              fill="url(#portalGrad)" 
              className="animate-portal-core"
              style={{ transformOrigin: 'center' }}
            />
          </g>
        </svg>
      </div>

      {/* 3. V-SYNC同期粒子（ここは白のままで光の粒子感を出す） */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-data-fly opacity-40"
            style={{
              top: '50%',
              left: '50%',
              animationDelay: `${i * 1.2}s`,
              transform: `rotate(${i * 72}deg)`
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes portal-breathe {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.03); opacity: 1; }
        }
        @keyframes portal-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes portal-spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes portal-core-reverse {
          0% { transform: rotate(0deg) scale(1); opacity: 0.8; }
          50% { transform: rotate(-180deg) scale(1.1); opacity: 1; }
          100% { transform: rotate(-360deg) scale(1); opacity: 0.8; }
        }
        @keyframes data-fly {
          0% { transform: rotate(var(--tw-rotate)) translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: rotate(var(--tw-rotate)) translateY(-160px) scale(0); opacity: 0; }
        }
        .animate-portal-spin-slow { animation: portal-spin-slow 40s linear infinite; }
        .animate-portal-spin-reverse { animation: portal-spin-reverse 25s linear infinite; }
        .animate-portal-core { animation: portal-core-reverse 15s linear infinite; }
        .animate-data-fly { animation: data-fly 6s ease-out infinite; }
      `}} />
    </div>
  );
};