"use client";
import { useEffect, useState, useCallback } from "react";
import {
    Wifi, WifiOff, Cpu, Clock, CreditCard,
    Radio, Monitor, Volume2, Lightbulb,
    ArrowLeft, RefreshCw, Activity
} from "lucide-react";
import Link from "next/link";

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

export default function ESP32Monitor() {
    const [status, setStatus] = useState<ESP32Status | null>(null);
    const [connected, setConnected] = useState(false);

    // Fetch ESP32 status via polling (menggantikan Socket.IO)
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

    useEffect(() => {
        // Initial fetch
        fetchStatus();

        // Poll setiap 5 detik
        const interval = setInterval(fetchStatus, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [fetchStatus]);

    // Format uptime to readable string
    const formatUptime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
        if (mins > 0) return `${mins}m ${secs}s`;
        return `${secs}s`;
    };

    // Get WiFi signal quality
    const getSignalQuality = (rssi: number) => {
        if (rssi >= -50) return { label: "Excellent", color: "text-green-400", bars: 4 };
        if (rssi >= -60) return { label: "Good", color: "text-green-400", bars: 3 };
        if (rssi >= -70) return { label: "Fair", color: "text-yellow-400", bars: 2 };
        return { label: "Weak", color: "text-red-400", bars: 1 };
    };

    const signal = status ? getSignalQuality(status.wifiSignal) : null;

    return (
        <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft size={20} className="text-gray-400" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                            ESP32 Monitor
                        </h1>
                        <p className="text-sm text-gray-400">Real-time Device Monitoring</p>
                    </div>
                </div>

                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${connected
                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                        : "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}>
                    {connected ? <Activity size={14} /> : <WifiOff size={14} />}
                    {connected ? "LIVE" : "OFFLINE"}
                </div>
            </header>

            {/* Main Status Card */}
            <div className="p-6 rounded-2xl glass border border-white/5">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-xl ${status?.online ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                            <Cpu size={32} className={status?.online ? 'text-emerald-400' : 'text-red-400'} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">ESP32 Device</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`w-2 h-2 rounded-full ${status?.online ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></span>
                                <span className={status?.online ? 'text-emerald-400' : 'text-red-400'}>
                                    {status?.online ? 'Online' : 'Offline'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {status?.lastHeartbeat && (
                        <div className="text-right">
                            <p className="text-xs text-gray-500">Last Heartbeat</p>
                            <p className="text-sm text-gray-300">
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
                            <span className="text-xs text-gray-500">WiFi Signal</span>
                        </div>
                        <p className={`text-2xl font-bold ${signal?.color || 'text-gray-500'}`}>
                            {status?.wifiSignal || 0} dBm
                        </p>
                        <p className={`text-xs ${signal?.color || 'text-gray-500'}`}>
                            {signal?.label || 'Unknown'}
                        </p>
                    </div>

                    {/* Uptime */}
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock size={16} className="text-blue-400" />
                            <span className="text-xs text-gray-500">Uptime</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-400">
                            {formatUptime(status?.uptime || 0)}
                        </p>
                        <p className="text-xs text-gray-500">Running time</p>
                    </div>

                    {/* Last Scan */}
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                            <CreditCard size={16} className="text-purple-400" />
                            <span className="text-xs text-gray-500">Last Card Scan</span>
                        </div>
                        <p className="text-lg font-mono text-purple-400">
                            {status?.lastScan || '—'}
                        </p>
                        {status?.lastScanTime && (
                            <p className="text-xs text-gray-500">
                                {new Date(status.lastScanTime).toLocaleString('id-ID')}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Components Status */}
            <div className="p-6 rounded-2xl glass border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <RefreshCw size={18} className="text-cyan-400" />
                    Component Status
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* RFID */}
                    <div className={`p-4 rounded-xl border ${status?.components?.rfid
                            ? 'bg-emerald-500/10 border-emerald-500/20'
                            : 'bg-red-500/10 border-red-500/20'
                        }`}>
                        <Radio size={24} className={status?.components?.rfid ? 'text-emerald-400' : 'text-red-400'} />
                        <p className="text-white font-medium mt-2">RFID Reader</p>
                        <p className={`text-xs ${status?.components?.rfid ? 'text-emerald-400' : 'text-red-400'}`}>
                            {status?.components?.rfid ? '✓ Active' : '✗ Inactive'}
                        </p>
                    </div>

                    {/* LCD */}
                    <div className={`p-4 rounded-xl border ${status?.components?.lcd
                            ? 'bg-emerald-500/10 border-emerald-500/20'
                            : 'bg-red-500/10 border-red-500/20'
                        }`}>
                        <Monitor size={24} className={status?.components?.lcd ? 'text-emerald-400' : 'text-red-400'} />
                        <p className="text-white font-medium mt-2">LCD Display</p>
                        <p className={`text-xs ${status?.components?.lcd ? 'text-emerald-400' : 'text-red-400'}`}>
                            {status?.components?.lcd ? '✓ Active' : '✗ Inactive'}
                        </p>
                    </div>

                    {/* DFPlayer */}
                    <div className={`p-4 rounded-xl border ${status?.components?.dfplayer
                            ? 'bg-emerald-500/10 border-emerald-500/20'
                            : 'bg-red-500/10 border-red-500/20'
                        }`}>
                        <Volume2 size={24} className={status?.components?.dfplayer ? 'text-emerald-400' : 'text-red-400'} />
                        <p className="text-white font-medium mt-2">DFPlayer</p>
                        <p className={`text-xs ${status?.components?.dfplayer ? 'text-emerald-400' : 'text-red-400'}`}>
                            {status?.components?.dfplayer ? '✓ Active' : '✗ Inactive'}
                        </p>
                    </div>

                    {/* LEDs */}
                    <div className={`p-4 rounded-xl border ${status?.components?.leds
                            ? 'bg-emerald-500/10 border-emerald-500/20'
                            : 'bg-red-500/10 border-red-500/20'
                        }`}>
                        <Lightbulb size={24} className={status?.components?.leds ? 'text-emerald-400' : 'text-red-400'} />
                        <p className="text-white font-medium mt-2">LED Indicators</p>
                        <p className={`text-xs ${status?.components?.leds ? 'text-emerald-400' : 'text-red-400'}`}>
                            {status?.components?.leds ? '✓ Active' : '✗ Inactive'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="text-center text-gray-500 text-sm">
                <p>ESP32 sends heartbeat every 10 seconds</p>
                <p>Device marked offline after 30 seconds without heartbeat</p>
            </div>
        </div>
    );
}
