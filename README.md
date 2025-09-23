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

Mobile App (in progress): React Native

Other: Big Data analytics, Predictive modeling

```

📱 Mobile App (React Native)

The mobile app will soon be integrated into this repository under /mobile/.
It will allow farmers to:

Monitor real-time animal health data

Receive alerts on mastitis risk

Access historical reports and insights


 <img width="202" height="412" alt="bootsplash img" src="https://github.com/user-attachments/assets/7842c5aa-0767-45c7-8e39-4ca13edbc17f" />
 
 
🌍 Target Users

Small dairy farmers

Cooperatives and veterinary associations

Agritech companies

📈 Future Roadmap

 Full integration with Huawei IoTDA for secure device management

 Advanced predictive analytics with Huawei Cloud Big Data services

 Deployment guide for cooperatives and large-scale farms

 Web dashboard for veterinarians and farm managers

 React Native mobile app release

👨‍💻 Contributors

Daniel Miranda – Backend & Cloud Deployment

G.E.C.A Team – IoT Hardware & Mobile Development

IFBA Jequié – Research & Innovation

📬 Contact

📧 danielmirandaticc@gmail.com

📱 +55 (73) 9865-0508
