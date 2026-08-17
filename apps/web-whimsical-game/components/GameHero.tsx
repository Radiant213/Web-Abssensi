"use client";
import {
    Download, Play, Skull, Eye, Volume2,
    Monitor, Sparkles
} from "lucide-react";

export function GameHero() {
    const downloadLink = "https://drive.google.com/drive/folders/1r31qZ8EMvBn6gktr3DiIc9k4bqsFvNSu?usp=sharing";

    return (
        <section id="hero" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-28 sm:pt-36 pb-16 sm:pb-20 px-3 sm:px-6 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-950/30 via-[#030407]/90 to-[#030407] pointer-events-none"></div>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-rose-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse-red"></div>

            <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
                {/* Upper Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/50 border border-rose-500/30 text-rose-300 text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-xl">
                    <Skull size={14} className="text-rose-500 animate-pulse" />
                    <span>Psychological Horror Survival Game</span>
                </div>

                {/* Main Game Title */}
                <div className="space-y-2">
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-[0.95] drop-shadow-2xl">
                        WHIMSICAL <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-rose-400 via-red-500 to-rose-700 animate-flicker">
                            NIGHT
                        </span>
                    </h1>
                    <p className="text-rose-300/80 font-mono text-[11px] sm:text-xs tracking-widest uppercase">
                        Unity 6.3 LTS • DirectX 11/12 • 64-Bit Windows
                    </p>
                </div>

                {/* Subtitle */}
                <p className="text-gray-300 text-xs sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light px-2">
                    Malam pertama yang sunyi di tempat terasing. Senter Anda adalah satu-satunya pelindung, dan bisikan dalam kegelapan adalah awal dari hilangnya kewarasan.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 px-2">
                    <a
                        href={downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-2xl shadow-rose-600/40 flex items-center justify-center gap-2.5 hover:scale-105 active:scale-95 text-center"
                    >
                        <Download size={17} />
                        <span>Unduh Gratis (Google Drive)</span>
                    </a>
                    <a
                        href="#gallery"
                        className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-full horror-glass hover:bg-white/10 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 border border-white/15 hover:scale-105 active:scale-95 text-center"
                    >
                        <Play size={15} className="text-rose-400 fill-rose-400" />
                        <span>Lihat Video Footage</span>
                    </a>
                </div>

                {/* Quick Info Strip */}
                <div className="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto text-left">
                    <div className="p-3.5 sm:p-4 rounded-2xl horror-glass space-y-1">
                        <div className="flex items-center gap-1.5 text-rose-400 text-[11px] font-bold uppercase">
                            <Eye size={13} /> Visual
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-white">Dynamic Sanity</p>
                        <p className="text-[10px] sm:text-[11px] text-gray-400">Distorsi layar & Halusinasi</p>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-2xl horror-glass space-y-1">
                        <div className="flex items-center gap-1.5 text-purple-400 text-[11px] font-bold uppercase">
                            <Volume2 size={13} /> Audio
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-white">3D Spatial Sound</p>
                        <p className="text-[10px] sm:text-[11px] text-gray-400">Bisikan & Langkah Eerie</p>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-2xl horror-glass space-y-1">
                        <div className="flex items-center gap-1.5 text-amber-400 text-[11px] font-bold uppercase">
                            <Sparkles size={13} /> Engine
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-white">Unity 6.3 LTS</p>
                        <p className="text-[10px] sm:text-[11px] text-gray-400">Volumetric Fog & Light</p>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-2xl horror-glass space-y-1">
                        <div className="flex items-center gap-1.5 text-cyan-400 text-[11px] font-bold uppercase">
                            <Monitor size={13} /> Platform
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-white">Windows 64-Bit</p>
                        <p className="text-[10px] sm:text-[11px] text-gray-400">DirectX 11/12 Executable</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
