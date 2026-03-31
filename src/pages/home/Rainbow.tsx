import React from 'react';
// アセットをインポート（パスは自分の環境に合わせてな）
import cloudIcon from '../../assets/cloud.svg';
import inkTexture from '../../assets/ink-texture.png';

interface Props {
  viewMode: 'web' | 'mobile';
}

export const Rainbow: React.FC<Props> = ({ viewMode }) => {
  // 色の定義を整理：ベリーピンクを基調に統一感を出しつつ、可愛さを強調
  const theme = {
    primary: "#E91E63",    // メインのピンク（虹・雲のベース）
    ink: "#D81B60",        // 濃いピンク（雲の奥行き用）
    glow: "rgba(233, 30, 99, 0.4)",
  };

  return (
    <div className={`absolute flex items-center justify-center transition-all duration-1000 aspect-square overflow-visible ${
      viewMode === 'web' ? 'w-[22%] top-[8%] left-[-3%]' : 'w-[45%] top-[2%] left-[5%]'
    }`}>
      
      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full overflow-visible drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 1. 雲のためのソフトな結合フィルター（Gooeyエフェクト風） */}
          <filter id="cloudMerge" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="gooey" />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>

          {/* 2. 虹とマイク共通の「マシュマロ発光」フィルター */}
          <filter id="marshmallowGlowRainbow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* 3. 虹を1/4だけ切り取るマスク */}
          <clipPath id="rainbowClip">
            <rect x="200" y="0" width="200" height="200" />
          </clipPath>
        </defs>

        {/* --- 背面：有機的でサイバーなデータクラウド（SVGシェイプ・左上にずらして配置） --- */}
        <g 
          className="animate-cloud-float z-0" 
          filter="url(#cloudMerge)" 
          opacity="0.4"
          transform="translate(-60, -40)" // 左上にずらす
        >
          {/* 有機的なインクのフォルムを表現 */}
          <circle cx="120" cy="180" r="50" fill={theme.primary} />
          <circle cx="170" cy="150" r="70" fill={theme.ink} />
          <circle cx="230" cy="170" r="55" fill={theme.primary} />
          <circle cx="280" cy="200" r="45" fill={theme.ink} />
          {/* サイバーなグリッドデータを表現 */}
          <ellipse cx="200" cy="220" rx="150" ry="40" fill={theme.primary} />
        </g>

        {/* --- 中面：有機的でサイバーな虹本体（SVGパス・15pxの重厚な面） --- */}
        <g filter="url(#marshmallowGlowRainbow)" clipPath="url(#rainbowClip)" className="z-10" transform="translate(0, 0)">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const radius = 180 - i * 22; // 層の間隔を微調整
            return (
              <circle
                key={i}
                cx="200"
                cy="200"
                r={radius}
                fill="none"
                stroke={theme.primary} // 推しカラー単色
                strokeWidth="15" // 厚みを 15px に強化
                strokeOpacity={0.9 - i * 0.1}
                className="animate-rainbow-draw"
                style={{ 
                  strokeDasharray: '1130', // 周の長さ(2*PI*R)の近似
                  strokeDashoffset: '850', // 1/4だけ見せる
                  transform: 'rotate(-90deg)',
                  transformOrigin: '200px 200px',
                  // 濡れたような反射（プリズム感）
                  filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' 
                }}
              />
            );
          })}
        </g>

        {/* --- 前面：ダイヤモンド・レイン（にじさんじの雫） --- */}
        <g className="z-20">
          {[...Array(5)].map((_, i) => (
            <path
              key={i}
              d="M 0,0 L 4,8 L 0,16 L -4,8 Z"
              fill="white"
              opacity="0.6"
              className="animate-rain-drop-svg"
              style={{
                transform: `translate(${150 + i * 40}px, -20px)`,
                animationDelay: `${i * 0.8}s`
              }}
            />
          ))}
        </g>
      </svg>

      <style>{`
        @keyframes cloud-float {
          0%, 100% { transform: translate(-60px, -40px) scale(1) rotate(0deg); opacity: 0.3; }
          50% { transform: translate(-70px, -55px) scale(1.02) rotate(-2deg); opacity: 0.5; } // 左上にずらす
        }
        .animate-cloud-float {
          animation: cloud-float 10s ease-in-out infinite;
        }
        @keyframes rain-drop-svg {
          0% { transform: translate(var(--tw-translate-x), -20px) scaleY(1); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translate(var(--tw-translate-x), 300px) scaleY(2); opacity: 0; }
        }
        .animate-rain-drop-svg {
          animation: rain-drop-svg 4s linear infinite;
        }
        @keyframes rainbow-draw {
          0% { stroke-opacity: 0; }
          100% { stroke-opacity: inherit; }
        }
        .animate-rainbow-draw {
          animation: rainbow-draw 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};