// src/pages/settings/SettingsPage.tsx
import React, { useState } from 'react';
import { X, User, Palette, Link as LinkIcon, ExternalLink, BookOpen, ShieldCheck } from 'lucide-react';

interface SettingsPageProps {
    initialColor: string; // App.tsx から現在の色を受け取る
    onBack: () => void;
    onApplyColor: (color: string) => void; // 確定した色を App.tsx へ転送
    onUserClick?: () => void;
    onLogout?: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ 
    initialColor, 
    onBack, 
    onApplyColor, 
    onUserClick, 
    onLogout 
}) => {
    // 🚀 現在の状態を反映
    const [customColor, setCustomColor] = useState(initialColor);

    const getSafeColor = (color: string) => {
        if (!color) return 'transparent';
        const clean = color.replace('#', '');
        return /^[0-9a-fA-F]{3,6}$/.test(clean) ? `#${clean}` : color;
    };

    const validColor = getSafeColor(customColor);

    const intelligenceAssets = [
        { 
            name: 'NIJISANJI', 
            link: 'https://wikiwiki.jp/nijisanji/%E3%82%AB%E3%83%A9%E3%83%BC%E3%82%B3%E3%83%BC%E3%83%89%E3%81%BE%E3%81%A8%E3%82%81',
            description: 'にじさんじ：非公式Wiki',
            isOfficial: false
        },
        { 
            name: 'VSPO!', 
            link: 'https://wikiwiki.jp/vspo/%E5%90%84%E7%A8%AE%E3%83%87%E3%83%BC%E3%82%BF/%E3%82%AB%E3%83%A9%E3%83%BC%E3%82%B3%E3%83%BC%E3%83%89%E4%B8%80%E8%A6%A7',
            description: 'ぶいすぽっ！：非公式Wiki',
            isOfficial: false
        },
        { 
            name: 'NEOPORTE', 
            link: 'https://wikiwiki.jp/neo-porte/%E3%83%87%E3%83%BC%E3%82%BF%E4%B8%80%E8%A6%A7/%E3%82%AB%E3%83%A9%E3%83%BC%E3%82%B3%E3%83%BC%E3%83%89',
            description: 'ネオポルテ：非公式Wiki',
            isOfficial: false
        },
        { 
            name: 'HOLOLIVE', 
            link: 'https://hololive.hololivepro.com/talents',
            description: 'ホロライブ：公式サイト',
            isOfficial: true
        },
        { 
            name: 'NANASHI', 
            link: 'https://wikiwiki.jp/774inc/%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC%E3%82%AB%E3%83%A9%E3%83%BC',
            description: 'ななしいんく：非公式Wiki',
            isOfficial: false
        }
    ];

    return (
        <div className="fixed inset-0 z-200 bg-white/95 backdrop-blur-3xl flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <header className="w-full px-5% py-8 flex justify-between items-center border-b border-oshi-primary-20">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-500" style={{ backgroundColor: validColor }}>
                        <Palette size={20} />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-slate-800 tracking-tighter">SETTINGS</h1>
                        <p className="text-9px font-bold text-oshi-primary uppercase tracking-0.3em transition-colors duration-500">System Synchronization</p>
                    </div>
                </div>
                
                <button onClick={onBack} className="group p-4 bg-oshi-primary-20 hover:bg-oshi-primary rounded-full transition-all duration-300 cursor-pointer shadow-sm">
                    <X size={24} className="text-oshi-primary group-hover:text-white transition-colors" />
                </button>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar">
                <div className="max-w-3xl mx-auto px-6 py-16 space-y-16">
                    
                    {/* 🎨 COLOR PICKER SECTION */}
                    <section className="space-y-6">
                        <h3 className="text-10px font-black text-oshi-primary uppercase tracking-0.4em flex items-center gap-2">
                            <Palette size={14} /> Color Synchronization
                        </h3>
                        <div className="flex flex-col gap-8 bg-oshi-primary-20/10 p-8 rounded-3rem border border-oshi-primary-20 shadow-inner transition-colors duration-500">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-2rem shadow-xl border-4 border-white transition-all duration-500 shrink-0" style={{ backgroundColor: validColor }} />
                                <div className="flex-1 space-y-2">
                                    <label className="text-9px font-black text-slate-400 uppercase tracking-widest ml-1">Hex Code (Hash-less)</label>
                                    <div className="relative flex items-center">
                                        <input
                                            type="text"
                                            value={customColor}
                                            onChange={(e) => setCustomColor(e.target.value)}
                                            placeholder="BE2100"
                                            className="w-full bg-white border border-oshi-primary-20 rounded-2xl px-6 py-4 text-sm font-mono font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-oshi-primary-20 transition-all"
                                        />
                                        <span className="absolute right-4 text-10px font-black text-oshi-primary tracking-widest uppercase opacity-40">Target Lock</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => onApplyColor(customColor)}
                                className="w-full py-5 bg-slate-900 text-white font-black text-xs uppercase tracking-0.4em rounded-2xl hover:bg-black active:scale-95 transition-all shadow-xl shadow-slate-200 cursor-pointer"
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {intelligenceAssets.map((asset) => (
                                <a key={asset.name} href={asset.link} target="_blank" rel="noopener noreferrer" 
                                   className="group p-6 bg-white border border-oshi-primary-20 rounded-2rem hover:border-oshi-primary hover:shadow-xl hover:shadow-oshi-primary-20 transition-all active:scale-95">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-xl transition-colors ${asset.isOfficial ? 'bg-blue-50 group-hover:bg-blue-500' : 'bg-oshi-primary-20 group-hover:bg-oshi-primary'}`}>
                                            {asset.isOfficial ? (
                                                <ShieldCheck size={18} className="text-blue-500 group-hover:text-white" />
                                            ) : (
                                                <LinkIcon size={18} className="text-oshi-primary group-hover:text-white" />
                                            )}
                                        </div>
                                        <ExternalLink size={14} className="text-slate-200 group-hover:text-oshi-primary transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs font-black text-slate-700 tracking-tighter">{asset.name}</span>
                                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{asset.description}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>

                    {/* 👤 PILOT IDENTITY */}
                    <section className="pt-12 border-t border-oshi-primary-20">
                        <div className="bg-linear-to-br from-white via-oshi-primary-20/30 to-white p-8 rounded-3rem border border-white shadow-inner flex flex-col sm:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 bg-white rounded-2rem flex items-center justify-center text-oshi-primary shadow-xl border border-oshi-primary-20 relative group transition-colors duration-500">
                                    <User size={40} />
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white animate-pulse" />
                                </div>
                                <div className="text-center sm:text-left">
                                    <p className="text-10px font-black text-oshi-primary uppercase tracking-0.5em mb-1">Authenticated Pilot</p>
                                    <h4 className="text-2xl font-black text-slate-800 tracking-tight">Chimi-Commander</h4>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-full sm:w-auto">
                                <button onClick={onLogout} className="px-8 py-3 bg-oshi-primary text-white font-black text-10px uppercase tracking-widest rounded-full hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-oshi-primary-20">Logout</button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="p-8 text-center border-t border-oshi-primary-20 bg-white/50">
                <p className="text-8px font-mono font-black text-oshi-primary/40 uppercase tracking-0.5em transition-colors duration-500">
                    V-SYNC Protocol // Hybrid Intelligence Access // v8.8
                </p>
            </footer>
        </div>
    );
};