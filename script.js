document.getElementById("registrationForm").addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;


    // 1. Email küldése nektek EmailJS-en keresztül
    const emailPromise = emailjs.send(
        "service_ivj7x1h",
        "template_t9va0sg",
        {
            name: name,
            email: email,
            phone: phone
        }
    );


    // 2. Adatok küldése Make webhookra
    const makePromise = fetch("https://hook.eu1.make.com/4fcx2cdgq2o09jhh665otdf9v0vympmg", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone
        })
    });


    // Megvárjuk, hogy mindkettő sikeres legyen
    Promise.all([emailPromise, makePromise])
    .then(function () {

        alert("Köszönjük! A regisztráció sikeresen elküldve.");

        document.getElementById("registrationForm").reset();

    })
    .catch(function (error) {

        console.error(error);

        alert("Hiba történt a regisztráció feldolgozása közben.");

    });

});
