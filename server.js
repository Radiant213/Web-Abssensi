const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mysql = require('mysql2');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// =====================================================
// 🔐 KONFIGURASI ENVIRONMENT & SECRET KEY
// =====================================================
const API_SECRET = process.env.API_SECRET || "ESP32_PPLG_2026_SECRET";
const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '';
const DB_NAME = process.env.DB_NAME || 'iot_db';

// =====================================================
// SESSION-BASED CARD TRACKING WITH TOKEN
// =====================================================
let currentSession = {
    uid: null,              // UID kartu yang sedang aktif
    token: null,            // Token 4 digit untuk verifikasi
    isTokenVerified: false, // Sudah verifikasi token?
    isRegistered: false,    // Sudah registrasi di sesi ini?
    readyToAbsen: false,    // Sudah notify ESP32 bahwa siap absen?
    hasAbsen: false,        // Sudah absen di sesi ini?
    nama: null,
    kelas: null
};

// =====================================================
// ESP32 MONITORING STATUS
// =====================================================
let esp32Status = {
    online: false,
    lastHeartbeat: null,
    wifiSignal: 0,       // RSSI value
    uptime: 0,           // Seconds since boot
    lastScan: null,      // Last scanned card
    lastScanTime: null,
    components: {
        rfid: false,
        lcd: false,
        dfplayer: false,
        leds: false
    }
};

// =====================================================
// ANTRIAN UPDATE KONFIGURASI WIFI DARI WEB KE ESP32
// =====================================================
let pendingWifiConfig = {
    ssid: "",
    password: "",
    pending: false,
    updated_at: null,
    synced_at: null
};

// Check ESP32 offline (no heartbeat for 30 seconds)
setInterval(() => {
    if (esp32Status.lastHeartbeat) {
        const diff = Date.now() - new Date(esp32Status.lastHeartbeat).getTime();
        if (diff > 30000 && esp32Status.online) {
            esp32Status.online = false;
            io.emit('esp32Status', esp32Status);
            console.log('[MONITOR] ESP32 ditandai OFFLINE (timeout > 30s)');
        }
    }
}, 10000);

// Generate token 4 digit random
function generateToken() {
    return String(Math.floor(1000 + Math.random() * 9000));
}

// MySQL Connection Pool
const db = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test Koneksi MySQL
db.getConnection((err, conn) => {
    if (err) {
        console.error('❌ Gagal konek MySQL:', err.message);
    } else {
        console.log(`✅ MySQL Konek Berhasil ke ${DB_HOST}/${DB_NAME}`);
        conn.release();
    }
});

