"use client";
import { Skull, Compass, Moon, ShieldAlert, Sparkles, BookOpen } from "lucide-react";

export function StoryLore() {
    return (
        <section id="lore" className="py-20 px-4 sm:px-6 relative">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="p-8 sm:p-14 rounded-[3rem] horror-card border border-rose-500/20 relative overflow-hidden space-y-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="space-y-4 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-bold uppercase tracking-wider">
                            <BookOpen size={14} /> Sinopsis & Latar Belakang
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                            Misteri Malam Pertama: <br />
                            <span className="text-rose-500">Day 1 in Darkness</span>
                        </h2>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                            Anda terbangun di dalam bangunan tua yang terisolasi dari dunia luar. Tidak ada aliran listrik, tidak ada sinyal telekomunikasi, dan malam baru saja dimulai. Di atas meja tua, Anda hanya menemukan sebuah senter dengan daya baterai terbatas dan secarik catatan yang memperingatkan tentang <em>&quot;Mereka yang Berjalan dalam Ketiadaan Cahaya&quot;</em>.
                        </p>
                    </div>

                    {/* 3 Lore Chapter Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-rose-950/60 text-rose-400 flex items-center justify-center font-black text-sm">
                                01
                            </div>
                            <h3 className="text-lg font-bold text-white">Senter & Kegelapan</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Cahaya senter adalah perisai Anda, namun menyalakan senter secara terus menerus akan menarik perhatian entitas misterius yang mengintai di balik bayangan.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-950/60 text-purple-400 flex items-center justify-center font-black text-sm">
                                02
                            </div>
                            <h3 className="text-lg font-bold text-white">Kewarasan yang Retak</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Semakin lama berada di ruang gelap tanpa cahaya, tingkat kecemasan meningkat. Anda akan mulai mendengar bisikan halusinasi dan langkah kaki semu.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-950/60 text-amber-400 flex items-center justify-center font-black text-sm">
                                03
                            </div>
                            <h3 className="text-lg font-bold text-white">Pelarian Menuju Fajar</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Temukan serpihan petunjuk, pecahkan mekanisme gembok kuno, dan bertahan hidup hingga jam 6 pagi saat fajar pertama menerangi kembali dunia.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
