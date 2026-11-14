---
title: ESP32-S3 H.264-Kamera für Alexa und Google Home
layout: post
lang: de
description: Live-Video in H.264 von einer ESP32-S3-Kamera auf Alexa Echo Show, Google Nest Displays, Chromecast und in die Sinric Pro App streamen.
---

In diesem Abschnitt zeigen wir dir, wie du Live-Video von einer **ESP32-S3**-Kamera auf

* Alexa Echo Show und die Alexa App
* Google Nest Smart Displays und Chromecast mit Google TV
* Sinric Pro App und Portal

streamst, und zwar über eine H.264-Videospur per WebRTC.

### Voraussetzungen :

1. Ein **ESP32-S3**-Kameraboard mit PSRAM (zum Beispiel XIAO ESP32S3 Sense, Freenove ESP32-S3, ESP32-S3-WROOM CAM).
2. Arduino IDE mit **ESP32 Core 3.3.10 oder 3.3.11**.
3. Bibliotheken: **SinricPro** 5.1.0 oder neuer und **SinricProWebRTC** 0.2.0 oder neuer.

> Ein klassischer ESP32 kann das nicht. Der H.264-Encoder ist eine reine Softwarelösung und wird nur für den S3 ausgeliefert, daher bleibt eine klassische ESP32-Kamera auf App und Portal beschränkt. Siehe [ESP32 WebRTC Camera]({{ site.github.url }}/de/pages/tutorials/camera/esp32-webrtc-camera.de.html).

### Warum H.264?

Die Sinric Pro App und das Portal können alles anzeigen, was die Kamera sendet. Für sie kann ein ESP32 daher einfach JPEG-Bilder über einen WebRTC-Datenkanal schicken. Alexa und Google Home können das nicht. Sie sind gewöhnliche WebRTC-Clients und erwarten eine echte **Videospur**, und sie akzeptieren nur eine kleine Auswahl an Codecs:

| | Amazon Alexa | Google Home |
|---|---|---|
| Video-Codec | H.264 (Baseline bis High, Level ≤ 4.1) | H.264 oder VP8 |
| Audio-Codec | Opus, PCMU oder PCMA | Opus, G.711 oder G.722 |
| Auflösung | 480p bis 1080p | 480p bis 1080p |
| ICE | Kein Trickle ICE, nur IPv4 | Kein Trickle ICE |
| Answer | Innerhalb von 6 Sekunden | — |

Die beiden Regeln, die für ein kleines Board am meisten zählen, sind **H.264** und **mindestens 480p**. Über keine von beiden lässt sich verhandeln. Deshalb erscheint eine Kamera, die in der Sinric Pro App wunderbar funktioniert, erst dann auf einem Echo Show, wenn sie H.264 mit 640 x 480 kodieren kann.

### Wie funktioniert das?

Die Kamera entscheidet, was sie sendet, indem sie **das Offer des Betrachters liest**. So bedient eine einzige Firmware alles:

1. Ein Betrachter erzeugt ein WebRTC-Offer, und Sinric Pro leitet es an deine Kamera weiter. Dabei werden STUN- und TURN-Server hinzugefügt, damit die Kamera auch von außerhalb deines WLANs erreichbar ist.
2. Die Kamera sieht sich das Offer an:
   * **Das Offer enthält eine Videospur, die H264 anfordert** → die Kamera initialisiert den Sensor neu in YUV422, kodiert mit `esp_h264` und sendet H.264 über RTP. Das ist es, was Alexa und Google Home senden.
   * **Das Offer enthält keine Videospur** → die Kamera sendet weiterhin JPEG-Bilder über den Datenkanal, genau wie bisher. Das ist es, was ältere Versionen der App und des Portals senden.
3. Die Kamera antwortet mit einer Answer, die alle gesammelten ICE-Kandidaten enthält. Danach fließt das Video **direkt zwischen Kamera und Betrachter** oder über den Sinric Pro TURN-Server, wenn kein direkter Weg möglich ist.

