module.exports = {
  apps: [
    {
      name: "securegate-absen",
      script: "server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        DB_HOST: "localhost",
        DB_USER: "iot_user",
        DB_PASSWORD: "IotPassword2026!",
        DB_NAME: "iot_db",
        API_SECRET: "ESP32_PPLG_2026_SECRET"
      }
    }
  ]
};
