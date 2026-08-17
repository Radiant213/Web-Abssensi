"use client";
import Image from "next/image";
import { ArrowUpRight, Download, Globe, ShieldCheck } from "lucide-react";

export function GameFooter() {
    const downloadLink = "https://drive.google.com/drive/folders/1r31qZ8EMvBn6gktr3DiIc9k4bqsFvNSu?usp=sharing";

    return (
        <footer className="pt-16 pb-12 px-4 sm:px-6 border-t border-white/10 mt-20">
            <div className="max-w-7xl mx-auto space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    {/* Brand Info */}
                    <div className="md:col-span-5 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-rose-500/40 relative bg-black flex items-center justify-center">
                                <Image
                                    src="/logo.ico"
                                    alt="Skynet Games Logo"
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-extrabold text-xl tracking-wider text-white">
                                WHIMSICAL <span className="text-rose-500">NIGHT</span>
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                            Game 3D Psychological Horror dikembangkan oleh divisi game <strong>Skynet Team</strong> menggunakan engine Unity 6.3 LTS.
                        </p>
                        <p className="text-[11px] text-rose-400 font-mono">
                            D3D11/12 • 64-Bit Standalone Windows PC
                        </p>
                    </div>

                    {/* Ecosystem Links */}
                    <div className="md:col-span-4 space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest">
                            Ekosistem Skynet
                        </h4>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <a
                                    href="https://skynett.web.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                                >
                                    <Globe size={14} className="text-cyan-400" />
                                    <span>skynett.web.id (Portal Tim Utama)</span>
                                    <ArrowUpRight size={12} />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://absen.skynett.web.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                                >
                                    <ShieldCheck size={14} className="text-emerald-400" />
                                    <span>absen.skynett.web.id (SecureGate IoT)</span>
                                    <ArrowUpRight size={12} />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Download */}
                    <div className="md:col-span-3 space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest">
                            Download Game
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Akses link Google Drive resmi untuk mengunduh build game terbaru.
                        </p>
                        <a
                            href={downloadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-300 hover:bg-rose-600 hover:text-white font-bold text-xs transition-all"
                        >
                            <Download size={14} />
                            <span>Unduh Build (GDrive)</span>
                        </a>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>© 2026 Whimsical Night • Skynet Game Division. All rights reserved.</p>
                    <p>Powered by Unity 6 LTS</p>
                </div>
            </div>
        </footer>
    );
}