Da die Entscheidung pro Sitzung getroffen wird, macht ein Firmware-Upgrade eine ältere App oder ein älteres Portal nie unbrauchbar.

#### Smart Displays bekommen automatisch 640 x 480

App und Portal öffnen neben dem Video einen **Datenkanal** und übertragen darüber JSON-Steuerbefehle: Auflösung, Bildrate, Blitz, Spiegeln vertikal und horizontal. Alexa und Google Home öffnen überhaupt keinen Datenkanal — sie wollen nur Medien.

Genau das nutzt die Kamera als Signal. **Ein Offer ohne Datenkanal ist ein Smart Display**, also startet die Sitzung mit 640 x 480 statt mit der konfigurierten Größe. Alles unter 480p würde nämlich abgelehnt, und es gibt keinen Kanal, über den der Betrachter etwas Größeres anfordern könnte.

#### Was der Encoder tatsächlich leistet

`esp_h264` kodiert in Software auf dem zweiten Kern. Schnell ist das nicht, und die ehrlichen Zahlen lauten:

| Auflösung | Bildrate | Ungefähr |
|---|---|---|
| 320 x 240 (QVGA) | 3 fps | 350 ms pro Bild |
| 640 x 480 (VGA) | 2 fps | 1 Sekunde pro Bild |

Gemessen auf einem XIAO ESP32S3 Sense: 204 Bilder in 73 Sekunden bei 320 x 240, ohne ein einziges verworfenes Bild.

Jede Größe gibt die Bildrate an, die sie wirklich halten kann, denn ein Empfänger bemisst seinen Jitter-Puffer nach dem, was die Kamera im SDP verspricht. 10 fps zu versprechen und 2 zu liefern macht das Bild schlechter, nicht besser.

Der Encoder kostet etwa **272 KB Flash** und bei QVGA etwas mehr als **1 MB PSRAM**, bei VGA deutlich mehr.

### Schritt 1: Kameragerät anlegen

