"use client";
import {
    Gamepad2, Flame, Eye, Skull, Volume2,
    Download, ArrowUpRight, ArrowRight, ShieldAlert, Sparkles
} from "lucide-react";

export function GameShowcase() {
    const googleDriveDownloadLink = "https://drive.google.com/drive/folders/1r31qZ8EMvBn6gktr3DiIc9k4bqsFvNSu?usp=sharing";

    return (
        <section id="karya-game" className="py-20 px-4 sm:px-6 relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto space-y-12 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-400 text-xs font-bold uppercase tracking-wider">
                            <Gamepad2 size={14} /> Karya Game 3D Unity Unggulan
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                            Whimsical Night <span className="text-purple-400">Psychological Horror</span>
                        </h2>
                        <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
                            Pengalaman bertahan hidup dalam kegelapan pekat. Dibangun dengan Unity 6 LTS menghadirkan grafis realistis, audio spasial mencekam, dan mekanik teror psikologis.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <a
                            href={googleDriveDownloadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-3 rounded-full glass-pill hover:bg-white/10 text-xs font-bold text-gray-200 transition-all flex items-center gap-2"
                        >
                            <Download size={14} className="text-purple-400" />
                            <span>Download via GDrive</span>
                        </a>
                        <a
                            href="https://game.skynett.web.id"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs transition-all shadow-lg shadow-purple-500/25 flex items-center gap-2"
                        >
                            <span>Preview & Detail Game</span>
                            <ArrowRight size={14} />
                        </a>
                    </div>
                </div>

                {/* Big Game Spotlight Banner */}
                <div className="p-8 sm:p-12 rounded-[2.5rem] glass-card border border-purple-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left Lore (7 Cols) */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider">
                                Psychological Survival
                            </span>
                            <span className="text-xs text-gray-400">Windows PC • DX11/12</span>
                        </div>

                        <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                            &quot;Kegelapan Bukan Sekadar Ketiadaan Cahaya, Melainkan Sesuatu yang Mengamati.&quot;
                        </h3>

                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                            Dalam <strong>Whimsical Night</strong>, Anda terjebak di malam pertama (Day 1) di lingkungan sunyi dan ganjil. Kelola daya baterai senter, jaga tingkat kewarasan karakter dari halusinasi suara, dan selesaikan teka-teki untuk bertahan sampai fajar.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                            <div className="p-3 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                                <p className="text-sm font-bold text-purple-300">Sanity Meter</p>
                                <p className="text-[11px] text-gray-400">Pengukur Kecemasan</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                                <p className="text-sm font-bold text-rose-300">3D Spatial</p>
                                <p className="text-[11px] text-gray-400">Audio Bisikan Nyata</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-2xl border border-white/5 space-y-1 col-span-2 sm:col-span-1">
                                <p className="text-sm font-bold text-cyan-300">Unity 6 LTS</p>
                                <p className="text-[11px] text-gray-400">Lighting & Shader 3D</p>
                            </div>
                        </div>

                        <div className="pt-2">
                            <a
                                href={googleDriveDownloadLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-black font-extrabold text-xs sm:text-sm hover:bg-purple-100 transition-all shadow-xl shadow-black/40"
                            >
                                <Download size={16} />
                                <span>Unduh Game Sekarang (Google Drive)</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Features Box (5 Cols) */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                            <div className="flex items-center gap-2.5 text-purple-400 font-bold text-sm">
                                <Eye size={18} />
                                <span>Halusinasi Visual Dinamis</span>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Efek distorsi layar, vignette gelap, dan siluet bayangan yang muncul seiring menurunnya tingkat kewarasan player.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                            <div className="flex items-center gap-2.5 text-rose-400 font-bold text-sm">
                                <Volume2 size={18} />
                                <span>Audio Atmosferik Eerie</span>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Suara langkah kaki berderit, hembusan angin malam, dan detak jantung yang semakin cepat saat bahaya mendekat.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                            <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                                <Flame size={18} />
                                <span>Manajemen Sumber Daya Kritis</span>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Menghemat senter dan mencari baterai cadangan di tengah lorong-lorong gelap yang penuh kejutan mencekam.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
