"use client";
import { Wifi, WifiOff, Cpu, BookOpen, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
    connected: boolean;
}

export function Header({ connected }: HeaderProps) {
    const pathname = usePathname();

    const navItems = [
        { href: "/", label: "Dashboard", icon: LayoutDashboard },
        { href: "/esp32", label: "Monitor & WiFi", icon: Cpu },
        { href: "/penjelasan", label: "Penjelasan Sistem", icon: BookOpen },
    ];

    return (
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-white/5 pb-6">
            <div>
                <Link href="/" className="group">
                    <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 group-hover:opacity-90 transition-opacity">
                        SecureGate <span className="text-white font-light opacity-50">IoT</span>
                    </h1>
                </Link>
                <p className="text-xs md:text-sm text-gray-400 mt-0.5">
                    Real-time Attendance & ESP32 Device Management
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:gap-3">
                {/* Navigation Links */}
                <nav className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    isActive
                                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                <Icon size={14} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Status Badge */}
                <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border ${
                        connected
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                    }`}
                >
                    {connected ? (
                        <>
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <Wifi size={13} />
                            <span>LIVE</span>
                        </>
                    ) : (
                        <>
                            <WifiOff size={13} />
                            <span>OFFLINE</span>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
