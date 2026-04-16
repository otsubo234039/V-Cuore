import React from 'react';
import { Trophy, RotateCcw, Home, ChevronRight } from 'lucide-react';

interface StudyResultPageProps {
  score: number;           // 正解数
  totalQuestions: number;  // 全問題数
  onRestart: () => void;   // 再挑戦時の処理
  onGoHome: () => void;    // ホームへ戻る時の処理
}

const StudyResultPage: React.FC<StudyResultPageProps> = ({ score, totalQuestions, onRestart, onGoHome }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // スコアに基づいた評価ラベル
  const getGrade = (p: number) => {
    if (p >= 90) return { label: 'S', message: '完璧です！素晴らしい！' };
    if (p >= 80) return { label: 'A', message: 'その調子です！' };
    if (p >= 60) return { label: 'B', message: '合格点です。' };
    return { label: 'C', message: '次はもっと頑張りましょう。' };
  };

  const grade = getGrade(percentage);

  return (
    <div className="fixed inset-0 z-50 bg-main-bg text-oshi-primary flex flex-col items-center justify-center p-6 font-sans transition-colors duration-500">
      <div className="bg-card-bg border-2 border-oshi-primary/15 rounded-3xl w-full max-w-md p-8 text-center space-y-8">
        
        {/* アイコンとタイトル */}
        <div className="flex justify-center">
          <div className="p-6 rounded-full bg-oshi-primary/10 border border-oshi-primary/20">
            <Trophy className="w-16 h-16 text-oshi-primary" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">学習完了！</h1>
          <p className="mt-2 font-medium opacity-70">{grade.message}</p>
        </div>

        {/* スコア・ランク表示セクション */}
        <div className="flex justify-around items-center bg-oshi-primary/5 rounded-2xl p-6 border border-oshi-primary/10">
          <div className="space-y-1">
            <p className="text-xs uppercase font-bold tracking-wider opacity-50">Score</p>
            <p className="text-3xl font-bold">
              {score} <span className="text-lg opacity-35">/ {totalQuestions}</span>
            </p>
          </div>
          
          <div className="h-10 w-px bg-oshi-primary/20"></div>
          
          <div className="space-y-1">
            <p className="text-xs uppercase font-bold tracking-wider opacity-50">Rank</p>
            <p className="text-4xl font-black text-oshi-primary">{grade.label}</p>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="space-y-4 pt-4">
          <button
            onClick={onRestart}
            className="w-full bg-oshi-primary hover:opacity-90 text-card-bg font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 border-none"
          >
            <RotateCcw size={20} />
            もう一度挑戦する
          </button>
          
          <button
            onClick={onGoHome}
            className="w-full bg-card-bg border-2 border-oshi-primary/25 hover:border-oshi-primary text-oshi-primary font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Home size={20} />
            ホームに戻る
          </button>
        </div>

        {/* 詳細の振り返りボタン（オプション） */}
        <button className="text-sm font-bold flex items-center justify-center gap-1 mx-auto text-oshi-primary/45 hover:text-oshi-primary transition-colors">
          詳細な解答履歴を見る
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default StudyResultPage;