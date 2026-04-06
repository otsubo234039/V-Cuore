// src/components/layout/HamburgerMenu.tsx
import { useState } from 'react';
import { Settings, BookOpen, Cloud, Home, LogOut } from 'lucide-react'; // 🚀 品格あるアイコンを召喚

interface HamburgerMenuProps {
    onSettingsClick?: () => void; // 設定画面への座標
    onLogoutClick?: () => void;   // 粛清（ログアウト）用
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onSettingsClick, onLogoutClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    // ⚡️ ゲート遷移：メニューを閉じてから目的地へ
    const handleNavigate = (action?: () => void) => {
        setIsOpen(false); // まずはハッチを閉じる
        if (action) action(); // その後、目的地へ転移
    };

    return (
        <>
            {/* 🛠️ トリガーボタン：z-50 で常に最前面 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
            >
                <span className={`w-6 h-0.5 bg-oshi-primary transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-6 h-0.5 bg-oshi-primary transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`w-6 h-0.5 bg-oshi-primary transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

            {/* 🛰️ 背景オーバーレイ：メニュー外を押しても閉じられる「品格」 */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/10 backdrop-blur-sm z-30 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* 🛰️ メニュー本体：V-SYNC デザイン */}
            <nav className={`fixed top-0 right-0 h-full w-1/4 min-w-75 z-40 bg-white/80 backdrop-blur-3xl border-l border-white/40 transition-transform duration-500 ease-out shadow-[-20px_0_40px_-20px_var(--oshi-primary-20)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full pt-40 pb-12 px-8">
                    <h2 className="text-[10px] font-black text-oshi-primary/60 uppercase tracking-[0.4em] mb-10 pl-2">Command Menu</h2>
                    
                    <ul className="flex-1 space-y-4">
                        <MenuItem icon={<Home size={20}/>} label="HOME" onClick={() => handleNavigate()} />
                        <MenuItem icon={<BookOpen size={20}/>} label="STUDY LOG" />
                        <MenuItem icon={<Cloud size={20}/>} label="AWS SETTING" />
                        
                        {/* 🚀 SETTINGS：ここが今回のメインエイムや */}
                        <MenuItem 
                            icon={<Settings size={20}/>} 
                            label="SETTINGS" 
                            onClick={() => handleNavigate(onSettingsClick)} 
                        />
                    </ul>

                    {/* 粛清（ログアウト）エリア */}
                    <div className="pt-8 border-t border-oshi-primary-20">
                        <MenuItem 
                            icon={<LogOut size={20}/>} 
                            label="LOGOUT" 
                            color="text-slate-400 hover:text-red-500"
                            onClick={() => handleNavigate(onLogoutClick)}
                        />
                    </div>
                </div>
            </nav>
        </>
    );
};

// 🛰️ サブコンポーネント：リスト項目のテンプレート
const MenuItem = ({ icon, label, onClick, color = "text-oshi-primary" }: { icon: React.ReactNode, label: string, onClick?: () => void, color?: string }) => (
    <li 
        onClick={onClick}
        className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all hover:bg-oshi-primary-20 group active:scale-95`}
    >
        <div className={`${color} group-hover:scale-110 transition-transform duration-300`}>
            {icon}
        </div>
        <span className={`text-sm font-black tracking-widest ${color}`}>{label}</span>
    </li>
);