// src/pages/home/NanashiInk.tsx
import React from 'react';

interface NanashiInkProps {
  viewMode: 'web' | 'mobile';
}

export const NanashiInk: React.FC<NanashiInkProps> = ({ viewMode }) => {
  // 画像から抽出した色 (深紅)
  const primaryColor = "#A01030"; // 深紅

  // 画像から抽出したネオンの色 (鮮やかなピンク)
  const neonColor = "#E91E63"; // 鮮やかなピンク

  // 深紅を鮮やかピンクに変換するColorMatrix
  // R: 160 -> 233 (1.45倍), G: 16 -> 30 (1.875倍), B: 48 -> 99 (2.0625倍)
  // R, G, Bの値を直接掛ける単純な行列。
  const colorMatrixValues = `1.45 0 0 0 0
                             0 1.87 0 0 0
                             0 0 2.06 0 0
                             0 0 0 1 0`;

  return (
    <div className={`absolute flex items-center justify-center transition-all duration-1000 ${
      viewMode === 'web' 
        ? 'w-[10%] aspect-square top-[15%] right-[5%]' // 少し大きくして存在感を確保
        : 'w-[18%] aspect-square top-[28%] right-[10%]'
    }`}>
      {/* ぶいすぽピンク（深紅）を本体に、鮮やかピンクをネオン光にした「N」のロゴ */}
      <div className="relative w-full h-full animate-nanashi-main overflow-visible">
        <svg 
          viewBox="0 0 200 200" // 厳密な座標管理のためのビューボックス
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet" // 形は絶対に崩さない
        >
          <defs>
            {/* 情緒ネオンフィルター：複数のぼかし層を重ねる。指定色固定 */}
            <filter id="neonGlowstrict">
              {/* SourceGraphic (深紅) を鮮やかピンクに変換して光の源にする */}
              <feColorMatrix in="SourceGraphic" type="matrix" values={colorMatrixValues} result="vibrantLightSource"/>

              {/* vibrantLightSource をぼかす */}
              {/* 芯の光の滲み (vibrantLightSourceをわずかにぼかす) */}
              <feGaussianBlur in="vibrantLightSource" stdDeviation="1" result="blur1" />
              {/* 薄いオーラ */}
              <feGaussianBlur in="vibrantLightSource" stdDeviation="4" result="blur4" />

              {/* 各層の結合：背面から順に重ねる */}
              <feMerge>
                <feMergeNode in="blur4" />  {/* 薄いオーラ */}
                <feMergeNode in="blur1" />  {/* 芯の滲み */}
                <feMergeNode in="SourceGraphic" /> {/* 本体 (深紅) */}
              </feMerge>
            </filter>
          </defs>

          {/* 背後のインク飛沫（スプラッシュ）：ここも鮮やかピンクに変更 */}
          <circle 
            cx="150" 
            cy="60" 
            r="8" 
            fill={neonColor} // 鮮やかなピンク
            filter="url(#neonGlowstrict)" 
            className="animate-pulse" 
          />
          
          {/* メインの「N」：本体を深紅に変更し、フィルターを適用 */}
          <path 
            d="M 50 175 L 50 45 L 80 45 L 130 135 L 130 45 L 155 45 L 155 175 L 125 175 L 75 85 L 75 175 Z" 
            fill={primaryColor} // 深紅
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.3" // 極めて薄く芯を入れる
            filter="url(#neonGlowstrict)" // フィルターを適用
          />
        </svg>
      </div>
    </div>
  );
};