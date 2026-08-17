#!/bin/bash
set -e

echo "=== 1. Menyiapkan Konfigurasi Nginx Multi-Domain ==="
sudo cp /var/www/web-abssensi/deploy/nginx-skynet-main.conf /etc/nginx/sites-available/skynett.web.id
sudo cp /var/www/web-abssensi/deploy/nginx-whimsical-game.conf /etc/nginx/sites-available/game.skynett.web.id

sudo ln -sf /etc/nginx/sites-available/skynett.web.id /etc/nginx/sites-enabled/
sudo ln -sf /etc/nginx/sites-available/game.skynett.web.id /etc/nginx/sites-enabled/

echo "=== 2. Validasi & Reload Nginx ==="
sudo nginx -t
sudo systemctl reload nginx

echo "=== 3. Build Kedua Project Next.js di VPS ==="
cd /var/www/web-abssensi/apps/web-skynet-main
npm install --production=false
npm run build

cd /var/www/web-abssensi/apps/web-whimsical-game
npm install --production=false
npm run build

echo "=== 4. Menjalankan & Menyimpan Cluster PM2 ==="
cd /var/www/web-abssensi
pm2 delete all || true
pm2 start deploy/ecosystem.config.js
pm2 save

echo "=== 5. Setup SSL Let's Encrypt Otomatis ==="
sudo certbot --nginx -d skynett.web.id -d www.skynett.web.id -d game.skynett.web.id --non-interactive --agree-tos --register-unsafely-without-email --redirect || echo "Certbot selesai / diverifikasi"

echo "=== 6. Status PM2 Aktif ==="
pm2 status

echo "=== DEPLOYMENT MULTI-SITE SELESAI DENGAN SUKSES ==="
