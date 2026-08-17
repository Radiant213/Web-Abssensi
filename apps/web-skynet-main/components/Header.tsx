"use client";
import { useState } from "react";
import Image from "next/image";
import {
    Cpu, Gamepad2, Layers, Sparkles, Menu, X, ArrowUpRight, ShieldCheck
} from "lucide-react";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
            <nav className="w-full max-w-7xl flex items-center justify-between gap-4">
                {/* Logo Skynet Pill */}
                <a
                    href="#hero"
                    className="glass-pill shadow-xl hover:border-cyan-500/40 rounded-full py-2 px-5 sm:px-6 flex items-center gap-3 transition-all group shrink-0"
                >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-cyan-400/40 shadow-sm group-hover:scale-105 transition-transform relative shrink-0 bg-slate-900 flex items-center justify-center">
                        <Image
                            src="/logo.ico"
                            alt="Skynet Logo"
                            width={36}
                            height={36}
                            className="object-contain"
                        />
                    </div>
                    <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-0.5">
                        Skynet<span className="text-cyan-400">.</span>
                    </span>
                </a>

                {/* Desktop Nav Items */}
                <div className="hidden lg:flex items-center gap-8 glass-pill shadow-xl rounded-full py-3 px-8 xl:px-10">
                    <div className="flex items-center gap-6 xl:gap-8">
                        <a
                            href="#hero"
                            className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-cyan-400 transition-colors"
                        >
                            Beranda
                        </a>
                        <a
                            href="#karya-iot"
                            className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                        >
                            <Cpu size={14} className="text-cyan-400" />
                            SecureGate IoT
                        </a>
                        <a
                            href="#karya-game"
                            className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                        >
                            <Gamepad2 size={14} className="text-purple-400" />
                            Whimsical Night
                        </a>
                        <a
                            href="#pilar"
                            className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                        >
                            <Layers size={14} className="text-amber-400" />
                            Pilar Inovasi
                        </a>
                    </div>
                </div>

                {/* Direct Action Button */}
                <div className="hidden sm:flex items-center gap-3 shrink-0">
                    <a
                        href="https://absen.skynett.web.id"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-pill hover:bg-cyan-500/20 hover:border-cyan-400/50 text-cyan-300 font-bold text-xs px-4 py-2.5 rounded-full transition-all flex items-center gap-1.5"
                    >
                        <ShieldCheck size={14} />
                        <span>Portal Absen</span>
                        <ArrowUpRight size={12} />
                    </a>
                    <a
                        href="https://game.skynett.web.id"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all shadow-lg shadow-purple-500/25 flex items-center gap-1.5"
                    >
                        <Gamepad2 size={14} />
                        <span>Play Game</span>
                        <ArrowUpRight size={12} />
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-3 rounded-full glass-pill text-white"
                    aria-label="Toggle Menu"
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="absolute top-20 left-4 right-4 glass-card p-6 rounded-3xl space-y-4 lg:hidden animate-in fade-in slide-in-from-top-4 duration-300 z-50">
                    <div className="flex flex-col space-y-3">
                        <a
                            href="#hero"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm font-bold text-gray-200 hover:text-cyan-400 py-2 border-b border-white/5"
                        >
                            Beranda
                        </a>
                        <a
                            href="#karya-iot"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm font-bold text-cyan-300 hover:text-cyan-400 py-2 border-b border-white/5 flex items-center gap-2"
                        >
                            <Cpu size={16} /> SecureGate IoT Attendance
                        </a>
                        <a
                            href="#karya-game"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm font-bold text-purple-300 hover:text-purple-400 py-2 border-b border-white/5 flex items-center gap-2"
                        >
                            <Gamepad2 size={16} /> Whimsical Night Horror 3D
                        </a>
                        <a
                            href="#pilar"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm font-bold text-amber-300 hover:text-amber-400 py-2 border-b border-white/5 flex items-center gap-2"
                        >
                            <Layers size={16} /> 4 Pilar Teknologi
                        </a>
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                        <a
                            href="https://absen.skynett.web.id"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-center font-bold text-xs flex items-center justify-center gap-2"
                        >
                            <ShieldCheck size={16} /> Buka Web Absensi IoT
                        </a>
                        <a
                            href="https://game.skynett.web.id"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                        >
                            <Gamepad2 size={16} /> Buka Showcase Game 3D
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
