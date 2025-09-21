#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <SPI.h>
#include <LoRa.h>

const char *ssid = "GRACA OI 2.4";
const char *password = "MG090458";
String server = "http://190.92.199.156/api/temp";

WiFiClient client;

#define LORA_SS 15   // CS
#define LORA_RST 16  // RST
#define LORA_DIO0 2  // DIO0

void setup() {
  Serial.begin(9600);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado");
  Serial.println(WiFi.localIP());

  LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);
  if (!LoRa.begin(915E6)) {
    Serial.println("Falha ao iniciar LoRa!");
    while (1);
  }
  Serial.println("LoRa OK, aguardando pacotes...");
}

void loop() {
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    uint8_t payload[32];
    int len = 0;
    while (LoRa.available() && len < sizeof(payload)) {
      payload[len++] = LoRa.read();
    }

    if (len >= 17) {
      int idx = 0;
      int32_t lat_i = (payload[idx++] << 24) | (payload[idx++] << 16) | (payload[idx++] << 8) | payload[idx++];
      int32_t lon_i = (payload[idx++] << 24) | (payload[idx++] << 16) | (payload[idx++] << 8) | payload[idx++];
      int16_t temp_i = (payload[idx++] << 8) | payload[idx++];
      int16_t ax_i = (payload[idx++] << 8) | payload[idx++];
      int16_t ay_i = (payload[idx++] << 8) | payload[idx++];
      int16_t az_i = (payload[idx++] << 8) | payload[idx++];
      uint8_t flags = payload[idx++];

      float lat = lat_i / 1e5;
      float lon = lon_i / 1e5;
      float temp = temp_i / 100.0;
      float ax = ax_i / 1000.0;
      float ay = ay_i / 1000.0;
      float az = az_i / 1000.0;

      Serial.printf("Lat: %.5f, Lon: %.5f, Temp: %.2f, Ax: %.3f, Ay: %.3f, Az: %.3f, Flags: %u\n",
                    lat, lon, temp, ax, ay, az, flags);

      if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(client, server);
        http.addHeader("Content-Type", "application/json");

        String json = "{";
        json += "\"lat\": " + String(lat, 5) + ",";
        json += "\"lon\": " + String(lon, 5) + ",";
        json += "\"temperature\": " + String(temp, 2) + ",";
        json += "\"ax\": " + String(ax, 3) + ",";
        json += "\"ay\": " + String(ay, 3) + ",";
        json += "\"az\": " + String(az, 3) + ",";
        json += "\"flags\": " + String(flags);
        json += "}";

        int httpCode = http.POST(json);
        if (httpCode > 0) {
          String response = http.getString();
          Serial.println(response);
        } else {
          Serial.println("request failed");
        }
        http.end();
      }
    }
  }
}
