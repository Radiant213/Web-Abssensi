"use client";
import { useState } from "react";
import Image from "next/image";
import {
    Gamepad2, Download, Skull, Menu, X, ArrowUpRight, Globe
} from "lucide-react";

export function GameHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const downloadLink = "https://drive.google.com/drive/folders/1r31qZ8EMvBn6gktr3DiIc9k4bqsFvNSu?usp=sharing";

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
            <nav className="w-full max-w-7xl flex items-center justify-between gap-4">
                {/* Brand Logo */}
                <a
                    href="#hero"
                    className="horror-glass shadow-2xl hover:border-rose-500/40 rounded-full py-2 px-5 sm:px-6 flex items-center gap-3 transition-all group shrink-0"
                >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-rose-500/40 shadow-sm group-hover:scale-105 transition-transform relative shrink-0 bg-black flex items-center justify-center">
                        <Image
                            src="/logo.ico"
                            alt="Skynet Games"
                            width={36}
                            height={36}
                            className="object-contain"
                        />
                    </div>
                    <span className="font-extrabold text-base sm:text-lg tracking-wider text-white flex items-center gap-1">
                        WHIMSICAL <span className="text-rose-500">NIGHT</span>
                    </span>
                </a>

                {/* Desktop Nav Items */}
                <div className="hidden lg:flex items-center gap-8 horror-glass shadow-2xl rounded-full py-3 px-8 xl:px-10">
                    <div className="flex items-center gap-6 xl:gap-8">
                        <a
                            href="#hero"
                            className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-rose-400 transition-colors"
                        >
                            Overview
                        </a>
                        <a
                            href="#lore"
                            className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-rose-400 transition-colors"
                        >
                            Sinopsis
                        </a>
                        <a
                            href="#gallery"
                            className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-rose-400 transition-colors"
                        >
                            Gameplay Footage
                        </a>
                        <a
                            href="#features"
                            className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-rose-400 transition-colors"
                        >
                            Mekanik
                        </a>
                        <a
                            href="#specs"
                            className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-rose-400 transition-colors"
                        >
                            Spesifikasi PC
                        </a>
                    </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="hidden sm:flex items-center gap-3 shrink-0">
                    <a
                        href="https://skynett.web.id"
                        className="horror-glass hover:bg-white/10 text-gray-300 font-bold text-xs px-4 py-2.5 rounded-full transition-all flex items-center gap-1.5"
                    >
                        <Globe size={13} className="text-cyan-400" />
                        <span>Skynet Hub</span>
                        <ArrowUpRight size={12} />
                    </a>
                    <a
                        href={downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-full transition-all shadow-lg shadow-rose-600/30 flex items-center gap-2"
                    >
                        <Download size={14} />
                        <span>Download Game</span>
                    </a>
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden p-3 rounded-full horror-glass text-white"
                    aria-label="Toggle Menu"
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            {/* Mobile Nav Dropdown */}
            {menuOpen && (
                <div className="absolute top-20 left-4 right-4 horror-card p-6 rounded-3xl space-y-4 lg:hidden border border-rose-500/30 animate-in fade-in slide-in-from-top-4 duration-300 z-50">
                    <div className="flex flex-col space-y-3">
                        <a
                            href="#hero"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm font-bold text-gray-200 hover:text-rose-400 py-2 border-b border-white/5"
                        >
                            Overview
                        </a>
                        <a
                            href="#lore"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm font-bold text-gray-200 hover:text-rose-400 py-2 border-b border-white/5"
                        >
                            Sinopsis Cerita
                        </a>
                        <a
                            href="#gallery"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm font-bold text-gray-200 hover:text-rose-400 py-2 border-b border-white/5"
                        >
                            Cuplikan Gameplay
                        </a>
                        <a
                            href="#features"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm font-bold text-gray-200 hover:text-rose-400 py-2 border-b border-white/5"
                        >
                            Fitur & Mekanik
                        </a>
                        <a
                            href="#specs"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm font-bold text-gray-200 hover:text-rose-400 py-2 border-b border-white/5"
                        >
                            Spesifikasi PC
                        </a>
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                        <a
                            href={downloadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white text-center font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30"
                        >
                            <Download size={16} /> Unduh Game (Google Drive)
                        </a>
                        <a
                            href="https://skynett.web.id"
                            className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-center font-semibold text-xs flex items-center justify-center gap-2"
                        >
                            <Globe size={14} /> Kembali ke Skynet Hub
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
