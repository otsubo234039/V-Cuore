// src/pages/home/VspoTarget.tsx
import React from 'react';

interface VspoTargetProps {
  viewMode: 'web' | 'mobile';
}

export const VspoTarget: React.FC<VspoTargetProps> = ({ viewMode }) => {
  return (
    <div className={`absolute flex items-center justify-center animate-[spin_12s_linear_infinite] transition-all duration-1000 ${
      viewMode === 'web' ? 'bottom-[5%] right-[-5%] w-[12%] aspect-square' : 'bottom-[15%] right-[-5%] w-[25%] aspect-square'
    }`}>
      <div className="absolute inset-0 border-2 border-oshi-primary/20 rounded-full blur-sm" />
      <div className="w-[30%] h-[30%] border border-oshi-primary/30 rounded-full animate-pulse" />
    </div>
  );
};