// src/pages/settings/SettingsPage.tsx
import React, { useState } from 'react';
import { X, User, Palette, Link as LinkIcon, ExternalLink, BookOpen, ShieldCheck, Sun, Moon } from 'lucide-react';

interface SettingsPageProps {
    initialColor: string;
    isDark: boolean;
    onToggleTheme: () => void;
    onBack: () => void;
    onApplyColor: (color: string) => void;
    onUserClick?: () => void;
    onLogout?: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ 
    initialColor, 
    isDark,
    onToggleTheme,
    onBack, 
    onApplyColor, 
    onUserClick, 
    onLogout 
}) => {
    const [customColor, setCustomColor] = useState(initialColor);

    const getSafeColor = (color: string) => {
        if (!color) return 'transparent';
        const clean = color.replace('#', '');
        return /^[0-9a-fA-F]{3,6}$/.test(clean) ? `#${clean}` : color;
    };

    const validColor = getSafeColor(customColor);

    const intelligenceAssets = [
        { name: 'NIJISANJI', link: 'https://wikiwiki.jp/nijisanji/%E3%82%AB%E3%83%A9%E3%83%BC%E3%82%B3%E3%83%BC%E3%83%89%E3%81%BE%E3%81%A8%E3%82%81', description: 'にじさんじ：非公式Wiki', isOfficial: false },
        { name: 'VSPO!', link: 'https://wikiwiki.jp/vspo/%E5%90%84%E7%A8%AE%E3%83%87%E3%83%BC%E3%82%BF/%E3%82%AB%E3%83%A9%E3%83%BC%E3%82%B3%E3%83%BC%E3%83%89%E4%B8%80%E8%A6%A7', description: 'ぶいすぽっ！：非公式Wiki', isOfficial: false },
        { name: 'NEOPORTE', link: 'https://wikiwiki.jp/neo-porte/%E3%83%87%E3%83%BC%E3%82%BF%E4%B8%80%E8%A6%A7/%E3%82%AB%E3%83%A9%E3%83%BC%E3%82%B3%E3%83%BC%E3%83%89', description: 'ネオポルテ：非公式Wiki', isOfficial: false },
        { name: 'HOLOLIVE', link: 'https://hololive.hololivepro.com/talents', description: 'ホロライブ：公式サイト', isOfficial: true },
        { name: 'NANASHI', link: 'https://wikiwiki.jp/774inc/%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC%E3%82%AB%E3%83%A9%E3%83%BC', description: 'ななしいんく：非公式Wiki', isOfficial: false }
    ];

    return (
        // 🚀 全体を CSS変数ベースの bg-main-bg に換装。transition で色の変化を滑らかに。
        <div className="fixed inset-0 z-200 bg-main-bg backdrop-blur-3xl flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 transition-colors">
            
            <header className="w-full px-5% py-8 flex justify-between items-center border-b border-oshi-primary/10">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white transition-all duration-500" style={{ backgroundColor: validColor }}>
                        <Palette size={20} />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-slate-800 dark:text-white tracking-tighter transition-colors">SETTINGS</h1>
                        <p className="text-9px font-bold text-oshi-primary uppercase tracking-0.3em transition-colors">System Synchronization</p>
                    </div>
                </div>
                
                <button onClick={onBack} className="group p-4 bg-oshi-primary/10 hover:bg-oshi-primary rounded-full transition-all duration-300 cursor-pointer">
                    <X size={24} className="text-oshi-primary group-hover:text-white transition-colors" />
                </button>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar">
                <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
                    
                    {/* 🌙 ENVIRONMENT PROTOCOL (Dark Mode Toggle) 
                         影を一切使わず、境界線とアイコンの切り替えだけで「夜戦装備」を表現。 */}
                    <section className="space-y-6">
                        <h3 className="text-10px font-black text-oshi-primary uppercase tracking-0.4em flex items-center gap-2">
                            {isDark ? <Moon size={14} /> : <Sun size={14} />} Environment Protocol
                        </h3>
                        <div className="bg-oshi-primary/5 p-8 rounded-3rem border-2 border-oshi-primary/10 flex items-center justify-between transition-colors">
                            <div className="space-y-1">
                                <span className="text-sm font-black text-slate-800 dark:text-white transition-colors">
                                    {isDark ? 'Dark Mode Active' : 'Light Mode Active'}
                                </span>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">夜戦装備への換装 / 視認性確保</p>
                            </div>
                            <button 
                                onClick={onToggleTheme}
                                className="relative w-16 h-8 bg-oshi-primary/20 rounded-full flex items-center p-1 transition-all cursor-pointer group"
                            >
                                <div className={`w-6 h-6 bg-white rounded-full flex items-center justify-center text-oshi-primary transition-all duration-500 transform ${isDark ? 'translate-x-8' : 'translate-x-0'}`}>
                                    {isDark ? <Moon size={14} fill="currentColor" /> : <Sun size={14} />}
                                </div>
                            </button>
                        </div>
                    </section>

                    {/* 🎨 COLOR PICKER SECTION */}
                    <section className="space-y-6">
                        <h3 className="text-10px font-black text-oshi-primary uppercase tracking-0.4em flex items-center gap-2">
                            <Palette size={14} /> Color Synchronization
                        </h3>
                        <div className="flex flex-col gap-8 bg-oshi-primary/5 p-8 rounded-3rem border-2 border-oshi-primary/10 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-2rem border-4 border-white dark:border-slate-800 transition-all duration-500 shrink-0" style={{ backgroundColor: validColor }} />
                                <div className="flex-1 space-y-2">
                                    <label className="text-9px font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1 transition-colors">Hex Code (Hash-less)</label>
                                    <div className="relative flex items-center">
                                        <input
                                            type="text"
                                            value={customColor}
                                            onChange={(e) => setCustomColor(e.target.value)}
                                            placeholder="BE2100"
                                            className="w-full bg-card-bg border-2 border-oshi-primary/10 rounded-2xl px-6 py-4 text-sm font-mono font-bold text-slate-700 dark:text-white focus:outline-none focus:border-oshi-primary transition-all"
                                        />
                                        <span className="absolute right-4 text-10px font-black text-oshi-primary tracking-widest uppercase opacity-40">Target Lock</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => onApplyColor(customColor)}
                                className="w-full py-5 bg-slate-900 dark:bg-oshi-primary text-white font-black text-xs uppercase tracking-0.4em rounded-2xl hover:opacity-90 active:scale-95 transition-all cursor-pointer border-none"
                            >
                                Apply System Color / 設定完了
                            </button>
                        </div>
                    </section>

                    {/* 📚 INTELLIGENCE ASSETS */}
                    <section className="space-y-6">
                        <h3 className="text-10px font-black text-oshi-primary uppercase tracking-0.4em flex items-center gap-2">
                            <BookOpen size={14} /> Intelligence Assets
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {intelligenceAssets.map((asset) => (
                                <a key={asset.name} href={asset.link} target="_blank" rel="noopener noreferrer" 
                                   className="group p-6 bg-card-bg border-2 border-oshi-primary/5 rounded-2rem hover:border-oshi-primary transition-all active:scale-95">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-xl transition-colors ${asset.isOfficial ? 'bg-blue-500/10' : 'bg-oshi-primary/10'}`}>
                                            {asset.isOfficial ? (
                                                <ShieldCheck size={18} className="text-blue-500" />
                                            ) : (
                                                <LinkIcon size={18} className="text-oshi-primary" />
                                            )}
                                        </div>
                                        <ExternalLink size={14} className="text-slate-300 dark:text-slate-600 group-hover:text-oshi-primary transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs font-black text-slate-700 dark:text-white tracking-tighter transition-colors">{asset.name}</span>
                                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{asset.description}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>

                    {/* 👤 PILOT IDENTITY */}
                    <section className="pt-12 border-t border-oshi-primary/10">
                        <div className="bg-oshi-primary/5 p-8 rounded-3rem border-2 border-oshi-primary/5 flex flex-col sm:flex-row items-center justify-between gap-8 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 bg-card-bg rounded-2rem flex items-center justify-center text-oshi-primary border-2 border-oshi-primary/10 relative transition-colors">
                                    <User size={40} />
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-900 animate-pulse" />
                                </div>
                                <div className="text-center sm:text-left">
                                    <p className="text-10px font-black text-oshi-primary uppercase tracking-0.5em mb-1">Authenticated Pilot</p>
                                    <h4 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight transition-colors">Chimi-Commander</h4>
                                </div>
                            </div>
                            <button onClick={onLogout} className="px-8 py-3 bg-oshi-primary text-white font-black text-10px uppercase tracking-widest rounded-full hover:opacity-90 transition-all cursor-pointer border-none">Logout</button>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="p-8 text-center border-t border-oshi-primary/10 transition-colors">
                <p className="text-8px font-mono font-black text-oshi-primary/30 uppercase tracking-0.5em transition-colors">
                    V-SYNC Protocol // Night Vision Capable // v11.0
                </p>
            </footer>
        </div>
    );
};