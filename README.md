# IIoT Temperature Monitoring System

Et mindre IIoT-projekt baseret på Arduino Uno R4 WiFi, DS18B20-temperatursensor og en Next.js-applikation.

Systemet måler temperatur, analyserer data lokalt på Arduinoen, aktiverer en LED-alarm ved overskridelse af en grænseværdi og sender målinger til en central server via HTTPS. Data vises i et dashboard med aktuel status, historik og online/offline-status.

## Funktioner

- Temperaturmåling med DS18B20
- Lokal validering og analyse på Arduino
- LED-alarm ved kritisk temperatur
- HTTPS-kommunikation til Next.js API
- Lagring af måledata
- Dashboard med temperatur, historik og systemstatus
- Online/offline-status for browser, API og Arduino
- Håndtering af sensor- og netværksfejl

## Teknologier

- Arduino Uno R4 WiFi
- DS18B20 temperatursensor
- Next.js
- TypeScript
- Database
- HTTPS/API
- Tailwind CSS / shadcn/ui

## Formål

Projektet demonstrerer en mindre IIoT-løsning med embedded dataindsamling, lokal analyse, automatisk handling, sikker datakommunikation, visualisering og fejlhåndtering.
