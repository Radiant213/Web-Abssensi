-- =====================================================
-- Supabase Schema untuk Sistem Absensi IoT ESP32
-- Jalankan di Supabase Dashboard > SQL Editor
-- =====================================================

-- Tabel kartu RFID (data siswa terdaftar)
CREATE TABLE IF NOT EXISTS kartu (
    uid VARCHAR(20) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    kelas VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel log absensi
CREATE TABLE IF NOT EXISTS absensi (
    id BIGSERIAL PRIMARY KEY,
    qr_id VARCHAR(50) NOT NULL,
    nama VARCHAR(100),
    kelas VARCHAR(50),
    waktu TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk query berdasarkan qr_id dan tanggal
CREATE INDEX IF NOT EXISTS idx_absensi_qr_id ON absensi (qr_id);

CREATE INDEX IF NOT EXISTS idx_absensi_waktu ON absensi (waktu DESC);

-- Tabel session scan (menggantikan in-memory currentSession)
-- Hanya 1 row aktif pada satu waktu (singleton pattern)
CREATE TABLE IF NOT EXISTS scan_session (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    uid VARCHAR(20),
    token VARCHAR(4),
    is_token_verified BOOLEAN DEFAULT FALSE,
    is_registered BOOLEAN DEFAULT FALSE,
    ready_to_absen BOOLEAN DEFAULT FALSE,
    has_absen BOOLEAN DEFAULT FALSE,
    nama VARCHAR(100),
    kelas VARCHAR(50),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert row default untuk session (singleton)
INSERT INTO scan_session (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Tabel ESP32 status (menggantikan in-memory esp32Status)
CREATE TABLE IF NOT EXISTS esp32_status (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    online BOOLEAN DEFAULT FALSE,
    last_heartbeat TIMESTAMPTZ,
    wifi_signal INT DEFAULT 0,
    uptime INT DEFAULT 0,
    last_scan VARCHAR(50),
    last_scan_time TIMESTAMPTZ,
    rfid BOOLEAN DEFAULT FALSE,
    lcd BOOLEAN DEFAULT FALSE,
    dfplayer BOOLEAN DEFAULT FALSE,
    leds BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert row default untuk esp32 status (singleton)
INSERT INTO esp32_status (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- Row Level Security (RLS) - Optional tapi recommended
-- Disable dulu untuk development, enable nanti
-- =====================================================
-- ALTER TABLE kartu ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE absensi ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE scan_session ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE esp32_status ENABLE ROW LEVEL SECURITY;