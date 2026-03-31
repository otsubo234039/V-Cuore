import React from 'react';

interface MicrophoneProps {
  viewMode: 'web' | 'mobile';
}

export const Microphone: React.FC<MicrophoneProps> = ({ viewMode }) => {
  // 色の定義：基調となるベリーピンク
  const theme = {
    primary: "#E91E63",
    ink: "#D81B60",
  };

  // 背景に配置する拡大した星の配列（不規則な配置とサイズ）
  const bgStars = [
    { top: '-20%', left: '-10%', size: '150px', delay: '0s', opacity: 0.15 }, // 不透明度を上げる
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
      
      {/* 1. 背面の拡大した星々（Stardust Background・SVGで具現化・色を濃く） */}
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
              color: theme.primary, // メインのピンク
              opacity: star.opacity,
              animationDelay: star.delay,
              filter: 'blur(1px)', // 遠景感を出すぼかしを少し弱く
            }}
          >
            {/* 星のパス。以前の右上に feTurbulence + feColorMatrix のノイズ生成フィルターを追加 */}
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
      <div className="relative w-full h-full animate-mic-float drop-shadow-[0_0_20px_rgba(233,30,99,0.5)] z-10">
        <svg 
          viewBox="0 0 400 550" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Nと同じマシュマロ発光フィルター */}
            <filter id="micGlowMic" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <linearGradient id="micGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme.primary} />
              <stop offset="100%" stopColor={theme.ink} />
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

      {/* 3. 音波の波紋（既存のものを維持） */}
      <div className="absolute w-full h-full z-20">
        {[...Array(2)].map((_, i) => (
          <div 
          key={i}
          className="absolute inset-0 border-2 border-[#E91E63]/30 rounded-full animate-ripple"
          style={{ animationDelay: `${i * 1.5}s` }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes mic-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        /* 拡大した背景の星のための柔らかいパルスアニメーション */
        @keyframes merged-star-pulse {
          0%, 100% { opacity: 0.08; transform: scale(1); } // パルスの不透明度も少し上げる
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