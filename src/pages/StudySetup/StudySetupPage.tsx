// src/pages/StudySetup/StudySetupPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Play, Cpu, History, AlertCircle, Cloud, ChevronDown, Menu } from 'lucide-react';
import { HamburgerMenu } from '../HamburgerMenu';

interface StudySetupPageProps {
  examTitle: string; 
  onBack: () => void;
  onStartMission: (config: StudyConfig) => void;
  onSettingsClick: () => void;
}

export interface StudyConfig {
  selectedExam: string;
  questionCount: number;
  sourceType: 'past' | 'ai';
  isReviewOnly: boolean;
}

type CuteOption<T extends string | number> = {
  value: T;
  label: string;
};

interface CuteSelectProps<T extends string | number> {
  value: T;
  options: CuteOption<T>[];
  onChange: (value: T) => void;
}

function CuteSelect<T extends string | number>({ value, options, onChange }: CuteSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full text-left bg-card-bg border-2 border-oshi-primary/30 text-oshi-primary pl-5 pr-14 py-4 rounded-3xl font-black outline-none transition-all duration-300 hover:border-oshi-primary/60 hover:shadow-[0_8px_24px_rgba(190,33,0,0.15)] focus:ring-4 focus:ring-oshi-primary/20 focus:border-oshi-primary text-sm"
      >
        {selectedOption?.label}
      </button>

      <div className="absolute right-4 top-[18px] pointer-events-none w-8 h-8 rounded-full bg-oshi-primary/10 flex items-center justify-center">
        <ChevronDown className={`opacity-70 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={18} />
      </div>

      <div className={`absolute left-0 right-0 mt-2 rounded-2xl border border-oshi-primary/20 bg-card-bg shadow-[0_12px_36px_rgba(190,33,0,0.18)] overflow-hidden transition-all duration-200 z-30 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <ul className="max-h-60 overflow-auto py-1">
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <li key={`${option.value}`}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm font-black transition-colors ${isSelected ? 'bg-oshi-primary text-white' : 'text-oshi-primary hover:bg-oshi-primary/10'}`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export const StudySetupPage: React.FC<StudySetupPageProps> = ({ examTitle, onBack, onStartMission, onSettingsClick }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [config, setConfig] = useState<StudyConfig>({
    selectedExam: "Solutions Architect - Associate", 
    questionCount: 20,
    sourceType: 'past',
    isReviewOnly: false,
  });

  const examOptions = [
    "Cloud Practitioner", "Solutions Architect - Associate", "Developer - Associate",
    "SysOps Administrator - Associate", "Data Engineer - Associate", "AI Practitioner",
    "Solutions Architect - Professional", "DevOps Engineer - Professional",
    "Advanced Networking - Specialty", "Security - Specialty",
    "Machine Learning - Specialty", "ML Engineer - Associate"
  ];
  
  const questionOptions = [10, 20, 30, 50, 100];
  const sourceOptions: Array<CuteOption<StudyConfig['sourceType']>> = [
    { value: 'past', label: '過去問(Legacy Logs)' },
    { value: 'ai', label: 'AI作成問題 (Gemini Sync)' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-main-bg text-oshi-primary font-sans flex flex-col items-center transition-colors duration-500 overflow-hidden">
      
      {/* 🚀 ヘッダー：情報の断捨離（パージ）完了 */}
      {/* 🚀 ヘッダー：ハンバーガーメニュー装填型 */}
      <header className="w-full px-[5%] py-6 flex justify-between items-center border-b border-oshi-primary/10 backdrop-blur-md">
        
        {/* 左翼：ホームロゴ遷移 */}
        <button 
          onClick={onBack} 
          className="flex items-baseline gap-2 p-2 bg-transparent border-none cursor-default"
        >
          <h1 className="text-xl font-black text-oshi-primary italic tracking-tighter transition-colors duration-1000">
            V-CUORE
          </h1>
          <span className="text-[8px] font-bold text-oshi-primary/30 transition-colors duration-1000">
            VER 1.0
          </span>
        </button>

        {/* 中央：ミッション情報（少し小さくして品格を出す） */}
        <div className="flex flex-col items-center">
          <p className="text-[8px] font-black opacity-30 uppercase tracking-[0.3em]">AWS Console</p>
          <h1 className="text-sm font-black tracking-[0.1em] uppercase opacity-80">Setup Mission</h1>
        </div>

        {/* 右翼：アクセスプロトコル（ハンバーガーメニュー） */}
        <button 
          onClick={() => setIsHamburgerOpen(true)} 
          className="group p-3 hover:bg-oshi-primary/10 rounded-full transition-all cursor-pointer bg-transparent border-none text-oshi-primary"
        >
          <Menu size={28} />
        </button>
      </header>

      <HamburgerMenu
        isOpen={isHamburgerOpen}
        onOpenChange={setIsHamburgerOpen}
        hideTrigger
        onSettingsClick={onSettingsClick}
      />

      <main className="no-scrollbar relative z-10 w-full flex-1 flex flex-col items-center justify-center p-[4%] gap-[8%] overflow-y-auto select-none">
        
        <div className="w-full max-w-500px space-y-8">

          {/* 🚀 00. Target Dropdown：12の試練を一箇所に集約 */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] pl-4 border-l-4 border-oshi-primary">00. Select Mission Tier</h3>
            <CuteSelect
              value={config.selectedExam}
              onChange={(value) => setConfig({ ...config, selectedExam: value })}
              options={examOptions.map((exam) => ({ value: exam, label: exam }))}
            />
          </div>

          {/* 🚀 01. Question Count Dropdown：弾薬数の選択 */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] pl-4 border-l-4 border-oshi-primary">01. Question Endurance</h3>
            <CuteSelect
              value={config.questionCount}
              onChange={(value) => setConfig({ ...config, questionCount: value })}
              options={questionOptions.map((count) => ({ value: count, label: `${count}問耐久` }))}
            />
          </div>

          {/* 🚀 02. Source Dropdown：アーカイブかコラボか */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] pl-4 border-l-4 border-oshi-primary">02. Intelligence Source</h3>
            <CuteSelect
              value={config.sourceType}
              onChange={(value) => setConfig({ ...config, sourceType: value })}
              options={sourceOptions}
            />
          </div>

          {/* 🚀 03. Review Toggle：これはトグルの方が「助かる」 */}
          <button
            onClick={() => setConfig({ ...config, isReviewOnly: !config.isReviewOnly })}
            className={`w-full flex items-center justify-between p-6 rounded-3xl border-2 transition-all ${
              config.isReviewOnly ? 'bg-oshi-primary/5 border-oshi-primary' : 'bg-transparent border-oshi-primary/20 opacity-60'
            }`}
          >
            <div className="flex items-center gap-4">
              <AlertCircle className={config.isReviewOnly ? 'text-oshi-primary' : 'opacity-20'} />
              <div className="text-left">
                <p className="font-black text-xs text-oshi-primary uppercase tracking-wider">過去に間違えた問題のみを出題</p>
                <p className="text-[9px] opacity-60">間違えた問題のみを抽出</p>
              </div>
            </div>
            <div className={`w-12 h-6 rounded-full relative transition-colors ${config.isReviewOnly ? 'bg-oshi-primary' : 'bg-oshi-primary/20'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-card-bg rounded-full transition-all duration-300 ${config.isReviewOnly ? 'left-7' : 'left-1'}`} />
            </div>
          </button>

        </div>

        {/* 🚀 最終トリガー：全弾発射（反転プロトコル） */}
        <div className="flex flex-col items-center gap-4 py-8">
          <button 
            onClick={() => onStartMission(config)}
            className="group relative bg-card-bg text-oshi-primary border-2 border-oshi-primary font-black py-5 px-24 rounded-full text-xl hover:bg-oshi-primary hover:text-white transition-all duration-300 cursor-pointer outline-none flex items-center gap-3 shadow-none"
          >
            <Play size={20} fill="currentColor" />
            学習を開始する
          </button>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 animate-pulse text-oshi-primary">
            AWS Credentials Verified. Stream Starting...
          </p>
        </div>

      </main>

      <footer className="p-6 border-t border-oshi-primary/10 w-full text-center">
        <p className="text-[8px] font-mono font-black opacity-20 uppercase tracking-[0.5em] text-oshi-primary">
          V-SYNC // MINIMAL-ARMORY // KISARAGI-REN
        </p>
      </footer>
    </div>
  );
};