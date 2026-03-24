// src/components/layout/HamburgerMenu.tsx
import { useState } from 'react'; // ここで useState を使うのがポイント

export const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false); // 魂（状態）をこっちに移送

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
            >
                <span className={`w-6 h-0.5 bg-oshi-primary transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-6 h-0.5 bg-oshi-primary transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`w-6 h-0.5 bg-oshi-primary transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

            {/* メニュー本体 */}
            <nav className={`fixed top-0 right-0 h-full w-1/4 min-w-70 z-40 bg-white/60 backdrop-blur-2xl border-l border-white/20 transition-transform duration-500 shadow-[-10px_0_30px_-15px_rgba(190,33,82,0.2)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <ul className="flex flex-col items-start h-full pt-48 pb-16 px-10 space-y-12 text-2xl font-black text-oshi-primary tracking-tight">
                    <li className="cursor-pointer hover:scale-110 transition-transform">HOME</li>
                    <li className="cursor-pointer hover:scale-110 transition-transform">STUDY LOG</li>
                    <li className="cursor-pointer hover:scale-110 transition-transform">AWS SETTING</li>
                </ul>
            </nav>
        </>
    );
};