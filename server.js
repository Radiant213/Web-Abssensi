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
const io = new Server(server);

app.use(cors());
app.use(express.json());

// =====================================================
// 🔐 SECRET KEY - Ganti dengan key rahasia lo!
// Hanya ESP32 yang tau key ini boleh akses /api/scan
// =====================================================
const API_SECRET = "ESP32_PPLG_2026_SECRET";  // GANTI INI!

// =====================================================
// SESSION-BASED CARD TRACKING WITH TOKEN
// Logika: 
// - Ganti kartu = RESET, harus input data ulang
// - Token 4 digit untuk verifikasi device
// - Kartu sama tap lagi setelah registrasi = BLOCKED
// =====================================================
let currentSession = {
    uid: null,           // UID kartu yang sedang aktif
    token: null,         // Token 4 digit untuk verifikasi
    isTokenVerified: false, // Sudah verifikasi token?
    isRegistered: false, // Sudah registrasi di sesi ini?
    readyToAbsen: false, // Sudah notify ESP32 bahwa siap absen?
    hasAbsen: false,     // Sudah absen di sesi ini?
    nama: null,
    kelas: null
};

// =====================================================
// ESP32 MONITORING STATUS
// Data dikirim via heartbeat dari ESP32
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

// Check ESP32 offline (no heartbeat for 30 seconds)
setInterval(() => {
    if (esp32Status.lastHeartbeat) {
        const diff = Date.now() - new Date(esp32Status.lastHeartbeat).getTime();
        if (diff > 30000) {
            esp32Status.online = false;
            io.emit('esp32Status', esp32Status);
        }
    }
}, 10000);

// Generate token 4 digit random
function generateToken() {
    return String(Math.floor(1000 + Math.random() * 9000));
}

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'iot_db'
});

db.connect(err => {
    if (err) console.error('Gagal konek MySQL:', err);
    else console.log('MySQL Konek, Bang!');
});

