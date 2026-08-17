"use client";
import {
    Cpu, Radio, Monitor, Volume2, Lightbulb,
    ShieldCheck, RefreshCw, KeyRound, ArrowRight,
    ArrowUpRight, Database, Server, CheckCircle2
} from "lucide-react";

export function IoTShowcase() {
    return (
        <section id="karya-iot" className="py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                            <Cpu size={14} /> Karya Perangkat Keras Unggulan
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                            SecureGate <span className="text-cyan-400">IoT Attendance</span>
                        </h2>
                        <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
                            Sistem presensi cerdas sekolah terintegrasi mikrokontroler ESP32, pembaca kartu RFID RC522, modul suara DFPlayer Mini, layar LCD 16x2, dan database MySQL VPS.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <a
                            href="https://absen.skynett.web.id/penjelasan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-3 rounded-full glass-pill hover:bg-white/10 text-xs font-bold text-gray-200 transition-all flex items-center gap-2"
                        >
                            <span>Dokumentasi Arsitektur</span>
                            <ArrowUpRight size={14} />
                        </a>
                        <a
                            href="https://absen.skynett.web.id"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                        >
                            <span>Buka Portal Absen</span>
                            <ArrowRight size={14} />
                        </a>
                    </div>
                </div>

                {/* Hardware Components Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* RFID */}
                    <div className="p-6 rounded-[2rem] glass-card border border-white/10 space-y-4 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
                        <div className="p-3.5 rounded-2xl bg-cyan-500/20 text-cyan-400 w-fit">
                            <Radio size={24} />
                        </div>
                        <div className="space-y-1.5">
                            <h3 className="text-lg font-bold text-white">RFID RC522 (SPI)</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Memindai kartu RFID 13.56MHz secara instan dan menghasilkan kode unik UID siswa.
                            </p>
                        </div>
                        <div className="text-[11px] font-mono text-cyan-300 bg-white/5 p-2 rounded-xl">
                            Pin D5 (SS) | Pin D27 (RST)
                        </div>
                    </div>

                    {/* LCD */}
                    <div className="p-6 rounded-[2rem] glass-card border border-white/10 space-y-4 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
                        <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-400 w-fit">
                            <Monitor size={24} />
                        </div>
                        <div className="space-y-1.5">
                            <h3 className="text-lg font-bold text-white">LCD 16x2 I2C</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Menampilkan token 4 digit secara permanen saat kartu baru dan konfirmasi nama siswa.
                            </p>
                        </div>
                        <div className="text-[11px] font-mono text-emerald-300 bg-white/5 p-2 rounded-xl">
                            SDA: D21 | SCL: D22 (0x27)
                        </div>
                    </div>

                    {/* DFPlayer */}
                    <div className="p-6 rounded-[2rem] glass-card border border-white/10 space-y-4 relative overflow-hidden group hover:border-purple-500/40 transition-all">
                        <div className="p-3.5 rounded-2xl bg-purple-500/20 text-purple-400 w-fit">
                            <Volume2 size={24} />
                        </div>
                        <div className="space-y-1.5">
                            <h3 className="text-lg font-bold text-white">DFPlayer Mini</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Respon suara MP3 interaktif: Welcome WiFi, Token Input, Siap Absen, Duplicate, dan Sukses.
                            </p>
                        </div>
                        <div className="text-[11px] font-mono text-purple-300 bg-white/5 p-2 rounded-xl">
                            RX2: D16 | TX2: D17 (9600)
                        </div>
                    </div>

                    {/* Tri-Color LED */}
                    <div className="p-6 rounded-[2rem] glass-card border border-white/10 space-y-4 relative overflow-hidden group hover:border-amber-500/40 transition-all">
                        <div className="p-3.5 rounded-2xl bg-amber-500/20 text-amber-400 w-fit">
                            <Lightbulb size={24} />
                        </div>
                        <div className="space-y-1.5">
                            <h3 className="text-lg font-bold text-white">Tri-Color Status LED</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                🟢 Hijau + 🔴 Merah (Sukses Absen), 🟡 Kuning (Token/Siap), 🔴 Merah (Error).
                            </p>
                        </div>
                        <div className="text-[11px] font-mono text-amber-300 bg-white/5 p-2 rounded-xl">
                            🟢 D2 | 🟡 D13 | 🔴 D4
                        </div>
                    </div>
                </div>

                {/* Feature Highlights Bento Box */}
                <div className="p-8 rounded-[2.5rem] glass-card border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
                            <KeyRound size={20} />
                        </div>
                        <h4 className="text-base font-bold text-white">Token 4-Digit Anti-Spam</h4>
                        <p className="text-xs text-gray-300 leading-relaxed">
                            Pendaftaran kartu baru mewajibkan input token 4 digit acak dari layar LCD fisik ke website, mencegah pendaftaran sembarangan.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 w-fit">
                            <RefreshCw size={20} />
                        </div>
                        <h4 className="text-base font-bold text-white">Remote WiFi NVS Flash</h4>
                        <p className="text-xs text-gray-300 leading-relaxed">
                            Penggantian nama WiFi dan password dilakukan langsung dari web portal dengan otorisasi password admin (<code className="text-cyan-300">Admin12345</code>).
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit">
                            <Database size={20} />
                        </div>
                        <h4 className="text-base font-bold text-white">MySQL Cloud Database</h4>
                        <p className="text-xs text-gray-300 leading-relaxed">
                            Seluruh riwayat presensi disimpan di database MySQL lokal VPS dengan pooling koneksi cepat dan pencatatan timestamp akurat.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
