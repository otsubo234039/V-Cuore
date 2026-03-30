// src/pages/home/NeoPorte.tsx
import React from 'react';

interface NeoPorteProps { viewMode: 'web' | 'mobile'; }

export const NeoPorte: React.FC<NeoPorteProps> = ({ viewMode }) => {
  return (
    <div className={`absolute flex items-center justify-center transition-all duration-1000 ${
      viewMode === 'web' 
        ? 'w-[20%] aspect-square top-[8%] right-[-8%]' 
        : 'w-[40%] aspect-square top-[22%] right-[-10%]'
    }`}>
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="absolute inset-0 border-4 border-oshi-primary/90 blur-[0.5px] animate-mic-cloud"
          style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
        />
        <div className="absolute w-[80%] h-[80%] bg-oshi-primary/30 blur-40px rounded-full animate-nanashi-main" />
      </div>
    </div>
  );
};