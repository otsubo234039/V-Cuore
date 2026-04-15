// src/pages/home/Rainbow.tsx
import React from 'react';

interface Props {
  viewMode: 'web' | 'mobile';
}

export const Rainbow: React.FC<Props> = ({ viewMode }) => {
  // 🚀 粛清 1: ハードコードされた色の定義をパージ。
  // 全ては var(--oshi-primary) と oshi-primary-20 に委ねる。

  return (
    <div className={`absolute flex items-center justify-center transition-all duration-1000 aspect-square overflow-visible ${
      viewMode === 'web' ? 'w-[25%] top-[5%] left-[-3%]' : 'w-[45%] top-[2%] left-[5%]'
    }`}>
      
      {/* 1. ポータルの基底：マシュマロ発光オーラ（20%透過版と同期） */}
      <div className="absolute w-[120%] h-[120%] bg-oshi-primary-20 rounded-full blur-[80px] animate-pulse" />

      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full overflow-visible drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="rainbowGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="textGlowRainbow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --- 中面：タクティカル・レインボー（変数を装填） --- */}
        <g filter="url(#rainbowGlow)" className="z-10">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const radius = 180 - i * 22; 
            const circumference = 2 * Math.PI * radius;
            return (
              <circle
                key={i}
                cx="200"
                cy="200"
                r={radius}
                fill="none"
                // 🚀 粛清 2: 固定色を var(--oshi-primary) に換装
                stroke="var(--oshi-primary)"
                strokeWidth="15" 
                strokeOpacity={0.8 - i * 0.1}
                strokeDasharray={`${circumference}`}
                strokeDashoffset={`${circumference * 0.75}`}
                transform="rotate(-90 200 200)"
                className="animate-rainbow-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            );
          })}
        </g>

        {/* --- 前面：データクラウド（雲の色も同期） --- */}
        <g opacity="0.62" className="animate-cloud-float" transform="translate(80, 160)">
          <path 
            d="M 0,40 Q 20,0 60,20 Q 100,-10 140,30 Q 180,10 200,50 L 0,50 Z" 
            // 🚀 粛清 3: 雲も var(--oshi-primary) に換装
            fill="var(--oshi-primary)" 
            filter="blur(8px)"
          />
        </g>

        {/* --- 前面：真・ダイヤモンド・レイン（ここは純白の輝きを維持） --- */}
        <g className="z-20">
          {[...Array(10)].map((_, i) => (
            <path
              key={i}
              d="M 0,0 L 4,8 L 0,16 L -4,8 Z"
              fill="white"
              opacity="0.6"
              className="animate-rain-drop-svg"
              style={{
                transform: `translate(${150 + i * 25}px, -20px)`,
                animationDelay: `${i * 0.6}s`,
                filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.4))' 
              }}
            />
          ))}
        </g>
      </svg>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes rainbow-pulse {
          0%, 100% { opacity: 0.8; stroke-width: 15; }
          50% { opacity: 1; stroke-width: 16; }
        }
        @keyframes cloud-float {
          0%, 100% { transform: translate(80px, 160px) scale(1); }
          50% { transform: translate(75px, 155px) scale(1.05); }
        }
        @keyframes rain-drop-svg {
          0% { 
            transform: translate(var(--tw-translate-x), -20px) scaleY(1) rotate(0deg); 
            opacity: 0; 
            fill: white;
          }
          10% { 
            opacity: 0.7; 
            fill: #FFEB3B;
          }
          20% { 
            fill: white; 
          }
          100% { 
            transform: translate(calc(var(--tw-translate-x) + 20px), 300px) scaleY(2) rotate(10deg); 
            opacity: 0; 
          }
        }
        .animate-rainbow-pulse { animation: rainbow-pulse 4s ease-in-out infinite; }
        .animate-cloud-float { animation: cloud-float 8s ease-in-out infinite; }
        .animate-rain-drop-svg { 
          animation: rain-drop-svg 4s linear infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
      `}} />
    </div>
  );
};