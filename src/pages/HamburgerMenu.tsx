// src/components/layout/HamburgerMenu.tsx
import React, { useState } from 'react';
import { Settings, Home, BookOpen, Cloud, LogOut } from 'lucide-react';

interface HamburgerMenuProps {
    onSettingsClick: () => void;
    onLogoutClick?: () => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onSettingsClick, onLogoutClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleNavigate = (action: () => void) => {
        setIsOpen(false);
        setTimeout(() => action(), 300);
    };

    return (
        <>
            {/* 🛠️ バーガーアイコン：bg-oshi-primary で思想を同期 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-150 w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none cursor-pointer group"
            >
                <span className={`w-6 h-0.5 bg-oshi-primary transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-4 h-0.5 bg-oshi-primary self-end mr-1 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`w-6 h-0.5 bg-oshi-primary transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

            {/* 背景のぼかし */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/5 backdrop-blur-sm z-130 transition-opacity duration-500"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* 🚀 サイドメニュー：影の色も oshi-primary-20 に同期させて「どんより」を回避 */}
            <nav className={`fixed top-0 right-0 h-full w-1/4 min-w-80 z-140 bg-white/80 backdrop-blur-3xl border-l border-white/40 transition-transform duration-500 ease-out shadow-[-20px_0_40px_-20px_var(--oshi-primary-20)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full pt-40 pb-12 px-8">
                    {/* Command Menu タイトル： text-oshi-primary/60 で品格を出す */}
                    <h2 className="text-10px font-black text-oshi-primary uppercase tracking-0.4em mb-10 pl-2 opacity-60">Command Menu</h2>
                    
                    <ul className="flex-1 space-y-4">
                        <MenuItem icon={<Home size={20}/>} label="HOME" onClick={() => setIsOpen(false)} />
                        <MenuItem icon={<BookOpen size={20}/>} label="STUDY LOG" />
                        <MenuItem icon={<Cloud size={20}/>} label="AWS SETTING" />
                        <MenuItem 
                            icon={<Settings size={20}/>} 
                            label="SETTINGS" 
                            onClick={() => handleNavigate(onSettingsClick)} 
                        />
                    </ul>

                    {/* 🚀 境界線：ピンクをパージし、薄い枠線へ */}
                    <div className="pt-8 border-t border-oshi-primary-20">
                        <MenuItem 
                            icon={<LogOut size={20}/>} 
                            label="LOGOUT" 
                            color="text-slate-400 hover:text-red-500"
                            onClick={() => onLogoutClick && handleNavigate(onLogoutClick)}
                        />
                    </div>
                </div>
            </nav>
        </>
    );
};

// 🛰️ MenuItem：デフォルトカラーを text-oshi-primary に粛清
const MenuItem = ({ icon, label, onClick, color = "text-oshi-primary" }: { icon: React.ReactNode, label: string, onClick?: () => void, color?: string }) => (
    <li onClick={onClick} className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all hover:bg-oshi-primary-20 group active:scale-95 select-none">
        <div className={`${color} group-hover:scale-110 transition-transform duration-300`}>{icon}</div>
        <span className={`text-xs font-black tracking-widest ${color}`}>{label}</span>
    </li>
);