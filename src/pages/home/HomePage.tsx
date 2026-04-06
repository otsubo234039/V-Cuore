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
}

function HomePage({ isLoggedIn, onLoginClick, onSettingsClick }: HomePageProps) {
  const [viewMode, setViewMode] = useState<'web' | 'mobile'>('web');

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html, body { overflow: hidden; height: 100%; margin: 0; padding: 0; }
        /* ... アニメーション ... */
      `}} />

      {/* 🚀 粛清：via-oshi-primary-20 をパージ。from/via/to 全て white へ。
          これで背景の「濁り」は消滅し、常に白基調のクリーンな戦場が維持される。 */}
      <div className="fixed inset-0 w-full h-full text-oshi-primary font-sans flex flex-col items-center bg-white bg-v-cuore-vignette transition-all duration-1000 overflow-hidden">        {/* --- 背景レイヤー：VTuber銀河 --- */}
        {/* opacity を 0.5 まで下げ、さらに「白」を強調した */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
          <div className={`relative w-full h-full mx-auto transition-all duration-1000 ${
            viewMode === 'web' ? 'w-[95%] max-w-1440px aspect-video' : 'w-[95%] aspect-9/16'
          }`}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute w-[2%] h-[3%] bg-oshi-primary-20 rounded-full animate-leaf blur-[2px]"
                style={{ left: `${15 + i * 15}%`, top: '-5%', animationDelay: `${i * 1.5}s` }} />
            ))}
            
            <Rainbow viewMode={viewMode} />
            <VspoTarget viewMode={viewMode} />
            <NanashiInk viewMode={viewMode} />
            
            <div className={`absolute transition-all duration-1000 ${
              viewMode === 'web' ? 'top-[42%] right-[1%] w-[22%]' : 'top-[50%] right-[-2%] w-[45%]'
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

        <main className="no-scrollbar relative z-10 w-full flex-1 flex flex-col items-center justify-center p-[2%] md:p-[4%] gap-[2%] overflow-y-auto select-none">
          
          {/* カード自体の白背景（bg-white/40）と影の oshi-primary が、純白の背景によく映えるはずや */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-[3%] transition-all duration-700 ${viewMode === 'mobile' ? 'w-[80%]' : 'w-[65%] max-w-800px'}`}>
            <div className="bg-white/40 backdrop-blur-2xl p-[5%] rounded-3xl border border-white/60 shadow-xl shadow-oshi-primary/10 transition-all duration-500">
              <h3 className="text-[9px] font-bold text-oshi-primary uppercase tracking-widest mb-1 transition-colors">試験まであと</h3>
              <div className="flex items-baseline gap-2 transition-colors">
                <span className="text-xs font-bold text-oshi-primary">残り</span>
                <p className="text-2xl sm:text-3xl font-black text-oshi-primary transition-colors">45</p>
                <span className="text-xs font-bold text-oshi-primary">日</span>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-2xl p-[5%] rounded-3xl border border-white/60 shadow-xl shadow-oshi-primary/10 transition-all duration-500">
              <h3 className="text-[9px] font-bold text-oshi-primary uppercase tracking-widest mb-1 transition-colors">今日のノルマ</h3>
              <div className="flex items-baseline gap-2 transition-colors">
                <p className="text-xl sm:text-2xl font-black text-oshi-primary transition-colors">12 <span className="text-base opacity-30">/ 20</span></p>
                <span className="text-[10px] font-bold text-oshi-primary ml-2 transition-colors">問 完了</span>
              </div>
              <div className="w-full bg-white/20 h-1.5 mt-3 rounded-full overflow-hidden transition-colors">
                <div className="bg-oshi-primary h-full w-[60%] shadow-sm transition-all duration-500" />
              </div>
            </div>
          </div>

          <div className={`bg-white/25 backdrop-blur-xl border border-white/40 p-[3%] sm:p-[4%] rounded-2rem shadow-xl shadow-oshi-primary/5 transition-all duration-700 ${viewMode === 'mobile' ? 'w-[80%]' : 'w-[65%] max-w-800px'}`}>
            <h2 className="text-[9px] sm:text-[10px] font-black text-oshi-primary uppercase tracking-[0.2em] border-l-4 border-oshi-primary pl-4 mb-4 transition-colors">弱点問題ワースト3</h2>
            <div className="flex flex-col gap-2">
              {["IAM ポリシーの優先順位", "S3 バケットポリシーの記述", "VPC エンドポイントの構成"].map((text, i) => (
                <div key={i} className="flex justify-between items-center p-[2%] px-[3%] bg-white/10 hover:bg-white/40 rounded-xl border border-white/20 transition-all cursor-pointer">
                  <span className="text-[10px] sm:text-xs font-bold text-oshi-primary transition-colors">{i + 1}. {text}</span>
                  <span className="bg-oshi-primary text-white text-[8px] px-2 py-0.5 rounded-full font-black shadow-sm transition-colors">誤答: {8 - i * 2}回</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 py-[2%]">
            <button className="bg-oshi-primary text-white font-black py-[3%] px-[12%] rounded-full text-base shadow-xl shadow-oshi-primary/20 hover:scale-105 active:scale-95 transition-all cursor-pointer border-none">学習を開始する</button>
            <p className="text-[9px] text-oshi-primary font-black uppercase tracking-[0.3em] transition-all opacity-80">JUST PARRY & PUNISH COUNTER.</p>
          </div>
        </main>

        <div className="fixed bottom-[2%] right-[3%] text-[8px] text-oshi-primary/40 font-mono font-bold uppercase tracking-widest pointer-events-none transition-colors opacity-60">System Protocol: V-SYNC v8.0</div>
      </div>
    </>
  );
}

export default HomePage;