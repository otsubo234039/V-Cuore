// src/components/layout/Header.tsx
import { HamburgerMenu } from './HamburgerMenu';

export const Header = () => {

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-16 z-50 bg-transparent flex items-center justify-between px-6">
        <div className="flex items-center">
          {/* ロゴ：中央のタイトルと呼応させるために italic と tracking-tighter を適用 */}
          <span className="text-oshi-primary font-black text-2xl tracking-tighter italic uppercase drop-shadow-sm">
            V-Cuore
          </span>

          {/* オプション：さらに『システム感』を出すなら、小さなバージョン表記を添えてもいい */}
          <span className="text-[10px] text-oshi-primary/40 font-mono font-bold self-end mb-1 ml-4 uppercase tracking-widest">
            Ver 1.0
          </span>
        </div>
        <HamburgerMenu/>
      </header>
    </>
  );
};