"use client";
import { useEffect, useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { LatestScan } from "@/components/LatestScan";
import { ScanHistory } from "@/components/ScanHistory";
import { RegisterModal } from "@/components/RegisterModal";
import { KeyRound, CreditCard } from "lucide-react";

interface Log {
  id: string;
  nama: string;
  kelas?: string;
  waktu: string;
}

interface ScanSession {
  uid: string | null;
  is_registered: boolean;
  has_absen: boolean;
  nama: string | null;
  kelas: string | null;
}

export default function Home() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [latest, setLatest] = useState<Log | null>(null);
  const [connected, setConnected] = useState(false);

  // State untuk pending card (kartu yang sudah di-tap tapi belum input token)
  const [pendingCardUid, setPendingCardUid] = useState<string | null>(null);
  // State untuk modal (user harus klik button untuk buka modal)
  const [showModal, setShowModal] = useState(false);

  // Fetch history data
  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch("/api/history");
      const data = await res.json();
      if (Array.isArray(data)) {
        setLogs(data);
        if (data.length > 0) {
          setLatest(data[0]);
        }
        setConnected(true);
      }
    } catch (err) {
      console.error("Gagal ambil history:", err);
      setConnected(false);
    }
  }, []);

  // Poll scan session untuk detect kartu baru (menggantikan Socket.IO)
  const pollSession = useCallback(async () => {
    try {
      const res = await fetch("/api/scan-session");
      const data: ScanSession = await res.json();

      if (data.uid && !data.is_registered) {
        // Ada kartu baru yang belum registrasi
        setPendingCardUid(data.uid);
      } else if (data.is_registered && data.has_absen) {
        // Sudah selesai absen, clear pending
        setPendingCardUid(null);
        setShowModal(false);
      }
    } catch {
      // Silent fail — session polling bukan critical
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchHistory();

    // Polling setiap 3 detik (menggantikan Socket.IO real-time)
    const historyInterval = setInterval(fetchHistory, 3000);
    const sessionInterval = setInterval(pollSession, 2000);

    return () => {
      clearInterval(historyInterval);
      clearInterval(sessionInterval);
    };
  }, [fetchHistory, pollSession]);

  // Handler untuk buka modal
  const handleOpenModal = () => {
    if (pendingCardUid) {
      setShowModal(true);
    }
  };

  // Handler untuk tutup modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handler setelah registrasi sukses
  const handleRegistrationSuccess = () => {
    setShowModal(false);
    setPendingCardUid(null);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <Header connected={connected} />

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="space-y-6">
          <LatestScan data={latest} />

          {/* Token Input Card */}
          <div className="p-5 rounded-xl glass border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2.5 rounded-lg ${pendingCardUid ? 'bg-amber-500/20' : 'bg-gray-500/20'}`}>
                <KeyRound size={20} className={pendingCardUid ? 'text-amber-400' : 'text-gray-500'} />
              </div>
              <div>
                <h3 className="font-semibold text-white">Input Token</h3>
                <p className="text-xs text-gray-500">Untuk registrasi kartu baru</p>
              </div>
            </div>

            {pendingCardUid ? (
              // Ada kartu yang pending
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <CreditCard size={16} className="text-amber-400" />
                  <span className="text-sm text-amber-300">Kartu terdeteksi! Lihat token di LCD.</span>
                </div>
                <button
                  onClick={handleOpenModal}
                  className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <KeyRound size={18} />
                  Masukkan Token
                </button>
              </div>
            ) : (
              // Tidak ada kartu yang pending
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-center">
                <CreditCard size={32} className="text-gray-600 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Belum ada kartu yang di-tap</p>
                <p className="text-gray-600 text-xs mt-1">Tap kartu di alat untuk memulai</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl glass border border-white/5 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-white">{logs.length}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">Total Scans</span>
            </div>
            <div className="p-4 rounded-xl glass border border-white/5 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-green-400">OK</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider mt-1">System Status</span>
            </div>
          </div>
        </section>

        <section>
          <ScanHistory logs={logs} />
        </section>
      </main>

      {/* Modal Registrasi Kartu Baru - hanya muncul jika user klik button */}
      {showModal && pendingCardUid && (
        <RegisterModal
          uid={pendingCardUid}
          onClose={handleCloseModal}
          onSuccess={handleRegistrationSuccess}
        />
      )}
    </div>
  );
}