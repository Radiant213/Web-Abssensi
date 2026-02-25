import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// POST /api/verify-token — Verifikasi token 4 digit
export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json(
                { status: "error", message: "Token harus diisi" },
                { status: 400 }
            );
        }

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

        console.log(`[TOKEN] Verifying token: ${token} (Expected: ${session.token})`);

        // Cek apakah ada session aktif
        if (!session.uid) {
            return NextResponse.json(
                { status: "error", message: "Tidak ada kartu yang sedang menunggu" },
                { status: 400 }
            );
        }

        // Cek token
        if (session.token !== token) {
            console.log(`[TOKEN] Token salah!`);
            return NextResponse.json(
                { status: "error", message: "Token salah!" },
                { status: 400 }
            );
        }

        // Token benar! Update session
        await supabaseAdmin
            .from('scan_session')
            .update({
                is_token_verified: true,
                updated_at: new Date().toISOString()
            })
            .eq('id', 1);

        console.log(`[TOKEN] Token verified! UID: ${session.uid}`);
        return NextResponse.json({
            status: "success",
            uid: session.uid,
            message: "Token valid! Silakan isi data."
        });

    } catch (error) {
        console.error("[TOKEN] Error:", error);
        return NextResponse.json(
            { status: "error", message: "Internal server error" },
            { status: 500 }
        );
    }
}
