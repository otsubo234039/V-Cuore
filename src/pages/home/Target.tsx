import React from 'react';

interface VspoTargetProps {
  viewMode: 'web' | 'mobile';
}

export const VspoTarget: React.FC<VspoTargetProps> = ({ viewMode }) => {
  const theme = {
    primary: "#E91E63",
    faded: "rgba(233, 30, 99, 0.4)",
    line: "rgba(255, 255, 255, 0.5)", 
  };

  return (
    <div className={`absolute flex items-center justify-center transition-all duration-1000 pointer-events-none overflow-visible z-0 ${
      viewMode === 'web' 
        ? 'bottom-[5%] right-[-3%] w-[18%] aspect-square' 
        : 'bottom-[12%] right-[-5%] w-[35%] aspect-square'
    }`}>
      
      {/* 1. 背景：オーラ */}
      <div className="absolute inset-0 border-1px border-[#E91E63]/5 rounded-full animate-ping opacity-10" />

      {/* 2. ターゲット本体 */}
      <div className="relative w-[80%] h-[80%] animate-target-float overflow-visible">
        <svg 
          viewBox="0 0 400 400" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_15px_rgba(233,30,99,0.2)] overflow-visible"
        >
          <defs>
            <filter id="targetGlowLite" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* 回転を可視化するためのグラデーション定義 */}
            <linearGradient id="gradCW" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme.primary} stopOpacity="1" />
              <stop offset="50%" stopColor={theme.faded} stopOpacity="0.3" />
              <stop offset="100%" stopColor={theme.primary} stopOpacity="1" />
            </linearGradient>

            <linearGradient id="gradCCW" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={theme.primary} stopOpacity="1" />
              <stop offset="50%" stopColor={theme.faded} stopOpacity="0.3" />
              <stop offset="100%" stopColor={theme.primary} stopOpacity="1" />
            </linearGradient>
          </defs>

          <g filter="url(#targetGlowLite)">
            {/* 外側の円：時計回り（グラデーションを回して動きを見せる） */}
            <circle 
              cx="200" cy="200" r="160" 
              stroke="url(#gradCW)" 
              strokeWidth="6" 
              className="animate-spin-cw"
              style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
            />
            
            {/* 内側の円：反時計回り */}
            <circle 
              cx="200" cy="200" r="100" 
              stroke="url(#gradCCW)" 
              strokeWidth="8" 
              className="animate-spin-ccw"
              style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
            />

            {/* 中央のクロス線 */}
            <g opacity="0.6">
              <path d="M 60 200 L 340 200" stroke={theme.line} strokeWidth="4" strokeLinecap="round" />
              <path d="M 200 60 L 200 340" stroke={theme.line} strokeWidth="4" strokeLinecap="round" />
              <circle cx="200" cy="200" r="8" fill="white" className="animate-pulse" />
            </g>
          </g>
        </svg>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes target-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes spin-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-target-float { animation: target-float 7s ease-in-out infinite; }
        .animate-spin-cw { animation: spin-cw 15s linear infinite; }
        .animate-spin-ccw { animation: spin-ccw 10s linear infinite; }
      `}} />
    </div>
  );
};