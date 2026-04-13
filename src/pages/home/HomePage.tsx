// src/pages/home/HomePage.tsx
import React, { useState } from 'react';
import { Header } from '../Header';
import { Microphone } from './Microphone.js';
import { Rainbow } from './Rainbow';
import { NanashiInk } from './NanashiInk';
import { NeoPorte } from './NeoPorte';
import { VspoTarget } from './Target';

interface HomePageProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onSettingsClick: () => void;
  onStartClick: () => void;
}

function HomePage({ isLoggedIn, onLoginClick, onSettingsClick, onStartClick }: HomePageProps) {
  const [viewMode, setViewMode] = useState<'web' | 'mobile'>('web');

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html, body { overflow: hidden; height: 100%; margin: 0; padding: 0; }
      `}} />

      {/* 🚀 背景：bg-white をパージ。index.css で定義した bg-main-bg を装填。
           transition-colors により、モード切替時に「夜が更ける」ような滑らかな演出が可能や。 */}
      <div className="fixed inset-0 w-full h-full bg-main-bg text-oshi-primary font-sans flex flex-col items-center transition-colors duration-500 overflow-hidden">

        {/* --- 背景レイヤー：VTuber銀河 --- 
            ダークモード時は背景が暗い分、アニメーションを少しだけ「発光体」として際立たせる設計や。 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-30 transition-opacity duration-500">
          <div className={`relative w-full h-full mx-auto transition-all duration-1000 ${viewMode === 'web' ? 'w-[95%] max-w-1440px aspect-video' : 'w-[95%] aspect-9/16'
            }`}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute w-[2%] h-[3%] bg-oshi-primary rounded-full animate-leaf blur-[2px] opacity-20"
                style={{ left: `${15 + i * 15}%`, top: '-5%', animationDelay: `${i * 1.5}s` }} />
            ))}

            <Rainbow viewMode={viewMode} />
            <VspoTarget viewMode={viewMode} />
            <NanashiInk viewMode={viewMode} />

            <div className={`absolute transition-all duration-1000 ${viewMode === 'web' ? 'top-[42%] right-[1%] w-[22%]' : 'top-[50%] right-[-2%] w-[45%]'
              }`}>
              <NeoPorte viewMode={viewMode} />
            </div>
            <Microphone viewMode={viewMode} />
          </div>
        </div>

        <Header
          viewMode={viewMode}
          setViewMode={setViewMode}
          isLoggedIn={isLoggedIn}
          onLoginClick={onLoginClick}
          onSettingsClick={onSettingsClick}
        />

        <main className="no-scrollbar relative z-10 w-full flex-1 flex flex-col items-center justify-center p-[2%] md:p-[4%] gap-[4%] overflow-y-auto select-none">

          {/* 🚀 カード：shadow をすべて粛清。
               bg-card-bg/80 と backdrop-blur で、ダークモードでも「透き通る漆黒」を表現。 */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-[4%] transition-all duration-700 ${viewMode === 'mobile' ? 'w-[85%]' : 'w-[70%] max-w-850px'}`}>
            <div className="bg-card-bg/80 backdrop-blur-2xl p-[6%] rounded-3xl border-2 border-[var(--border-color)] transition-colors duration-500">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-50">Exam Countdown</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold">残り</span>
                <p className="text-4xl sm:text-5xl font-black">45</p>
                <span className="text-sm font-bold">日</span>
              </div>
            </div>

            <div className="bg-card-bg/80 backdrop-blur-2xl p-[6%] rounded-3xl border-2 border-[var(--border-color)] transition-colors duration-500">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-50">Today's Progress</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl sm:text-4xl font-black">12 <span className="text-xl opacity-20">/ 20</span></p>
                <span className="text-[11px] font-bold ml-1">問 完了</span>
              </div>
              <div className="w-full bg-oshi-primary/10 h-2 mt-4 rounded-full overflow-hidden">
                <div className="bg-oshi-primary h-full w-[60%] transition-all duration-700" />
              </div>
            </div>
          </div>

          {/* 下部リスト：ここもシャドウレス。境界線（var(--border-color)）が視認性の生命線や。 */}
          <div className={`bg-card-bg/60 backdrop-blur-xl border-2 border-[var(--border-color)] p-[4%] rounded-3xl transition-colors duration-700 ${viewMode === 'mobile' ? 'w-[85%]' : 'w-[70%] max-w-850px'}`}>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] border-l-4 border-oshi-primary pl-4 mb-5">Weakness Top 3</h2>
            <div className="flex flex-col gap-3">
              {["IAM ポリシーの優先順位", "S3 バケットポリシーの記述", "VPC エンドポイントの構成"].map((text, i) => (
                <div key={i} className="flex justify-between items-center p-[3%] px-[4%] hover:bg-oshi-primary/5 rounded-2xl border border-[var(--border-color)] transition-all cursor-pointer group">
                  <span className="text-xs sm:text-sm font-bold opacity-70 group-hover:opacity-100 transition-opacity">{i + 1}. {text}</span>
                  <span className="bg-oshi-primary text-white text-[9px] px-3 py-1 rounded-full font-black">誤答: {8 - i * 2}回</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 py-[2%]">
            <button
              onClick={onStartClick}
              className="bg-card-bg text-oshi-primary border-2 border-oshi-primary font-black py-4 px-20 rounded-full text-lg hover:bg-oshi-primary hover:text-card-bg transition-all duration-300 cursor-pointer outline-none"
            >
              学習を開始する
            </button>
            <p className="text-[10px] text-oshi-primary font-black uppercase tracking-[0.4em] opacity-30">
              JUST PARRY & PUNISH COUNTER.
            </p>
          </div>
        </main>

        {/* バージョン表記もダークモードに合わせて opacity を調整 */}
        <div className="fixed bottom-[3%] right-[4%] text-[9px] opacity-20 font-mono font-bold uppercase tracking-widest pointer-events-none transition-colors">
          System Protocol: V-SYNC v11.0-DUAL-FLAT
        </div>
      </div>
    </>
  );
}

export default HomePage;