---
title: ESP32 WebRTC Kamera (Livebild in der Sinric Pro App und im Portal)
layout: post
lang: de
description: Übertrage per WebRTC Live-Video von einer ESP32 Kamera von überall in die Sinric Pro App und ins Portal.
---

In diesem Abschnitt zeigen wir dir, wie du per WebRTC Live-Video von einer ESP32 Kamera von überall in die **Sinric Pro App** und ins **Sinric Pro Portal** überträgst.

### Voraussetzungen :

1. ESP32 oder ESP32-S3 Kameraboard mit PSRAM (zum Beispiel AI-Thinker ESP32-CAM, XIAO ESP32S3 Sense, Freenove ESP32-S3).
2. Arduino IDE mit **ESP32 Core 3.3.10 oder 3.3.11** (die WebRTC-Bibliothek wird für diese Versionen vorkompiliert ausgeliefert).
3. Bibliotheken: **SinricPro** (mit WebRTC-Unterstützung) und **SinricProWebRTC**.

### Wie funktioniert es?

1. Die Sinric Pro App oder das Portal erzeugt ein WebRTC-Offer und sendet es über Sinric Pro an deine Kamera.
2. Sinric Pro ergänzt die Anfrage um STUN/TURN-Server, damit die Kamera auch von außerhalb deines WLANs erreichbar ist.
3. Der ESP32 antwortet, und das Video fließt **direkt zwischen der Kamera und deinem Smartphone oder Browser**. Wenn kein direkter Weg möglich ist, wird es über den Sinric Pro TURN-Server weitergeleitet.

### Schritt 1: Kamera-Gerät anlegen

1. Gehe zu [portal.sinric.pro](https://portal.sinric.pro) → **Devices** → **Add Device** und wähle den Gerätetyp **Camera**.
2. Wähle unter **Camera Stream Configuration** als Board **ESP32** und als Streaming Protocol **WebRTC**.
3. Aktiviere auf einem ESP32-S3 zusätzlich **H.264 video track**, wenn die Kamera auch in Amazon Alexa und Google Home verfügbar sein soll. Siehe [ESP32-S3 H.264 Kamera für Alexa und Google Home]({{ site.github.url }}/de/pages/tutorials/camera/esp32-h264-alexa-googlehome-camera.de.html).
4. Speichere und notiere dir die **Device Id**. **App Key** und **App Secret** findest du unter **Credentials**.

### Schritt 2: Bibliotheken installieren

Öffne in der Arduino IDE den **Library Manager** und installiere **SinricPro** und **SinricProWebRTC**.

### Schritt 3: Beispiel flashen

1. Öffne **File → Examples → SinricProWebRTC → SinricProCamera**.
2. Trage in `Settings.h` dein WLAN, App Key, App Secret, Device Id und `CAMERA_BOARD` ein (siehe `BoardProfiles.h`).
3. Aktiviere unter **Tools** die Option **PSRAM** und wähle ein Partitionsschema mit mindestens 3 MB für die App, zum Beispiel **Huge APP (3MB No OTA)**.
4. Lade den Sketch hoch und öffne dann den seriellen Monitor mit 115200 Baud. Du solltest `Connected to SinricPro` sehen.

### Schritt 4: Kamera ansehen

- **App**: Öffne die Kamera in der Geräteliste.
- **Portal**: Klicke auf der Kamerakarte auf **Preview**.

Schnappschüsse (**Take Snapshot**, **View Snapshots**) funktionieren neben dem Livebild weiterhin.

### Einschränkungen

- Amazon Alexa und Google Home benötigen eine H.264-Videospur, die nur der ESP32-S3 erzeugen kann. Auf einem klassischen ESP32 bleibt diese Kamera auf App und Portal beschränkt. Siehe [ESP32-S3 H.264 Kamera für Alexa und Google Home]({{ site.github.url }}/de/pages/tutorials/camera/esp32-h264-alexa-googlehome-camera.de.html).
- Nur ein Zuschauer gleichzeitig: Wird die Kamera auf einem anderen Gerät geöffnet, ersetzt das den aktuellen Zuschauer.
- Das Video startet mit 5 Bildern pro Sekunde in VGA (640 x 480). Im Viewer kannst du Auflösung und Bildrate ändern sowie Blitz (AI-Thinker ESP32-CAM), Drehen und Spiegeln umschalten.
- Bei langsamen Verbindungen sinkt die Qualität automatisch; schalte **Auto quality** aus, damit deine Einstellungen fest bleiben.
- Audio gibt es auf dem XIAO ESP32S3 Sense (integriertes Mikrofon).
- Wenn der Viewer dich auffordert, die Kamera-Firmware zu aktualisieren, flashe sie erneut mit dem SinricPro SDK 5.1.0 oder neuer.

### Fehlerbehebung

- `Camera init failed`: falsches `CAMERA_BOARD`, oder PSRAM ist deaktiviert.
- Bleibt bei „Connecting“ hängen: Suche im seriellen Monitor nach `WebRTC answer failed` und stelle sicher, dass der ESP32 Core die Version 3.3.10 oder 3.3.11 hat.
- Funktioniert zu Hause, aber nicht über mobile Daten: Dieses Netz blockiert direkte Verbindungen, daher muss der Stream über TURN weitergeleitet werden; prüfe im seriellen Monitor, ob das Offer TURN-Server enthielt.

### Verwandte Tutorials

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [ESP32-S3 H.264 Kamera für Alexa und Google Home]({{ site.github.url }}/de/pages/tutorials/camera/esp32-h264-alexa-googlehome-camera.de.html)
- [Raspberry Pi WebRTC Kamera]({{ site.github.url }}/de/pages/tutorials/camera/raspberrypi-webrtc-alexa-googlehome-camera.de.html)
