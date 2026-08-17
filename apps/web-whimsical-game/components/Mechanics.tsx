"use client";
import {
    Activity, BatteryCharging, Volume2, Eye,
    Sparkles, Key, Zap, Shield, Skull
} from "lucide-react";

export function Mechanics() {
    const features = [
        {
            icon: <Activity className="w-6 h-6 text-rose-500" />,
            title: "Sanity & Fear Meter",
            desc: "Detak jantung meningkat dan layar mengalami chromatic aberration ketika rasa takut memuncak di kegelapan."
        },
        {
            icon: <BatteryCharging className="w-6 h-6 text-amber-500" />,
            title: "Flashlight Battery Scavenge",
            desc: "Daya senter terbatas mengharuskan pemain membuat keputusan taktis kapan harus menyalakan atau mematikan cahaya."
        },
        {
            icon: <Volume2 className="w-6 h-6 text-purple-400" />,
            title: "Binaural 3D Spatial Audio",
            desc: "Setiap langkah kaki, gesekan pintu, dan bisikan dihitung dengan akurasi 360 derajat posisi spasial 3D."
        },
        {
            icon: <Eye className="w-6 h-6 text-cyan-400" />,
            title: "Reactive Entity AI",
            desc: "Entitas kegelapan bereaksi aktif terhadap sorotan cahaya senter dan suara pergerakan terburu-buru pemain."
        },
        {
            icon: <Key className="w-6 h-6 text-emerald-400" />,
            title: "Environmental Puzzle",
            desc: "Teka-teki gembok, kode angka tersembunyi di dinding, dan artefak kuno yang membuka lorong pelarian."
        },
        {
            icon: <Zap className="w-6 h-6 text-blue-400" />,
            title: "Unity 6 HDRP / URP Power",
            desc: "Optimalisasi frame rate tinggi pada sistem DirectX 11 & 12 dengan volumetrik lighting yang pekat."
        }
    ];

    return (
        <section id="features" className="py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-bold uppercase tracking-wider">
                        <Skull size={14} /> Mekanik Permainan
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Fitur & Sistem <span className="text-rose-500">Gameplay Utama</span>
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Dirancang secara detail untuk menghadirkan pengalaman horor psikologis yang imersif dan menantang keberanian.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feat, idx) => (
                        <div
                            key={idx}
                            className="p-7 rounded-[2.2rem] horror-card border border-white/5 hover:border-rose-500/30 transition-all space-y-4 group"
                        >
                            <div className="p-3.5 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform">
                                {feat.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-rose-400 transition-colors">
                                {feat.title}
                            </h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                {feat.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
