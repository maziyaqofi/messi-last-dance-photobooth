const camera = document.getElementById("camera");
const cameraMessage = document.getElementById("cameraMessage");

const captureButton = document.getElementById("captureButton");
const captureCanvas = document.getElementById("captureCanvas");

const countdownElement = document.getElementById("countdown");
const flashElement = document.getElementById("flash");

const photoSlots = [
    document.getElementById("photoSlot1"),
    document.getElementById("photoSlot2"),
    document.getElementById("photoSlot3"),
    document.getElementById("photoSlot4")
];
 
// Result
const resultScreen =
    document.getElementById("resultScreen");

const backButton =
    document.getElementById("backButton");

const downloadButton =
    document.getElementById("downloadButton");


const resultPhotos = [
    document.getElementById("resultPhoto1"),
    document.getElementById("resultPhoto2"),
    document.getElementById("resultPhoto3"),
    document.getElementById("resultPhoto4")
];


let capturedPhotos = [];

// =============================
// START CAMERA
// =============================

async function startCamera() {

    try {

        const stream =
            await navigator.mediaDevices.getUserMedia({

                video: {
                    facingMode: "user"
                },

                audio: false

            });

        camera.srcObject = stream;

        camera.onloadedmetadata = () => {

            camera.play();

            cameraMessage.style.display = "none";

        };

    } catch (error) {

        console.error("Camera error:", error);

        cameraMessage.textContent =
            "Camera access failed. Please allow camera permission.";

    }

}


// =============================
// WAIT
// =============================

function wait(ms) {

    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );

}


// =============================
// COUNTDOWN
// =============================

async function countdown() {

    for (let number = 3; number >= 1; number--) {

        countdownElement.textContent = number;

        await wait(1000);

    }

    countdownElement.textContent = "";

}


// =============================
// FLASH
// =============================

function cameraFlash() {

    flashElement.classList.remove("active");

    void flashElement.offsetWidth;

    flashElement.classList.add("active");

}


// =============================
// CAPTURE PHOTO
// =============================

function capturePhoto() {

    const context =
        captureCanvas.getContext("2d");

    captureCanvas.width =
        camera.videoWidth;

    captureCanvas.height =
        camera.videoHeight;


    // =========================
    // CLEAR CANVAS
    // =========================

    context.clearRect(
        0,
        0,
        captureCanvas.width,
        captureCanvas.height
    );


    // =========================
    // DRAW WEBCAM
    // =========================

    context.save();

    // Mirror webcam
    context.translate(
        captureCanvas.width,
        0
    );

    context.scale(-1, 1);

    context.drawImage(
        camera,
        0,
        0,
        captureCanvas.width,
        captureCanvas.height
    );

    context.restore();


    // =========================
    // CHECK VISIBLE STICKER
    // =========================

    const peaceSticker =
        document.getElementById(
            "messiPeaceSticker"
        );

    const pointSticker =
        document.getElementById(
            "messiPointSticker"
        );

    const pose3Sticker =
    document.getElementById(
        "messiPose3Sticker"
    );


    let activeSticker = null;


    // Look at what is ACTUALLY
    // visible on the camera

    if (
        pose3Sticker.classList.contains("show")
    ) {

        activeSticker = pose3Sticker;

        console.log(
            "📸 Visible sticker: POSE 3"
        );

    } else if (
        peaceSticker.classList.contains("show")
    ) {

        activeSticker = peaceSticker;

        console.log(
            "📸 Visible sticker: PEACE"
        );

    } else if (
        pointSticker.classList.contains("show")
    ) {

        activeSticker = pointSticker;

        console.log(
            "📸 Visible sticker: POINT"
        );

    } else {

        console.log(
            "📸 No visible sticker"
        );
    }


    // =========================
    // DRAW STICKER
    // =========================

    if (
        activeSticker &&
        activeSticker.complete &&
        activeSticker.naturalWidth > 0
    ) {

        const stickerWidth =
            captureCanvas.width * 0.32;


        const stickerHeight =
            stickerWidth *
            (
                activeSticker.naturalHeight /
                activeSticker.naturalWidth
            );


        const stickerX =
            captureCanvas.width
            - stickerWidth
            - (
                captureCanvas.width * 0.08
            );


        const stickerY =
            captureCanvas.height
            - stickerHeight
            - (
                captureCanvas.height * 0.08
            );


        context.drawImage(
            activeSticker,
            stickerX,
            stickerY,
            stickerWidth,
            stickerHeight
        );


        console.log(
            "✅ Sticker successfully drawn"
        );
    }


    // =========================
    // EXPORT
    // =========================

    return captureCanvas.toDataURL(
        "image/jpeg",
        0.95
    );
}


// =============================
// SHOW PHOTO
// =============================

function showPhoto(photoData, index) {

    // Save photo
    capturedPhotos[index] = photoData;


    // =========================
    // SIDEBAR PREVIEW
    // =========================

    const image =
        document.createElement("img");

    image.src = photoData;

    photoSlots[index].innerHTML = "";

    photoSlots[index].appendChild(image);


    // =========================
    // RESULT SCREEN
    // =========================

    const resultImage =
        document.createElement("img");

    resultImage.src = photoData;

    resultPhotos[index].innerHTML = "";

    resultPhotos[index].appendChild(
        resultImage
    );
}


