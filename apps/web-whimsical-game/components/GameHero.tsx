"use client";
import {
    Download, Play, Skull, Eye, Volume2,
    ShieldAlert, Sparkles, Monitor, ArrowDown
} from "lucide-react";

export function GameHero() {
    const downloadLink = "https://drive.google.com/drive/folders/1r31qZ8EMvBn6gktr3DiIc9k4bqsFvNSu?usp=sharing";

    return (
        <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
            {/* Background Ambience & Red Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-950/25 via-[#040508]/90 to-[#040508] pointer-events-none"></div>
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
                {/* Upper Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-widest shadow-lg shadow-rose-950/50">
                    <Skull size={14} className="text-rose-500 animate-pulse" />
                    <span>Psychological Horror Survival Game</span>
                </div>

                {/* Main Game Title */}
                <div className="space-y-3">
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.95] drop-shadow-2xl">
                        WHIMSICAL <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-rose-400 via-red-500 to-rose-700 animate-flicker">
                            NIGHT
                        </span>
                    </h1>
                    <p className="text-rose-300/80 font-mono text-xs sm:text-sm tracking-widest uppercase">
                        Unity 6.3 LTS • DirectX 11/12 • 64-Bit Windows
                    </p>
                </div>

                {/* Subtitle */}
                <p className="text-gray-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
                    Malam pertama yang sunyi di tempat terasing. Senter Anda adalah satu-satunya pelindung, dan bisikan dalam kegelapan adalah awal dari hilangnya kewarasan.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <a
                        href={downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-sm sm:text-base transition-all shadow-2xl shadow-rose-600/40 flex items-center justify-center gap-3 group hover:scale-105"
                    >
                        <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                        <span>Unduh Gratis di Google Drive</span>
                    </a>
                    <a
                        href="#gallery"
                        className="w-full sm:w-auto px-7 py-4 rounded-full horror-glass hover:bg-white/10 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 border border-white/15"
                    >
                        <Play size={16} className="text-rose-400 fill-rose-400" />
                        <span>Lihat Cuplikan Gameplay</span>
                    </a>
                </div>

                {/* Quick Info Strip */}
                <div className="pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
                    <div className="p-4 rounded-2xl horror-glass space-y-1">
                        <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase">
                            <Eye size={14} /> Visual
                        </div>
                        <p className="text-sm font-bold text-white">Dynamic Sanity</p>
                        <p className="text-[11px] text-gray-400">Distorsi layar & Halusinasi</p>
                    </div>

                    <div className="p-4 rounded-2xl horror-glass space-y-1">
                        <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase">
                            <Volume2 size={14} /> Audio
                        </div>
                        <p className="text-sm font-bold text-white">3D Spatial Sound</p>
                        <p className="text-[11px] text-gray-400">Bisikan & Langkah Eerie</p>
                    </div>

                    <div className="p-4 rounded-2xl horror-glass space-y-1">
                        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
                            <Sparkles size={14} /> Engine
                        </div>
                        <p className="text-sm font-bold text-white">Unity 6.3 LTS</p>
                        <p className="text-[11px] text-gray-400">Volumetric Fog & Light</p>
                    </div>

                    <div className="p-4 rounded-2xl horror-glass space-y-1">
                        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase">
                            <Monitor size={14} /> Platform
                        </div>
                        <p className="text-sm font-bold text-white">Windows 64-Bit</p>
                        <p className="text-[11px] text-gray-400">Standalone Executable</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
