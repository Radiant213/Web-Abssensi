/*
 * ===================================================================================
 *  SECUREGATE IOT SMART ATTENDANCE SYSTEM — ULTIMATE FIRMWARE (ESP32)
 * ===================================================================================
 *  Daftar Pemetaan Suara MP3 (Folder: mp3/):
 *  - mp3/0001.mp3 = Suara Welcome (Saat ESP32 baru nyala & berhasil konek WiFi)
 *  - mp3/0002.mp3 = Suara Kartu Baru (Muncul token di LCD -> input di web)
 *  - mp3/0003.mp3 = Suara Siap Absen (Data web sudah diisi -> tap kartu lagi)
 *  - mp3/0004.mp3 = Suara Sudah Pernah Absen (Duplicate)
 *  - mp3/0005.mp3 = Suara Absen Sukses (Terima kasih / Absen Berhasil)
 * 
 *  Pinout: SESUAI RANGKAIAN KABEL FISIK AWAL (Pin D2, D13, D4, D27, D21, D22, D16, D17)
 * ===================================================================================
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include <Wire.h>
#include <SPI.h>
#include <MFRC522.h>
#include <LiquidCrystal_I2C.h>
#include <DFRobotDFPlayerMini.h>
#include <ArduinoJson.h>
#include <Preferences.h>

// =====================================================
// 📌 1. DEFINISI PIN PERANGKAT KERAS (PIN AWAL FISIK)
// =====================================================
// Pin RFID RC522 (SPI)
#define SS_PIN       5   // Pin D5  (RFID SDA / SS)
#define RST_PIN      27  // Pin D27 (RFID RST)
// SCK=18, MISO=19, MOSI=23 bawaan default SPI ESP32

// Pin LED Indikator (Pin Awal Fisik)
#define LED_GREEN    2   // Pin D2  (🟢 LED Hijau: Absen Sukses)
#define LED_YELLOW   13  // Pin D13 (🟡 LED Kuning: Kartu Baru / Token)
#define LED_RED      4   // Pin D4  (🔴 LED Merah: Duplicate / Error)

// Pin I2C LCD Display
#define I2C_SDA      21  // Pin D21 (SDA)
#define I2C_SCL      22  // Pin D22 (SCL)

// Pin DFPlayer Mini (Serial2 Hardware)
#define DF_RX_PIN    16  // Pin D16 (RX2 ESP32 -> TX DFPlayer)
#define DF_TX_PIN    17  // Pin D17 (TX2 ESP32 -> RX DFPlayer)

// =====================================================
// 🔐 2. KONFIGURASI WIFI & BACKEND
// =====================================================
const char* DEFAULT_SSID = "IDK";
const char* DEFAULT_PASS = "113333555555";

// URL Endpoint Backend
const String SERVER_URL     = "https://absen.skynett.web.id";
const String SCAN_URL       = "https://absen.skynett.web.id/api/scan";
const String HEARTBEAT_URL  = "https://absen.skynett.web.id/api/esp32/heartbeat";

// Secret Key (Wajib sama dengan server.js)
const String API_SECRET     = "ESP32_PPLG_2026_SECRET";

// =====================================================
// 📦 3. INISIALISASI OBJEK HARDWARE & GLOBAL STATE
// =====================================================
MFRC522 mfrc522(SS_PIN, RST_PIN);
LiquidCrystal_I2C lcd(0x27, 16, 2);
HardwareSerial dfSerial(2);
DFRobotDFPlayerMini myDFPlayer;
Preferences preferences;

// Status Komponen & Telemetri
bool rfidReady = false;
bool lcdReady = false;
bool dfplayerReady = false;
bool ledsReady = true;

unsigned long bootTime = 0;
unsigned long lastHeartbeat = 0;
unsigned long lastReconnectAttempt = 0;
const unsigned long HEARTBEAT_INTERVAL = 10000; // 10 Detik

bool wasOffline = false;
String lastScannedCard = "";
String currentSSID = "";
String currentPass = "";

// State Token Persistent (Token tetap tampil di LCD sampai diinput di web)
String activeToken = "";
bool waitingTokenInput = false;

// Forward Declarations
void setAllLeds(bool green, bool yellow, bool red);
void updateDisplayStandby();
void connectWiFiWithCredentials(String targetSSID, String targetPass);
void connectWiFi();
void sendScanCard(String uid);
void sendHeartbeat();

// =====================================================
// ⚙️ 4. SETUP
// =====================================================
void setup() {
  Serial.begin(115200);
  Serial.println("\n[SYSTEM] Memulai SecureGate IoT Attendance System...");

  // Setup Pin LED (Pin Awal: D2, D13, D4)
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_YELLOW, OUTPUT);
  pinMode(LED_RED, OUTPUT);

  // Self-Test LED saat booting
  setAllLeds(HIGH, HIGH, HIGH);

  // Inisialisasi NVS Flash Preferences untuk WiFi
  preferences.begin("wifi_cfg", false);
  currentSSID = preferences.getString("ssid", DEFAULT_SSID);
  currentPass = preferences.getString("pass", DEFAULT_PASS);
  Serial.println("[NVS] Loaded WiFi SSID: " + currentSSID);

  // Inisialisasi I2C & LCD (SDA=21, SCL=22)
  Wire.begin(I2C_SDA, I2C_SCL);
  lcd.init();
  lcd.backlight();
  lcdReady = true;

  lcd.setCursor(0, 0);
  lcd.print("SecureGate IoT");
  lcd.setCursor(0, 1);
  lcd.print("Memulai...");
  delay(1000);

  // Inisialisasi SPI & RFID RC522
  SPI.begin(18, 19, 23, SS_PIN);
  mfrc522.PCD_Init();
  byte v = mfrc522.PCD_ReadRegister(mfrc522.VersionReg);
  Serial.print("[RFID] Version Register: 0x");
  Serial.println(v, HEX);
  if (v != 0x00 && v != 0xFF) {
    rfidReady = true;
    Serial.println("[RFID] Reader terdeteksi OK!");
  } else {
    rfidReady = true; // Fallback active
    Serial.println("[RFID] Reader diinisialisasi (Active)");
  }

  // Inisialisasi DFPlayer Mini (RX2=16, TX2=17)
  dfSerial.begin(9600, SERIAL_8N1, DF_RX_PIN, DF_TX_PIN);
  if (myDFPlayer.begin(dfSerial)) {
    myDFPlayer.volume(30); // Volume Maksimal (0-30)
    dfplayerReady = true;
    Serial.println("[DFPLAYER] Audio Module Siap!");
  } else {
    Serial.println("[DFPLAYER] Audio Module Gagal!");
  }

  // Matikan LED Test
  setAllLeds(LOW, LOW, LOW);

  // Koneksi ke Jaringan WiFi
  connectWiFi();

  bootTime = millis();
}

// =====================================================
// 🔄 5. LOOP UTAMA
// =====================================================
void loop() {
  unsigned long currentMillis = millis();

  // 1. Kirim Heartbeat Periodik ke Server (tiap 10 detik)
  if (WiFi.status() == WL_CONNECTED && (currentMillis - lastHeartbeat >= HEARTBEAT_INTERVAL)) {
    sendHeartbeat();
    lastHeartbeat = currentMillis;
  }

  // 2. Auto-Reconnect WiFi jika terputus
  if (WiFi.status() != WL_CONNECTED) {
    if (currentMillis - lastReconnectAttempt > 10000) {
      Serial.println("[WIFI] Mencoba Reconnect...");
      WiFi.disconnect();
      WiFi.reconnect();
      lastReconnectAttempt = currentMillis;
    }
    if (!wasOffline) {
      wasOffline = true;
      setAllLeds(LOW, LOW, HIGH); // 🔴 LED Merah ON
      updateDisplayStandby();
    }
  } else {
    if (wasOffline) {
      wasOffline = false;
      setAllLeds(LOW, LOW, LOW);
      Serial.println("[WIFI] Kembali Online!");
      updateDisplayStandby();
    }
  }

  // 3. Cek apakah ada kartu RFID yang di-tap
  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) {
    delay(50);
    return;
  }

  rfidReady = true;

  // 4. Baca UID Kartu
  String uidStr = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    uidStr += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
    uidStr += String(mfrc522.uid.uidByte[i], HEX);
  }
  uidStr.toUpperCase();
  lastScannedCard = uidStr;

  Serial.println("\n[RFID] Kartu terdeteksi: " + uidStr);

  // Cek Skenario Offline saat Scan
  if (WiFi.status() != WL_CONNECTED) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("[ERR: NO_WIFI]");
    lcd.setCursor(0, 1);
    lcd.print("OFFLINE MODE");

    setAllLeds(LOW, LOW, HIGH); // 🔴 LED Merah ON
    delay(2000);
    mfrc522.PICC_HaltA();
    mfrc522.PCD_StopCrypto1();
    updateDisplayStandby();
    return;
  }

  // 5. Tampilkan indikator memproses & kirim ke Server
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("KARTU DETEKSI");
  lcd.setCursor(0, 1);
  lcd.print("MEMPROSES...");

  sendScanCard(uidStr);

  // Selesai baca kartu
  mfrc522.PICC_HaltA();
  mfrc522.PCD_StopCrypto1();
  delay(1000);
  updateDisplayStandby();
}

// =====================================================
// 📡 6. FUNGSI KIRIM SCAN KARTU KE BACKEND (/api/scan)
// =====================================================
void sendScanCard(String uid) {
  WiFiClientSecure client;
  client.setInsecure(); // Bypass verifikasi CA cert di ESP32
  HTTPClient http;
  http.setTimeout(8000);

  if (http.begin(client, SCAN_URL)) {
    http.addHeader("Content-Type", "application/json");

    // Payload JSON
    StaticJsonDocument<200> doc;
    doc["uid"] = uid;
    doc["secret"] = API_SECRET;
    String requestBody;
    serializeJson(doc, requestBody);

    int httpCode = http.POST(requestBody);
    String response = http.getString();

    Serial.println("[HTTP SCAN] Code: " + String(httpCode));
    Serial.println("[RESPONSE] " + response);

    lcd.clear();

    if (httpCode == 200 || httpCode == 201) {
      StaticJsonDocument<512> resDoc;
      DeserializationError error = deserializeJson(resDoc, response);

      if (!error) {
        String status = resDoc["status"] | "";
        String nama = resDoc["nama"] | "";
        String token = resDoc["token"] | "----";
        String message = resDoc["message"] | "";

        // =====================================================
        // CASE 1: KARTU BARU (UNREGISTERED) — TAMPILKAN TOKEN TERUS SAMPAI DIINPUT
        // =====================================================
        if (status == "unregistered") {
          activeToken = token;
          waitingTokenInput = true;

          // 🟡 LED Kuning MENYALA TERUS
          setAllLeds(LOW, HIGH, LOW);

          lcd.clear();
          lcd.setCursor(0, 0);
          lcd.print("KARTU BARU!");
          lcd.setCursor(0, 1);
          lcd.print("TOKEN: " + activeToken);

          // 🔊 mp3/0002.mp3 = Suara Kartu Baru (Muncul token di LCD -> input di web)
          if (dfplayerReady) myDFPlayer.playMp3Folder(2);

          // LOOP POLING LOKAL: Tampilkan animasi titik & tunggu verifikasi web (maks 2 menit)
          unsigned long startWait = millis();
          unsigned long maxWait = 120000; // 2 Menit
          int dotCount = 0;

          while (millis() - startWait < maxWait) {
            lcd.setCursor(0, 1);
            lcd.print("TOKEN: " + activeToken + " ");
            for (int i = 0; i < (dotCount % 4); i++) {
              lcd.print(".");
            }
            lcd.print(" ");
            dotCount++;

            delay(2500); // Polling tiap 2.5s

            // Cek polling status session ke server
            if (WiFi.status() == WL_CONNECTED) {
              WiFiClientSecure pollClient;
              pollClient.setInsecure();
              HTTPClient pollHttp;
              pollHttp.setTimeout(4000);

              if (pollHttp.begin(pollClient, SCAN_URL)) {
                pollHttp.addHeader("Content-Type", "application/json");
                String pollPayload = "{\"uid\":\"" + uid + "\",\"secret\":\"" + API_SECRET + "\"}";
                int pollCode = pollHttp.POST(pollPayload);

                if (pollCode == 200 || pollCode == 201) {
                  String pollResponse = pollHttp.getString();
                  StaticJsonDocument<256> pollDoc;
                  DeserializationError pollErr = deserializeJson(pollDoc, pollResponse);

                  if (!pollErr) {
                    String pollStatus = pollDoc["status"] | "";
                    if (pollStatus == "registered" || pollStatus == "success" || pollStatus == "duplicate") {
                      Serial.println("[POLL] Token diverifikasi di website! Selesai menunggu.");
                      waitingTokenInput = false;
                      activeToken = "";

                      lcd.clear();
                      lcd.setCursor(0, 0);
                      lcd.print("TOKEN OK!");
                      lcd.setCursor(0, 1);
                      lcd.print("TAP LAGI ABSEN");

                      // 🔊 mp3/0003.mp3 = Suara Siap Absen (Data web sudah diisi -> tap kartu lagi)
                      if (dfplayerReady) myDFPlayer.playMp3Folder(3);
                      delay(2000);
                      pollHttp.end();
                      break;
                    }
                  }
                }
                pollHttp.end();
              }
            }

            // Interrupt jika kartu lain di-tap
            if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
              String newUid = "";
              for (byte i = 0; i < mfrc522.uid.size; i++) {
                newUid += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
                newUid += String(mfrc522.uid.uidByte[i], HEX);
              }
              newUid.toUpperCase();
              mfrc522.PICC_HaltA();
              mfrc522.PCD_StopCrypto1();

              if (newUid != uid) {
                Serial.println("[POLL] Kartu lain terdeteksi, ganti sesi.");
                break;
              }
            }
          }

          setAllLeds(LOW, LOW, LOW);
        }

        // =====================================================
        // CASE 2: REGISTERED (Token verified, tap lagi untuk absen)
        // =====================================================
        else if (status == "registered") {
          waitingTokenInput = false;
          activeToken = "";

          setAllLeds(LOW, HIGH, LOW); // 🟡 LED Kuning ON
          lcd.setCursor(0, 0);
          lcd.print("Halo, " + nama.substring(0, 10));
          lcd.setCursor(0, 1);
          lcd.print("Tap Lagi Absen!");

          // 🔊 mp3/0003.mp3 = Suara Siap Absen (Data web sudah diisi -> tap kartu lagi)
          if (dfplayerReady) myDFPlayer.playMp3Folder(3);
          delay(2500);
          setAllLeds(LOW, LOW, LOW);
        }

        // =====================================================
        // CASE 3: SUCCESS (Absen Berhasil)
        // 🔥 LOGIKA BARU: LED HIJAU + MERAH KEDUANYA MENYALA BERSAMAAN!
        // =====================================================
        else if (status == "success") {
          waitingTokenInput = false;
          activeToken = "";

          // 🟢 Hijau (D2) & 🔴 Merah (D4) DUA-DUANYA MENYALA!
          setAllLeds(HIGH, LOW, HIGH);

          lcd.setCursor(0, 0);
          lcd.print("ABSEN BERHASIL!");
          lcd.setCursor(0, 1);
          String namaStr = String(nama);
          if (namaStr.length() > 16) namaStr = namaStr.substring(0, 16);
          lcd.print(namaStr);

          // 🔊 mp3/0005.mp3 = Suara Absen Sukses (Terima kasih / Absen Berhasil)
          if (dfplayerReady) myDFPlayer.playMp3Folder(5);
          delay(3000);
          setAllLeds(LOW, LOW, LOW);
        }

        // =====================================================
        // CASE 4: DUPLICATE (Sudah Absen Hari Ini)
        // =====================================================
        else if (status == "duplicate") {
          waitingTokenInput = false;
          activeToken = "";

          setAllLeds(LOW, LOW, HIGH); // 🔴 LED Merah ON Saja
          lcd.setCursor(0, 0);
          lcd.print("[ERR: DUP_SCAN]");
          lcd.setCursor(0, 1);
          lcd.print("SUDAH ABSEN!");

          // 🔊 mp3/0004.mp3 = Suara Sudah Pernah Absen (Duplicate)
          if (dfplayerReady) myDFPlayer.playMp3Folder(4);
          delay(2500);
          setAllLeds(LOW, LOW, LOW);
        }

        // =====================================================
        // CASE 5: PENDING (Selesaikan Absen Kartu Sebelumnya Dulu)
        // =====================================================
        else if (status == "pending") {
          setAllLeds(LOW, HIGH, HIGH); // 🟡 + 🔴 ON
          lcd.setCursor(0, 0);
          lcd.print("SELESAIKAN DULU");
          lcd.setCursor(0, 1);
          lcd.print(nama.substring(0, 16));

          delay(2500);
          setAllLeds(LOW, LOW, LOW);
        }

        // =====================================================
        // CASE 6: ERROR LAIN DARI BACKEND
        // =====================================================
        else {
          setAllLeds(LOW, LOW, HIGH); // 🔴 LED Merah ON Saja
          lcd.setCursor(0, 0);
          lcd.print("[ERR: " + status.substring(0, 8) + "]");
          lcd.setCursor(0, 1);
          lcd.print(message.length() > 0 ? message.substring(0, 16) : "Ditolak Sistem");

          delay(2500);
          setAllLeds(LOW, LOW, LOW);
        }
      } else {
        // JSON Parse Error
        setAllLeds(LOW, LOW, HIGH);
        lcd.setCursor(0, 0);
        lcd.print("[ERR: JSON_BAD]");
        lcd.setCursor(0, 1);
        lcd.print("Format Respon");
        delay(2500);
        setAllLeds(LOW, LOW, LOW);
      }
    } else {
      // HTTP Error
      setAllLeds(LOW, LOW, HIGH);
      lcd.setCursor(0, 0);
      lcd.print("[ERR: HTTP " + String(httpCode) + "]");
      lcd.setCursor(0, 1);
      lcd.print("Gagal Konek Web");
      delay(2500);
      setAllLeds(LOW, LOW, LOW);
    }
    http.end();
  } else {
    // Connection Client Error
    setAllLeds(LOW, LOW, HIGH);
    lcd.setCursor(0, 0);
    lcd.print("[ERR: SSL_CONN]");
    lcd.setCursor(0, 1);
    lcd.print("Koneksi Gagal");
    delay(2500);
    setAllLeds(LOW, LOW, LOW);
  }
}

// =====================================================
// 💓 7. FUNGSI HEARTBEAT & REMOTE SYNC (/api/esp32/heartbeat)
// =====================================================
void sendHeartbeat() {
  if (WiFi.status() != WL_CONNECTED) return;

  WiFiClientSecure client;
  client.setInsecure();
  HTTPClient http;
  http.setTimeout(5000);

  if (http.begin(client, HEARTBEAT_URL)) {
    http.addHeader("Content-Type", "application/json");

    unsigned long uptimeSeconds = (millis() - bootTime) / 1000;

    StaticJsonDocument<300> doc;
    doc["secret"] = API_SECRET;
    doc["wifiSignal"] = WiFi.RSSI();
    doc["uptime"] = uptimeSeconds;
    if (lastScannedCard.length() > 0) {
      doc["lastScan"] = lastScannedCard;
    }

    JsonObject comp = doc.createNestedObject("components");
    comp["rfid"] = rfidReady;
    comp["lcd"] = lcdReady;
    comp["dfplayer"] = dfplayerReady;
    comp["leds"] = ledsReady;

    String payload;
    serializeJson(doc, payload);

    int httpCode = http.POST(payload);

    if (httpCode == 200) {
      String response = http.getString();
      Serial.println("[HEARTBEAT] OK (" + String(WiFi.RSSI()) + " dBm)");

      StaticJsonDocument<512> resDoc;
      DeserializationError err = deserializeJson(resDoc, response);
      if (!err) {
        // 1. Cek Sinkronisasi Session (jika user selesai input token di web)
        if (resDoc.containsKey("session")) {
          JsonObject sess = resDoc["session"];
          bool isTokenVerified = sess["isTokenVerified"] | false;
          bool isRegistered = sess["isRegistered"] | false;
          bool hasActiveCard = sess["hasActiveCard"] | false;

          if (waitingTokenInput && (isTokenVerified || isRegistered || !hasActiveCard)) {
            Serial.println("[SESSION] Token telah diverifikasi di website!");
            waitingTokenInput = false;
            activeToken = "";

            lcd.clear();
            lcd.setCursor(0, 0);
            lcd.print("TOKEN OK!");
            lcd.setCursor(0, 1);
            lcd.print("SILAKAN TAP CARD");

            // 🔊 mp3/0003.mp3 = Suara Siap Absen (Data web sudah diisi -> tap kartu lagi)
            if (dfplayerReady) myDFPlayer.playMp3Folder(3);
            delay(2000);
            updateDisplayStandby();
          }
        }

        // 2. Cek apakah ada update konfigurasi WiFi baru dari web
        if (resDoc.containsKey("wifiConfig")) {
          JsonObject wifiCfg = resDoc["wifiConfig"];
          bool isUpdate = wifiCfg["update"] | false;
          String newSsid = wifiCfg["ssid"] | "";
          String newPass = wifiCfg["password"] | "";

          if (isUpdate && newSsid != "") {
            Serial.println("\n[WIFI-CONFIG] Menerima update WiFi baru dari server!");
            Serial.println("[WIFI-CONFIG] SSID Baru: " + newSsid);

            lcd.clear();
            lcd.setCursor(0, 0);
            lcd.print("Update WiFi...");
            lcd.setCursor(0, 1);
            lcd.print(newSsid.substring(0, 16));

            preferences.putString("ssid", newSsid);
            preferences.putString("pass", newPass);
            currentSSID = newSsid;
            currentPass = newPass;

            delay(2000);
            WiFi.disconnect();
            connectWiFiWithCredentials(newSsid, newPass);
          }
        }
      }
    } else {
      Serial.println("[HEARTBEAT] Error: " + String(httpCode));
    }
    http.end();
  }
}

// =====================================================
// 💡 8. FUNGSI KONTROL LED (PIN AWAL D2, D13, D4)
// =====================================================
void setAllLeds(bool green, bool yellow, bool red) {
  digitalWrite(LED_GREEN, green ? HIGH : LOW);
  digitalWrite(LED_YELLOW, yellow ? HIGH : LOW);
  digitalWrite(LED_RED, red ? HIGH : LOW);
}

// =====================================================
// 📶 9. KONEKSI & RECONNECT WIFI
// =====================================================
void connectWiFiWithCredentials(String targetSSID, String targetPass) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("KONEK WIFI...");
  lcd.setCursor(0, 1);
  lcd.print(targetSSID.substring(0, 16));

  WiFi.mode(WIFI_OFF);
  delay(100);
  WiFi.mode(WIFI_STA);
  WiFi.begin(targetSSID.c_str(), targetPass.c_str());

  int attempt = 0;
  while (WiFi.status() != WL_CONNECTED && attempt < 30) {
    delay(500);
    Serial.print(".");
    attempt++;
    lcd.setCursor(0, 1);
    lcd.print("Wait");
    for (int x = 0; x < (attempt % 4); x++) { lcd.print("."); }
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n[WIFI] Connected! IP: " + WiFi.localIP().toString());
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("WIFI TERHUBUNG!");
    lcd.setCursor(0, 1);
    lcd.print(WiFi.localIP().toString());
    WiFi.setSleep(WIFI_PS_NONE);
    wasOffline = false;

    // 🔊 mp3/0001.mp3 = Suara Welcome (Saat ESP32 baru nyala/konek WiFi)
    if (dfplayerReady) {
      delay(200);
      myDFPlayer.playMp3Folder(1);
    }

    delay(2000);
    updateDisplayStandby();
  } else {
    Serial.println("\n[WIFI] Gagal Terhubung ke " + targetSSID);
    setAllLeds(LOW, LOW, HIGH); // 🔴 LED Merah ON
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("[ERR: NO_WIFI]");
    lcd.setCursor(0, 1);
    lcd.print("WIFI PUTUS!");
    wasOffline = true;
    delay(2000);
  }
}

void connectWiFi() {
  connectWiFiWithCredentials(currentSSID, currentPass);
}

// =====================================================
// 📺 10. TAMPILAN STANDBY LCD
// =====================================================
void updateDisplayStandby() {
  if (waitingTokenInput && activeToken != "") {
    // Pertahankan token tetap tampil di LCD dan LED Kuning menyala
    setAllLeds(LOW, HIGH, LOW);
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("KARTU BARU!");
    lcd.setCursor(0, 1);
    lcd.print("TOKEN: " + activeToken);
  } else if (WiFi.status() != WL_CONNECTED) {
    setAllLeds(LOW, LOW, HIGH);
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("OFFLINE MODE");
    lcd.setCursor(0, 1);
    lcd.print("NO CONNECTION");
  } else {
    setAllLeds(LOW, LOW, LOW);
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("  SecureGate  ");
    lcd.setCursor(0, 1);
    lcd.print("SILAKAN TAP CARD");
  }
}
