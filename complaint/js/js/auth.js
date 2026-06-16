// REGISTER
let registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let users = JSON.parse(localStorage.getItem("users")) || [];

        users.push({
            name: document.getElementById("name").value,
            role: document.getElementById("role").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        });

        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration Successful");

        window.location.href = "index.html";
    });
}


// LOGIN
let loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        // ADMIN LOGIN
        if (email === "admin@gmail.com" && password === "admin123") {

            localStorage.setItem("currentUser", JSON.stringify({
                role: "admin",
                email: email
            }));

            window.location.href = "admin.html";
            return;
        }

        // NORMAL USER LOGIN
        let users = JSON.parse(localStorage.getItem("users")) || [];

        let found = users.find(user =>
            user.email === email &&
            user.password === password
        );

        if (found) {

            localStorage.setItem("currentUser", JSON.stringify(found));

            window.location.href = "dashboard.html";

        } else {
            alert("Invalid Login");
        }
    });
}


// HIDE REGISTER LINK IF ADMIN
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser && currentUser.role === "admin") {

    const registerLink = document.getElementById("registerLink");

    if (registerLink) {
        registerLink.style.display = "none";
    }
}

document.getElementById("registerForm").addEventListener("submit", function(e){
    e.preventDefault();

    let name = document.getElementById("name").value;
    let role = document.getElementById("role").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({
        name: name,
        role: role,
        email: email,
        password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully!");
    window.location.href = "index.html";
});