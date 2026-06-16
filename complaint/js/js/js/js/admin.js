function loadComplaints(){

    let table = document.getElementById("complaintsTable");
    table.innerHTML = "";

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.forEach((c,index) => {

        table.innerHTML += `
        <tr>
            <td>${c.user}</td>
            <td>${c.email || "N/A"}</td>
            <td>${c.role}</td>
            <td>${c.subject}</td>

            <td>
                <button onclick="viewComplaint(${index})">
                    View
                </button>
            </td>

            <td>
                <select onchange="updateStatus(${index}, this.value)">
                    <option value="Pending"
                    ${c.status==="Pending" ? "selected" : ""}>
                    Pending
                    </option>

                    <option value="In Progress"
                    ${c.status==="In Progress" ? "selected" : ""}>
                    In Progress
                    </option>

                    <option value="Resolved"
                    ${c.status==="Resolved" ? "selected" : ""}>
                    Resolved
                    </option>
                </select>
            </td>

            <td>
                <input type="text"
                value="${c.adminNote || ""}"
                placeholder="Admin action..."
                onchange="updateNote(${index}, this.value)">
            </td>

            <td>
                <button onclick="deleteComplaint(${index})"
                style="background:red;color:white;">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}

function updateStatus(index, value){

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints[index].status = value;

    if(value === "In Progress"){
        complaints[index].adminNote =
        "Your complaint is now being processed by admin.";
    }

    if(value === "Resolved"){
        complaints[index].adminNote =
        "Your complaint has been resolved.";
    }

    localStorage.setItem("complaints",
    JSON.stringify(complaints));

    loadComplaints();
}

function updateNote(index, value){

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints[index].adminNote = value;

    localStorage.setItem("complaints",
    JSON.stringify(complaints));
}

function deleteComplaint(index){

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.splice(index, 1);

    localStorage.setItem("complaints",
    JSON.stringify(complaints));

    loadComplaints();

    alert("Complaint deleted successfully!");
}

function viewComplaint(index){

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    let c = complaints[index];

    document.getElementById("viewName").textContent =
    c.user || "N/A";

    document.getElementById("viewEmail").textContent =
    c.email || "N/A";

    document.getElementById("viewRole").textContent =
    c.role || "N/A";

    document.getElementById("viewSubject").textContent =
    c.subject || "N/A";

    document.getElementById("viewComplaint").textContent =
    c.message || c.complaint || "No complaint found";

    document.getElementById("detailsModal").style.display =
    "block";
}

function closeModal(){

    document.getElementById("detailsModal").style.display =
    "none";
}

function logout(){

    localStorage.removeItem("currentUser");

    window.location.href = "index.html";
}

window.onload = loadComplaints;