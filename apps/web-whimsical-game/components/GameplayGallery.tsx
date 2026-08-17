"use client";
import { useState, useRef } from "react";
import { Play, Pause, Film, Volume2, VolumeX, Maximize2, Sparkles } from "lucide-react";

export function GameplayGallery() {
    const clips = [
        {
            id: 1,
            title: "Day 1: Suasana Masuk Area Kegelapan",
            videoSrc: "/videos/gameplay_1.mp4",
            duration: "Gameplay Clip #1",
            desc: "Pengenalan suasana sunyi di awal permainan saat lampu utama padam dan pemain menyalakan senter pertama kali.",
            tag: "Atmospheric Intro"
        },
        {
            id: 2,
            title: "Eksplorasi Koridor & Suara Ganjil",
            videoSrc: "/videos/gameplay_2.mp4",
            duration: "Gameplay Clip #2",
            desc: "Pemain menelusuri lorong sempit dengan audio spasial langkah kaki yang terdengar mendekat dari sudut tak terlihat.",
            tag: "Spatial Audio"
        },
        {
            id: 3,
            title: "Tingkat Kecemasan (Sanity Drop)",
            videoSrc: "/videos/gameplay_3.mp4",
            duration: "Gameplay Clip #3",
            desc: "Efek visual distorsi dan detak jantung yang semakin intens saat pemain berada di kegelapan tanpa cahaya.",
            tag: "Fear Mechanism"
        },
        {
            id: 4,
            title: "Pencarian Baterai & Sumber Daya",
            videoSrc: "/videos/gameplay_4.mp4",
            duration: "Gameplay Clip #4",
            desc: "Mekanik scavenging baterai senter di antara perabotan rumah tua untuk memperpanjang durasi penerangan.",
            tag: "Survival Resource"
        },
        {
            id: 5,
            title: "Teka-Teki Ruang Terkunci",
            videoSrc: "/videos/gameplay_5.mp4",
            duration: "Gameplay Clip #5",
            desc: "Mencari kunci dan artefak untuk membuka pintu misterius sambil menghindari entitas tak kasat mata.",
            tag: "Puzzle & Lore"
        },
        {
            id: 6,
            title: "Teror Puncak Malam Pertama",
            videoSrc: "/videos/gameplay_6.mp4",
            duration: "Gameplay Clip #6",
            desc: "Klimaks pelarian saat entitas kegelapan mengejar pemain menuju zona aman terakhir sebelum fajar menyingsing.",
            tag: "High Tension"
        }
    ];

    const [activeClip, setActiveClip] = useState(clips[0]);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };

    const handleFullscreen = () => {
        if (!videoRef.current) return;
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        }
    };

    return (
        <section id="gallery" className="py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-bold uppercase tracking-wider">
                            <Film size={14} /> Cuplikan Langsung Gameplay
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                            Gameplay <span className="text-rose-500">Footage Video</span>
                        </h2>
                        <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
                            Pilih cuplikan di bawah untuk memutar video rekaman gameplay langsung beresolusi tinggi dari game Unity 6.3 LTS.
                        </p>
                    </div>
                </div>

                {/* Main Video Display & Selector Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Active Video Spotlight Box (7 Cols) */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="relative aspect-video rounded-[2rem] overflow-hidden horror-card-red border border-rose-500/40 bg-black group shadow-2xl">
                            {/* Real HTML5 Video Tag */}
                            <video
                                key={activeClip.videoSrc}
                                ref={videoRef}
                                src={activeClip.videoSrc}
                                controls
                                playsInline
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Video Metadata Info Strip */}
                        <div className="p-5 rounded-2xl horror-glass flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                                    <span className="text-sm font-bold text-white">{activeClip.title}</span>
                                </div>
                                <p className="text-xs text-gray-400 max-w-md">
                                    {activeClip.desc}
                                </p>
                            </div>
                            <span className="text-xs font-mono text-rose-400 font-bold bg-rose-500/10 px-3 py-1 rounded-lg self-start sm:self-auto shrink-0">
                                {activeClip.tag}
                            </span>
                        </div>
                    </div>

                    {/* Clip List Selector (5 Cols) */}
                    <div className="lg:col-span-5 space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 px-1">
                            Pilih Rekaman Gameplay (Klik untuk Putar Video):
                        </h4>
                        <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                            {clips.map((clip) => (
                                <button
                                    key={clip.id}
                                    onClick={() => {
                                        setActiveClip(clip);
                                        setIsPlaying(true);
                                    }}
                                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer ${
                                        activeClip.id === clip.id
                                            ? 'horror-card-red border-rose-500/60 shadow-lg shadow-rose-950/50 ring-2 ring-rose-500/40 bg-rose-950/20'
                                            : 'horror-glass border-white/5 hover:border-rose-500/30'
                                    }`}
                                >
                                    <div className={`p-3 rounded-xl shrink-0 mt-0.5 ${
                                        activeClip.id === clip.id
                                            ? 'bg-rose-600 text-white shadow-md shadow-rose-600/50'
                                            : 'bg-white/5 text-gray-400'
                                    }`}>
                                        <Play size={18} className={activeClip.id === clip.id ? "fill-white" : ""} />
                                    </div>
                                    <div className="space-y-1 flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <h5 className="text-sm font-bold text-white truncate">
                                                {clip.title}
                                            </h5>
                                            <span className="text-[10px] font-mono text-rose-400 shrink-0 font-bold">
                                                CLIP #{clip.id}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                                            {clip.desc}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
