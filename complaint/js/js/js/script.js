let currentUser = null;

// REGISTER
function register(){

    let name = document.getElementById("name").value;
    let email = document.getElementById("regEmail").value;
    let pass = document.getElementById("regPass").value;
    let role = document.getElementById("role").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({name,email,pass,role});

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully!");
}

// LOGIN
function login(){

    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;

    // ADMIN LOGIN
    if(email === "admin@gmail.com" && pass === "admin123"){

        currentUser = {name:"Admin", role:"Admin"};

        document.getElementById("loginBox").style.display = "none";
        document.getElementById("adminDash").style.display = "block";

        loadAdmin();
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email === email && u.pass === pass);

    if(user){

        currentUser = user;

        document.getElementById("loginBox").style.display = "none";
        document.getElementById("userDash").style.display = "block";

        document.getElementById("welcome").innerText =
        "Welcome " + user.name + " (" + user.role + ")";

        loadUserComplaints();

    } else {
        alert("Invalid login");
    }
}

// SUBMIT COMPLAINT
complaints.push({

user: currentUser.name,
email: currentUser.email,
role: currentUser.role,

subject: document.getElementById("subject").value,

complaint: document.getElementById("complaint").value,

status: "Pending"

});

    localStorage.setItem("complaints", JSON.stringify(complaints));

    loadUserComplaints();

// USER VIEW
function loadUserComplaints(){

    let box = document.getElementById("userList");
    box.innerHTML = "";

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints
    .filter(c => c.user === currentUser.name)
    .forEach(c => {

        box.innerHTML += `
        <div>
            <b>${c.subject}</b><br>
            ${c.message}<br>
            Status: ${c.status}
        </div><hr>`;
    });
}

// ADMIN VIEW
function loadAdmin(){

    let box = document.getElementById("adminList");
    box.innerHTML = "";

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.forEach(c => {

        box.innerHTML += `
        <div style="background:#eee;padding:10px;margin:10px 0;">
            <b>${c.subject}</b><br>
            ${c.message}<br>
            By: ${c.user} (${c.role})<br>
            Status: ${c.status}
        </div>`;
    });
}

// LOGOUT
function logout(){
    location.reload();
}