"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, User, GraduationCap, Loader2, KeyRound, CheckCircle2 } from "lucide-react";

interface RegisterModalProps {
    uid: string;
    onClose: () => void;
    onSuccess: () => void;
}

export function RegisterModal({ uid, onClose, onSuccess }: RegisterModalProps) {
    // Step: 'token' = input token, 'form' = registration form
    const [step, setStep] = useState<'token' | 'form'>('token');

    // Token verification states
    const [tokenInput, setTokenInput] = useState("");
    const [tokenLoading, setTokenLoading] = useState(false);
    const [tokenError, setTokenError] = useState("");

    // Registration form states
    const [nama, setNama] = useState("");
    const [kelas, setKelas] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle token verification
    const handleVerifyToken = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!tokenInput.trim() || tokenInput.length !== 4) {
            setTokenError("Token harus 4 digit!");
            return;
        }

        setTokenLoading(true);
        setTokenError("");

        try {
            const res = await fetch("/api/verify-token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: tokenInput.trim() }),
            });

            const data = await res.json();

            if (data.status === "success") {
                // Token valid, move to form step
                setStep('form');
            } else {
                setTokenError(data.message || "Token tidak valid!");
            }
        } catch (err) {
            setTokenError("Terjadi kesalahan koneksi");
        } finally {
            setTokenLoading(false);
        }
    };

    // Handle registration submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nama.trim() || !kelas.trim()) {
            setError("Nama dan kelas harus diisi!");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid, nama: nama.trim(), kelas: kelas.trim() }),
            });

            const data = await res.json();

            if (data.status === "success") {
                onSuccess();
            } else {
                setError(data.message || "Gagal mendaftarkan kartu");
            }
        } catch (err) {
            setError("Terjadi kesalahan koneksi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="w-full max-w-md glass-card rounded-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="relative p-6 pb-4 border-b border-white/10">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <X size={20} className="text-gray-400" />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl ${step === 'token' ? 'bg-amber-500/20' : 'bg-blue-500/20'}`}>
                                {step === 'token' ? (
                                    <KeyRound size={24} className="text-amber-400" />
                                ) : (
                                    <CreditCard size={24} className="text-blue-400" />
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    {step === 'token' ? 'Masukkan Token' : 'Daftarkan Kartu'}
                                </h2>
                                <p className="text-sm text-gray-400">
                                    {step === 'token'
                                        ? 'Lihat token 4 digit di LCD alat'
                                        : 'Isi data untuk melanjutkan'}
                                </p>
                            </div>
                        </div>

                        {/* Step Indicator */}
                        <div className="flex items-center gap-2 mt-4">
                            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${step === 'token'
                                    ? 'bg-amber-500/20 text-amber-400'
                                    : 'bg-green-500/20 text-green-400'
                                }`}>
                                {step === 'form' && <CheckCircle2 size={12} />}
                                <span>1. Token</span>
                            </div>
                            <div className="w-8 h-0.5 bg-white/10"></div>
                            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${step === 'form'
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : 'bg-white/5 text-gray-500'
                                }`}>
                                <span>2. Data</span>
                            </div>
                        </div>
                    </div>

                    {/* STEP 1: Token Input */}
                    {step === 'token' && (
                        <form onSubmit={handleVerifyToken} className="p-6 space-y-5">
                            {/* Token Input */}
                            <div className="space-y-3">
                                <label className="text-sm text-gray-400 flex items-center gap-2">
                                    <KeyRound size={14} />
                                    Token dari LCD
                                </label>
                                <input
                                    type="text"
                                    value={tokenInput}
                                    onChange={(e) => {
                                        // Only allow numbers, max 4 digits
                                        const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                                        setTokenInput(val);
                                    }}
                                    placeholder="____"
                                    maxLength={4}
                                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-center text-3xl font-mono tracking-[0.5em] placeholder-gray-600 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                                    autoFocus
                                />
                                <p className="text-xs text-gray-500 text-center">
                                    Masukkan 4 digit token yang tampil di LCD setelah tap kartu
                                </p>
                            </div>

                            {/* Error Message */}
                            {tokenError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm text-center"
                                >
                                    {tokenError}
                                </motion.div>
                            )}

                            {/* Verify Button */}
                            <button
                                type="submit"
                                disabled={tokenLoading || tokenInput.length !== 4}
                                className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                            >
                                {tokenLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Memverifikasi...
                                    </>
                                ) : (
                                    <>
                                        <KeyRound size={20} />
                                        Verifikasi Token
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {/* STEP 2: Registration Form */}
                    {step === 'form' && (
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* UID Display */}
                            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">ID Kartu</p>
                                <p className="font-mono text-lg text-blue-400">{uid}</p>
                            </div>

                            {/* Nama Input */}
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 flex items-center gap-2">
                                    <User size={14} />
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    placeholder="Masukkan nama..."
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    autoFocus
                                />
                            </div>

                            {/* Kelas Input */}
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 flex items-center gap-2">
                                    <GraduationCap size={14} />
                                    Kelas
                                </label>
                                <input
                                    type="text"
                                    value={kelas}
                                    onChange={(e) => setKelas(e.target.value)}
                                    placeholder="Contoh: XI PPLG 1"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm"
                                >
                                    {error}
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Mendaftarkan...
                                    </>
                                ) : (
                                    "Daftarkan Kartu"
                                )}
                            </button>
                        </form>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
