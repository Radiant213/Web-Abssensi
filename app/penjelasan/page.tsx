"use client";
import { useState } from "react";
import { Header } from "@/components/Header";
import {
    Cpu, Server, Database, ShieldCheck, Radio,
    Monitor, Volume2, Lightbulb, Zap,
    Terminal, Globe, CheckCircle2, Layers,
    HardDrive, RefreshCw, KeyRound, Check, Music
} from "lucide-react";

export default function PenjelasanSystem() {
    const [activeTab, setActiveTab] = useState<'iot' | 'flow' | 'mp3' | 'web' | 'vps'>('iot');

    return (
        <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto space-y-10">
            <Header connected={true} />

            {/* Hero Section */}
            <section className="relative p-8 md:p-12 rounded-3xl glass border border-white/10 overflow-hidden text-center space-y-6">
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                    <Zap size={14} /> Dokumentasi & Arsitektur Sistem Terpadu
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    SecureGate <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">IoT Smart Attendance</span>
                </h1>

                <p className="text-gray-300 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                    Sistem absensi pintar terintegrasi mikrokontroler <strong>ESP32</strong>, Web Dashboard <strong>Next.js 15</strong>, backend <strong>Express + MySQL</strong>, dan di-hosting pada Cloud VPS <strong>Ubuntu Linux</strong> dengan reverse proxy <strong>Nginx SSL</strong>.
                </p>

                {/* Badges Overview */}
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 pt-2">
                    <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-blue-300 flex items-center gap-1.5">
                        <Cpu size={14} /> ESP32 Dual-Core (Pin Awal)
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-emerald-300 flex items-center gap-1.5">
                        <Globe size={14} /> Next.js 15 + React 19
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-purple-300 flex items-center gap-1.5">
                        <Server size={14} /> Ubuntu 24.04 VPS (15.232.171.201)
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-amber-300 flex items-center gap-1.5">
                        <Database size={14} /> MySQL (iot_db)
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-cyan-300 flex items-center gap-1.5">
                        <ShieldCheck size={14} /> SSL HTTPS (absen.skynett.web.id)
                    </span>
                </div>
            </section>

            {/* Navigation Tabs */}
            <div className="flex justify-center">
                <div className="inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 gap-1 overflow-x-auto max-w-full">
                    <button
                        onClick={() => setActiveTab('iot')}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                            activeTab === 'iot'
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <Cpu size={16} /> 1. Modul IoT ESP32
                    </button>
                    <button
                        onClick={() => setActiveTab('flow')}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                            activeTab === 'flow'
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <KeyRound size={16} /> 2. Alur Token & LED
                    </button>
                    <button
                        onClick={() => setActiveTab('mp3')}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                            activeTab === 'mp3'
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <Music size={16} /> 3. Sound MP3 DFPlayer
                    </button>
                    <button
                        onClick={() => setActiveTab('web')}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                            activeTab === 'web'
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <Layers size={16} /> 4. Web Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('vps')}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                            activeTab === 'vps'
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <Server size={16} /> 5. Server VPS Ubuntu
                    </button>
                </div>
            </div>

            {/* TAB 1: MODUL IoT ESP32 */}
            {activeTab === 'iot' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-5 rounded-2xl glass border border-white/10 space-y-3">
                            <div className="p-3 w-fit rounded-xl bg-blue-500/20 text-blue-400">
                                <Radio size={24} />
                            </div>
                            <h3 className="text-base font-bold text-white">RFID RC522 (SPI)</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Membaca kartu pintar 13.56 MHz. Mengirimkan kode UID unik ke server untuk verifikasi presensi.
                            </p>
                            <div className="text-[11px] font-mono text-blue-300 bg-white/5 p-2 rounded-lg">
                                SS: Pin D5 | RST: Pin D27<br />
                                SCK:18 | MISO:19 | MOSI:23
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl glass border border-white/10 space-y-3">
                            <div className="p-3 w-fit rounded-xl bg-emerald-500/20 text-emerald-400">
                                <Monitor size={24} />
                            </div>
                            <h3 className="text-base font-bold text-white">LCD 16x2 I2C</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Menampilkan pesan standby, token 4 digit secara permanen saat kartu baru, dan nama siswa saat absen sukses.
                            </p>
                            <div className="text-[11px] font-mono text-emerald-300 bg-white/5 p-2 rounded-lg">
                                SDA: Pin D21 | SCL: Pin D22<br />
                                I2C Address: 0x27 / 0x3F
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl glass border border-white/10 space-y-3">
                            <div className="p-3 w-fit rounded-xl bg-purple-500/20 text-purple-400">
                                <Volume2 size={24} />
                            </div>
                            <h3 className="text-base font-bold text-white">DFPlayer Mini</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Modul pemutar suara MP3 otomatis via Serial2 hardware dengan amplifier output ke speaker 3W.
                            </p>
                            <div className="text-[11px] font-mono text-purple-300 bg-white/5 p-2 rounded-lg">
                                RX2: Pin D16 | TX2: Pin D17<br />
                                Baudrate: 9600 (Folder /mp3/)
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl glass border border-white/10 space-y-3">
                            <div className="p-3 w-fit rounded-xl bg-amber-500/20 text-amber-400">
                                <Lightbulb size={24} />
                            </div>
                            <h3 className="text-base font-bold text-white">LED Indikator Fisik</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Feedback visual: Hijau+Merah untuk sukses, Kuning untuk token/siap, dan Merah untuk duplicate/error.
                            </p>
                            <div className="text-[11px] font-mono text-amber-300 bg-white/5 p-2 rounded-lg">
                                🟢 Hijau: D2 | 🟡 Kuning: D13<br />
                                🔴 Merah: D4 (Active HIGH)
                            </div>
                        </div>
                    </div>

                    {/* Fitur WiFi NVS & Heartbeat */}
                    <div className="p-6 rounded-2xl glass border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <HardDrive size={18} className="text-cyan-400" />
                                Penyimpanan WiFi Permanen (NVS Flash Memory)
                            </h3>
                            <p className="text-xs text-gray-300 leading-relaxed">
                                ESP32 menggunakan library <code className="text-cyan-300 bg-white/5 px-1.5 py-0.5 rounded">Preferences.h</code> untuk menyimpan SSID dan Password ke Flash Non-Volatile Storage (NVS).
                            </p>
                            <ul className="space-y-2 text-xs text-gray-400">
                                <li className="flex items-center gap-2">
                                    <Check size={14} className="text-emerald-400 shrink-0" />
                                    <span>Konfigurasi WiFi tidak pernah hilang saat alat dimatikan atau mati lampu.</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={14} className="text-emerald-400 shrink-0" />
                                    <span>Memiliki nilai default cadangan (<code className="text-gray-300">IDK / 113333555555</code>).</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <RefreshCw size={18} className="text-blue-400" />
                                Remote WiFi Update via Heartbeat
                            </h3>
                            <p className="text-xs text-gray-300 leading-relaxed">
                                Pergantian WiFi dapat dilakukan langsung dari web tanpa perlu bongkar alat atau colok kabel data:
                            </p>
                            <ol className="space-y-1.5 text-xs text-gray-400 list-decimal list-inside">
                                <li>Admin memasukkan SSID & Password baru di web <code className="text-cyan-300">/esp32</code>.</li>
                                <li>ESP32 membaca perintah update pada respon <strong>Heartbeat (tiap 10s)</strong>.</li>
                                <li>ESP32 otomatis menyimpan ke Flash NVS dan langsung menyambung ke WiFi baru.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: ALUR TOKEN, LED & LOGIKA */}
            {activeTab === 'flow' && (
                <div className="space-y-6">
                    {/* Logika LED Card */}
                    <div className="p-6 rounded-2xl glass border border-white/10 space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Lightbulb size={20} className="text-amber-400" />
                            Aturan Logika Lampu LED & Tampilan LCD Final
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Berhasil */}
                            <div className="p-4 rounded-xl bg-white/5 border border-emerald-500/30 space-y-2">
                                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                                    <span className="w-3 h-3 rounded-full bg-rose-400 animate-pulse"></span>
                                    <span>Absen Berhasil</span>
                                </div>
                                <p className="text-xs text-gray-300 font-semibold">
                                    LED: 🟢 Hijau (D2) + 🔴 Merah (D4) KEDUANYA MENYALA
                                </p>
                                <p className="text-[11px] text-gray-400 font-mono bg-black/30 p-2 rounded">
                                    LCD: ABSEN BERHASIL!<br />[Nama Siswa]
                                </p>
                                <p className="text-[11px] text-emerald-300 font-semibold">🔊 mp3/0005.mp3 (Sukses)</p>
                            </div>

                            {/* Kartu Baru */}
                            <div className="p-4 rounded-xl bg-white/5 border border-amber-500/30 space-y-2">
                                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                                    <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                                    <span>Kartu Baru (Token)</span>
                                </div>
                                <p className="text-xs text-gray-300 font-semibold">
                                    LED: 🟡 Kuning (D13) MENYALA TERUS
                                </p>
                                <p className="text-[11px] text-gray-400 font-mono bg-black/30 p-2 rounded">
                                    LCD: KARTU BARU!<br />TOKEN: [4 Digit]
                                </p>
                                <p className="text-[11px] text-amber-300 font-semibold">🔊 mp3/0002.mp3 (Kartu Baru)</p>
                            </div>

                            {/* Siap Absen */}
                            <div className="p-4 rounded-xl bg-white/5 border border-blue-500/30 space-y-2">
                                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                                    <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                                    <span>Siap Absen</span>
                                </div>
                                <p className="text-xs text-gray-300 font-semibold">
                                    LED: 🟡 Kuning (D13) MENYALA
                                </p>
                                <p className="text-[11px] text-gray-400 font-mono bg-black/30 p-2 rounded">
                                    LCD: Halo, [Nama]<br />Tap Lagi Absen!
                                </p>
                                <p className="text-[11px] text-blue-300 font-semibold">🔊 mp3/0003.mp3 (Siap Absen)</p>
                            </div>

                            {/* Error / Duplicate */}
                            <div className="p-4 rounded-xl bg-white/5 border border-rose-500/30 space-y-2">
                                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                                    <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                                    <span>Duplicate / Error</span>
                                </div>
                                <p className="text-xs text-gray-300 font-semibold">
                                    LED: 🔴 Merah (D4) MENYALA SAJA
                                </p>
                                <p className="text-[11px] text-gray-400 font-mono bg-black/30 p-2 rounded">
                                    LCD: [ERR: DUP_SCAN]<br />SUDAH ABSEN!
                                </p>
                                <p className="text-[11px] text-rose-300 font-semibold">🔊 mp3/0004.mp3 (Duplikat)</p>
                            </div>
                        </div>
                    </div>

                    {/* 4-Step Verification Workflow */}
                    <div className="p-6 rounded-2xl glass border border-white/10 space-y-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <ShieldCheck size={20} className="text-emerald-400" />
                            Alur Pendaftaran Token Persistent (Anti-Spam & Otomatis)
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2 relative">
                                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                                <h4 className="text-sm font-semibold text-white">Tap Kartu Baru</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Siswa tap kartu RFID baru. Server generate <strong>Token 4 Digit</strong> dan memutar <code className="text-cyan-300">0002.mp3</code>.
                                </p>
                            </div>

                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2 relative">
                                <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                                <h4 className="text-sm font-semibold text-white">Token MUNCUL TERUS</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Token dan LED Kuning <strong>TETAP MUNCUL DI LCD</strong> (tidak hilang) dengan animasi polling titik sampai user input di web.
                                </p>
                            </div>

                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2 relative">
                                <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">3</span>
                                <h4 className="text-sm font-semibold text-white">Input Data di Web</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    User memasukkan 4 digit token di web, lalu mengisi Nama dan Kelas. Respon auto-sync memicu <code className="text-cyan-300">0003.mp3</code> di alat.
                                </p>
                            </div>

                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2 relative">
                                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">4</span>
                                <h4 className="text-sm font-semibold text-white">Tap Sekali Lagi (Absen)</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Siswa tap kartu sekali lagi. Kehadiran tersimpan di MySQL, LED Hijau+Merah menyala, dan memutar suara <code className="text-cyan-300">0005.mp3</code>!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 3: PEMETAAN SOUND MP3 DFPLAYER */}
            {activeTab === 'mp3' && (
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl glass border border-white/10 space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
                                <Music size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Pemetaan Resmi File Suara DFPlayer Mini</h3>
                                <p className="text-xs text-gray-400">Struktur folder MicroSD: <code className="text-purple-300 font-mono">/mp3/000X.mp3</code></p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* 0001.mp3 */}
                            <div className="p-5 rounded-2xl bg-white/5 border border-blue-500/30 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-400 font-mono text-xs font-bold">
                                        mp3/0001.mp3
                                    </span>
                                    <span className="text-[11px] text-blue-300 bg-white/5 px-2 py-0.5 rounded">WiFi Ready</span>
                                </div>
                                <h4 className="text-base font-bold text-white">Suara Welcome / Boot</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Diputar <strong>HANYA SETELAH</strong> ESP32 berhasil terhubung ke jaringan WiFi (<code className="text-blue-300 font-mono">WL_CONNECTED</code>).
                                </p>
                            </div>

                            {/* 0002.mp3 */}
                            <div className="p-5 rounded-2xl bg-white/5 border border-amber-500/30 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 font-mono text-xs font-bold">
                                        mp3/0002.mp3
                                    </span>
                                    <span className="text-[11px] text-amber-300 bg-white/5 px-2 py-0.5 rounded">Kartu Baru</span>
                                </div>
                                <h4 className="text-base font-bold text-white">Suara Kartu Baru (Token)</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Diputar saat kartu belum terdaftar di-tap. Menginstruksikan user untuk melihat token di LCD dan mengisi form di web.
                                </p>
                            </div>

                            {/* 0003.mp3 */}
                            <div className="p-5 rounded-2xl bg-white/5 border border-emerald-500/30 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
                                        mp3/0003.mp3
                                    </span>
                                    <span className="text-[11px] text-emerald-300 bg-white/5 px-2 py-0.5 rounded">Siap Absen</span>
                                </div>
                                <h4 className="text-base font-bold text-white">Suara Siap Absen</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Diputar saat token telah selesai diverifikasi di web atau saat kartu yang baru didaftarkan di-tap pertama kali.
                                </p>
                            </div>

                            {/* 0004.mp3 */}
                            <div className="p-5 rounded-2xl bg-white/5 border border-rose-500/30 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-400 font-mono text-xs font-bold">
                                        mp3/0004.mp3
                                    </span>
                                    <span className="text-[11px] text-rose-300 bg-white/5 px-2 py-0.5 rounded">Duplicate</span>
                                </div>
                                <h4 className="text-base font-bold text-white">Suara Sudah Pernah Absen</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Diputar jika kartu yang sama di-tap ulang pada hari yang sama (<code className="text-rose-300 font-mono">status: duplicate</code>).
                                </p>
                            </div>

                            {/* 0005.mp3 */}
                            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/30 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-400 font-mono text-xs font-bold">
                                        mp3/0005.mp3
                                    </span>
                                    <span className="text-[11px] text-purple-300 bg-white/5 px-2 py-0.5 rounded">Sukses Absen</span>
                                </div>
                                <h4 className="text-base font-bold text-white">Suara Absen Berhasil</h4>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Diputar saat presensi berhasil tercatat di MySQL. Mengucapkan terima kasih / konfirmasi kehadiran berhasil.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 4: WEB DASHBOARD */}
            {activeTab === 'web' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl glass border border-white/10 space-y-3">
                            <div className="p-3 w-fit rounded-xl bg-blue-500/20 text-blue-400">
                                <Monitor size={24} />
                            </div>
                            <h3 className="text-base font-bold text-white">Dashboard Absensi (/)</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Menampilkan tabel log absensi secara real-time, status scan terbaru dengan kartu siswa, dan modal pendaftaran token.
                            </p>
                            <ul className="text-[11px] text-gray-300 space-y-1">
                                <li>• Auto-polling & Socket.IO live sync</li>
                                <li>• History kehadiran tersimpan di MySQL</li>
                                <li>• Indikator status live alat ESP32</li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-2xl glass border border-white/10 space-y-3">
                            <div className="p-3 w-fit rounded-xl bg-purple-500/20 text-purple-400">
                                <Cpu size={24} />
                            </div>
                            <h3 className="text-base font-bold text-white">Monitor & WiFi (/esp32)</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Halaman pemantauan kesehatan perangkat keras ESP32 dan form penggantian SSID & Password WiFi secara remote.
                            </p>
                            <ul className="text-[11px] text-gray-300 space-y-1">
                                <li>• Indikator sinyal WiFi (dBm) & Uptime</li>
                                <li>• Status modul RFID, LCD, DFPlayer, LED</li>
                                <li>• Form update WiFi NVS Flash</li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-2xl glass border border-white/10 space-y-3">
                            <div className="p-3 w-fit rounded-xl bg-emerald-500/20 text-emerald-400">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-base font-bold text-white">Express Backend Engine</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Melayani Next.js SSR/CSR dan endpoint API berkecepatan tinggi dengan autentikasi Secret Key dan MySQL Connection Pool.
                            </p>
                            <ul className="text-[11px] text-gray-300 space-y-1">
                                <li>• Protected <code className="text-cyan-300">API_SECRET</code></li>
                                <li>• MySQL connection pool 10 worker</li>
                                <li>• PM2 Cluster Process Management</li>
                            </ul>
                        </div>
                    </div>

                    {/* API Endpoints Summary */}
                    <div className="p-6 rounded-2xl glass border border-white/10 space-y-4">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                            <Terminal size={18} className="text-blue-400" />
                            Daftar Endpoint API Backend
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 text-gray-400">
                                        <th className="py-2.5 px-3">Metode</th>
                                        <th className="py-2.5 px-3">Endpoint</th>
                                        <th className="py-2.5 px-3">Aktor</th>
                                        <th className="py-2.5 px-3">Deskripsi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-gray-300 font-mono">
                                    <tr>
                                        <td className="py-2.5 px-3 text-emerald-400 font-bold">POST</td>
                                        <td className="py-2.5 px-3 text-white">/api/scan</td>
                                        <td className="py-2.5 px-3 text-blue-300 font-sans">ESP32</td>
                                        <td className="py-2.5 px-3 font-sans">Scan kartu RFID (Protected Secret)</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2.5 px-3 text-emerald-400 font-bold">POST</td>
                                        <td className="py-2.5 px-3 text-white">/api/esp32/heartbeat</td>
                                        <td className="py-2.5 px-3 text-blue-300 font-sans">ESP32</td>
                                        <td className="py-2.5 px-3 font-sans">Kirim telemetri & terima WiFi update</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2.5 px-3 text-cyan-400 font-bold">GET</td>
                                        <td className="py-2.5 px-3 text-white">/api/esp32/status</td>
                                        <td className="py-2.5 px-3 text-purple-300 font-sans">Web Client</td>
                                        <td className="py-2.5 px-3 font-sans">Status live hardware ESP32</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2.5 px-3 text-emerald-400 font-bold">POST</td>
                                        <td className="py-2.5 px-3 text-white">/api/esp32/wifi-config</td>
                                        <td className="py-2.5 px-3 text-purple-300 font-sans">Web Client</td>
                                        <td className="py-2.5 px-3 font-sans">Antrekan SSID & Password WiFi baru</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2.5 px-3 text-emerald-400 font-bold">POST</td>
                                        <td className="py-2.5 px-3 text-white">/api/verify-token</td>
                                        <td className="py-2.5 px-3 text-purple-300 font-sans">Web Client</td>
                                        <td className="py-2.5 px-3 font-sans">Verifikasi token 4 digit dari LCD</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2.5 px-3 text-emerald-400 font-bold">POST</td>
                                        <td className="py-2.5 px-3 text-white">/api/register</td>
                                        <td className="py-2.5 px-3 text-purple-300 font-sans">Web Client</td>
                                        <td className="py-2.5 px-3 font-sans">Simpan data nama & kelas siswa</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2.5 px-3 text-cyan-400 font-bold">GET</td>
                                        <td className="py-2.5 px-3 text-white">/api/history</td>
                                        <td className="py-2.5 px-3 text-purple-300 font-sans">Web Client</td>
                                        <td className="py-2.5 px-3 font-sans">Ambil log riwayat absensi MySQL</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 5: SERVER VPS UBUNTU */}
            {activeTab === 'vps' && (
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl glass border border-white/10 space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3.5 rounded-2xl bg-purple-500/20 text-purple-400">
                                    <Server size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Spesifikasi Cloud Server VPS</h3>
                                    <p className="text-xs text-gray-400">Infrastruktur Hosting & Jaringan</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                                <CheckCircle2 size={14} /> Production Server Active
                            </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-1">
                                <span className="text-[11px] text-gray-400">Public IP VPS</span>
                                <p className="text-base font-mono font-bold text-blue-400">15.232.171.201</p>
                                <p className="text-[11px] text-gray-500">AWS Cloud EC2 Instance</p>
                            </div>

                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-1">
                                <span className="text-[11px] text-gray-400">Sistem Operasi</span>
                                <p className="text-base font-bold text-white">Ubuntu 24.04.4 LTS</p>
                                <p className="text-[11px] text-gray-500">Linux 7.0.0-1009-aws x86_64</p>
                            </div>

                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-1">
                                <span className="text-[11px] text-gray-400">Domain & SSL</span>
                                <p className="text-base font-bold text-emerald-400 truncate">absen.skynett.web.id</p>
                                <p className="text-[11px] text-emerald-500">Let&apos;s Encrypt Certbot HTTPS</p>
                            </div>

                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-1">
                                <span className="text-[11px] text-gray-400">Database Engine</span>
                                <p className="text-base font-bold text-amber-400">MySQL Server</p>
                                <p className="text-[11px] text-amber-500">Database: iot_db (Port 3306)</p>
                            </div>
                        </div>

                        {/* Nginx & Architecture Breakdown */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            <div className="space-y-3 bg-white/5 p-5 rounded-xl border border-white/10">
                                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                    <Globe size={16} className="text-cyan-400" />
                                    Nginx Reverse Proxy & WebSocket
                                </h4>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    Nginx bertindak sebagai gerbang utama (Port 80 & 443). Menerima traffic HTTPS dan meneruskan ke port internal Node.js (<code className="text-cyan-300">127.0.0.1:3000</code>) dengan dukungan WebSocket (<code className="text-cyan-300">Upgrade & Connection</code> header).
                                </p>
                                <div className="text-[11px] font-mono text-gray-300 bg-black/40 p-3 rounded-lg overflow-x-auto">
                                    proxy_pass http://127.0.0.1:3000;<br />
                                    proxy_http_version 1.1;<br />
                                    proxy_set_header Upgrade $http_upgrade;<br />
                                    proxy_set_header Connection &quot;upgrade&quot;;
                                </div>
                            </div>

                            <div className="space-y-3 bg-white/5 p-5 rounded-xl border border-white/10">
                                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                    <Database size={16} className="text-amber-400" />
                                    Struktur Tabel MySQL (iot_db)
                                </h4>
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    Data disimpan secara terstruktur di MySQL lokal VPS:
                                </p>
                                <ul className="text-xs text-gray-300 space-y-1.5">
                                    <li>
                                        <strong className="text-amber-300 font-mono">kartu:</strong> <span className="text-gray-400">Master data siswa (uid, nama, kelas, created_at)</span>
                                    </li>
                                    <li>
                                        <strong className="text-amber-300 font-mono">absensi:</strong> <span className="text-gray-400">Log kehadiran (id, qr_id, nama, kelas, waktu, tanggal)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
