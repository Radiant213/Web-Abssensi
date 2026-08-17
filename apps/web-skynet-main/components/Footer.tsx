"use client";
import Image from "next/image";
import { ArrowUpRight, Cpu, Gamepad2, Globe, Heart, ShieldCheck } from "lucide-react";

export function Footer() {
    return (
        <footer id="kontak" className="pt-16 pb-12 px-4 sm:px-6 border-t border-white/10 mt-20">
            <div className="max-w-7xl mx-auto space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    {/* Brand Info (5 cols) */}
                    <div className="md:col-span-5 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-cyan-400/40 relative bg-slate-900 flex items-center justify-center">
                                <Image
                                    src="/logo.ico"
                                    alt="Skynet Logo"
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-extrabold text-xl tracking-tight text-white">
                                Skynet<span className="text-cyan-400">.</span>
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                            Tim pengembang teknologi generasi baru yang berfokus pada integrasi embedded IoT hardware cerdas dan karya video game 3D interaktif.
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 font-mono">
                            <span>Cloud Hosted on Ubuntu VPS AWS</span>
                        </div>
                    </div>

                    {/* Ecosystem Links (4 cols) */}
                    <div className="md:col-span-4 space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                            Ekosistem Domain
                        </h4>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <a
                                    href="https://absen.skynett.web.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                                >
                                    <ShieldCheck size={14} className="text-cyan-400" />
                                    <span>absen.skynett.web.id (Portal Absen)</span>
                                    <ArrowUpRight size={12} />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://absen.skynett.web.id/penjelasan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                                >
                                    <Cpu size={14} className="text-emerald-400" />
                                    <span>absen.skynett.web.id/penjelasan (Dokumentasi)</span>
                                    <ArrowUpRight size={12} />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://game.skynett.web.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-1.5"
                                >
                                    <Gamepad2 size={14} className="text-purple-400" />
                                    <span>game.skynett.web.id (Whimsical Night)</span>
                                    <ArrowUpRight size={12} />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Access (3 cols) */}
                    <div className="md:col-span-3 space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                            Unduh Karya
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Unduh build game Unity 6 secara gratis via Google Drive resmi tim.
                        </p>
                        <a
                            href="https://drive.google.com/drive/folders/1r31qZ8EMvBn6gktr3DiIc9k4bqsFvNSu?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold text-gray-200 transition-all"
                        >
                            <span>Google Drive Game</span>
                            <ArrowUpRight size={12} />
                        </a>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>© 2026 Skynet Developer Team. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Built with Next.js 15 & Unity 6 LTS
                    </p>
                </div>
            </div>
        </footer>
    );
}
