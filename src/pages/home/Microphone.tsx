// src/pages/home/Microphone.tsx
import React from 'react';

interface MicrophoneProps {
  viewMode: 'web' | 'mobile';
}

export const Microphone: React.FC<MicrophoneProps> = ({ viewMode }) => {
  return (
    <div className={`absolute flex items-center justify-center rotate-[-30deg] transition-all duration-1000 pointer-events-none ${
      viewMode === 'web' 
        ? 'w-[10%] h-[18%] bottom-[20%] left-[5%]' 
        : 'w-[45%] h-[25%] bottom-[5%] left-[-10%]'
    }`}>
      {/* 周囲のオーラ */}
      <div className="absolute w-[140%] h-[140%] bg-[#DB6B8F]/20 rounded-full blur-[60px] animate-mic-cloud" />

      {/* マイク本体 */}
      <div className="relative w-full h-full animate-mic-breathe drop-shadow-2xl">
        <svg 
          viewBox="0 0 400 550" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#DB6B8F]"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle cx="200" cy="110" r="85" fill="currentColor" />
          <rect x="110" y="190" width="180" height="18" rx="4" fill="currentColor" />
          <path
            d="M 165 480 L 235 480 L 235 250 L 275 208 L 125 208 L 165 250 Z"
            fill="currentColor"
          />
          <path 
            d="M 180 480 L 185 510 C 185 515 190 520 200 520 C 210 520 215 515 215 510 L 220 480 Z" 
            fill="currentColor" 
            opacity="0.95"
          />
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
  );
};