import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/kartu — Ambil semua data kartu
export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('kartu')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetch kartu:", error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(data || []);

    } catch (error) {
        console.error("[KARTU] Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