nextApp.prepare().then(() => {
    // =====================================================
    // API: ESP32 HEARTBEAT (Status monitoring & WiFi sync)
    // 🔐 PROTECTED: Memerlukan API_SECRET
    // =====================================================
    app.post('/api/esp32/heartbeat', (req, res) => {
        const { secret, wifiSignal, uptime, components, lastScan } = req.body;

        // Validate secret
        if (secret !== API_SECRET) {
            return res.status(403).json({ status: "error", message: "Access denied" });
        }

        // Update ESP32 status
        esp32Status.online = true;
        esp32Status.lastHeartbeat = new Date().toISOString();
        esp32Status.wifiSignal = wifiSignal || 0;
        esp32Status.uptime = uptime || 0;
        if (components) esp32Status.components = components;
        if (lastScan) {
            esp32Status.lastScan = lastScan;
            esp32Status.lastScanTime = new Date().toISOString();
        }

        // Emit status ke semua client website
        io.emit('esp32Status', esp32Status);

        // Siapkan respon payload
        let responsePayload = {
            status: "ok",
            session: {
                hasActiveCard: !!currentSession.uid,
                isTokenVerified: currentSession.isTokenVerified,
                isRegistered: currentSession.isRegistered,
                readyToAbsen: currentSession.readyToAbsen,
                hasAbsen: currentSession.hasAbsen,
                nama: currentSession.nama
            }
        };

        // Cek jika ada antrian pergantian WiFi yang belum dikirim ke ESP32
        if (pendingWifiConfig && pendingWifiConfig.pending && pendingWifiConfig.ssid) {
            responsePayload.wifiConfig = {
                update: true,
                ssid: pendingWifiConfig.ssid,
                password: pendingWifiConfig.password
            };
            console.log(`[HEARTBEAT] 📡 Mengirim instruksi WiFi baru (${pendingWifiConfig.ssid}) ke ESP32!`);

            // Tandai sudah terkirim ke ESP32
            pendingWifiConfig.pending = false;
            pendingWifiConfig.synced_at = new Date().toISOString();
            io.emit('wifiConfigUpdated', pendingWifiConfig);
        }

        return res.json(responsePayload);
    });

    // =====================================================
    // API: GET ESP32 STATUS (untuk frontend monitoring)
    // =====================================================
    app.get('/api/esp32/status', (req, res) => {
        // Cek online status real-time
        let isOnline = esp32Status.online;
        if (esp32Status.lastHeartbeat) {
            const diff = Date.now() - new Date(esp32Status.lastHeartbeat).getTime();
            if (diff > 30000) isOnline = false;
        }
        res.json({
            ...esp32Status,
            online: isOnline
        });
    });

    // =====================================================
    // API: GANTI KONFIGURASI WIFI ESP32 (dari web dashboard)
    // 🔐 PROTECTED: Memerlukan Password Keamanan Admin (Admin12345)
    // =====================================================
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin12345";

    app.post('/api/esp32/wifi-config', (req, res) => {
        const { ssid, password, adminPassword } = req.body;

        // Validasi Password Keamanan Admin
        if (!adminPassword || adminPassword !== ADMIN_PASSWORD) {
            return res.status(401).json({ 
                status: "error", 
                message: "Password Keamanan Admin salah! Akses ditolak." 
            });
        }

        if (!ssid || !password) {
            return res.status(400).json({ status: "error", message: "SSID dan Password WiFi harus diisi!" });
        }

        pendingWifiConfig = {
            ssid: ssid.trim(),
            password: password.trim(),
            pending: true,
            updated_at: new Date().toISOString(),
            synced_at: null
        };

        io.emit('wifiConfigUpdated', pendingWifiConfig);
        console.log(`[WIFI-CONFIG] 📝 Antrian WiFi baru disimpan (Admin Auth OK): SSID=${ssid}`);

        return res.json({
            status: "success",
            message: `Konfigurasi WiFi berhasil dijadwalkan! ESP32 akan menyambung ke "${ssid}" saat heartbeat berikutnya.`
        });
    });

    app.get('/api/esp32/wifi-config', (req, res) => {
        res.json(pendingWifiConfig);
    });

    // =====================================================
    // API: GET SCAN SESSION (untuk polling frontend web)
    // =====================================================
    app.get('/api/scan-session', (req, res) => {
        res.json({
            uid: currentSession.uid,
            is_registered: currentSession.isRegistered,
            has_absen: currentSession.hasAbsen,
            nama: currentSession.nama,
            kelas: currentSession.kelas
        });
    });

    // =====================================================
    // API: SCAN KARTU (Endpoint utama dari ESP32)
    // 🔐 PROTECTED: Memerlukan API_SECRET
    // =====================================================
    app.post('/api/scan', (req, res) => {
        const { uid, secret } = req.body;

        // 🔐 VALIDASI SECRET KEY
        if (secret !== API_SECRET) {
            console.log(`[SCAN] ❌ REJECTED - Invalid secret key!`);
            return res.status(403).json({
                status: "error",
                message: "Access denied - invalid secret key"
            });
        }

        if (!uid) {
            return res.status(400).json({ status: "error", message: "UID required" });
        }

        console.log(`[SCAN] ✅ Kartu terdeteksi: ${uid}`);

        // Cek apakah ada PENDING REGISTRATION
        if (currentSession.isRegistered && !currentSession.hasAbsen) {
            if (currentSession.uid !== uid) {
                console.log(`[SCAN] BLOCKED! Ada pending absen untuk ${currentSession.nama}. Kartu ${uid} tidak bisa scan.`);
                return res.json({
                    status: "pending",
                    nama: currentSession.nama,
                    kelas: currentSession.kelas,
                    message: `Selesaikan absen ${currentSession.nama} dulu!`
                });
            }
        }

        // Cek apakah kartu BERBEDA dari session aktif
        if (currentSession.uid !== uid) {
            const newToken = generateToken();
            console.log(`[SCAN] GANTI KARTU: ${currentSession.uid || 'none'} -> ${uid} | Token: ${newToken}`);

            // Reset session untuk kartu baru
            currentSession = {
                uid: uid,
                token: newToken,
                isTokenVerified: false,
                isRegistered: false,
                readyToAbsen: false,
                hasAbsen: false,
                nama: null,
                kelas: null
            };

            // Emit ke website
            io.emit('kartuBaru', { uid, hasToken: true });

            return res.json({
                status: "unregistered",
                uid: uid,
                token: newToken,
                message: "Kartu baru terdeteksi, masukkan token di website"
            });
        }

        // Kartu SAMA dengan session aktif
        if (!currentSession.isRegistered) {
            console.log(`[SCAN] Kartu ${uid} belum registrasi di sesi ini, token: ${currentSession.token}`);
            io.emit('kartuBaru', { uid, hasToken: true });
            return res.json({
                status: "unregistered",
                uid: uid,
                token: currentSession.token,
                message: "Kartu belum registrasi, silakan input token di website"
            });
        }

        // Sudah registrasi, cek apakah sudah absen?
        if (currentSession.hasAbsen) {
            console.log(`[SCAN] ${currentSession.nama} sudah absen - DUPLICATE BLOCKED`);
            return res.json({
                status: "duplicate",
                nama: currentSession.nama,
                kelas: currentSession.kelas,
                message: "Anda sudah absen hari ini!"
            });
        }

        // SUDAH REGISTRASI TAPI BELUM ABSEN (Tap pertama untuk ready)
        if (!currentSession.readyToAbsen) {
            currentSession.readyToAbsen = true;
            console.log(`[SCAN] ${currentSession.nama} - Token verified, ready to absen`);
            return res.json({
                status: "registered",
                nama: currentSession.nama,
                kelas: currentSession.kelas,
                message: "Token terverifikasi! Tap lagi untuk absen."
            });
        }

        // Tap kedua - SIMPAN KE DATABASE ABSENSI
        const insertAbsen = "INSERT INTO absensi (qr_id, nama, kelas) VALUES (?, ?, ?)";
        db.query(insertAbsen, [uid, currentSession.nama, currentSession.kelas], (err, result) => {
            if (err) {
                console.error("Error insert absen:", err);
                return res.status(500).json({ status: "error", message: err.message });
            }

            const waktuSekarang = new Date().toLocaleString('id-ID');
            currentSession.hasAbsen = true; // Mark sudah absen

            // Emit ke website
            io.emit('absenBaru', {
                id: uid,
                nama: currentSession.nama,
                kelas: currentSession.kelas,
                waktu: waktuSekarang
            });

            console.log(`[SCAN] 🎉 Absen berhasil disimpan: ${currentSession.nama} (${currentSession.kelas})`);
            return res.json({
                status: "success",
                nama: currentSession.nama,
                kelas: currentSession.kelas,
                waktu: waktuSekarang,
                message: "Absen berhasil!"
            });
        });
    });

    // =====================================================
    // API: VERIFY TOKEN
    // =====================================================
    app.post('/api/verify-token', (req, res) => {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ status: "error", message: "Token harus diisi" });
        }

        console.log(`[TOKEN] Verifikasi token: ${token} (Expected: ${currentSession.token})`);

        if (!currentSession.uid) {
            return res.status(400).json({ status: "error", message: "Tidak ada kartu yang sedang menunggu" });
        }

        if (currentSession.token !== token) {
            console.log(`[TOKEN] ❌ Token salah!`);
            return res.status(400).json({ status: "error", message: "Token salah!" });
        }

        currentSession.isTokenVerified = true;
        console.log(`[TOKEN] ✅ Token valid! UID: ${currentSession.uid}`);

        return res.json({
            status: "success",
            uid: currentSession.uid,
            message: "Token valid! Silakan isi data."
        });
    });

    // =====================================================
    // API: REGISTER KARTU (Session-based)
    // =====================================================
    app.post('/api/register', (req, res) => {
        const { uid, nama, kelas } = req.body;

        if (!uid || !nama || !kelas) {
            return res.status(400).json({ status: "error", message: "UID, nama, dan kelas harus diisi" });
        }

        if (!currentSession.isTokenVerified) {
            return res.status(400).json({ status: "error", message: "Token belum diverifikasi!" });
        }

        if (currentSession.uid !== uid) {
            return res.status(400).json({ status: "error", message: "UID tidak cocok, silakan scan ulang kartu" });
        }

        // Simpan data kartu ke master tabel kartu (opsional/upsert)
        const sqlUpsert = "INSERT INTO kartu (uid, nama, kelas) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE nama = VALUES(nama), kelas = VALUES(kelas)";
        db.query(sqlUpsert, [uid, nama, kelas], (err) => {
            if (err) console.error("Warning insert master kartu:", err.message);
        });

        // Update session dengan data registrasi
        currentSession.nama = nama;
        currentSession.kelas = kelas;
        currentSession.isRegistered = true;
        currentSession.hasAbsen = false;

        io.emit('registrasiBerhasil', { uid, nama, kelas });
        console.log(`[REGISTER] ✅ Berhasil didaftarkan: ${nama} (${kelas})`);

        return res.json({
            status: "success",
            message: "Registrasi berhasil! Silakan tap kartu lagi di alat untuk absen.",
            data: { uid, nama, kelas }
        });
    });

    // =====================================================
    // API: GET ALL KARTU
    // =====================================================
    app.get('/api/kartu', (req, res) => {
        const sql = "SELECT * FROM kartu ORDER BY created_at DESC";
        db.query(sql, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    });

    // =====================================================
    // API: GET HISTORY ABSENSI
    // =====================================================
    app.get('/api/history', (req, res) => {
        const sql = "SELECT * FROM absensi ORDER BY id DESC LIMIT 50";
        db.query(sql, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            const formatted = results.map(row => ({
                id: row.qr_id,
                nama: row.nama,
                kelas: row.kelas || '-',
                waktu: row.waktu ? new Date(row.waktu).toLocaleString('id-ID') : '-'
            }));

            res.json(formatted);
        });
    });

    // Default Next.js Handler
    app.use(async (req, res) => {
        try {
            await handle(req, res);
        } catch (err) {
            console.error('Error handling Next.js request:', err);
            res.status(500).send('Internal Server Error');
        }
    });

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> 🚀 SecureGate IoT Web Server Ready on port ${PORT}`);
        console.log(`> 🌐 Domain: https://absen.skynett.web.id`);
    });
});
