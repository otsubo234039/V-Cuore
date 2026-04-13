// src/pages/study/StudySetupPage.tsx
import React, { useState } from 'react';
import { ChevronLeft, Play, Cpu, History, AlertCircle, CheckCircle2 } from 'lucide-react';

interface StudySetupPageProps {
  examTitle: string; // ハンバーガーメニューで選択した試験名（例: AWS SAA）
  onBack: () => void;
  onStartDuel: (config: StudyConfig) => void;
}

export interface StudyConfig {
  questionCount: number;
  sourceType: 'past' | 'ai';
  isReviewOnly: boolean;
}

export const StudySetupPage: React.FC<StudySetupPageProps> = ({ examTitle, onBack, onStartDuel }) => {
  const [config, setConfig] = useState<StudyConfig>({
    questionCount: 20,
    sourceType: 'past',
    isReviewOnly: false,
  });

  const questionOptions = [10, 20, 30, 50];

  return (
    <div className="fixed inset-0 z-50 bg-main-bg text-oshi-primary font-sans flex flex-col items-center transition-colors duration-500 overflow-hidden">
      
      {/* 🚀 ヘッダー：撤退路（戻るボタン）の確保 */}
      <header className="w-full px-[5%] py-8 flex justify-between items-center border-b border-oshi-primary/10">
        <button onClick={onBack} className="group p-3 hover:bg-oshi-primary/10 rounded-full transition-all cursor-pointer">
          <ChevronLeft size={28} />
        </button>
        <div className="text-right">
          <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em]">Current Mission</p>
          <h1 className="text-xl font-black tracking-tighter">{examTitle} // DUEL SETUP</h1>
        </div>
      </header>

      <main className="no-scrollbar relative z-10 w-full flex-1 flex flex-col items-center justify-center p-[4%] gap-[6%] overflow-y-auto select-none">
        
        <div className="w-full max-w-600px space-y-10">
          
          {/* 1. 問題数選択：弾薬数の決定 */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] pl-4 border-l-4 border-oshi-primary">01. Question Count</h3>
            <div className="grid grid-cols-4 gap-3">
              {questionOptions.map((count) => (
                <button
                  key={count}
                  onClick={() => setConfig({ ...config, questionCount: count })}
                  className={`py-4 rounded-2xl border-2 font-black transition-all ${
                    config.questionCount === count 
                    ? 'bg-oshi-primary text-card-bg border-oshi-primary' 
                    : 'bg-card-bg/40 border-oshi-primary/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </section>

          {/* 2. 出題ソース：兵装の選択 */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] pl-4 border-l-4 border-oshi-primary">02. Intelligence Source</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setConfig({ ...config, sourceType: 'past' })}
                className={`flex items-center gap-4 p-5 rounded-3xl border-2 transition-all ${
                  config.sourceType === 'past' 
                  ? 'bg-oshi-primary/10 border-oshi-primary' 
                  : 'bg-card-bg/40 border-oshi-primary/5 opacity-60 hover:opacity-100'
                }`}
              >
                <div className={`p-3 rounded-2xl ${config.sourceType === 'past' ? 'bg-oshi-primary text-card-bg' : 'bg-oshi-primary/20'}`}>
                  <History size={24} />
                </div>
                <div className="text-left">
                  <p className="font-black text-sm">過去問データ</p>
                  <p className="text-[9px] opacity-60">Archive Protocol</p>
                </div>
              </button>

              <button
                onClick={() => setConfig({ ...config, sourceType: 'ai' })}
                className={`flex items-center gap-4 p-5 rounded-3xl border-2 transition-all ${
                  config.sourceType === 'ai' 
                  ? 'bg-oshi-primary/10 border-oshi-primary' 
                  : 'bg-card-bg/40 border-oshi-primary/5 opacity-60 hover:opacity-100'
                }`}
              >
                <div className={`p-3 rounded-2xl ${config.sourceType === 'ai' ? 'bg-oshi-primary text-card-bg' : 'bg-oshi-primary/20'}`}>
                  <Cpu size={24} />
                </div>
                <div className="text-left">
                  <p className="font-black text-sm">AI 生成問題</p>
                  <p className="text-[9px] opacity-60">Gemini Synchronization</p>
                </div>
              </button>
            </div>
          </section>

          {/* 3. 復習フラグ：弱点補完プロトコル */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] pl-4 border-l-4 border-oshi-primary">03. Review Protocol</h3>
            <button
              onClick={() => setConfig({ ...config, isReviewOnly: !config.isReviewOnly })}
              className={`w-full flex items-center justify-between p-6 rounded-3xl border-2 transition-all ${
                config.isReviewOnly 
                ? 'bg-oshi-primary/5 border-oshi-primary' 
                : 'bg-card-bg/40 border-oshi-primary/5 opacity-60'
              }`}
            >
              <div className="flex items-center gap-4">
                <AlertCircle className={config.isReviewOnly ? 'text-oshi-primary' : 'opacity-20'} />
                <div className="text-left">
                  <p className="font-black text-sm text-[var(--oshi-primary)]">間違えた問題のみを抽出</p>
                  <p className="text-[9px] opacity-60">Weakness Filtering System</p>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full relative transition-colors ${config.isReviewOnly ? 'bg-oshi-primary' : 'bg-oshi-primary/20'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-card-bg rounded-full transition-all ${config.isReviewOnly ? 'left-7' : 'left-1'}`} />
              </div>
            </button>
          </section>

        </div>

        {/* 🚀 最終トリガー：全弾発射 */}
        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={() => onStartDuel(config)}
            className="group relative bg-oshi-primary text-card-bg font-black py-5 px-24 rounded-full text-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-none flex items-center gap-3"
          >
            <Play size={20} fill="currentColor" />
            俺のターン、ドロー！
          </button>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 animate-pulse">
            Waiting for Duel Registration...
          </p>
        </div>

      </main>

      <footer className="p-8 border-t border-oshi-primary/10 w-full text-center">
        <p className="text-[8px] font-mono font-black opacity-20 uppercase tracking-[0.5em]">
          V-SYNC // DUEL-MODE-STANDBY // {config.sourceType === 'ai' ? 'AI_ENABLED' : 'LEGACY_DATA'}
        </p>
      </footer>
    </div>
  );
};