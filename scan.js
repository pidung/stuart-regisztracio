const resultDiv = document.getElementById("result");

// IDE ÍRD A MAKE.COM WEBHOOK URL-JÉT
const WEBHOOK_URL = "https://hook.eu1.make.com/j1is72ejhnt2eo8pu4qowi3rk8jfx8p0";

let lastCode = "";
let processing = false;

function showMessage(text, ok) {
    resultDiv.textContent = text;

    if (ok) {
        resultDiv.className = "ok";
    } else {
        resultDiv.className = "bad";
    }
}

async function onScanSuccess(decodedText) {

    // Ugyanazt a QR-kódot ne olvassa be többször egymás után
    if (processing) return;

    if (decodedText === lastCode) return;

    processing = true;
    lastCode = decodedText;

    showMessage("Ellenőrzés...", true);

    try {

        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ticket: decodedText
            })
        });

        const data = await response.json();

        if (data.status === "valid") {
            showMessage("✅ Érvényes jegy\n" + data.name, true);
        }
        else if (data.status === "used") {
            showMessage("⚠️ A jegyet már felhasználták!", false);
        }
        else {
            showMessage("❌ Érvénytelen jegy!", false);
        }

    }
    catch (err) {

        console.error(err);

        showMessage("❌ Kapcsolati hiba!", false);

    }

    setTimeout(() => {
        processing = false;
        lastCode = "";
        showMessage("Várakozás QR-kódra...", true);
    }, 30000);

}

const html5QrCode = new Html5Qrcode("reader");

Html5Qrcode.getCameras()
.then(devices => {

    if (devices && devices.length) {

        html5QrCode.start(

            {
                facingMode: "environment"
            },

            {
                fps: 10,
                qrbox: 250
            },

            onScanSuccess

        );

    }

})
.catch(err => {

    console.error(err);

    showMessage("Nem sikerült elindítani a kamerát!", false);

});
