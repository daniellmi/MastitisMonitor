#include <LoRa.h>
#include <Adafruit_MLX90614.h>

Adafruit_MLX90614 mlx = Adafruit_MLX90614();

#define SS 18
#define RST 14
#define DIO0 26

double temperature = 0;
int cod_cow = 2;

void setup() {

Serial.begin(115200);
LoRa.setPins(SS,RST,DIO0);

if(!LoRa.begin(915E6)) {
  Serial.println("error to start LoRa");
  while(true);
  }
  Serial.println("LoRa started");

    if (!mlx.begin()) {
    Serial.println("Error connecting to MLX sensor. Check wiring.");
    while (1);
  } 
  else
  Serial.println("mlx started");

}

void loop() {
  temperature = mlx.readObjectTempC();
  String message = String(cod_cow) + "," +  String(temperature);

  LoRa.beginPacket();
  LoRa.print(message);
  LoRa.endPacket();
  delay(2000);

}