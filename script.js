document.getElementById("registrationForm").addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const shoe = document.getElementById("shoe").value;

    emailjs.send(
        "service_ivj7x1h",
        "template_t9va0sg",
        {
            name: name,
            email: email,
            shoe: shoe
        }
    )
    .then(function () {

        alert("Köszönjük! A regisztráció sikeresen elküldve.");

        document.getElementById("registrationForm").reset();

    })
    .catch(function (error) {

        console.error(error);

        alert("Hiba történt az e-mail küldésekor.");

    });

});
