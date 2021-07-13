// Functions related to the submission of the mentor form

function submitForm() {
    // User's inputs in the form
    let info = {
        id: document.getElementById("student-id").value,
        first: document.getElementById("first-name").value,
        last: document.getElementById("last-name").value,
        email: document.getElementById("email").value,
        courses: myCourses
    };
    // HTTP request to send the search terms to the backend and store the results
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/form", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(info));

    // Display a "submitted" message
    document.body.innerHTML = "Success! Your information has been submitted.";
}