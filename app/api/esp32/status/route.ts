import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/esp32/status — Return status ESP32 terakhir
export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('esp32_status')
            .select('*')
            .eq('id', 1)
            .single();

        if (error) {
            console.error("Error fetch ESP32 status:", error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        // Cek apakah ESP32 offline (no heartbeat > 30 detik)
        let isOnline = data.online;
        if (data.last_heartbeat) {
            const diff = Date.now() - new Date(data.last_heartbeat).getTime();
            if (diff > 30000) {
                isOnline = false;
            }
        }

        // Format response sesuai yang diharapkan frontend
        return NextResponse.json({
            online: isOnline,
            lastHeartbeat: data.last_heartbeat,
            wifiSignal: data.wifi_signal,
            uptime: data.uptime,
            lastScan: data.last_scan,
            lastScanTime: data.last_scan_time,
            components: {
                rfid: data.rfid,
                lcd: data.lcd,
                dfplayer: data.dfplayer,
                leds: data.leds,
            }
        });

    } catch (error) {
        console.error("[ESP32 STATUS] Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
