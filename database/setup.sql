-- =====================================================
-- Database Setup untuk Sistem Absensi IoT
-- Jalankan script ini di MySQL/phpMyAdmin
-- =====================================================

-- Pastikan database sudah ada
CREATE DATABASE IF NOT EXISTS iot_db;

USE iot_db;

-- Tabel untuk menyimpan data kartu/siswa yang terdaftar
CREATE TABLE IF NOT EXISTS kartu (
    uid VARCHAR(20) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    kelas VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Update tabel absensi untuk include kelas dan tanggal
-- (jika tabel sudah ada, alter; jika belum, create)
CREATE TABLE IF NOT EXISTS absensi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    qr_id VARCHAR(20) NOT NULL,
    nama VARCHAR(100),
    kelas VARCHAR(50),
    waktu TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tanggal DATE GENERATED ALWAYS AS (DATE(waktu)) STORED,
    INDEX idx_qr_tanggal (qr_id, tanggal)
);

-- Jika tabel absensi sudah ada tapi belum punya kolom kelas dan tanggal:
-- ALTER TABLE absensi ADD COLUMN kelas VARCHAR(50) AFTER nama;
-- ALTER TABLE absensi ADD COLUMN tanggal DATE GENERATED ALWAYS AS (DATE(waktu)) STORED;
-- ALTER TABLE absensi ADD INDEX idx_qr_tanggal (qr_id, tanggal);