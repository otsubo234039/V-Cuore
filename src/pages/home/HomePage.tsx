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
  onWeaknessClick: (questionIndex: number) => void;
}

function HomePage({ isLoggedIn, onLoginClick, onSettingsClick, onStartClick, onWeaknessClick }: HomePageProps) {
  const [viewMode, setViewMode] = useState<'web' | 'mobile'>('web');

  const weaknessItems = [
    { label: 'IAM ポリシーの優先順位', questionIndex: 0 },
    { label: 'S3 バケットポリシーの記述', questionIndex: 1 },
    { label: 'VPC エンドポイントの構成', questionIndex: 2 },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html, body { overflow: hidden; height: 100%; margin: 0; padding: 0; }
      `}} />

      <div className="fixed inset-0 w-full h-full bg-main-bg text-oshi-primary font-sans flex flex-col items-center transition-colors duration-500 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-65 dark:opacity-75 filter saturate-125 contrast-110 dark:saturate-150 dark:contrast-125 transition-all duration-500">
          <div className={`relative w-full h-full mx-auto transition-all duration-1000 ${viewMode === 'web' ? 'w-[95%] max-w-1440px aspect-video' : 'w-[95%] aspect-9/16'}`}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-[2%] h-[3%] bg-oshi-primary rounded-full animate-leaf blur-[1px] opacity-45"
                style={{ left: `${15 + i * 15}%`, top: '-5%', animationDelay: `${i * 1.5}s` }}
              />
            ))}
            <Rainbow viewMode={viewMode} />
            <VspoTarget viewMode={viewMode} />
            <NanashiInk viewMode={viewMode} />
            <div className={`absolute transition-all duration-1000 ${viewMode === 'web' ? 'top-[42%] right-[1%] w-[22%]' : 'top-[50%] right-[-2%] w-[45%]'}`}>
              <NeoPorte viewMode={viewMode} />
            </div>
            <Microphone viewMode={viewMode} />
          </div>
        </div>

        <Header
          isLoggedIn={isLoggedIn}
          onLoginClick={onLoginClick}
          onSettingsClick={onSettingsClick}
        />

        <main className="no-scrollbar relative z-10 w-full flex-1 flex flex-col items-center justify-center p-[2%] md:p-[4%] gap-[6%] overflow-y-auto select-none">
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-[4%] transition-all duration-700 ${viewMode === 'mobile' ? 'w-[85%]' : 'w-[70%] max-w-850px'}`}>
            <div className="bg-card-bg p-[7%] rounded-3xl border-2 border-oshi-primary/20 dark:border-oshi-primary/40 transition-colors duration-500">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 opacity-50 text-oshi-primary">Exam Countdown</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold opacity-80">残り</span>
                <p className="text-4xl sm:text-6xl font-black tracking-tighter">45</p>
                <span className="text-sm font-bold opacity-80">日</span>
              </div>
            </div>

            <div className="bg-card-bg p-[7%] rounded-3xl border-2 border-oshi-primary/20 dark:border-oshi-primary/40 transition-colors duration-500">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 opacity-50 text-oshi-primary">Today's Progress</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl sm:text-5xl font-black tracking-tighter">12 <span className="text-xl opacity-20">/ 20</span></p>
                <span className="text-[11px] font-bold ml-1">問 完了</span>
              </div>
              <div className="w-full bg-oshi-primary/10 dark:bg-oshi-primary/5 h-2 mt-5 rounded-full overflow-hidden">
                <div className="bg-oshi-primary h-full w-[60%] transition-all duration-1000" />
              </div>
            </div>
          </div>

          <div className={`bg-card-bg backdrop-blur-xl border-2 border-oshi-primary/10 dark:border-oshi-primary/20 p-[5%] rounded-3xl transition-colors duration-700 ${viewMode === 'mobile' ? 'w-[85%]' : 'w-[70%] max-w-850px'}`}>
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] border-l-4 border-oshi-primary pl-4 mb-6">Weakness Top 3</h2>
            <div className="flex flex-col gap-4">
              {weaknessItems.map((item, i) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onWeaknessClick(item.questionIndex)}
                  className="flex justify-between items-center p-[4%] px-[6%] rounded-2xl border-2 border-oshi-primary/30 dark:border-oshi-primary bg-card-bg text-oshi-primary transition-all cursor-pointer group hover:bg-oshi-primary/5 text-left"
                >
                  <span className="text-xs sm:text-sm font-black tracking-tight">{i + 1}. {item.label}</span>
                  <span className="border border-oshi-primary/50 text-oshi-primary text-[9px] px-3 py-1 rounded-full font-black group-hover:bg-oshi-primary group-hover:text-white dark:group-hover:text-black transition-colors">
                    誤答: {8 - i * 2}回
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 py-[2%]">
            <button
              onClick={onStartClick}
              className="bg-card-bg text-oshi-primary border-2 border-oshi-primary font-black py-4 px-20 rounded-full text-lg transition-all duration-300 cursor-pointer outline-none shadow-none hover:bg-oshi-primary hover:text-white dark:hover:text-black"
            >
              学習を開始する
            </button>
            <p className="text-[11px] text-oshi-primary font-black uppercase tracking-[0.5em] opacity-30">
              JUST PARRY & PUNISH COUNTER.
            </p>
          </div>
        </main>

        <div className="fixed bottom-[3%] right-[4%] text-[9px] opacity-20 font-mono font-bold uppercase tracking-widest pointer-events-none transition-colors">
          System Protocol: V-SYNC v11.0-HYBRID-FLAT
        </div>
      </div>
    </>
  );
}

export default HomePage;