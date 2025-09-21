# 🐄 Mastitis Monitor

Mastitis Monitor is an IoT-based livestock health monitoring system designed to help small dairy farmers detect **bovine mastitis** at an early stage.  
The solution combines a **smart collar**, an **external milking module**, and **Huawei Cloud services** to provide **real-time insights**, reduce production losses, and improve herd health.  

Currently, this repository contains the **backend implementation** (Node.js + TypeScript, running on Huawei Cloud ECS with openEuler and iSula containers). Soon, the **React Native mobile application** will be included in the same project.

---

## 🚀 Features

- Smart collar with sensors:
  - Temperature, movement, GPS  
  - Heart rate monitoring using **MAX30100** (mounted on the cow’s ear)  
- Milking module:
  - pH and conductivity measurements of milk  
- Data transmission:
  - LoRa → ESP8266 gateway → HTTP requests to cloud  
- Backend:
  - Node.js + TypeScript API, running in **iSula container**  
  - **NGINX reverse proxy** (port 80 → 5000)  
- Cloud:
  - Processing on **Huawei Cloud ECS** (openEuler)  
  - Data storage on **OpenGauss**  
  - Scalable Big Data analytics for predictive mastitis detection  
- Frontend (coming soon):
  - Mobile application built with **React Native**  

---

## 🏗️ System Architecture

```text
[Smart Collar & Milking Module]
          |
        (LoRa)
          |
     [ESP8266 Gateway]
          |
        (HTTP)
          |
  [Huawei Cloud ECS - openEuler]
          |
   ┌───────────────────────────┐
   │  NGINX (port 80 → 5000)   │
   │  iSula Container (API)    │
   └───────────────────────────┘
          |
    [OpenGauss Database]
          |
  [Big Data Analytics Engine]
          |
   [React Native Mobile App]
⚙️ Technologies
Backend: Node.js, TypeScript, Express

Cloud: Huawei Cloud ECS (openEuler), iSula container runtime, NGINX reverse proxy

Database: OpenGauss

IoT & Hardware: MAX30100, ESP8266, LoRa

Frontend (in progress): React Native

Other: Big Data analytics, Predictive modeling
