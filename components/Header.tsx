import { Wifi, WifiOff } from "lucide-react";

interface HeaderProps {
    connected: boolean;
}

export function Header({ connected }: HeaderProps) {
    return (
        <header className="flex items-center justify-between py-6">
            <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                    SecureGate <span className="text-white font-light opacity-50">IoT Dashboard</span>
                </h1>
                <p className="text-sm text-gray-400">Real-time Attendance Monitoring System</p>
            </div>

            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${connected
                    ? "bg-green-500/10 border-green-500/20 text-green-400"
                    : "bg-red-500/10 border-red-500/20 text-red-400"
                }`}>
                {connected ? <Wifi size={14} /> : <WifiOff size={14} />}
                {connected ? "LIVE CONNECTION" : "DISCONNECTED"}
            </div>
        </header>
    );
}
