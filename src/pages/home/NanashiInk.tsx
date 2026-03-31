import React from 'react';
// 1. 画像をインポート（パスは自分の環境に合わせてな）
import inkTexture from '../../assets/ink-texture.png';

export const NanashiInk: React.FC<{ viewMode: 'web' | 'mobile' }> = ({ viewMode }) => {
  // 色の定義：ベリーピンクを基調に統一感を出しつつ、可愛さを強調
  const theme = {
    primary: "#E91E63", // メインのピンク（Nの色）
    ink: "#D81B60",     // インクの色（少し濃いめにして奥行きを出す）
  };

  return (
    <div className={`absolute flex items-center justify-center transition-all duration-1000 ${
      viewMode === 'web' ? 'w-[15%] top-[10%] right-[3%]' : 'w-[25%] top-[22%] right-[5%]'
    }`}>
      <div className="relative w-full h-full flex items-center justify-center overflow-visible">
        
        {/* 2. 背景のインク：mask-imageを使って色を付ける（技術アピール） */}
        <div 
          className="absolute inset-0 opacity-80 animate-ink-spread"
          style={{
            backgroundColor: theme.ink,
            // ここでPNGを「型紙」として使うんや
            maskImage: `url(${inkTexture})`,
            WebkitMaskImage: `url(${inkTexture})`,
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            transform: 'scale(1.3) rotate(-10deg)', // 位置や角度はここで微調整
          }}
        />

        {/* 3. 前面の「丸っこいN」ロゴ（以前のSVGパス） */}
        <div className="relative z-10 animate-soft-float">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[85%] h-[85%] drop-shadow-2xl">
            {/* 柔らかい光のフィルター */}
            <filter id="marshmallowGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* 黄金比を調整した丸っこい「N」ロゴ */}
            <path 
              d="M 60 170 
                 Q 55 170 55 165 
                 L 55 55 
                 Q 55 45 65 45 
                 L 75 45 
                 Q 85 45 92 55 
                 L 133 135 
                 L 133 55 
                 Q 133 45 143 45 
                 L 150 45 
                 Q 160 45 160 55 
                 L 160 165 
                 Q 160 175 150 175 
                 L 140 175 
                 Q 130 175 123 160 
                 L 82 80 
                 L 82 165 
                 Q 82 170 77 170 
                 Z" 
              fill={theme.primary}
              stroke="white"
              strokeWidth="4"
              strokeLinejoin="round" 
              strokeLinecap="round" 
              filter="url(#marshmallowGlow)"
            />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes ink-spread {
          0% { opacity: 0; transform: scale(1) rotate(0deg); }
          100% { opacity: 0.8; transform: scale(1.3) rotate(-10deg); }
        }
        @keyframes soft-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-soft-float {
          animation: soft-float 3s ease-in-out infinite;
        }
        .animate-ink-spread {
          animation: ink-spread 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};