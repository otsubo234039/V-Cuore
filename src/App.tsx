import React, { useState } from 'react';
import { Header } from './components/layout';

function App() {
  const [viewMode, setViewMode] = useState<'web' | 'mobile'>('web');

  return (
    <>
      {/* 1. CSS アニメーション定義：全ての要素を 12s で同期 */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @property --rainbow-start { syntax: '<angle>'; initial-value: 90deg; inherits: false; }
        @property --rainbow-end { syntax: '<angle>'; initial-value: 90deg; inherits: false; }

        /* 🌈 12秒の生命循環（V-SYNC） */
        @keyframes rainbow-circulate {
          0% { --rainbow-start: 90deg; --rainbow-end: 90deg; opacity: 0; }
          40% { --rainbow-start: 0deg; --rainbow-end: 90deg; opacity: 0.9; }
          100% { --rainbow-start: 0deg; --rainbow-end: 0deg; opacity: 0; }
        }

        @keyframes mic-cloud-pulse {
          0% { transform: scale(0.8) rotate(0deg); opacity: 0; filter: blur(20px); }
          40% { transform: scale(1.2) rotate(10deg); opacity: 0.4; filter: blur(40px); }
          100% { transform: scale(1.5) rotate(20deg); opacity: 0; filter: blur(60px); }
        }

        @keyframes mic-breathe {
          0% { transform: scale(1); filter: brightness(1); }
          40% { transform: scale(1.05); filter: brightness(1.2); }
          100% { transform: scale(1); filter: brightness(1); }
        }

        @keyframes star-rise {
          0% { transform: translate(0, 0) scale(0); opacity: 0; }
          50% { transform: translate(var(--x), var(--y)) scale(1); opacity: 0.8; }
          100% { transform: translate(calc(var(--x) * 1.2), calc(var(--y) * 1.2)) scale(0); opacity: 0; }
        }

        /* 🍃 あおぎり：舞い落ちる葉 */
        @keyframes leaf-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          40% { opacity: 0.6; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }

        /* ✨ 7 の情緒揺らぎ（12s 同期） */
        @keyframes nanashi-main-sway {
          0% { opacity: 0.2; transform: translate(0, 0) rotate(-1deg); filter: blur(2px) brightness(0.6); }
          40% { opacity: 1.0; transform: translate(2px, -2px) rotate(1deg); filter: blur(1px) brightness(1.8); }
          100% { opacity: 0.2; transform: translate(0, 0) rotate(-1deg); filter: blur(2px) brightness(0.6); }
        }
        @keyframes nanashi-sub-sway {
          0% { opacity: 0.1; transform: translate(0, 0) rotate(1deg); filter: blur(3px) brightness(0.5); }
          40% { opacity: 0.7; transform: translate(-3px, 3px) rotate(-2deg); filter: blur(2px) brightness(1.2); }
          100% { opacity: 0.1; transform: translate(0, 0) rotate(1deg); filter: blur(3px) brightness(0.5); }
        }

        /* 🛠️ グローバル・スクロールバー非表示 */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html, body { overflow: hidden; height: 100%; }

        .animate-rainbow-sweep { animation: rainbow-circulate 12s ease-in-out infinite; }
        .animate-mic-cloud { animation: mic-cloud-pulse 12s ease-in-out infinite; }
        .animate-mic-breathe { animation: mic-breathe 12s ease-in-out infinite; }
        .animate-star-rise { animation: star-rise 12s ease-in-out infinite; }
        .animate-leaf { animation: leaf-fall 12s linear infinite; }
        
        .animate-nanashi-main { animation: nanashi-main-sway 12s ease-in-out infinite; }
        .animate-nanashi-sub { animation: nanashi-sub-sway 12s ease-in-out infinite; }
      `}} />

      <div className="fixed inset-0 w-full h-full text-slate-900 font-sans flex flex-col items-center bg-linear-to-br from-white via-[#fff5f7] to-[#ffe4e9] overflow-hidden">

        {/* --- 背景レイヤー：VTuber銀河 (％ベースの流体座標) --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-70">
          <div className={`relative w-full h-full mx-auto transition-all duration-1000 ${viewMode === 'web' ? 'w-[95%] max-w-1440px aspect-video' : 'w-[95%] aspect-9/16'}`}>

            {/* 🍃 あおぎり高校 */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute w-[2%] h-[3%] bg-oshi-primary/20 rounded-full animate-leaf blur-[1px]"
                style={{ left: `${15 + i * 15}%`, top: '-5%', animationDelay: `${i * 1.5}s` }} />
            ))}

            {/* 🌈 にじさんじ：左上 */}
            <div className={`absolute flex items-center justify-center transition-all duration-1000 aspect-square overflow-visible ${ //overflow-visibleにする
              viewMode === 'web'
                ? 'w-[15%] top-[15%] left-[0%]' // 大幅縮小、位置も調整
                : 'w-[45%] top-[2%] left-[10%]' // 大幅縮小
              }`}>
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



            {/* 🎯 ぶいすぽ：的 */}
            <div className={`absolute flex items-center justify-center animate-[spin_12s_linear_infinite] transition-all duration-1000 ${viewMode === 'web' ? 'bottom-[5%] right-[-5%] w-[12%] aspect-square' : 'bottom-[15%] right-[-5%] w-[25%] aspect-square'}`}>
              <div className="absolute inset-0 border-2 border-oshi-primary/20 rounded-full blur-sm" />
              <div className="w-[30%] h-[30%] border border-oshi-primary/30 rounded-full animate-pulse" />
            </div>

            {/* 🚪 【ネオポルテ ＋ ななし】：情緒揺らぎ・％統合コンテナ */}
            <div
              className={`absolute flex items-center justify-center transition-all duration-1000 ${viewMode === 'web'
                ? 'w-[22%] aspect-square top-[10%] right-[-5%]'
                : 'w-[45%] aspect-square top-[25%] right-[-5%]'
                }`}
            >
              {/* 7️⃣ ななしいんく：情緒ダブルネオン */}
              <div className="absolute left-[-25%] top-[25%] flex gap-[5%] z-10 w-[30%] h-[30%]">
                <div
                  className="w-full h-full bg-oshi-primary animate-nanashi-main shadow-[0_0_20px_rgba(190,33,82,0.8)]"
                  style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 15%, 55% 100%, 35% 100%, 80% 15%, 0% 15%)' }}
                />
                <div
                  className="w-[70%] h-[70%] mt-[20%] bg-oshi-primary/90 animate-nanashi-sub"
                  style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 15%, 55% 100%, 35% 100%, 80% 15%, 0% 15%)' }}
                />
              </div>

              {/* 🚪 ネオポルテ：高出力扉 */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div
                  className="absolute inset-0 border-4 border-oshi-primary/90 blur-[0.5px] animate-mic-cloud"
                  style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
                />
                <div className="absolute w-[80%] h-[80%] bg-oshi-primary/30 blur-40px rounded-full animate-nanashi-main" />
              </div>
            </div>

{/* 🎙️ ホロライブ：マイク（シルエット完全固定・位置調整 Ver） */}
<div className={`absolute flex items-center justify-center rotate-[-30deg] transition-all duration-1000 pointer-events-none ${
  viewMode === 'web' 
    ? 'w-[10%] h-[18%] bottom-[20%] left-[5%]' // WEB：左下に控えめに配置
    : 'w-[45%] h-[25%] bottom-[5%] left-[-10%]' // MOBILE：存在感を出す
}`}>
  {/* 周囲のオーラ */}
  <div className="absolute w-[140%] h-[140%] bg-[#DB6B8F]/20 rounded-full blur-[60px] animate-mic-cloud" />

  {/* マイク本体：シルエットは一切いじらず、12sの呼吸にのみ同期 */}
  <div className="relative w-full h-full animate-mic-breathe drop-shadow-2xl">
    <svg 
      viewBox="0 0 400 550" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-[#DB6B8F]"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* 1. マイクヘッド（固定） */}
      <circle cx="200" cy="110" r="85" fill="currentColor" />
      
      {/* 2. 接続部（固定：同じ濃さの独立パーツ） */}
      <rect x="110" y="190" width="180" height="18" rx="4" fill="currentColor" />
      
      {/* 3. 持ち手（固定：直線から直前で太くなるフレア） */}
      <path
        d="M 165 480 
           L 235 480 
           L 235 250 
           L 275 208 
           L 125 208 
           L 165 250 
           Z"
        fill="currentColor"
      />
      
      {/* 4. 底の端子（固定） */}
      <path 
        d="M 180 480 L 185 510 C 185 515 190 520 200 520 C 210 520 215 515 215 510 L 220 480 Z" 
        fill="currentColor" 
        opacity="0.95"
      />

      {/* 5. スリット（固定） */}
      <path 
        d="M 135 175 Q 200 195 265 175" 
        stroke="white" 
        strokeWidth="4" 
        strokeLinecap="round"
        opacity="0.15"
      />
    </svg>
  </div>

  {/* ✨ 舞い上がる星（V-SYNC同期） */}
  <div className="absolute -right-10 bottom-24 flex flex-col items-center space-y-4 opacity-40">
     {[...Array(3)].map((_, i) => (
       <svg key={i} width="24" height="24" viewBox="0 0 12 12" className="text-[#DB6B8F] animate-pulse">
         <path d="M6 0 L7.34 4.66 L12 6 L7.34 7.34 L6 12 L4.66 7.34 L0 6 L4.66 4.66 Z" fill="currentColor"/>
       </svg>
     ))}
  </div>
</div>
          </div>
        </div>

        <Header />

        {/* 🛠️ ビューポート切り替え */}
        <div className="fixed top-[10%] right-[3%] z-50 flex gap-2">
          <button onClick={() => setViewMode('web')} className={`px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest transition-all ${viewMode === 'web' ? 'bg-oshi-primary text-white shadow-md' : 'bg-white/40 text-oshi-primary/60 hover:bg-white/60'}`}>WEB</button>
          <button onClick={() => setViewMode('mobile')} className={`px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest transition-all ${viewMode === 'mobile' ? 'bg-oshi-primary text-white shadow-md' : 'bg-white/40 text-oshi-primary/60 hover:bg-white/60'}`}>MOBILE</button>
        </div>

        {/* 🛠️ メインエリア：計器（UIカード） 15%縮小プロトコル */}
        <main className="no-scrollbar relative z-10 w-full flex-1 flex flex-col items-center justify-center p-[2%] md:p-[4%] gap-[2%] overflow-y-auto select-none">

          {/* w-[80%] → w-[65%] へ縮小。スマホは w-[95%] → w-[80%] へ */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-[3%] transition-all duration-700 ${viewMode === 'mobile' ? 'w-[80%]' : 'w-[65%] max-w-800px'}`}>
            <div className="bg-white/40 backdrop-blur-2xl p-[5%] rounded-3xl border border-white/60 shadow-lg transition-all hover:-translate-y-1">
              <h3 className="text-[9px] font-bold text-oshi-primary/60 uppercase tracking-widest mb-1">試験まであと</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-bold text-oshi-primary/60">残り</span>
                <p className="text-2xl sm:text-3xl font-black text-oshi-primary">45</p>
                <span className="text-xs font-bold text-oshi-primary/60">日</span>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-2xl p-[5%] rounded-3xl border border-white/60 shadow-lg transition-all hover:-translate-y-1">
              <h3 className="text-[9px] font-bold text-oshi-primary/60 uppercase tracking-widest mb-1">今日のノルマ</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-xl sm:text-2xl font-black text-oshi-primary">12 <span className="text-base text-oshi-primary/30">/ 20</span></p>
                <span className="text-[10px] font-bold text-oshi-primary/60 ml-2">問 完了</span>
              </div>
              <div className="w-full bg-white/20 h-1.5 mt-3 rounded-full overflow-hidden">
                <div className="bg-oshi-primary h-full w-[60%] shadow-sm" />
              </div>
            </div>
          </div>

          <div className={`bg-white/25 backdrop-blur-xl border border-white/40 p-[3%] sm:p-[4%] rounded-2rem shadow-lg transition-all duration-700 ${viewMode === 'mobile' ? 'w-[80%]' : 'w-[65%] max-w-800px'}`}>
            <h2 className="text-[9px] sm:text-[10px] font-black text-oshi-primary uppercase tracking-[0.2em] border-l-4 border-oshi-primary pl-4 mb-4">弱点問題ワースト3</h2>
            <div className="flex flex-col gap-2">
              {["IAM ポリシーの優先順位", "S3 バケットポリシーの記述", "VPC エンドポイントの構成"].map((text, i) => (
                <div key={i} className="flex justify-between items-center p-[2%] px-[3%] bg-white/10 hover:bg-white/40 rounded-xl border border-white/20 transition-all">
                  <span className="text-[10px] sm:text-xs font-bold text-oshi-primary/80">{i + 1}. {text}</span>
                  <span className="bg-oshi-primary text-white text-[8px] px-2 py-0.5 rounded-full font-black shadow-sm">誤答: {8 - i * 2}回</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 py-[2%]">
            <button className="bg-oshi-primary text-white font-black py-[3%] px-[12%] rounded-full text-base shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer">学習を開始する</button>
            <p className="text-[9px] text-oshi-primary/50 font-black uppercase tracking-[0.3em] animate-pulse">I'M WATCHING OVER YOU.</p>
          </div>
        </main>

        <div className="fixed bottom-[2%] right-[3%] text-[8px] text-oshi-primary/40 font-mono font-bold uppercase tracking-widest pointer-events-none">System Protocol: V-SYNC v5.0</div>
      </div>
    </>
  );
}

export default App;