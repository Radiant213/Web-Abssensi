"use client";
import Image from "next/image";
import {
    Cpu, Gamepad2, ArrowRight, ArrowUpRight,
    Sparkles, ShieldCheck, Zap, Radio, Terminal
} from "lucide-react";

export function Hero() {
    return (
        <section id="hero" className="pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Hero Main Banner Box */}
                <div className="relative rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-12 md:p-14 glass-card overflow-hidden border border-white/10">
                    {/* Background Radial Glow */}
                    <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        {/* Left Content (8 Cols) */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                                <Sparkles size={14} className="text-cyan-400" />
                                <span>Skynet Developer Team Official Hub</span>
                            </div>

                            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                                Sinergi Dunia Virtual & <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                                    Sistem Otomasi Fisik
                                </span>
                            </h1>

                            <p className="text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed font-normal">
                                Menggabungkan keahlian <strong>Perangkat Keras IoT Cerdas</strong> (ESP32 RFID Attendance) dan <strong>Pengembangan Gim 3D Interaktif</strong> (Whimsical Night Horror Unity 6 LTS) dalam satu ekosistem teknologi modern.
                            </p>

                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                <a
                                    href="#karya-iot"
                                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/25 group"
                                >
                                    <span>Eksplorasi IoT Absensi</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                                <a
                                    href="#karya-game"
                                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full glass-pill hover:bg-white/10 text-white font-bold text-xs sm:text-sm transition-all border border-white/15 group"
                                >
                                    <Gamepad2 size={16} className="text-purple-400" />
                                    <span>Gim Whimsical Night</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-gray-400" />
                                </a>
                            </div>
                        </div>

                        {/* Right Floating Stats Box (4 Cols) */}
                        <div className="lg:col-span-4 flex justify-center lg:justify-end">
                            <div className="w-full sm:w-80 rounded-[2.2rem] p-6 sm:p-7 glass border border-white/15 shadow-2xl relative space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black text-xl">
                                        ⚡
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                                        Production Live
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                        2 Pilar Karya
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed font-medium">
                                        Inovasi Perangkat Keras ESP32 + Video Game Unity Teruji.
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-left">
                                    <div className="p-3 bg-white/5 rounded-xl">
                                        <p className="text-lg font-bold text-cyan-400">ESP32</p>
                                        <p className="text-[10px] text-gray-400 uppercase font-semibold">Dual-Core IoT</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-xl">
                                        <p className="text-lg font-bold text-purple-400">Unity 6</p>
                                        <p className="text-[10px] text-gray-400 uppercase font-semibold">3D Game Engine</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dual Quick Preview Cards */}
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mt-10 sm:mt-12 pt-8 border-t border-white/10">
                        {/* Card 1: SecureGate IoT */}
                        <div className="p-6 rounded-[2rem] glass border border-cyan-500/30 relative flex flex-col justify-between space-y-4 group hover:border-cyan-400/60 transition-all">
                            <div className="flex items-start justify-between">
                                <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400">
                                    <Cpu size={26} />
                                </div>
                                <a
                                    href="https://absen.skynett.web.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-300 hover:bg-cyan-400 hover:text-black flex items-center justify-center transition-all shadow-md"
                                >
                                    <ArrowUpRight size={18} />
                                </a>
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                                    SecureGate IoT Attendance
                                </h3>
                                <p className="text-xs text-gray-300 leading-relaxed font-normal">
                                    Mesin absensi pintar RFID RC522, audio DFPlayer Mini, LCD 16x2, token 4 digit anti-spam, dan sinkronisasi MySQL.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                                <span className="text-[11px] font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-lg">
                                    absen.skynett.web.id
                                </span>
                            </div>
                        </div>

                        {/* Card 2: Whimsical Night */}
                        <div className="p-6 rounded-[2rem] glass border border-purple-500/30 relative flex flex-col justify-between space-y-4 group hover:border-purple-400/60 transition-all">
                            <div className="flex items-start justify-between">
                                <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400">
                                    <Gamepad2 size={26} />
                                </div>
                                <a
                                    href="https://game.skynett.web.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-300 hover:bg-purple-400 hover:text-black flex items-center justify-center transition-all shadow-md"
                                >
                                    <ArrowUpRight size={18} />
                                </a>
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                                    Whimsical Night (Horror 3D)
                                </h3>
                                <p className="text-xs text-gray-300 leading-relaxed font-normal">
                                    Gim horor psikologis bertema kegelapan dan survival Day 1 dengan audio spasial 3D serta manajemen fear meter.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                                <span className="text-[11px] font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-lg">
                                    game.skynett.web.id
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
