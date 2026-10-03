import {
    GestureRecognizer,
    FilesetResolver
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest";


const camera =
    document.getElementById("camera");

const messiPeaceSticker =
    document.getElementById("messiPeaceSticker");

const messiPointSticker =
    document.getElementById("messiPointSticker");

const messiPose3Sticker = 
    document.getElementById("messiPose3Sticker");

let gestureRecognizer;
let lastVideoTime = -1;

// ==============================
// HOLD TIME
// ==============================

let lastVictoryTime = 0;
let lastPointTime = 0;
let lastPose3Time = 0;
const GESTURE_HOLD_TIME = 500;


// ==============================
// GLOBAL STATE
// ==============================

window.activeMessiSticker = null;

// ==============================
// INITIALIZE MEDIAPIPE
// ==============================

async function initializeGestureRecognizer() {

    console.log("Loading MediaPipe...");

    const vision =
        await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );


    gestureRecognizer =
        await GestureRecognizer.createFromOptions(
            vision,
            {
                baseOptions: {

                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",

                    delegate: "GPU"
                },

                runningMode: "VIDEO",

                numHands: 2
            }
        );


    console.log("MediaPipe ready!");

    detectGesture();
}


// ==============================
// DETECT
// ==============================

function detectGesture() {

    if (
        gestureRecognizer &&
        camera.readyState >= 2
    ) {

        if (
            camera.currentTime !== lastVideoTime
        ) {

            lastVideoTime =
                camera.currentTime;


            const results =
                gestureRecognizer.recognizeForVideo(
                    camera,
                    performance.now()
                );


            handleGesture(results);
        }
    }


    requestAnimationFrame(
        detectGesture
    );
}


// ==============================
// INDEX FINGER DETECTION
// ==============================

function isPointGesture(landmarks) {

    if (!landmarks) {
        return false;
    }


    /*
        MediaPipe landmarks:

        8  = index fingertip
        6  = index PIP

        12 = middle fingertip
        10 = middle PIP

        16 = ring fingertip
        14 = ring PIP

        20 = pinky fingertip
        18 = pinky PIP
    */


    // Index finger UP

    const indexUp =
        landmarks[8].y <
        landmarks[6].y;


    // Other fingers DOWN

    const middleDown =
        landmarks[12].y >
        landmarks[10].y;

    const ringDown =
        landmarks[16].y >
        landmarks[14].y;

    const pinkyDown =
        landmarks[20].y >
        landmarks[18].y;


    return (
        indexUp &&
        middleDown &&
        ringDown &&
        pinkyDown
    );
}

function isOpenHand(landmarks) {

    if (!landmarks) {
        return false;
    }


    // Four main fingers must be extended

    const indexUp =
        landmarks[8].y < landmarks[6].y;

    const middleUp =
        landmarks[12].y < landmarks[10].y;

    const ringUp =
        landmarks[16].y < landmarks[14].y;

    const pinkyUp =
        landmarks[20].y < landmarks[18].y;


    return (
        indexUp &&
        middleUp &&
        ringUp &&
        pinkyUp
    );
}


// ==============================
// HANDLE GESTURES
// ==============================

function handleGesture(results) {

    const now =
        performance.now();


    let victoryDetected = false;
    let pointDetected = false;
    let pose3Detected = false;


    // ==========================
    // PEACE
    // ==========================

    if (
        results.gestures &&
        results.gestures.length > 0 &&
        results.gestures[0].length > 0
    ) {

        const gesture =
            results.gestures[0][0];

        const gestureName =
            gesture.categoryName;

        const confidence =
            gesture.score;


        if (
            gestureName === "Victory" &&
            confidence > 0.65
        ) {

            victoryDetected = true;

            lastVictoryTime = now;
        }
    }


    // ==========================
    // POINT ☝️
    // ==========================

    if (
        results.landmarks &&
        results.landmarks.length > 0
    ) {

        if (
            isPointGesture(
                results.landmarks[0]
            )
        ) {

            pointDetected = true;

            lastPointTime = now;
        }
    }

    // ==========================
    // POSE 3 — BOTH HANDS OPEN
    // ==========================

    if (
        results.landmarks &&
        results.landmarks.length >= 2
    ) {

        const firstHand =
            results.landmarks[0];

        const secondHand =
            results.landmarks[1];


        const firstHandOpen =
            isOpenHand(firstHand);

        const secondHandOpen =
            isOpenHand(secondHand);


        if (
            firstHandOpen &&
            secondHandOpen
        ) {

            pose3Detected = true;

            lastPose3Time = now;
        }
    }


    // ==========================
    // PRIORITY
    // ==========================

    /*
        Peace gets priority.

        This prevents Point from
        accidentally activating while
        making ✌️.
    */

    if (
        pose3Detected ||
        now - lastPose3Time <
        GESTURE_HOLD_TIME
    ) {

        showPose3();

        return;
    }


    if (
        victoryDetected ||
        now - lastVictoryTime <
        GESTURE_HOLD_TIME
    ) {

        showPeace();

        return;
    }


    if (
        pointDetected ||
        now - lastPointTime <
        GESTURE_HOLD_TIME
    ) {

        showPoint();

        return;
    }


    hideAllStickers();
}


// ==============================
// SHOW PEACE
// ==============================

function showPeace() {

    messiPeaceSticker.classList.add("show");
    messiPointSticker.classList.remove("show");
    messiPose3Sticker.classList.remove("show");
}


function showPoint() {

    messiPointSticker.classList.add("show");
    messiPeaceSticker.classList.remove("show");
    messiPose3Sticker.classList.remove("show");
}

function showPose3() {

    messiPose3Sticker.classList.add("show");
    messiPeaceSticker.classList.remove("show");
    messiPointSticker.classList.remove("show");
}


function hideAllStickers() {

    messiPeaceSticker.classList.remove("show");
    messiPointSticker.classList.remove("show");
    messiPose3Sticker.classList.remove("show");
}


// ==============================
// START
// ==============================

initializeGestureRecognizer();