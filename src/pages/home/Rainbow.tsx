// src/pages/home/Rainbow.tsx
import React from 'react';

// viewModeを受け取るためのProps定義。型がないなんて……（以下略
interface Props {
  viewMode: 'web' | 'mobile';
}

export const Rainbow: React.FC<Props> = ({ viewMode }) => {
  return (
    <div className={`absolute flex items-center justify-center transition-all duration-1000 aspect-square overflow-visible ${ //overflow-visibleにする
      viewMode === 'web'
        ? 'w-[15%] top-[15%] left-[0%]' // 大幅縮小、位置も調整
        : 'w-[45%] top-[2%] left-[10%]' // 大幅縮小
      }`}>
      {/* 🌈 にじさんじ：左上 */}
      {/* 虹の本体コンテナ */}
      <div className="absolute inset-0 flex items-center justify-center animate-rainbow-sweep blur-[1px]"
        style={{
          // 扇形のマスク（四角いエッジを消すために、マスクの範囲を広げてふんわり消す）
          WebkitMaskImage: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, white 30deg, white 120deg, transparent 150deg)'
        }}
      >
        {/* 虹の7層（外側から内側へ） */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          // 親のサイズ(100%)に対して、外側から内側へ半径を減らす計算
          const widthPercent = 100 - i * 13; // 100, 87, 74, 61, 48, 35, 22

          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${widthPercent}%`, // 親の箱に収まるように
                height: `${widthPercent}%`,
                borderWidth: '10px', // 線を細く（12px -> 4px）
                borderColor: `rgba(190,33,82, ${0.9 - i * 0.05})`, // ぶいすぽピンク
                // 右上1/4だけ見せる（中心から右上への扇形）
                clipPath: 'polygon(50% 50%, 100% 50%, 100% 0%, 50% 0%)'
              }}
            />
          );
        })}
      </div>
    </div>
  );
};