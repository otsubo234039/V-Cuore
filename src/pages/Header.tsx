// src/components/layout/Header.tsx

import React from 'react';
import { User } from 'lucide-react';
import { HamburgerMenu } from './HamburgerMenu'; // パスは適宜合わせてな

interface HeaderProps {
  viewMode: 'web' | 'mobile';
  setViewMode: (mode: 'web' | 'mobile') => void;
  isLoggedIn: boolean;     
  onLoginClick: () => void; 
  onSettingsClick: () => void; 
}

export const Header: React.FC<HeaderProps> = ({ 
  isLoggedIn, 
  onLoginClick, 
  onSettingsClick 
}) => {
  return (
    <header className="relative z-100 w-full px-[5%] py-6 flex justify-between items-center select-none">
      <div className="flex items-baseline gap-2">
        {/* 🚀 粛清：テキスト色を oshi-primary に同期。これで #BE2100 が直撃する */}
        <h1 className="text-xl font-black text-oshi-primary italic tracking-tighter transition-colors duration-1000">
          V-CUORE
        </h1>
        <span className="text-[8px] font-bold text-oshi-primary/30 transition-colors duration-1000">
          VER 1.0
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* 👤 ログイン/ユーザーボタン：背景も文字も同期 */}
        <button 
          onClick={onLoginClick}
          className="relative p-2 rounded-full transition-all duration-300 active:scale-90 cursor-pointer text-oshi-primary bg-oshi-primary/10 hover:bg-oshi-primary/20"
        >
          <User size={24} strokeWidth={3} />
          {isLoggedIn && (
            // 🚀 インジケーター：ここもちみの選んだ「深紅」でパルスさせる
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-oshi-primary rounded-full border-2 border-white animate-pulse" />
          )}
        </button>

        {/* 🛠️ ハンバーガーメニュー：中身（HamburgerMenu.tsx）も oshi-primary を使うように粛清しとけよ */}
        <HamburgerMenu 
          onSettingsClick={onSettingsClick} 
        />
      </div>
    </header>
  );
};