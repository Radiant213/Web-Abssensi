import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// POST /api/absen — Legacy endpoint (simpel, terima rfid_uid -> insert absensi)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Support format lama ({id, nama}) dan format baru ({rfid_uid})
        const rfid_uid = body.rfid_uid || body.id;
        const nama = body.nama || null;
        const kelas = body.kelas || null;

        if (!rfid_uid) {
            return NextResponse.json(
                { status: "error", message: "rfid_uid atau id harus diisi" },
                { status: 400 }
            );
        }

        console.log(`[ABSEN] Menerima data absen: ${nama || 'unknown'} (${rfid_uid})`);

        if (!supabaseAdmin) {
            return NextResponse.json(
                { error: 'Koneksi ke Supabase gagal, cek Environment Variables!' }, 
                { status: 500 }
          );
        }
        // Insert ke tabel absensi
        const { error } = await supabaseAdmin
            .from('absensi')
            .insert({
                qr_id: rfid_uid,
                nama: nama,
                kelas: kelas,
            });

        if (error) {
            console.error("Error insert absen:", error);
            return NextResponse.json(
                { status: "error", message: error.message },
                { status: 500 }
            );
        }

        console.log(`[ABSEN] Data ${nama || rfid_uid} berhasil disimpan!`);
        return NextResponse.json({ status: "success" });

    } catch (error) {
        console.error("[ABSEN] Error:", error);
        return NextResponse.json(
            { status: "error", message: "Internal server error" },
            { status: 500 }
        );
    }
}
