module.exports = {
  apps: [
    {
      name: 'securegate-absen',
      script: 'server.js',
      cwd: '/var/www/web-abssensi',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        DB_HOST: '127.0.0.1',
        DB_PORT: 3306,
        DB_USER: 'iot_user',
        DB_PASSWORD: 'IotPassword2026!',
        DB_NAME: 'iot_db',
        API_SECRET: 'ESP32_PPLG_2026_SECRET'
      }
    },
    {
      name: 'skynet-main',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3001',
      cwd: '/var/www/web-abssensi/apps/web-skynet-main',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    },
    {
      name: 'whimsical-game',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3002',
      cwd: '/var/www/web-abssensi/apps/web-whimsical-game',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      }
    }
  ]
};