nextApp.prepare().then(() => {
    // =====================================================
    // API: ESP32 HEARTBEAT (Status monitoring)
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

        // Emit to all connected clients
        io.emit('esp32Status', esp32Status);

        console.log(`[HEARTBEAT] ESP32 Online - WiFi: ${wifiSignal}dBm, Uptime: ${uptime}s`);
        return res.json({ status: "ok" });
    });

    // =====================================================
    // API: GET ESP32 STATUS (untuk frontend)
    // =====================================================
    app.get('/api/esp32/status', (req, res) => {
        res.json(esp32Status);
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
        console.log(`[SCAN] Current session: uid=${currentSession.uid}, hasAbsen=${currentSession.hasAbsen}`);

        // =====================================================
        // LOGIKA:
        // 1. Ada pending registration (sudah registrasi tapi belum absen)?
        //    - Kartu SAMA = boleh lanjut absen
        //    - Kartu BEDA = BLOCKED! Selesaikan dulu
        // 2. Tidak ada pending = kartu baru = minta registrasi
        // 3. Kartu SAMA + sudah absen = BLOCKED (duplicate)
        // =====================================================

        // Cek apakah ada PENDING REGISTRATION (sudah registrasi tapi belum absen)
        if (currentSession.isRegistered && !currentSession.hasAbsen) {
            // Ada pending! Cek apakah kartu sama atau beda
            if (currentSession.uid !== uid) {
                // KARTU BEDA = BLOCKED! Harus selesaikan absen kartu sebelumnya
                console.log(`[SCAN] BLOCKED! Ada pending absen untuk ${currentSession.nama}. Kartu ${uid} tidak bisa scan.`);
                return res.json({
                    status: "pending",
                    nama: currentSession.nama,
                    kelas: currentSession.kelas,
                    message: `Selesaikan absen ${currentSession.nama} dulu!`
                });
            }
            // Kartu SAMA = lanjut ke proses absen (handled di bawah)
        }

        // Cek apakah kartu BERBEDA dari session aktif (dan tidak ada pending)
        if (currentSession.uid !== uid) {
            // GANTI KARTU = RESET SESSION + GENERATE TOKEN
            const newToken = generateToken();
            console.log(`[SCAN] GANTI KARTU: ${currentSession.uid || 'none'} -> ${uid}`);
            console.log(`[SCAN] Generated Token: ${newToken}`);

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

            // Emit ke website (tanpa data, hanya notifikasi)
            io.emit('kartuBaru', { uid, hasToken: true });

            return res.json({
                status: "unregistered",
                uid: uid,
                token: newToken,  // Kirim token ke ESP32 untuk ditampilkan
                message: "Kartu baru terdeteksi, masukkan token di website"
            });
        }

        // Kartu SAMA dengan session aktif
        // Cek apakah sudah registrasi?
        if (!currentSession.isRegistered) {
            // Belum registrasi = tetap unregistered, KIRIM TOKEN LAGI!
            console.log(`[SCAN] Kartu ${uid} belum registrasi di sesi ini, token: ${currentSession.token}`);
            io.emit('kartuBaru', { uid, hasToken: true });
            return res.json({
                status: "unregistered",
                uid: uid,
                token: currentSession.token,  // PENTING: Kirim token biar ESP32 bisa tampilkan!
                message: "Kartu belum registrasi, silakan input token di website"
            });
        }

        // Sudah registrasi, cek apakah sudah absen?
        if (currentSession.hasAbsen) {
            // Sudah absen = BLOCKED
            console.log(`[SCAN] ${currentSession.nama} sudah absen - BLOCKED`);
            return res.json({
                status: "duplicate",
                nama: currentSession.nama,
                kelas: currentSession.kelas,
                message: "Anda sudah absen"
            });
        }

        // SUDAH REGISTRASI TAPI BELUM ABSEN
        // Cek apakah ini tap pertama setelah registrasi (untuk notify ESP32)
        if (!currentSession.readyToAbsen) {
            // Ini tap pertama setelah registrasi - kasih tau ESP32 token verified
            currentSession.readyToAbsen = true;
            console.log(`[SCAN] ${currentSession.nama} - Token verified, ready to absen`);
            return res.json({
                status: "registered",
                nama: currentSession.nama,
                kelas: currentSession.kelas,
                message: "Token terverifikasi! Tap lagi untuk absen."
            });
        }

        // Tap kedua - absen sekarang!

        // Insert ke tabel absensi
        const insertAbsen = "INSERT INTO absensi (qr_id, nama, kelas) VALUES (?, ?, ?)";
        db.query(insertAbsen, [uid, currentSession.nama, currentSession.kelas], (err, result) => {
            if (err) {
                console.error("Error insert absen:", err);
                return res.status(500).json({ status: "error", message: err.message });
            }

            const waktuSekarang = new Date().toLocaleString('id-ID');
            currentSession.hasAbsen = true;  // Mark sudah absen

            // Emit ke website
            io.emit('absenBaru', {
                id: uid,
                nama: currentSession.nama,
                kelas: currentSession.kelas,
                waktu: waktuSekarang
            });

            console.log(`[SCAN] Absen berhasil: ${currentSession.nama}`);
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
    // User harus verifikasi token sebelum bisa registrasi
    // =====================================================
    app.post('/api/verify-token', (req, res) => {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ status: "error", message: "Token harus diisi" });
        }

        console.log(`[TOKEN] Verifying token: ${token} (Expected: ${currentSession.token})`);

        // Cek apakah ada session aktif
        if (!currentSession.uid) {
            return res.status(400).json({ status: "error", message: "Tidak ada kartu yang sedang menunggu" });
        }

        // Cek token
        if (currentSession.token !== token) {
            console.log(`[TOKEN] Token salah!`);
            return res.status(400).json({ status: "error", message: "Token salah!" });
        }

        // Token benar!
        currentSession.isTokenVerified = true;
        console.log(`[TOKEN] Token verified! UID: ${currentSession.uid}`);

        return res.json({
            status: "success",
            uid: currentSession.uid,
            message: "Token valid! Silakan isi data."
        });
    });

    // =====================================================
    // API: REGISTER KARTU (Session-based)
    // Data disimpan ke session, BELUM absen
    // User harus tap ulang untuk absen
    // =====================================================
    app.post('/api/register', (req, res) => {
        const { uid, nama, kelas } = req.body;

        if (!uid || !nama || !kelas) {
            return res.status(400).json({ status: "error", message: "UID, nama, dan kelas harus diisi" });
        }

        console.log(`[REGISTER] Input data untuk kartu: ${uid} - ${nama} (${kelas})`);

        // Cek apakah token sudah diverifikasi
        if (!currentSession.isTokenVerified) {
            console.log(`[REGISTER] Token belum diverifikasi!`);
            return res.status(400).json({ status: "error", message: "Token belum diverifikasi!" });
        }

        // Cek apakah UID cocok dengan session aktif
        if (currentSession.uid !== uid) {
            console.log(`[REGISTER] UID tidak cocok dengan session! Expected: ${currentSession.uid}, Got: ${uid}`);
            return res.status(400).json({ status: "error", message: "UID tidak cocok, silakan scan ulang kartu" });
        }

        // Update session dengan data registrasi (BELUM absen!)
        currentSession.nama = nama;
        currentSession.kelas = kelas;
        currentSession.isRegistered = true;
        currentSession.hasAbsen = false;  // Belum absen! Harus tap ulang

        console.log(`[REGISTER] Session updated: ${JSON.stringify(currentSession)}`);

        // Emit registrasi berhasil
        io.emit('registrasiBerhasil', { uid, nama, kelas });

        console.log(`[REGISTER] Berhasil: ${nama} (${kelas}) - Silakan tap untuk absen`);
        return res.json({
            status: "success",
            message: "Registrasi berhasil! Silakan tap kartu lagi untuk absen.",
            data: { uid, nama, kelas }
        });
    });

    // =====================================================
    // API: GET ALL KARTU (untuk admin view)
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
        const sql = "SELECT * FROM absensi ORDER BY id DESC";
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

    // =====================================================
    // API: ABSEN (Legacy - tetap ada untuk backward compat)
    // =====================================================
    app.post('/api/absen', (req, res) => {
        const { id, nama } = req.body;
        console.log(`[LEGACY] Menerima data absen: ${nama} (${id})`);

        const sql = "INSERT INTO absensi (qr_id, nama) VALUES (?, ?)";
        db.query(sql, [id, nama], (err, result) => {
            if (err) {
                console.error("Error insert DB:", err);
                return res.status(500).json({ error: err.message });
            }

            io.emit('absenBaru', {
                id,
                nama,
                waktu: new Date().toLocaleString('id-ID')
            });

            console.log(`[LEGACY] Data ${nama} berhasil disimpan!`);
            res.status(200).json({ status: "success" });
        });
    });

    // Default Next.js Handler
    app.use(async (req, res) => {
        try {
            await handle(req, res);
        } catch (err) {
            console.error('Error handling request:', err);
            res.status(500).send('Internal Server Error');
        }
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
