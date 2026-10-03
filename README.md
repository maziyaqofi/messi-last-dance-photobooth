# 🇦🇷 Messi's Last Dance — Interactive Photobooth

An interactive web-based photobooth created to celebrate **Messi's Last Dance with Argentina**.

This project combines a browser-based camera, automatic photo capture, real-time hand gesture recognition, interactive Messi stickers, background music, and a downloadable Argentina-themed photo strip.

The experience is designed to be simple: open the photobooth, strike a pose, use hand gestures to unlock different Messi moments, and capture four photos automatically.

---

## ✨ Features

- 📷 Real-time browser webcam
- ⏱️ Automatic countdown
- 📸 Four-photo automatic photobooth session
- ✋ Real-time hand gesture recognition
- 🐐 Gesture-triggered Messi stickers
- 🎵 Background music
- ⚡ Camera flash animation
- 🖼️ Photo result preview
- 🎞️ Custom Argentina-themed photo strip
- ⬇️ Downloadable final photo strip
- 🔄 Reset and start a new photobooth session
- 💻 Runs directly in the browser

---

## 🤟 Gesture Interaction

The photobooth uses hand gesture recognition to trigger different Messi stickers in real time.

| Gesture | Action |
|---|---|
| ✌️ Peace / Victory | Displays the Messi World Cup sticker |
| ☝️ Index Finger Up | Displays the second Messi pose |
| 👐 Two Open Hands | Displays the third Messi pose |
| No Gesture | Clean camera view |

If a gesture sticker is visible when the camera captures a photo, the sticker is automatically included in the saved image.

---

## 📸 How It Works

1. Open the photobooth.
2. Allow browser camera access.
3. Background music starts automatically when permitted by the browser.
4. Click the camera button once.
5. The photobooth displays **GET READY!**
6. A `3 → 2 → 1` countdown begins.
7. Strike a pose or perform one of the supported hand gestures.
8. The camera automatically captures the photo.
9. Repeat until four photos have been captured.
10. The **Your Moments** screen displays all four photos.
11. Choose:
   - **Back to Camera** to start a new session.
   - **Download Photos** to generate the final photo strip.

---

## 🎞️ Final Photo Strip

After completing a session, the four captured photos can be combined with a custom Argentina-themed photo strip.

The final composition includes:

- Four captured moments
- Argentina-inspired visual elements
- World Cup references
- Messi's iconic number `10`
- Custom *Messi's Last Dance* design

The composition is generated directly in the browser using the HTML Canvas API.

---

## 🛠️ Built With

- HTML5
- CSS3
- JavaScript
- MediaDevices / `getUserMedia()`
- HTML Canvas API
- MediaPipe Tasks Vision
- MediaPipe Gesture Recognizer
- MediaPipe Hand Landmarks

No backend is required for the current version.

---

## 📁 Project Structure

```text
messi-photobooth/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── camera.js
│   └── gesture.js
│
├── assets/
│   ├── frame.png
│   ├── MessiPeace.png
│   ├── MessiPoint.png
│   ├── Pose3.png
│   ├── stripfoto.png
│   └── worldcup22.mp3
│
└── README.md
```

---

## 🚀 Running Locally

Clone the repository:

```bash
git clone https://github.com/maziyaqofi/messi-last-dance-photobooth
```

Move into the project directory:

```bash
cd messi-photobooth
```

Start a local web server:

```bash
python3 -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

Allow camera access when prompted by the browser.

> Opening `index.html` directly using `file://` is not recommended because camera and MediaPipe functionality may require a local or secure web context.

---

## 🔒 Camera & Privacy

Camera processing happens directly inside the user's browser.

The current version does not require users to upload their captured photos to a server. Photos are processed locally using the browser and HTML Canvas.

---

## 🎯 Project Goal

This project explores how computer vision and gesture recognition can make a traditional photobooth more interactive.

Instead of manually selecting effects, users can trigger visual elements naturally through hand gestures while taking photos.

The project was created as a fun experimental fan experience combining:

**Football × Computer Vision × Interactive Web Experience**

---

## 🔮 Future Improvements

This is the first version of the project.

Possible future improvements include:

- Improve hand gesture recognition accuracy
- Add more gesture-triggered poses and stickers
- Improve sticker positioning and scaling
- Add smoother transitions and animations
- Add a final photo strip preview before downloading
- Add mute / unmute controls for background music
- Add fullscreen or kiosk mode for events
- Improve mobile and tablet responsiveness
- Add custom photo strip themes
- Add retake options for individual photos
- Add QR code download for event visitors
- Add social sharing options
- Optimize MediaPipe performance
- Improve accessibility
- Add better error handling for camera permissions

---

## ⚠️ Disclaimer

This is an unofficial fan-made project created for educational, experimental, and entertainment purposes.

It is not affiliated with or endorsed by Lionel Messi, the Argentina national football team, FIFA, or any related organization.

All trademarks, names, images, music, and other third-party assets belong to their respective owners.

---

## 👩‍💻 Author

**MaziyaQofi**

---

### ⭐ Messi's Last Dance

> Four shots. One unforgettable moment.

**Argentina 🇦🇷 • No. 10**
