function submitComplaint(subject, message, userEmail){

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.email === userEmail);

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.push({
        id: Date.now(),   // 🔥 FIXED (IMPORTANT FOR UPDATE/DELETE)
        name: user.name,
        role: user.role,
        email: user.email,
        subject: subject,
        message: message,
        status: "Pending",
        adminNote: ""
    });

    localStorage.setItem("complaints", JSON.stringify(complaints));
}

function updateStatus(){

    let id = document.getElementById("complaintId").value;
    let status = document.getElementById("statusUpdate").value;

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints = complaints.map(c => {

        if(c.id == id){

            c.status = status;

            // 🔥 AUTO ADMIN ACTION MESSAGE
            if(status === "In Progress"){
                c.adminNote = "Your complaint is now being processed by admin.";
            }

            if(status === "Resolved"){
                c.adminNote = "Your complaint has been resolved.";
            }
        }

        return c;
    });

    localStorage.setItem("complaints", JSON.stringify(complaints));

    loadAdminComplaints();
    loadUserComplaints();

    alert("Status Updated!");
}

    localStorage.setItem("complaints", JSON.stringify(complaints));

    loadAdminComplaints();
    loadUserComplaints();

    alert("Status Updated!");


function deleteComplaint(id){

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints = complaints.filter(c => c.id != id);

    localStorage.setItem("complaints", JSON.stringify(complaints));

    loadAdminComplaints();
    loadUserComplaints();

    alert("Complaint deleted successfully!");
}

