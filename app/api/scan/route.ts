import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// POST /api/scan — Endpoint utama dari ESP32
export async function POST(request: NextRequest) {
    try {
        const { uid, secret } = await request.json();

        // 🔐 Validasi secret key
        if (secret !== process.env.API_SECRET) {
            console.log(`[SCAN] ❌ REJECTED - Invalid secret key!`);
            return NextResponse.json(
                { status: "error", message: "Access denied - invalid secret key" },
                { status: 403 }
            );
        }

        if (!uid) {
            return NextResponse.json(
                { status: "error", message: "UID required" },
                { status: 400 }
            );
        }

        console.log(`[SCAN] ✅ Kartu terdeteksi: ${uid}`);

        // Ambil session aktif dari Supabase
        const { data: session, error: sessionError } = await supabaseAdmin!
            .from('scan_session')
            .select('*')
            .eq('id', 1)
            .single();

        if (sessionError) {
            console.error("Error fetch session:", sessionError);
            return NextResponse.json(
                { status: "error", message: "Session error" },
                { status: 500 }
            );
        }

        console.log(`[SCAN] Current session: uid=${session.uid}, has_absen=${session.has_absen}`);

        // Generate token 4 digit random
        function generateToken() {
            return String(Math.floor(1000 + Math.random() * 9000));
        }

        // =====================================================
        // LOGIKA SESSION-BASED SCAN
        // =====================================================

        // Cek apakah ada PENDING REGISTRATION (sudah registrasi tapi belum absen)
        if (session.is_registered && !session.has_absen) {
            if (session.uid !== uid) {
                // KARTU BEDA = BLOCKED!
                console.log(`[SCAN] BLOCKED! Ada pending absen untuk ${session.nama}. Kartu ${uid} tidak bisa scan.`);
                return NextResponse.json({
                    status: "pending",
                    nama: session.nama,
                    kelas: session.kelas,
                    message: `Selesaikan absen ${session.nama} dulu!`
                });
            }
        }

        // Cek apakah kartu BERBEDA dari session aktif
        if (session.uid !== uid) {
            const newToken = generateToken();
            console.log(`[SCAN] GANTI KARTU: ${session.uid || 'none'} -> ${uid}`);
            console.log(`[SCAN] Generated Token: ${newToken}`);

            // Reset session untuk kartu baru
            await supabaseAdmin!
                .from('scan_session')
                .update({
                    uid: uid,
                    token: newToken,
                    is_token_verified: false,
                    is_registered: false,
                    ready_to_absen: false,
                    has_absen: false,
                    nama: null,
                    kelas: null,
                    updated_at: new Date().toISOString()
                })
                .eq('id', 1);

            return NextResponse.json({
                status: "unregistered",
                uid: uid,
                token: newToken,
                message: "Kartu baru terdeteksi, masukkan token di website"
            });
        }

        // Kartu SAMA dengan session aktif
        if (!session.is_registered) {
            console.log(`[SCAN] Kartu ${uid} belum registrasi di sesi ini, token: ${session.token}`);
            return NextResponse.json({
                status: "unregistered",
                uid: uid,
                token: session.token,
                message: "Kartu belum registrasi, silakan input token di website"
            });
        }

        // Sudah registrasi, cek apakah sudah absen
        if (session.has_absen) {
            console.log(`[SCAN] ${session.nama} sudah absen - BLOCKED`);
            return NextResponse.json({
                status: "duplicate",
                nama: session.nama,
                kelas: session.kelas,
                message: "Anda sudah absen"
            });
        }

        // SUDAH REGISTRASI TAPI BELUM ABSEN
        if (!session.ready_to_absen) {
            // Tap pertama setelah registrasi
            await supabaseAdmin!
                .from('scan_session')
                .update({
                    ready_to_absen: true,
                    updated_at: new Date().toISOString()
                })
                .eq('id', 1);

            console.log(`[SCAN] ${session.nama} - Token verified, ready to absen`);
            return NextResponse.json({
                status: "registered",
                nama: session.nama,
                kelas: session.kelas,
                message: "Token terverifikasi! Tap lagi untuk absen."
            });
        }

        // Tap kedua — ABSEN SEKARANG!
        const { error: insertError } = await supabaseAdmin!
            .from('absensi')
            .insert({
                qr_id: uid,
                nama: session.nama,
                kelas: session.kelas
            });

        if (insertError) {
            console.error("Error insert absen:", insertError);
            return NextResponse.json(
                { status: "error", message: insertError.message },
                { status: 500 }
            );
        }

        const waktuSekarang = new Date().toLocaleString('id-ID');

        // Mark sudah absen
        await supabaseAdmin!
            .from('scan_session')
            .update({
                has_absen: true,
                updated_at: new Date().toISOString()
            })
            .eq('id', 1);

        console.log(`[SCAN] Absen berhasil: ${session.nama}`);
        return NextResponse.json({
            status: "success",
            nama: session.nama,
            kelas: session.kelas,
            waktu: waktuSekarang,
            message: "Absen berhasil!"
        });

    } catch (error) {
        console.error("[SCAN] Error:", error);
        return NextResponse.json(
            { status: "error", message: "Internal server error" },
            { status: 500 }
        );
    }
}
