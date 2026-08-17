"use client";
import { useEffect, useState, useCallback } from "react";
import {
    Wifi, Cpu, Clock, CreditCard,
    Radio, Monitor, Volume2, Lightbulb,
    RefreshCw, Activity, Lock, Save,
    CheckCircle2, AlertCircle, Loader2, Eye, EyeOff, KeyRound
} from "lucide-react";
import { Header } from "@/components/Header";

interface ESP32Status {
    online: boolean;
    lastHeartbeat: string | null;
    wifiSignal: number;
    uptime: number;
    lastScan: string | null;
    lastScanTime: string | null;
    components: {
        rfid: boolean;
        lcd: boolean;
        dfplayer: boolean;
        leds: boolean;
    };
}

interface WifiConfigStatus {
    ssid: string;
    pending: boolean;
    updated_at: string | null;
    synced_at: string | null;
}

export default function ESP32Monitor() {
    const [status, setStatus] = useState<ESP32Status | null>(null);
    const [connected, setConnected] = useState(false);

    // Form WiFi Config State
    const [ssidInput, setSsidInput] = useState("");
    const [passInput, setPassInput] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [adminPassInput, setAdminPassInput] = useState("");
    const [showAdminPass, setShowAdminPass] = useState(false);
    const [wifiStatus, setWifiStatus] = useState<WifiConfigStatus | null>(null);
    const [wifiLoading, setWifiLoading] = useState(false);
    const [wifiMsg, setWifiMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Fetch ESP32 status
    const fetchStatus = useCallback(async () => {
        try {
            const res = await fetch("/api/esp32/status");
            const data = await res.json();
            setStatus(data);
            setConnected(true);
        } catch (err) {
            console.error("Error fetching status:", err);
            setConnected(false);
        }
    }, []);

    // Fetch WiFi Config Status
    const fetchWifiConfig = useCallback(async () => {
        try {
            const res = await fetch("/api/esp32/wifi-config");
            const data = await res.json();
            setWifiStatus(data);
        } catch (err) {
            console.error("Error fetching wifi config:", err);
        }
    }, []);

    useEffect(() => {
        fetchStatus();
        fetchWifiConfig();

        const statusInterval = setInterval(fetchStatus, 3000);
        const wifiInterval = setInterval(fetchWifiConfig, 3000);

        return () => {
            clearInterval(statusInterval);
            clearInterval(wifiInterval);
        };
    }, [fetchStatus, fetchWifiConfig]);

    // Handle Submit Ganti WiFi
    const handleWifiSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!adminPassInput.trim()) {
            setWifiMsg({ type: 'error', text: "Password Keamanan Admin wajib diisi!" });
            return;
        }
        if (!ssidInput.trim() || !passInput.trim()) {
            setWifiMsg({ type: 'error', text: "SSID dan Password WiFi tidak boleh kosong!" });
            return;
        }

        setWifiLoading(true);
        setWifiMsg(null);

        try {
            const res = await fetch("/api/esp32/wifi-config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ssid: ssidInput.trim(),
                    password: passInput.trim(),
                    adminPassword: adminPassInput.trim()
                })
            });

            const data = await res.json();
            if (data.status === "success") {
                setWifiMsg({
                    type: 'success',
                    text: `Konfigurasi tersimpan! ESP32 akan menyambung ke "${ssidInput}" saat heartbeat berikutnya.`
                });
                setPassInput("");
                setAdminPassInput("");
                fetchWifiConfig();
            } else {
                setWifiMsg({ type: 'error', text: data.message || "Gagal mengubah konfigurasi WiFi" });
            }
        } catch {
            setWifiMsg({ type: 'error', text: "Terjadi kesalahan jaringan saat mengirim konfigurasi." });
        } finally {
            setWifiLoading(false);
        }
    };

    // Format uptime to readable string
    const formatUptime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        if (hrs > 0) return `${hrs}j ${mins}m ${secs}d`;
        if (mins > 0) return `${mins}m ${secs}d`;
        return `${secs}d`;
    };

    // Get WiFi signal quality
    const getSignalQuality = (rssi: number) => {
        if (rssi >= -50) return { label: "Sangat Kuat", color: "text-emerald-400" };
        if (rssi >= -60) return { label: "Kuat / Baik", color: "text-emerald-400" };
        if (rssi >= -70) return { label: "Cukup", color: "text-amber-400" };
        if (rssi === 0) return { label: "Tidak Ada", color: "text-gray-500" };
        return { label: "Lemah", color: "text-rose-400" };
    };

    const signal = status ? getSignalQuality(status.wifiSignal) : null;

    return (
        <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto space-y-6">
            <Header connected={connected} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Status & Component Column (2 Cols) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Main Status Card */}
                    <div className="p-6 rounded-2xl glass border border-white/5 relative overflow-hidden">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <div className={`p-4 rounded-xl ${status?.online ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                                    <Cpu size={32} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">ESP32 SecureGate Unit</h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`w-2.5 h-2.5 rounded-full ${status?.online ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`}></span>
                                        <span className={`text-sm font-medium ${status?.online ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            {status?.online ? 'Online (Terhubung)' : 'Offline / Standby'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {status?.lastHeartbeat && (
                                <div className="sm:text-right bg-white/5 sm:bg-transparent p-3 sm:p-0 rounded-xl">
                                    <p className="text-xs text-gray-400">Heartbeat Terakhir</p>
                                    <p className="text-sm font-mono text-gray-200">
                                        {new Date(status.lastHeartbeat).toLocaleTimeString('id-ID')}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {/* WiFi Signal */}
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Wifi size={16} className={signal?.color || 'text-gray-500'} />
                                    <span className="text-xs text-gray-400">Sinyal WiFi</span>
                                </div>
                                <p className={`text-xl md:text-2xl font-bold ${signal?.color || 'text-gray-500'}`}>
                                    {status?.wifiSignal || 0} <span className="text-xs font-normal">dBm</span>
                                </p>
                                <p className={`text-xs mt-1 ${signal?.color || 'text-gray-500'}`}>
                                    {signal?.label || 'Unknown'}
                                </p>
                            </div>

                            {/* Uptime */}
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock size={16} className="text-blue-400" />
                                    <span className="text-xs text-gray-400">Waktu Nyala</span>
                                </div>
                                <p className="text-xl md:text-2xl font-bold text-blue-400">
                                    {formatUptime(status?.uptime || 0)}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Uptime Device</p>
                            </div>

                            {/* Last Scan */}
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 col-span-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <CreditCard size={16} className="text-purple-400" />
                                    <span className="text-xs text-gray-400">UID Scan Terakhir</span>
                                </div>
                                <p className="text-lg font-mono text-purple-300 font-semibold truncate">
                                    {status?.lastScan || 'Belum Ada Scan'}
                                </p>
                                {status?.lastScanTime && (
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(status.lastScanTime).toLocaleString('id-ID')}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Components Status Grid */}
                    <div className="p-6 rounded-2xl glass border border-white/5">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <RefreshCw size={18} className="text-cyan-400" />
                            Status Modul Hardware IoT
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {/* RFID */}
                            <div className={`p-4 rounded-xl border ${status?.components?.rfid
                                ? 'bg-emerald-500/10 border-emerald-500/20'
                                : 'bg-rose-500/10 border-rose-500/20'
                                }`}>
                                <Radio size={24} className={status?.components?.rfid ? 'text-emerald-400' : 'text-rose-400'} />
                                <p className="text-white font-medium mt-2 text-sm">RFID RC522</p>
                                <p className={`text-xs font-medium ${status?.components?.rfid ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {status?.components?.rfid ? '● Siap / Active' : '○ Non-Aktif'}
                                </p>
                            </div>

                            {/* LCD */}
                            <div className={`p-4 rounded-xl border ${status?.components?.lcd
                                ? 'bg-emerald-500/10 border-emerald-500/20'
                                : 'bg-rose-500/10 border-rose-500/20'
                                }`}>
                                <Monitor size={24} className={status?.components?.lcd ? 'text-emerald-400' : 'text-rose-400'} />
                                <p className="text-white font-medium mt-2 text-sm">LCD 16x2 I2C</p>
                                <p className={`text-xs font-medium ${status?.components?.lcd ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {status?.components?.lcd ? '● Siap / Active' : '○ Non-Aktif'}
                                </p>
                            </div>

                            {/* DFPlayer */}
                            <div className={`p-4 rounded-xl border ${status?.components?.dfplayer
                                ? 'bg-emerald-500/10 border-emerald-500/20'
                                : 'bg-rose-500/10 border-rose-500/20'
                                }`}>
                                <Volume2 size={24} className={status?.components?.dfplayer ? 'text-emerald-400' : 'text-rose-400'} />
                                <p className="text-white font-medium mt-2 text-sm">DFPlayer Mini</p>
                                <p className={`text-xs font-medium ${status?.components?.dfplayer ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {status?.components?.dfplayer ? '● Audio Active' : '○ Non-Aktif'}
                                </p>
                            </div>

                            {/* LEDs */}
                            <div className={`p-4 rounded-xl border ${status?.components?.leds
                                ? 'bg-emerald-500/10 border-emerald-500/20'
                                : 'bg-rose-500/10 border-rose-500/20'
                                }`}>
                                <Lightbulb size={24} className={status?.components?.leds ? 'text-emerald-400' : 'text-rose-400'} />
                                <p className="text-white font-medium mt-2 text-sm">LED Indikator</p>
                                <p className={`text-xs font-medium ${status?.components?.leds ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {status?.components?.leds ? '● Tri-Color LED' : '○ Non-Aktif'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* WiFi Configuration Form Column (1 Col) */}
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl glass border border-white/5 relative">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                                <Wifi size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Ganti WiFi ESP32</h3>
                                <p className="text-xs text-gray-400">Sinkronisasi Remote via Heartbeat</p>
                            </div>
                        </div>

                        {/* Status Antrian WiFi */}
                        {wifiStatus?.pending && (
                            <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2.5">
                                <AlertCircle size={16} className="text-amber-400 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-xs font-semibold text-amber-300">Update WiFi Menunggu Heartbeat</p>
                                    <p className="text-[11px] text-amber-400/80 mt-0.5">
                                        Target SSID: <span className="font-mono font-bold text-white">{wifiStatus.ssid}</span>
                                    </p>
                                </div>
                            </div>
                        )}

                        {wifiStatus?.synced_at && !wifiStatus?.pending && (
                            <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-2.5">
                                <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-xs font-semibold text-emerald-300">WiFi Terakhir Tersinkronkan</p>
                                    <p className="text-[11px] text-emerald-400/80 mt-0.5">
                                        SSID: <span className="font-mono font-bold text-white">{wifiStatus.ssid}</span> ({new Date(wifiStatus.synced_at).toLocaleTimeString('id-ID')})
                                    </p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleWifiSubmit} className="space-y-4">
                            {/* Input SSID */}
                            <div className="space-y-1.5">
                                <label className="text-xs text-gray-300 font-medium flex items-center gap-1.5">
                                    <Wifi size={13} className="text-blue-400" />
                                    Nama WiFi (SSID) Baru
                                </label>
                                <input
                                    type="text"
                                    value={ssidInput}
                                    onChange={(e) => setSsidInput(e.target.value)}
                                    placeholder="Contoh: Kantor_Utama / Hotspot"
                                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                />
                            </div>

                            {/* Input Password WiFi */}
                            <div className="space-y-1.5">
                                <label className="text-xs text-gray-300 font-medium flex items-center gap-1.5">
                                    <Lock size={13} className="text-blue-400" />
                                    Password WiFi
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPass ? "text" : "password"}
                                        value={passInput}
                                        onChange={(e) => setPassInput(e.target.value)}
                                        placeholder="Masukkan password WiFi..."
                                        className="w-full pl-3.5 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                    >
                                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                            </div>

                            {/* Input Password Keamanan Admin */}
                            <div className="space-y-1.5 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                <label className="text-xs text-purple-300 font-semibold flex items-center gap-1.5">
                                    <KeyRound size={13} className="text-purple-400" />
                                    Password Keamanan Admin (Safety Auth)
                                </label>
                                <div className="relative">
                                    <input
                                        type={showAdminPass ? "text" : "password"}
                                        value={adminPassInput}
                                        onChange={(e) => setAdminPassInput(e.target.value)}
                                        placeholder="Masukkan password admin"
                                        className="w-full pl-3.5 pr-10 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all font-mono"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowAdminPass(!showAdminPass)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                    >
                                        {showAdminPass ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                                <p className="text-[11px] text-gray-400">
                                    Diperlukan password admin (<code className="text-purple-300">Admin12345</code>) untuk mencegah pergantian WiFi tanpa izin.
                                </p>
                            </div>

                            {/* Alert Msg */}
                            {wifiMsg && (
                                <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${wifiMsg.type === 'success'
                                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                                        : 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
                                    }`}>
                                    {wifiMsg.type === 'success' ? <CheckCircle2 size={14} className="shrink-0 mt-0.5" /> : <AlertCircle size={14} className="shrink-0 mt-0.5" />}
                                    <span>{wifiMsg.text}</span>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={wifiLoading}
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {wifiLoading ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Menyimpan...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save size={16} />
                                        <span>Simpan & Terapkan ke ESP32</span>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-4 pt-4 border-t border-white/5 space-y-2 text-[11px] text-gray-400">
                            <p className="flex items-center gap-1.5 text-gray-300 font-medium">
                                <Activity size={12} className="text-blue-400" /> Cara Kerja Sync WiFi:
                            </p>
                            <p>1. Konfigurasi disimpan ke antrian server.</p>
                            <p>2. ESP32 membaca update via Heartbeat (tiap 10s).</p>
                            <p>3. Disimpan permanen ke Flash Memory NVS ESP32.</p>
                            <p>4. Otomatis reconnect ke WiFi baru.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
