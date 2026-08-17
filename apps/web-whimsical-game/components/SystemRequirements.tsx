"use client";
import { Monitor, Cpu, HardDrive, Download, CheckCircle2, ArrowRight } from "lucide-react";

export function SystemRequirements() {
    const downloadLink = "https://drive.google.com/drive/folders/1r31qZ8EMvBn6gktr3DiIc9k4bqsFvNSu?usp=sharing";

    return (
        <section id="specs" className="py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-bold uppercase tracking-wider">
                        <Monitor size={14} /> Kebutuhan Sistem
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Spesifikasi PC & <span className="text-rose-500">Download Game</span>
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Pastikan perangkat komputer Anda memenuhi spesifikasi di bawah untuk mendapatkan performa 60 FPS stabil.
                    </p>
                </div>

                {/* Specs Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    {/* Minimum Specs */}
                    <div className="p-8 rounded-[2.5rem] horror-card border border-white/10 space-y-6 flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <h3 className="text-xl font-bold text-white">Spesifikasi Minimum (30 FPS)</h3>
                                <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-xs font-mono">720p / Low</span>
                            </div>

                            <ul className="space-y-3 text-xs text-gray-300">
                                <li className="flex justify-between py-1 border-b border-white/5">
                                    <span className="text-gray-400">Sistem Operasi:</span>
                                    <span className="font-mono text-white">Windows 10 / 11 (64-bit)</span>
                                </li>
                                <li className="flex justify-between py-1 border-b border-white/5">
                                    <span className="text-gray-400">Prosesor (CPU):</span>
                                    <span className="font-mono text-white">Intel Core i3 / AMD Ryzen 3</span>
                                </li>
                                <li className="flex justify-between py-1 border-b border-white/5">
                                    <span className="text-gray-400">Memori (RAM):</span>
                                    <span className="font-mono text-white">4 GB RAM</span>
                                </li>
                                <li className="flex justify-between py-1 border-b border-white/5">
                                    <span className="text-gray-400">Kartu Grafis (GPU):</span>
                                    <span className="font-mono text-white">NVIDIA GTX 750 Ti / AMD RX 550</span>
                                </li>
                                <li className="flex justify-between py-1 border-b border-white/5">
                                    <span className="text-gray-400">DirectX:</span>
                                    <span className="font-mono text-white">Version 11</span>
                                </li>
                                <li className="flex justify-between py-1">
                                    <span className="text-gray-400">Penyimpanan:</span>
                                    <span className="font-mono text-white">500 MB Free Disk Space</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Recommended Specs */}
                    <div className="p-8 rounded-[2.5rem] horror-card-red border border-rose-500/30 space-y-6 flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-rose-500/20 pb-4">
                                <h3 className="text-xl font-bold text-white">Spesifikasi Rekomendasi (60 FPS)</h3>
                                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-mono font-bold">1080p / High</span>
                            </div>

                            <ul className="space-y-3 text-xs text-gray-300">
                                <li className="flex justify-between py-1 border-b border-white/5">
                                    <span className="text-gray-400">Sistem Operasi:</span>
                                    <span className="font-mono text-white">Windows 10 / 11 (64-bit)</span>
                                </li>
                                <li className="flex justify-between py-1 border-b border-white/5">
                                    <span className="text-gray-400">Prosesor (CPU):</span>
                                    <span className="font-mono text-white">Intel Core i5 / AMD Ryzen 5</span>
                                </li>
                                <li className="flex justify-between py-1 border-b border-white/5">
                                    <span className="text-gray-400">Memori (RAM):</span>
                                    <span className="font-mono text-white">8 GB RAM atau Lebih</span>
                                </li>
                                <li className="flex justify-between py-1 border-b border-white/5">
                                    <span className="text-gray-400">Kartu Grafis (GPU):</span>
                                    <span className="font-mono text-white">NVIDIA GTX 1060 / AMD RX 580</span>
                                </li>
                                <li className="flex justify-between py-1 border-b border-white/5">
                                    <span className="text-gray-400">DirectX:</span>
                                    <span className="font-mono text-white">Version 11 / 12 (D3D12)</span>
                                </li>
                                <li className="flex justify-between py-1">
                                    <span className="text-gray-400">Penyimpanan:</span>
                                    <span className="font-mono text-white">1 GB SSD Space</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Big Download Box */}
                <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-r from-rose-950/60 via-black to-purple-950/60 border border-rose-500/30 text-center space-y-6">
                    <div className="space-y-2 max-w-2xl mx-auto">
                        <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                            Siap Menguji Keberanian Anda di Whimsical Night?
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                            Unduh arsip game lengkap gratis dari Google Drive resmi kami. Ekstrak file zip dan langsung jalankan <code className="text-rose-400 font-mono">WhymsicalNight.exe</code> tanpa perlu instalasi rumit.
                        </p>
                    </div>

                    <div className="pt-2">
                        <a
                            href={downloadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-sm sm:text-base transition-all shadow-2xl shadow-rose-600/50 hover:scale-105"
                        >
                            <Download size={20} />
                            <span>Unduh Build Game PC (Google Drive)</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
