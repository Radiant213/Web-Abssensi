"use client";
import {
    Cpu, Gamepad2, Globe, Server,
    Layers, Zap, ShieldCheck, Check
} from "lucide-react";

export function Pillars() {
    const pillars = [
        {
            number: "01",
            icon: <Cpu className="w-6 h-6 text-cyan-400" />,
            bgColor: "bg-cyan-500/10",
            borderColor: "border-cyan-500/20 hover:border-cyan-500/50",
            title: "Embedded & IoT Engineering",
            desc: "Pengembangan sistem tertanam mikrokontroler ESP32, integrasi protokol SPI/I2C, modul RFID, audio decoder, dan memori NVS non-volatile.",
            tags: ["ESP32", "RFID RC522", "I2C/SPI", "Flash NVS"]
        },
        {
            number: "02",
            icon: <Gamepad2 className="w-6 h-6 text-purple-400" />,
            bgColor: "bg-purple-500/10",
            borderColor: "border-purple-500/20 hover:border-purple-500/50",
            title: "3D Game & Interactive Dev",
            desc: "Penciptaan game horor psikologis atmosferik menggunakan Unity 6 LTS, scripting C#, tata cahaya dinamis, dan efek audio spasial 3D realistis.",
            tags: ["Unity 6 LTS", "C# Scripting", "3D Audio", "Shaders"]
        },
        {
            number: "03",
            icon: <Globe className="w-6 h-6 text-blue-400" />,
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/20 hover:border-blue-500/50",
            title: "Full-Stack Realtime Web",
            desc: "Pembangunan web portal interaktif berbasis Next.js 15 App Router, Express.js backend, Socket.IO event bus, dan optimasi database MySQL.",
            tags: ["Next.js 15", "React 19", "Socket.IO", "MySQL"]
        },
        {
            number: "04",
            icon: <Server className="w-6 h-6 text-emerald-400" />,
            bgColor: "bg-emerald-500/10",
            borderColor: "border-emerald-500/20 hover:border-emerald-500/50",
            title: "Cloud & DevOps Infrastructure",
            desc: "Deployment terpadu pada Cloud VPS Ubuntu Linux, manajemen multi-domain Nginx SSL Let's Encrypt, dan clustering PM2 auto-recovery.",
            tags: ["Ubuntu Linux", "Nginx SSL", "PM2 Cluster", "Multi-Domain"]
        }
    ];

    return (
        <section id="pilar" className="py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                        <Layers size={14} /> Keunggulan Kompetensi
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                        4 Pilar Fondasi Teknologi <span className="text-cyan-400">Skynet</span>
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Pendekatan holistik yang menghubungkan dunia perangkat keras, perangkat lunak visual interaktif, dan infrastruktur cloud kelas industri.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pillars.map((item, idx) => (
                        <div
                            key={idx}
                            className={`p-6 rounded-[2.2rem] glass-card border ${item.borderColor} space-y-6 flex flex-col justify-between transition-all group`}
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className={`p-3 rounded-2xl ${item.bgColor}`}>
                                        {item.icon}
                                    </div>
                                    <span className="text-sm font-mono font-bold text-gray-500">
                                        {item.number}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-cyan-400 transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-xs text-gray-400 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                                {item.tags.map((t, i) => (
                                    <span
                                        key={i}
                                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-gray-300"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
