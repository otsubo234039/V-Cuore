// src/components/layout/HamburgerMenu.tsx
import React, { useState } from 'react';
import { Settings, BookOpen, Cloud, LogOut } from 'lucide-react';

interface HamburgerMenuProps {
    onSettingsClick: () => void;
    onLogoutClick?: () => void;
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    hideTrigger?: boolean;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
    onSettingsClick,
    onLogoutClick,
    isOpen: controlledIsOpen,
    onOpenChange,
    hideTrigger = false,
}) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const isOpen = controlledIsOpen ?? internalIsOpen;

    const setIsOpen = (nextIsOpen: boolean) => {
        if (onOpenChange) {
            onOpenChange(nextIsOpen);
            return;
        }
        setInternalIsOpen(nextIsOpen);
    };

    const handleNavigate = (action: () => void) => {
        setIsOpen(false);
        setTimeout(() => action(), 300);
    };

    return (
        <>
            {/* 🛠️ バーガーアイコン：色は oshi-primary に固定し、背景に関係なく視認性を確保 */}
            {!hideTrigger && (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative z-[150] w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none cursor-pointer group bg-card-bg border border-oshi-primary/15 dark:border-oshi-primary/30 rounded-full transition-colors"
                >
                    <span className={`w-6 h-0.5 bg-oshi-primary transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`w-4 h-0.5 bg-oshi-primary self-end mr-1 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                    <span className={`w-6 h-0.5 bg-oshi-primary transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            )}

            {/* 背景のぼかし：ダークモード時はより深い闇を演出 */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-[130] transition-all duration-500"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* 🚀 サイドメニュー：
                 bg-card-bg/90 (変数) に換装し、shadow を完全パージ。
                 代わりに border-l-2 で境界を射抜くフラット戦略。 */}
            <nav className={`fixed top-0 right-0 h-full w-1/4 min-w-80 z-[140] bg-card-bg backdrop-blur-3xl border-l-2 border-oshi-primary/10 transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full pt-40 pb-12 px-8">
                    
                    {/* Command Menu タイトル：ダークモードでも品格を保つ */}
                    <h2 className="text-[10px] font-black text-oshi-primary uppercase tracking-[0.4em] mb-10 pl-2 opacity-50">Command Menu</h2>
                    
                    <ul className="flex-1 space-y-4">
                        <MenuItem icon={<BookOpen size={20}/>} label="STUDY LOG" />
                        <MenuItem icon={<Cloud size={20}/>} label="AWS SETTING" />
                        <MenuItem 
                            icon={<Settings size={20}/>} 
                            label="SETTINGS" 
                            onClick={() => handleNavigate(onSettingsClick)} 
                        />
                    </ul>

                    {/* 🚀 境界線：oshi-primary/10 でフラットな仕切り */}
                    <div className="pt-8 border-t border-oshi-primary/10">
                        <MenuItem 
                            icon={<LogOut size={20}/>} 
                            label="LOGOUT" 
                            color="text-slate-400 hover:text-red-500 transition-colors"
                            onClick={() => onLogoutClick && handleNavigate(onLogoutClick)}
                        />
                    </div>
                </div>
            </nav>
        </>
    );
};

// 🛰️ MenuItem：hover:bg-oshi-primary/10 で「選択の気配」を視覚化
const MenuItem = ({ icon, label, onClick, color = "text-oshi-primary" }: { icon: React.ReactNode, label: string, onClick?: () => void, color?: string }) => (
    <li 
        onClick={onClick} 
        className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all bg-card-bg hover:bg-oshi-primary/10 group active:scale-95 select-none"
    >
        <div className={`${color} group-hover:scale-110 transition-transform duration-300`}>{icon}</div>
        <span className={`text-xs font-black tracking-widest ${color}`}>{label}</span>
    </li>
);