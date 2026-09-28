---
title: ESP32 WebRTC Camera (Live View in Sinric Pro App and Portal)
layout: post
---

In this section, we will show you how to stream live video from an ESP32 camera to the **Sinric Pro App** and the **Sinric Pro Portal**, from anywhere, using WebRTC.

### Prerequisites :

1. ESP32 or ESP32-S3 camera board with PSRAM (for example AI-Thinker ESP32-CAM, XIAO ESP32S3 Sense, Freenove ESP32-S3).
2. Arduino IDE with **ESP32 core 3.3.10 or 3.3.11** (the WebRTC library ships precompiled for these versions).
3. Libraries: **SinricPro** (with WebRTC support) and **SinricProWebRTC**.

### How does it work?

1. The Sinric Pro App or Portal creates a WebRTC offer and sends it to your camera through Sinric Pro.
2. Sinric Pro adds STUN/TURN servers to the request so the camera can be reached from outside your WiFi network.
3. The ESP32 answers, and the video flows **directly between the camera and your phone or browser**. When a direct path is not possible, it is relayed through the Sinric Pro TURN server.

### Step 1: Create the camera device

1. Go to [portal.sinric.pro](https://portal.sinric.pro) → **Devices** → **Add Device**, and select device type **Camera**.
2. In **Camera Stream Configuration**, select Board **ESP32** and Streaming Protocol **WebRTC**.
3. On an ESP32-S3, tick **H.264 video track** as well if you want the camera to reach Amazon Alexa and Google Home. See [ESP32-S3 H.264 Camera for Alexa and Google Home]({{ site.github.url }}/pages/tutorials/camera/esp32-h264-alexa-googlehome-camera.html).
4. Save, and note the **Device Id**. Your **App Key** and **App Secret** are under **Credentials**.

### Step 2: Install the libraries

In Arduino IDE, open **Library Manager** and install **SinricPro** and **SinricProWebRTC**.

### Step 3: Flash the example

1. Open **File → Examples → SinricProWebRTC → SinricProCamera**.
2. In `Settings.h`, set your WiFi, App Key, App Secret, Device Id and `CAMERA_BOARD` (see `BoardProfiles.h`).
3. Under **Tools**, enable **PSRAM** and select a partition scheme with at least a 3 MB app, such as **Huge APP (3MB No OTA)**.
4. Upload, then open the Serial Monitor at 115200 baud. You should see `Connected to SinricPro`.

### Step 4: View the camera

- **App**: open the camera from the device list.
- **Portal**: click **Preview** on the camera card.

Snapshots (**Take Snapshot**, **View Snapshots**) keep working alongside live view.

### Limitations

- Amazon Alexa and Google Home need an H.264 video track, which only the ESP32-S3 can produce. On a classic ESP32 this camera stays App and Portal only. See [ESP32-S3 H.264 Camera for Alexa and Google Home]({{ site.github.url }}/pages/tutorials/camera/esp32-h264-alexa-googlehome-camera.html).
- One viewer at a time: opening the camera on another device replaces the current viewer.
- Video starts at 5 frames per second at VGA (640 x 480). In the viewer you can change resolution and frame rate, and toggle flash (AI-Thinker ESP32-CAM), flip and mirror.
- Quality drops automatically on slow connections; turn off **Auto quality** to keep your settings fixed.
- Audio is available on the XIAO ESP32S3 Sense (onboard microphone).
- If the viewer asks you to update the camera firmware, flash it again with SinricPro SDK 5.1.0 or later.

### Troubleshooting

- `Camera init failed`: wrong `CAMERA_BOARD`, or PSRAM is disabled.
- Stuck on "Connecting": check the Serial Monitor for `WebRTC answer failed`, and make sure the ESP32 core is 3.3.10 or 3.3.11.
- Works at home but not on mobile data: that network blocks direct connections, so the stream must be relayed through TURN; check the Serial Monitor to confirm the offer included TURN servers.
