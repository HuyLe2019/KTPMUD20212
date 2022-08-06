#include <FS.h>
#include <Arduino.h>
//#include <ESP8266WiFi.h>
//#include <ESP8266WiFiMulti.h>
#include "WiFi.h"
#include <WiFiMulti.h>
#include <SocketIoClient.h>
#include <ArduinoJson.h>
#include <MFRC522.h>

#define PIN_OUT 2
#define RST_PIN 21
#define SS_PIN 5
#define USE_SERIAL Serial

WiFiMulti WiFiMulti;
SocketIoClient webSocket;
MFRC522 rfid(SS_PIN, RST_PIN);

unsigned long time1 = 0;

float thresholdTemperature;
float thresholdHumidity;
boolean autoModel;

void syncData(const String &rfid)
{
  StaticJsonDocument<50> doc;
  doc["rfid"] = rfid;
  String str;
  serializeJson(doc, str);
  int len = 0;
  while (str[len] != NULL)
  {
    len++;
  }
  char strEmit[len + 1];
  str.toCharArray(strEmit, len + 1);
  webSocket.emit("sync-data", strEmit);
}

void triggerAction(const char *data)
{
  USE_SERIAL.println(F("Start trigger action..."));
  StaticJsonDocument<50> doc;
  DeserializationError error = deserializeJson(doc, data);
  if (!error)
  {
    boolean isOpen = doc["isOpen"];
    const byte state = isOpen ? HIGH : LOW;
    digitalWrite(PIN_OUT, state);// mo dong cua
    USE_SERIAL.println(F("Trigger action successfuly"));
  }
  else
  {
    USE_SERIAL.println(F("Failed to load json data"));
  }
}

void syncTrigger(const char *payload, size_t size)
{
  triggerAction(payload);
}

String dumpByteString(byte *buffer, byte bufferSize)
{
  String userid;
  for (byte i = 0; i < bufferSize; i++)
  {
    userid += String(buffer[i], HEX);
  }
  Serial.println(userid);
  return userid;
}

void setup()
{
  USE_SERIAL.begin(115200);
  USE_SERIAL.setDebugOutput(true);
  for (uint8_t t = 4; t > 0; t--)
  {
    USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }

  WiFiMulti.addAP("ssid", "password");

  while (WiFiMulti.run() != WL_CONNECTED)
  {
    delay(100);
  }

  pinMode(PIN_OUT, OUTPUT);
  digitalWrite(PIN_OUT, LOW);

  SPI.begin();
  rfid.PCD_Init();

  webSocket.on("sync-trigger", syncTrigger);
  webSocket.begin("rfidpro.herokuapp.com", 80, "/socket.io/?transport=websocket");
}

void loop()
{
  webSocket.loop();
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial())
  {
    Serial.print(F("Reader RFID"));
    Serial.print(F(": Card UID: "));
    String uid = dumpByteString(rfid.uid.uidByte, rfid.uid.size);
    Serial.println();
    syncData(uid);// send to server
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
  }
}