import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/history — Ambil semua history absensi
export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('absensi')
            .select('*')
            .order('id', { ascending: false });

        if (error) {
            console.error("Error fetch history:", error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        // Format data sesuai yang diharapkan frontend
        const formatted = (data || []).map(row => ({
            id: row.qr_id,
            nama: row.nama,
            kelas: row.kelas || '-',
            waktu: row.waktu
                ? new Date(row.waktu).toLocaleString('id-ID')
                : '-'
        }));

        return NextResponse.json(formatted);

    } catch (error) {
        console.error("[HISTORY] Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
