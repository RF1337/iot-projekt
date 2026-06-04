# Smart Home – IoT overvågning af bolig

Dette projekt er udviklet som eksamensprojekt i Teknikfag B (DDU) på ZBC Ringsted.

Projektet er en funktionel prototype på et IoT-baseret smart home-system, der kan overvåge temperaturdata i realtid ved hjælp af en Arduino, en cloud-database og et webdashboard.

## Funktioner

* Realtidsvisning af temperaturdata
* Historiske temperaturgrafer
* Threshold-baserede alarmer
* Login og brugerautentifikation
* Realtidsopdateringer via WebSockets
* Responsivt dashboard
* Row Level Security (RLS)
* Unit tests med Vitest

---

# Systemoversigt

Systemet fungerer ved at:

1. En DS18B20 temperatursensor måler temperaturen
2. Arduinoen læser værdien via OneWire-protokollen
3. Data sendes via HTTPS til Supabase
4. Data gemmes i PostgreSQL
5. Frontenden modtager realtime-opdateringer via WebSockets
6. Dashboardet opdateres automatisk

---

# Teknologier

## Frontend

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Recharts

## Backend / Database

* Supabase
* PostgreSQL
* Supabase Auth
* Row Level Security (RLS)

## Hardware

* Arduino Uno R4 WiFi
* DS18B20 temperatursensor
* Breadboard

## Test

* Vitest

---

# Installation

## Klon repository

```bash
git clone https://github.com/RF1337/smart-home.git
cd smart-home
```

## Installer dependencies

```bash
npm install
```

## Opret `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=din_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=din_nøgle
```

## Start projektet

```bash
npm run dev
```

Projektet kører herefter på:

```text
http://localhost:3000
```

---

# Arduino setup

Biblioteker:

* WiFiS3
* OneWire
* DallasTemperature

## Tilslutning af DS18B20

| DS18B20 | Arduino     |
| ------- | ----------- |
| VDD     | 5V          |
| GND     | GND         |
| DATA    | Digital Pin |

---

# Sikkerhed

Projektet anvender flere sikkerhedslag:

* HTTPS/TLS kryptering
* Supabase Authentication
* JWT-baseret login
* Row Level Security (RLS)
* Secrets-fil til API-nøgler

---

# Database

Projektet anvender følgende tabeller:

* `location`
* `sensor`
* `temperature`
* `alerts`
* `user_location`

Systemet er bygget med fokus på skalerbarhed, så flere sensorer og lokationer kan tilføjes senere.

---

# Fremtidige forbedringer

* Push-notifikationer
* Flere sensortyper
* MQTT i stedet for HTTPS
* Machine learning til anomali-detektion
* PCB fremfor breadboard
* Mobilapp

---

# Udviklet af

* Rasmus
* Tobias
* Oliver

DDU – Teknikfag B
ZBC Ringsted
