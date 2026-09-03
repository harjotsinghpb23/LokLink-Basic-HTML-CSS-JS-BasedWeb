function trackComplaint() {
    const id = document.getElementById("complaintId");

    if (!id) return;

    const complaintId = id.value.trim();

    if (complaintId === "") {
        alert("Please enter your Complaint ID.");
        return;
    }

    alert(
        "Complaint found!\n\n" +
        "Complaint ID: " + complaintId +
        "\n\nStatus: Under Review"
    );
}