1. [Melde dich](https://portal.sinric.pro) bei deinem Sinric Pro Konto an, gehe zu **Devices** und klicke auf **Add Device**.
2. Gib einen Namen wie **Front Camera** ein und wähle den Gerätetyp **Camera**.
3. Öffne den Tab **Other**. Wähle unter **Camera Stream Configuration** als Board **ESP32** und als Streaming Protocol **WebRTC**.
4. Setze den Haken bei **H.264 video track**.
5. Klicke auf **Save**. Die nächste Seite zeigt **Device Id**, **App Key** und **App Secret**. ***Halte diese Werte geheim. TEILE SIE NICHT IN ÖFFENTLICHEN FOREN!***

### Schritt 2: Bibliotheken installieren

Öffne in der Arduino IDE den **Bibliotheksverwalter** und installiere **SinricPro** und **SinricProWebRTC**.

### Schritt 3: Beispiel flashen

1. Öffne **Datei → Beispiele → SinricProWebRTC → SinricProCamera**.
2. Trage in `Settings.h` die Werte für `WIFI_SSID`, `WIFI_PASS`, `APP_KEY`, `APP_SECRET`, `CAMERA_ID` und `CAMERA_BOARD` ein (wähle dein Board aus `BoardProfiles.h`).
3. Aktiviere unter **Werkzeuge** die Option **PSRAM** und wähle ein Partitionsschema mit mindestens 3 MB für die App, etwa **Huge APP (3MB No OTA)**.
4. Lade den Sketch hoch und öffne dann den seriellen Monitor mit 115200 Baud. Du solltest Folgendes sehen:

```
Camera: XIAO ESP32S3 Sense, PSRAM: 8388608 bytes
WiFi connected: 192.168.1.194
Connected to SinricPro
```

Das Beispiel schaltet H.264 von selbst ein, wenn es für einen ESP32-S3 kompiliert wird:

```cpp
#if CONFIG_IDF_TARGET_ESP32S3
#define WEBRTC_H264 1
#else
#define WEBRTC_H264 0
#endif
```

und teilt Sinric Pro mit, dass Betrachter eine Videospur anfordern dürfen:

```cpp
camera.enableWebRTCVideo(WEBRTC_H264);
```

### Schritt 4: Demo

1. Bitte Alexa oder Google Home, nach neuen Geräten zu suchen.
2. Alexa: *„Alexa, zeig mir die Front Camera“*
3. Google Home: *„Zeig mir die Front Camera auf Wohnzimmer TV“* (der Name deines Chromecast mit Google TV)

Im seriellen Monitor solltest du `WebRTC offer ...` und `WebRTC answer sent` sehen, sobald sich das Display verbindet.

Die Kamera lässt sich auch in der Alexa App und der Google Home App auf deinem Smartphone öffnen.

Alexa App:

![Sinric Pro ESP32-S3 H.264 camera live in the Alexa app]({{ site.github.url }}/public/img/sinricpro_esp32_h264_alexa_app_camera.jpg)

Google Home App:

![Sinric Pro ESP32-S3 H.264 camera live in the Google Home app]({{ site.github.url }}/public/img/sinricpro_esp32_h264_google_home_app_camera.jpg)

### Einschränkungen

- **Nur ESP32-S3.** Für den klassischen ESP32 gibt es keinen H.264-Encoder in Software.
- **Die Bildrate ist niedrig**: etwa 3 fps bei 320 x 240 und 2 fps bei 640 x 480. Alexa und Google Home bekommen immer 640 x 480, rechne dort also mit ungefähr 2 fps.
- **Immer nur ein Betrachter.** Ein neuer Betrachter ersetzt den aktuellen.
- **Die Auflösung ist für die Dauer einer H.264-Sitzung fest.** Die Auflösungssteuerung des Betrachters ist deaktiviert, solange eine Videospur läuft.
- **Audio** ist verfügbar, wenn das Board ein Mikrofon hat, etwa beim XIAO ESP32S3 Sense.
- WebRTC mit Google Home funktioniert nur auf Google Nest Smart Displays und Chromecast mit Google TV.

### Fehlerbehebung

- **Die Kamera erscheint nie auf dem Echo Show.** Prüfe, ob in der Camera Stream Configuration der Haken bei **H.264 video track** gesetzt ist und ob das Gerät ein ESP32-S3 ist. Ohne diese Option meldet Sinric Pro die Kamera gar nicht erst an Alexa.
- **`Camera init failed`**: falsches `CAMERA_BOARD`, oder PSRAM ist unter Werkzeuge deaktiviert.
- **„Live View isn't available right now“** bei Alexa: Sieh im seriellen Monitor nach. `WebRTC answer failed` bedeutet, dass die Kamera nicht rechtzeitig eine Answer erstellen konnte; erscheint gar keine Meldung, ist das Offer meist nie angekommen.
- **Streamt zu Hause, aber nicht über mobile Daten**: Dieses Netz blockiert direkte Verbindungen, daher muss der Stream über TURN weitergeleitet werden.
- Die Google-Payload kannst du mit dem [Google WebRTC Validator](https://smarthome-webrtc-validator.withgoogle.com/) prüfen.

Auf unserer Seite zur [Fehlerbehebung]({{ site.github.url }}/de/pages/troubleshooting.de.html) findest du mögliche Lösungen für dein Problem.

### Verwandte Tutorials

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [ESP32 WebRTC-Kamera]({{ site.github.url }}/de/pages/tutorials/camera/esp32-webrtc-camera.de.html)
- [Raspberry Pi WebRTC-Kamera]({{ site.github.url }}/de/pages/tutorials/camera/raspberrypi-webrtc-alexa-googlehome-camera.de.html)

> Dieses Dokument ist Open Source. Einen Tippfehler entdeckt? Bitte erstelle ein [Issue](https://github.com/sinricpro/help-docs)
