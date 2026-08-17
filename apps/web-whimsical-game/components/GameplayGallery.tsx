"use client";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Film, Volume2, VolumeX, Maximize2, Sparkles, RefreshCw, Radio } from "lucide-react";

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

    const [currentIndex, setCurrentIndex] = useState(0);
    const activeClip = clips[currentIndex];
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    // Auto Play saat section masuk ke viewport layar
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && videoRef.current) {
                        videoRef.current.play().then(() => {
                            setIsPlaying(true);
                        }).catch(() => {
                            // Browser policy fallback
                        });
                    }
                });
            },
            { threshold: 0.25 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Otomatis play saat clip berganti
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(() => {});
        }
    }, [currentIndex]);

    // Handle saat 1 video selesai -> Otomatis lanjut ke video berikutnya (Infinite Looping Playlist)
    const handleVideoEnded = () => {
        setCurrentIndex((prev) => (prev + 1) % clips.length);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        const newMuteState = !isMuted;
        videoRef.current.muted = newMuteState;
        setIsMuted(newMuteState);
    };

    return (
        <section id="gallery" ref={sectionRef} className="py-20 px-4 sm:px-6">
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
                            Video preview otomatis memutar (*Auto-Play Continuous Loop*). Tonton seluruh rekaman gameplay dari Unity 6.3 LTS secara berurutan.
                        </p>
                    </div>

                    {/* Mute/Unmute audio button */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            onClick={toggleMute}
                            className={`px-5 py-2.5 rounded-full border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
                                isMuted
                                    ? 'bg-rose-950/40 border-rose-500/40 text-rose-300 hover:bg-rose-900/60'
                                    : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30 ring-2 ring-emerald-500/30'
                            }`}
                        >
                            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                            <span>{isMuted ? 'Nyalakan Audio Horor' : 'Audio Aktif 🔊'}</span>
                        </button>
                    </div>
                </div>

                {/* Main Video Display & Selector Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Active Video Spotlight Box (7 Cols) */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="relative aspect-video rounded-[2rem] overflow-hidden horror-card-red border border-rose-500/40 bg-black group shadow-2xl">
                            {/* Real HTML5 Video Tag with Auto-Play, Muted, PlaysInline & onEnded Next */}
                            <video
                                key={activeClip.videoSrc}
                                ref={videoRef}
                                src={activeClip.videoSrc}
                                autoPlay
                                muted={isMuted}
                                playsInline
                                controls
                                onEnded={handleVideoEnded}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                className="w-full h-full object-cover"
                            />

                            {/* Floating Loop Status Badge */}
                            <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] text-gray-200">
                                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                                <span className="font-mono">Auto-Looping: Clip {currentIndex + 1} / {clips.length}</span>
                            </div>
                        </div>

                        {/* Video Metadata Info Strip */}
                        <div className="p-5 rounded-2xl horror-glass flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
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
                        <div className="flex items-center justify-between px-1">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                Playlist Rekaman Gameplay:
                            </h4>
                            <span className="text-[11px] text-rose-400 font-mono flex items-center gap-1">
                                <RefreshCw size={11} className="animate-spin" /> Continuous Play
                            </span>
                        </div>
                        <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                            {clips.map((clip, idx) => (
                                <button
                                    key={clip.id}
                                    onClick={() => {
                                        setCurrentIndex(idx);
                                    }}
                                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer ${
                                        currentIndex === idx
                                            ? 'horror-card-red border-rose-500/60 shadow-lg shadow-rose-950/50 ring-2 ring-rose-500/40 bg-rose-950/30'
                                            : 'horror-glass border-white/5 hover:border-rose-500/30'
                                    }`}
                                >
                                    <div className={`p-3 rounded-xl shrink-0 mt-0.5 ${
                                        currentIndex === idx
                                            ? 'bg-rose-600 text-white shadow-md shadow-rose-600/50'
                                            : 'bg-white/5 text-gray-400'
                                    }`}>
                                        <Play size={18} className={currentIndex === idx ? "fill-white" : ""} />
                                    </div>
                                    <div className="space-y-1 flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <h5 className="text-sm font-bold text-white truncate">
                                                {clip.title}
                                            </h5>
                                            <span className={`text-[10px] font-mono shrink-0 font-bold ${
                                                currentIndex === idx ? 'text-rose-400' : 'text-gray-500'
                                            }`}>
                                                {currentIndex === idx ? '▶ PLAYING' : `#${clip.id}`}
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
