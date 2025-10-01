  #include <LoRa.h>
  #include <WiFi.h>
  #include <HTTPClient.h>

  #define SS 18
  #define RST 14
  #define DIO0 26

  int packet;
  int cod_cow = -1;
  String message;
  float temperature;

  int bpm = 60;

  const char * ssid = "IFBA";
  String server = "http://190.92.199.156/api/temp"; // huawei cloud node.ts server 

  void setup() {
  Serial.begin(115200);
  LoRa.setPins(SS, RST, DIO0);

  if(!LoRa.begin(915E6)) {
    Serial.println("failed to start LoRa");
    while(true);
  }
  Serial.println("LoRa started");

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid);

  while(WiFi.status() != WL_CONNECTED) {
    Serial.println("Error connecting the wifi");
  }
  Serial.println("WiFi connected");
  Serial.print("IP :"); Serial.println(WiFi.localIP());

  }

  void loop() {
  packet = LoRa.parsePacket();

  if(packet) {
    message = "";
    while(LoRa.available()) {
      message += (char)LoRa.read();
    }
      cod_cow = message.substring(1,message.indexOf(",") - 1).toInt();
      temperature = message.substring(message.indexOf(",") + 1).toFloat();

      Serial.print("temperature: "); 
      Serial.println(temperature);
      Serial.print("ID: ");
      Serial.println(cod_cow);
      Serial.print(" with RSSI ");
      Serial.println(LoRa.packetRssi());
  }
  else 
  temperature = 0;

  if(WiFi.status() == WL_CONNECTED && temperature != 0) {

    HTTPClient http;
    http.begin(server);
    http.addHeader("Content-Type", "application/json");

   String payload = "{";
    payload += "\"cod\":" + String(cod_cow) + ",";
    payload += "\"temp\":" + String(temperature,2) + ",";
    payload += "\"acc\":" + String("0.04");
    payload += "}";

    int response = http.POST(payload);

    if(response > 0) {
        Serial.print("HTTP Response code: ");
          Serial.println(response);
          String payload = http.getString();
          Serial.println(payload);
        }
        else {
          Serial.print("Error code: ");
          Serial.println(response);
        }
        http.end();
  }
  }  
