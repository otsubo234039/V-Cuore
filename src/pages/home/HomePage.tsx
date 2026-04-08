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
      `}} />

      {/* 🚀 背景：bg-v-cuore-vignette（グラデーション）をパージ。
           bg-white だけで絶対的な清潔感を確保する。 */}
      <div className="fixed inset-0 w-full h-full text-oshi-primary font-sans flex flex-col items-center bg-white transition-all duration-1000 overflow-hidden">
        
        {/* --- 背景レイヤー：VTuber銀河 --- 
            背景を白にしたので、アニメーションの発色を邪魔しないよう opacity を 0.4 に微調整 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className={`relative w-full h-full mx-auto transition-all duration-1000 ${
            viewMode === 'web' ? 'w-[95%] max-w-1440px aspect-video' : 'w-[95%] aspect-9/16'
          }`}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute w-[2%] h-[3%] bg-oshi-primary rounded-full animate-leaf blur-[2px] opacity-20"
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
          
          {/* 🚀 カード：bg-white/80 まで不透明度を上げ、白背景の上で「発光」させる。
               影（shadow-oshi-primary/20）を強めることで、白の中に奥行き（品格）を生む。 */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-[3%] transition-all duration-700 ${viewMode === 'mobile' ? 'w-[80%]' : 'w-[65%] max-w-800px'}`}>
            <div className="bg-white/80 backdrop-blur-2xl p-[5%] rounded-3xl border border-oshi-primary/10 shadow-2xl shadow-oshi-primary/20 transition-all duration-500">
              <h3 className="text-[9px] font-bold text-oshi-primary uppercase tracking-widest mb-1 opacity-70">試験まであと</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-bold">残り</span>
                <p className="text-3xl sm:text-4xl font-black">45</p>
                <span className="text-xs font-bold">日</span>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-2xl p-[5%] rounded-3xl border border-oshi-primary/10 shadow-2xl shadow-oshi-primary/20 transition-all duration-500">
              <h3 className="text-[9px] font-bold text-oshi-primary uppercase tracking-widest mb-1 opacity-70">今日のノルマ</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl sm:text-3xl font-black">12 <span className="text-base opacity-20">/ 20</span></p>
                <span className="text-[10px] font-bold ml-2">問 完了</span>
              </div>
              <div className="w-full bg-oshi-primary/10 h-1.5 mt-3 rounded-full overflow-hidden">
                <div className="bg-oshi-primary h-full w-[60%] shadow-sm transition-all duration-500" />
              </div>
            </div>
          </div>

          {/* リスト部分：ここも白を強調 */}
          <div className={`bg-white/60 backdrop-blur-xl border border-oshi-primary/5 p-[3%] sm:p-[4%] rounded-2rem shadow-xl shadow-oshi-primary/10 transition-all duration-700 ${viewMode === 'mobile' ? 'w-[80%]' : 'w-[65%] max-w-800px'}`}>
            <h2 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] border-l-4 border-oshi-primary pl-4 mb-4">弱点問題ワースト3</h2>
            <div className="flex flex-col gap-2">
              {["IAM ポリシーの優先順位", "S3 バケットポリシーの記述", "VPC エンドポイントの構成"].map((text, i) => (
                <div key={i} className="flex justify-between items-center p-[2%] px-[3%] bg-white/50 hover:bg-oshi-primary/5 rounded-xl border border-oshi-primary/5 transition-all cursor-pointer group">
                  <span className="text-[10px] sm:text-xs font-bold opacity-80 group-hover:opacity-100">{i + 1}. {text}</span>
                  <span className="bg-oshi-primary text-white text-[8px] px-2 py-0.5 rounded-full font-black shadow-sm">誤答: {8 - i * 2}回</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 py-[2%]">
            <button className="bg-oshi-primary text-white font-black py-[3%] px-[12%] rounded-full text-base shadow-2xl shadow-oshi-primary/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border-none">学習を開始する</button>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">JUST PARRY & PUNISH COUNTER.</p>
          </div>
        </main>

        <div className="fixed bottom-[2%] right-[3%] text-[8px] text-oshi-primary/30 font-mono font-bold uppercase tracking-widest pointer-events-none transition-colors">System Protocol: V-SYNC v9.0-PURE</div>
      </div>
    </>
  );
}

export default HomePage;