// src/components/layout/Header.tsx
import { HamburgerMenu } from './HamburgerMenu';

interface HeaderProps {
  viewMode: 'web' | 'mobile';
  setViewMode: (mode: 'web' | 'mobile') => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

export const Header = ({ viewMode, setViewMode, isLoggedIn, onLoginClick }: HeaderProps) => {

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
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'web' ? 'mobile' : 'web')}
            className="rounded-full border border-white/50 bg-white/50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-oshi-primary shadow-sm transition hover:bg-white/80"
          >
            {viewMode === 'web' ? 'Mobile' : 'Web'}
          </button>
          <button
            type="button"
            onClick={onLoginClick}
            className="rounded-full bg-oshi-primary px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-sm transition hover:scale-105"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
        <HamburgerMenu/>
      </header>
    </>
  );
};