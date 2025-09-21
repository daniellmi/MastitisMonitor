#include <Wire.h>
#include <Adafruit_MLX90614.h>
#include <MPU6050.h>
#include <TinyGPSPlus.h>
#include <HardwareSerial.h>
#include <SPI.h>
#include <LoRa.h>

#define LORA_SCK 5
#define LORA_MISO 19
#define LORA_MOSI 27
#define LORA_CS 18
#define LORA_RST 14
#define LORA_IRQ 26
#define LORA_FREQ 915E6

Adafruit_MLX90614 mlx = Adafruit_MLX90614();
MPU6050 mpu(Wire);
TinyGPSPlus gps;
HardwareSerial SerialGPS(2);

unsigned long lastSend = 0;
const unsigned long interval = 60000;

void setup() {
  Serial.begin(115200);
  Wire.begin();
  mlx.begin();
  mpu.begin();
  mpu.calcGyroOffsets(true);
  SerialGPS.begin(9600, SERIAL_8N1, 16, 17);
  SPI.begin(LORA_SCK, LORA_MISO, LORA_MOSI);
  LoRa.setPins(LORA_CS, LORA_RST, LORA_IRQ);
  if (!LoRa.begin(LORA_FREQ)) {
    while (1);
  }
}

void loop() {
  while (SerialGPS.available() > 0) {
    gps.encode(SerialGPS.read());
  }
  mpu.update();
  if (millis() - lastSend >= interval) {
    lastSend = millis();
    int32_t lat_i = 0, lon_i = 0;
    uint8_t flags = 0;
    if (gps.location.isValid()) {
      lat_i = (int32_t)(gps.location.lat() * 1e5);
      lon_i = (int32_t)(gps.location.lng() * 1e5);
      flags |= 0x01;
    }
    float temp = mlx.readObjectTempC();
    int16_t temp_i = (int16_t)round(temp * 100.0f);
    float ax = mpu.getAccX();
    float ay = mpu.getAccY();
    float az = mpu.getAccZ();
    int16_t ax_i = (int16_t)round(ax * 1000.0f);
    int16_t ay_i = (int16_t)round(ay * 1000.0f);
    int16_t az_i = (int16_t)round(az * 1000.0f);
    uint8_t payload[17];
    int idx = 0;
    payload[idx++] = (lat_i >> 24) & 0xFF;
    payload[idx++] = (lat_i >> 16) & 0xFF;
    payload[idx++] = (lat_i >> 8) & 0xFF;
    payload[idx++] = (lat_i) & 0xFF;
    payload[idx++] = (lon_i >> 24) & 0xFF;
    payload[idx++] = (lon_i >> 16) & 0xFF;
    payload[idx++] = (lon_i >> 8) & 0xFF;
    payload[idx++] = (lon_i) & 0xFF;
    payload[idx++] = (temp_i >> 8) & 0xFF;
    payload[idx++] = (temp_i) & 0xFF;
    payload[idx++] = (ax_i >> 8) & 0xFF;
    payload[idx++] = (ax_i) & 0xFF;
    payload[idx++] = (ay_i >> 8) & 0xFF;
    payload[idx++] = (ay_i) & 0xFF;
    payload[idx++] = (az_i >> 8) & 0xFF;
    payload[idx++] = (az_i) & 0xFF;
    payload[idx++] = flags & 0xFF;
    LoRa.beginPacket();
    LoRa.write(payload, idx);
    LoRa.endPacket();
    Serial.printf("Enviado: lat=%ld lon=%ld temp=%d ax=%d ay=%d az=%d flags=0x%02X\n",
                  lat_i, lon_i, temp_i, ax_i, ay_i, az_i, flags);
  }
  delay(10);
}
 
