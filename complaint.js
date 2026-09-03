const form = document.getElementById("complaintForm");

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const confirmation = document.getElementById("confirm");

        if (!confirmation || !confirmation.checked) {
            alert("Please confirm that the information provided is correct.");
            return;
        }

        alert(
            "Complaint submitted successfully!\n\n" +
            "Your Complaint ID: CMP" +
            Math.floor(10000 + Math.random() * 90000)
        );
    });
}
