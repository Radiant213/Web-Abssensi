import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// POST /api/register — Registrasi data kartu (nama, kelas)
export async function POST(request: NextRequest) {
    try {
        const { uid, nama, kelas } = await request.json();

        if (!uid || !nama || !kelas) {
            return NextResponse.json(
                { status: "error", message: "UID, nama, dan kelas harus diisi" },
                { status: 400 }
            );
        }

        console.log(`[REGISTER] Input data untuk kartu: ${uid} - ${nama} (${kelas})`);

        // Ambil session aktif
        const { data: session, error: sessionError } = await supabaseAdmin
            .from('scan_session')
            .select('*')
            .eq('id', 1)
            .single();

        if (sessionError || !session) {
            return NextResponse.json(
                { status: "error", message: "Session error" },
                { status: 500 }
            );
        }

        // Cek apakah token sudah diverifikasi
        if (!session.is_token_verified) {
            console.log(`[REGISTER] Token belum diverifikasi!`);
            return NextResponse.json(
                { status: "error", message: "Token belum diverifikasi!" },
                { status: 400 }
            );
        }

        // Cek apakah UID cocok dengan session aktif
        if (session.uid !== uid) {
            console.log(`[REGISTER] UID tidak cocok! Expected: ${session.uid}, Got: ${uid}`);
            return NextResponse.json(
                { status: "error", message: "UID tidak cocok, silakan scan ulang kartu" },
                { status: 400 }
            );
        }

        // Update session dengan data registrasi (BELUM absen!)
        await supabaseAdmin
            .from('scan_session')
            .update({
                nama: nama,
                kelas: kelas,
                is_registered: true,
                has_absen: false,
                updated_at: new Date().toISOString()
            })
            .eq('id', 1);

        console.log(`[REGISTER] Berhasil: ${nama} (${kelas}) - Silakan tap untuk absen`);
        return NextResponse.json({
            status: "success",
            message: "Registrasi berhasil! Silakan tap kartu lagi untuk absen.",
            data: { uid, nama, kelas }
        });

    } catch (error) {
        console.error("[REGISTER] Error:", error);
        return NextResponse.json(
            { status: "error", message: "Internal server error" },
            { status: 500 }
        );
    }
}
