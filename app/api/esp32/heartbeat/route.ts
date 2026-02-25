import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// POST /api/esp32/heartbeat — Terima heartbeat dari ESP32
export async function POST(request: NextRequest) {
    try {
        const { secret, wifiSignal, uptime, components, lastScan } = await request.json();

        // Validate secret
        if (secret !== process.env.API_SECRET) {
            return NextResponse.json(
                { status: "error", message: "Access denied" },
                { status: 403 }
            );
        }

        const now = new Date().toISOString();

        // Update ESP32 status di Supabase
        const updateData: Record<string, unknown> = {
            online: true,
            last_heartbeat: now,
            wifi_signal: wifiSignal || 0,
            uptime: uptime || 0,
            updated_at: now,
        };

        if (components) {
            updateData.rfid = components.rfid ?? false;
            updateData.lcd = components.lcd ?? false;
            updateData.dfplayer = components.dfplayer ?? false;
            updateData.leds = components.leds ?? false;
        }

        if (lastScan) {
            updateData.last_scan = lastScan;
            updateData.last_scan_time = now;
        }

        const { error } = await supabaseAdmin!
            .from('esp32_status')
            .update(updateData)
            .eq('id', 1);

        if (error) {
            console.error("Error update ESP32 status:", error);
            return NextResponse.json(
                { status: "error", message: error.message },
                { status: 500 }
            );
        }

        console.log(`[HEARTBEAT] ESP32 Online - WiFi: ${wifiSignal}dBm, Uptime: ${uptime}s`);
        return NextResponse.json({ status: "ok" });

    } catch (error) {
        console.error("[HEARTBEAT] Error:", error);
        return NextResponse.json(
            { status: "error", message: "Internal server error" },
            { status: 500 }
        );
    }
}
