import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/scan-session — Poll status session scan aktif (untuk frontend)
export async function GET() {
    try {
        const { data, error } = await supabaseAdmin!
            .from('scan_session')
            .select('uid, is_registered, has_absen, nama, kelas')
            .eq('id', 1)
            .single();

        if (error) {
            return NextResponse.json(
                { uid: null, is_registered: false, has_absen: false },
                { status: 200 }
            );
        }

        return NextResponse.json(data);

    } catch {
        return NextResponse.json(
            { uid: null, is_registered: false, has_absen: false },
            { status: 200 }
        );
    }
}
