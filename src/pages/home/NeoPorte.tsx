import React from 'react';

interface NeoPorteProps { viewMode: 'web' | 'mobile'; }

export const NeoPorte: React.FC<NeoPorteProps> = ({ viewMode }) => {
  // 色の定義：ベリーピンクを基調に、デジタルな奥行きを演出
  const theme = {
    primary: "#E91E63",
    ink: "#D81B60",
    glow: "rgba(233, 30, 99, 0.4)",
  };

  return (
    /* 修正ポイント：
      1. coordinates: right-[2%](web)を維持し、右上に鎮座。
      2. z-index: z-10 から z-[-1] に変更。「N」とインクの背後に配置。
      3. opacity: 存在感を保つため、全体のopacityを少し上げる(0.6程度)。
    */
    <div className={`absolute flex items-center justify-center transition-all duration-1000 pointer-events-none overflow-visible z-[-1] ${
      viewMode === 'web' 
        ? 'w-[22%] aspect-square top-[4%] right-[2%] opacity-60' 
        : 'w-[45%] aspect-square top-[18%] right-[2%] opacity-70'
    }`}>
      
      {/* 1. ポータルの基底：マシュマロ発光オーラ（背後から光を漏らす） */}
      <div className="absolute w-[130%] h-[130%] bg-[#E91E63]/15 rounded-full blur-[100px] animate-pulse" />

      {/* 2. 扉本体（SVGで「多層ヘキサゴン」を具現化） */}
      <div className="relative w-full h-full animate-portal-breathe">
        <svg 
          viewBox="0 0 400 400" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_20px_rgba(233,30,99,0.5)] overflow-visible"
        >
          <defs>
            {/* 右上の「N」と同じ、品格ある発光フィルター */}
            <filter id="portalGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="portalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme.primary} />
              <stop offset="100%" stopColor={theme.ink} />
            </linearGradient>
          </defs>

          <g filter="url(#portalGlow)">
            {/* 外枠：重厚なヘキサゴン（角丸でぷに感を出す） */}
            <path 
              d="M 200 30 L 350 115 L 350 285 L 200 370 L 50 285 L 50 115 Z" 
              stroke="url(#portalGrad)" 
              strokeWidth="12" 
              strokeLinejoin="round"
              fill="none"
              className="animate-portal-spin-slow"
              style={{ transformOrigin: 'center' }}
            />

            {/* 内枠：デジタル・スキャンライン（時計回りに回る） */}
            <path 
              d="M 200 80 L 300 135 L 300 265 L 200 320 L 100 265 L 100 135 Z" 
              stroke="white" 
              strokeWidth="2" 
              strokeDasharray="20 15"
              fill="rgba(233, 30, 99, 0.05)"
              className="animate-portal-spin-reverse"
              style={{ transformOrigin: 'center' }}
            />

            {/* コア：扉の心臓部（パルス発光） */}
            <path 
              d="M 200 150 L 245 175 L 245 225 L 200 250 L 155 225 L 155 175 Z" 
              fill="url(#portalGrad)" 
              className="animate-pulse"
            />
          </g>
        </svg>
      </div>

      {/* 3. V-SYNC同期粒子（扉から溢れ出す新時代のデータ） */}
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

      {/* 修正ポイント：jsx属性を排除したスタイル定義 */}
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
        @keyframes data-fly {
          0% { transform: rotate(var(--tw-rotate)) translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: rotate(var(--tw-rotate)) translateY(-160px) scale(0); opacity: 0; }
        }
        .animate-portal-spin-slow { animation: portal-spin-slow 40s linear infinite; }
        .animate-portal-spin-reverse { animation: portal-spin-reverse 25s linear infinite; }
        .animate-data-fly { animation: data-fly 6s ease-out infinite; }
      `}} />
    </div>
  );
};