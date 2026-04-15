// src/pages/home/VspoTarget.tsx
import React from 'react';

interface VspoTargetProps {
  viewMode: 'web' | 'mobile';
}

export const VspoTarget: React.FC<VspoTargetProps> = ({ viewMode }) => {
  // 🚀 粛清 1: ハードコードされた色の定義をパージ。
  // 全ては var(--oshi-primary) という名の「実弾」に委ねる。

  return (
    <div className={`absolute flex items-center justify-center transition-all duration-1000 pointer-events-none overflow-visible z-0 ${
      viewMode === 'web' 
        ? 'bottom-[5%] right-[3%] w-[18%] aspect-square' 
        : 'bottom-[12%] right-[5%] w-[35%] aspect-square'
    }`}>
      
      {/* 1. 背景：オーラ（oshi-primary-20 と同期して 20% 透過の鼓動へ） */}
      <div className="absolute inset-0 border-2px border-oshi-primary-20 rounded-full animate-ping opacity-10" />

      {/* 2. ターゲット本体 */}
      <div className="relative w-[80%] h-[80%] animate-target-float overflow-visible">
        <svg 
          viewBox="0 0 400 400" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
          // 🚀 影の色も変数を参照して同期。
          style={{ filter: `drop-shadow(0 0 20px var(--oshi-primary-20))` }}
        >
          <defs>
            <filter id="targetGlowHeavy" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="textGlowLite" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* 🚀 粛清 2: 回転グラデーションに実弾（var）を装填。
               faded 箇所には透過版（oshi-primary-20）を配置。 */}
            <linearGradient id="gradCW" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--oshi-primary)" />
              <stop offset="50%" stopColor="var(--oshi-primary-20)" />
              <stop offset="100%" stopColor="var(--oshi-primary)" />
            </linearGradient>

            <linearGradient id="gradCCW" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="var(--oshi-primary)" />
              <stop offset="50%" stopColor="var(--oshi-primary-20)" />
              <stop offset="100%" stopColor="var(--oshi-primary)" />
            </linearGradient>
          </defs>

          {/* --- 背面：CHAMPIONの残光（文字も色を同期） --- */}
          <g filter="url(#textGlowLite)" opacity="0.5" transform="translate(200, 200)">
            <text
              x="0" y="0"
              fontSize="80"
              fontWeight="900"
              fontFamily="sans-serif"
              textAnchor="middle"
              dominantBaseline="middle"
              // 🚀 粛清 3: テキストの色を同期。
              fill="var(--oshi-primary)"
              fillOpacity="0.65"
              stroke="var(--oshi-primary)"
              strokeWidth="1.2"
              className="animate-pulse"
              letterSpacing="0.08em"
              style={{ 
                transformOrigin: 'center',
                fontStyle: 'italic'
              }}
            >
              CHAMPION
            </text>
          </g>

          <g filter="url(#targetGlowHeavy)">
            {/* 【時計回りグループ】外円 ＋ 十字 */}
            <g className="animate-spin-cw" style={{ transformOrigin: 'center' }}>
              <circle 
                cx="200" cy="200" r="160" 
                stroke="url(#gradCW)" 
                strokeWidth="10" 
              />
              <g opacity="0.8">
                {/* 🚀 粛清 4: 十字線（ライン）も実弾で同期 */}
                <path d="M 60 200 L 340 200" stroke="var(--oshi-primary)" strokeWidth="2" strokeLinecap="round" />
                <path d="M 200 60 L 200 340" stroke="var(--oshi-primary)" strokeWidth="2" strokeLinecap="round" />
                <circle cx="200" cy="200" r="8" fill="white" className="animate-pulse" />
              </g>
            </g>
            {/* 【反時計回りグループ】内円 */}
            <g className="animate-spin-ccw" style={{ transformOrigin: 'center' }}>
              <circle cx="200" cy="200" r="100" stroke="url(#gradCCW)" strokeWidth="14" />
            </g>
          </g>
        </svg>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes target-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes spin-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-ccw { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .animate-target-float { animation: target-float 7s ease-in-out infinite; }
        .animate-spin-cw { animation: spin-cw 25s linear infinite; }
        .animate-spin-ccw { animation: spin-ccw 18s linear infinite; }
      `}} />
    </div>
  );
};