// =============================
// PHOTOBOOTH SESSION
// =============================

async function startPhotoSession() {

    captureButton.disabled = true;
    capturedPhotos = [];

    // =========================
    // GET READY
    // =========================

    countdownElement.textContent =
        "GET READY!";

    await wait(1200);

    countdownElement.textContent = "";


    // Clear previous photos

    photoSlots.forEach(
        (slot, index) => {

            slot.innerHTML =
                `<span>${index + 1}</span>`;

        }
    );


    // Take 4 photos

    for (let i = 0; i < 4; i++) {

        await countdown();

        cameraFlash();

        const photo =
            capturePhoto();

        showPhoto(photo, i);

        /*
            Short break before
            next countdown
        */

        await wait(1000);

    }

    // Show final results
    await wait(500);
    resultScreen.classList.add("show");

    captureButton.disabled = false;

}


// =============================
// BUTTON
// =============================

captureButton.addEventListener(
    "click",
    startPhotoSession
);

backButton.addEventListener(
    "click",
    resetPhotoBooth
);


function resetPhotoBooth() {

    // =========================
    // CLOSE RESULT SCREEN
    // =========================

    resultScreen.classList.remove(
        "show"
    );


    // =========================
    // DELETE OLD PHOTOS
    // =========================

    capturedPhotos = [];


    // =========================
    // RESET PHOTO SLOTS
    // =========================

    photoSlots.forEach(
        (slot, index) => {

            slot.innerHTML =
                `<span>${index + 1}</span>`;

        }
    );


    // =========================
    // RESET RESULT PHOTOS
    // =========================

    resultPhotos.forEach(
        (photo) => {

            photo.innerHTML = "";

        }
    );


    // =========================
    // RESET COUNTDOWN
    // =========================

    countdownElement.textContent = "";


    // =========================
    // ENABLE CAMERA BUTTON
    // =========================

    captureButton.disabled = false;


    console.log(
        "📷 Photobooth ready for a new session"
    );
}

// Start webcam

startCamera();

downloadButton.addEventListener(
    "click",
    createPhotoStrip
);


async function createPhotoStrip() {

    if (capturedPhotos.length < 4) {
        console.log("Photos are not complete.");
        return;
    }


    // =========================
    // CREATE FINAL CANVAS
    // =========================

    const finalCanvas =
        document.createElement("canvas");

    const ctx =
        finalCanvas.getContext("2d");


    finalCanvas.width = 682;
    finalCanvas.height = 2048;


    // =========================
    // PHOTO POSITIONS
    // =========================

    const photoPositions = [

        {
            x: 82,
            y: 160,
            width: 518,
            height: 339
        },

        {
            x: 82,
            y: 561,
            width: 518,
            height: 370
        },

        {
            x: 82,
            y: 993,
            width: 518,
            height: 371
        },

        {
            x: 82,
            y: 1425,
            width: 518,
            height: 371
        }

    ];


    // =========================
    // LOAD PHOTOS
    // =========================

    for (
        let i = 0;
        i < capturedPhotos.length;
        i++
    ) {

        const photo =
            await loadImage(
                capturedPhotos[i]
            );


        const position =
            photoPositions[i];


        drawImageCover(
            ctx,
            photo,
            position.x,
            position.y,
            position.width,
            position.height
        );
    }


    // =========================
    // LOAD STRIP OVERLAY
    // =========================

    const strip =
        await loadImage(
            "assets/stripfoto.png"
        );


    // Draw template LAST
    // so decorations stay above photos

    ctx.drawImage(
        strip,
        0,
        0,
        finalCanvas.width,
        finalCanvas.height
    );


    // =========================
    // DOWNLOAD
    // =========================

    const link =
        document.createElement("a");


    link.download =
        "messi-last-dance-photostrip.png";


    link.href =
        finalCanvas.toDataURL(
            "image/png"
        );


    link.click();
}

function loadImage(src) {

    return new Promise(
        (resolve, reject) => {

            const image =
                new Image();


            image.onload = () =>
                resolve(image);


            image.onerror = reject;


            image.src = src;

        }
    );
}

function drawImageCover(
    ctx,
    image,
    x,
    y,
    width,
    height
) {

    const imageRatio =
        image.width / image.height;


    const boxRatio =
        width / height;


    let sourceWidth;
    let sourceHeight;
    let sourceX;
    let sourceY;


    if (
        imageRatio > boxRatio
    ) {

        // Image is wider
        // Crop left and right

        sourceHeight =
            image.height;

        sourceWidth =
            image.height * boxRatio;

        sourceX =
            (image.width - sourceWidth) / 2;

        sourceY = 0;

    } else {

        // Image is taller
        // Crop top and bottom

        sourceWidth =
            image.width;

        sourceHeight =
            image.width / boxRatio;

        sourceX = 0;

        sourceY =
            (image.height - sourceHeight) / 2;

    }


    ctx.drawImage(
        image,

        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,

        x,
        y,
        width,
        height
    );
}