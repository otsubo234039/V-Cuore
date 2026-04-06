// src/pages/home/Microphone.tsx
import React from 'react';

interface MicrophoneProps {
  viewMode: 'web' | 'mobile';
}

export const Microphone: React.FC<MicrophoneProps> = ({ viewMode }) => {
  // 🚀 粛清 1: ハードコードされた色の定義（themeオブジェクト）をパージ。
  // これにより、このコクピット（コンポーネント）内の固定思想は排除された。

  // 背景に配置する拡大した星の配列（不規則な配置とサイズ）
  const bgStars = [
    { top: '-20%', left: '-10%', size: '150px', delay: '0s', opacity: 0.15 },
    { top: '30%', left: '70%', size: '120px', delay: '2s', opacity: 0.10 },
    { top: '70%', left: '10%', size: '180px', delay: '4s', opacity: 0.12 },
    { top: '10%', left: '40%', size: '100px', delay: '1s', opacity: 0.08 },
    { top: '60%', left: '80%', size: '130px', delay: '3s', opacity: 0.10 },
  ];

  return (
    <div className={`absolute flex items-center justify-center transition-all duration-1000 pointer-events-none overflow-visible z-0 ${
      viewMode === 'web' 
        ? 'w-[12%] h-[20%] bottom-[15%] left-[6%] rotate-[-15deg]' 
        : 'w-[45%] h-[25%] bottom-[5%] left-[-5%] rotate-[-10deg]'
    }`}>
      
      {/* 1. 背面の拡大した星々（Stardust Background） */}
      <div className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 z-0">
        {bgStars.map((star, i) => (
          <svg 
            key={i} 
            width={star.size} 
            height={star.size} 
            viewBox="0 0 12 12" 
            className="absolute animate-merged-star-pulse"
            style={{
              top: star.top,
              left: star.left,
              // 🚀 粛清 2: 固定色（theme.primary）をパージし、司令部の実弾を装填。
              color: 'var(--oshi-primary)', 
              opacity: star.opacity,
              animationDelay: star.delay,
              filter: 'blur(1px)', 
            }}
          >
            {/* defs内 filter `stardustAuraMic` は fill="currentColor" を参照するので、
               上記修正で動的に変わるぞ */}
            <defs>
              <filter id="stardustAuraMic" x="-50%" y="-50%" width="200%" height="200%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="3" result="noise" />
                <feColorMatrix in="noise" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.99" result="goo" />
                <feGaussianBlur in="goo" stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path d="M6 0 L7.34 4.66 L12 6 L7.34 7.34 L6 12 L4.66 7.34 L0 6 L4.66 4.66 Z" fill="currentColor" filter="url(#stardustAuraMic)"/>
          </svg>
        ))}
      </div>

      {/* 2. マイク本体（ぷにSVG・マシュマロ発光） */}
      {/* 🚀 粛清 3: drop-shadow の固定色をパージ。
         Tailwind クラス `shadow-oshi-primary` を付与し、App.tsx で設定した影（shadow）の色と同期しろ。 */}
      <div className="relative w-full h-full animate-mic-float shadow-xl shadow-oshi-primary z-10">
        <svg 
          viewBox="0 0 400 550" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Nと同じマシュマロ発光フィルター（色は SourceGraphic に依存） */}
            <filter id="micGlowMic" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            {/* 🚀 粛清 4: マイク本体のグラデーション（micGrad）をパージ。
               stopColor を var(--oshi-primary) に差し替え、世界の色と同期させる。
               グラデーションの開始と終了を同じ色にすることで、純粋な「推し色」のマイクに。 */}
            <linearGradient id="micGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--oshi-primary)" />
              <stop offset="100%" stopColor="var(--oshi-primary)" />
            </linearGradient>
          </defs>

          <g filter="url(#micGlowMic)">
            {/* マイクヘッド */}
            <rect x="110" y="40" width="180" height="220" rx="90" fill="url(#micGrad)" stroke="white" strokeWidth="8" />
            
            {/* グリルメッシュ */}
            <path d="M 120 120 L 280 120 M 120 160 L 280 160 M 120 200 L 280 200" stroke="white" strokeWidth="4" strokeOpacity="0.3" strokeLinecap="round" />

            {/* マイクボディ */}
            <path
              d="M 140 260 L 260 260 L 240 480 Q 200 500 160 480 Z"
              fill="url(#micGrad)"
              stroke="white"
              strokeWidth="8"
              strokeLinejoin="round"
            />
            
            {/* デジタルなアクセントボタン */}
            <circle cx="200" cy="350" r="15" fill="white" opacity="0.8" />
          </g>
        </svg>
      </div>

      {/* 3. 音波の波紋（existing ripple） */}
      <div className="absolute w-full h-full z-20">
        {[...Array(2)].map((_, i) => (
          <div 
          key={i}
          // 🚀 粛清 5: 波紋の固定色（E91E63/30）をパージ。
          // Tailwind 4.0 クラス `border-oshi-primary-20` を付空し、
          // HomePage（あおぎりの葉）と同じ「20% 透過の気配」と同期させる。
          className="absolute inset-0 border-2 border-oshi-primary-20 rounded-full animate-ripple"
          style={{ animationDelay: `${i * 1.5}s` }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes mic-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        /* アニメーション内の不透明度は固定でええ。色が同期すれば気配は保たれる */
        @keyframes merged-star-pulse {
          0%, 100% { opacity: 0.08; transform: scale(1); } 
          50% { opacity: 0.18; transform: scale(1.05); }
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }
        .animate-mic-float { animation: mic-float 4s ease-in-out infinite; }
        .animate-merged-star-pulse { animation: merged-star-pulse 8s ease-in-out infinite; }
        .animate-ripple { animation: ripple 3s ease-out infinite; }
      `}} />
    </div>
  );
};