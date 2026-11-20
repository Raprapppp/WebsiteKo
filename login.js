function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (email === "" && password === "") {
        message.innerHTML = "Please put something in the fields";
        message.style.color = "red";

    
    } else if (email === "Raprappp" && password === "passwordkoto") {

        window.location.href = "main.html";

    } else {

        message.innerHTML = "Invalid Email or Password";
        message.style.color = "red";

    }
}
