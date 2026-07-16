document.getElementById("registrationForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let shoe = document.getElementById("shoe").value;

    alert(
        "Regisztráció sikeres!\n\n" +
        "Név: " + name +
        "\nE-mail: " + email +
        "\nCipőméret: " + shoe
    );

});
