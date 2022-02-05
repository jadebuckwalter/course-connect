// Array to store list of courses that the mentor has taken
let myCourses = [];

// Press "enter" to search for courses
function initialize() {
    document.getElementById("search").addEventListener("keydown", (event) => {
        if (event.code === "Enter") {
            searchCourses("form");
        }
    });
}

// Function to submit the form
function submitForm() {
    // User's inputs in the form
    const info = {
        id: document.getElementById("student-id").value,
        first: format(document.getElementById("first-name").value),
        last: format(document.getElementById("last-name").value),
        email: document.getElementById("email").value,
        pmsg: document.getElementById("pmsg").checked ? "1" : "0",
        courses: myCourses
    };

    // Check for user input
    if (info.id === "" || info.first === "" || info.last === "" || info.email === "" || info.courses.length === 0) {
        document.getElementById("submit-error").style.display = "block";
        document.getElementById("submit-error").innerHTML = "Please fill out all of the fields.";
    // Ensure the email entered is the student's CPSD email address
    } else if (info.email.substring(info.email.length - 8) !== "@cpsd.us") {
        document.getElementById("submit-error").style.display = "block";
        document.getElementById("submit-error").innerHTML = "Please use your CPSD email.";
    // Ensure all of the boxes are checked
    } else if (!document.getElementById("item1").checked || !document.getElementById("item2").checked || !document.getElementById("item3").checked) {
        document.getElementById("submit-error").style.display = "block";
        document.getElementById("submit-error").innerHTML = "You must check all of the boxes.";
    } else {
        // HTTP request to send the search terms to the backend and store the results
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/submit");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(info));

        // Go back to the main page
        window.location.replace("/");
    }
}

// Function to submit the "add courses" form
function addCoursesForm() {
    // User's inputs in the form
    const info = {
        id: document.getElementById("student-id").value,
        email: document.getElementById("email").value,
        courses: myCourses
    };

    // Check for user input
    if (info.id === "" || info.email === "" || info.courses.length === 0) {
        document.getElementById("submit-error").style.display = "block";
        document.getElementById("submit-error").innerHTML = "Please fill out all of the fields.";
    // Ensure the email entered is the student's CPSD email address
    } else if (info.email.substring(info.email.length - 8) !== "@cpsd.us") {
        document.getElementById("submit-error").style.display = "block";
        document.getElementById("submit-error").innerHTML = "Please use your CPSD email.";
    } else {
        // Send a request to verify the mentor
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                // If the mentor is in the database, run the next query to input their data
                if (xhttp.responseText.length > 2) {
                    // HTTP request to send the search terms to the backend and store the results
                    const xhttp2 = new XMLHttpRequest();
                    xhttp2.open("POST", "/add-courses");
                    xhttp2.setRequestHeader("Content-Type", "application/json");
                    xhttp2.send(JSON.stringify(info));

                    // Go back to the main page
                    window.location.replace("/");
                } else {
                    document.getElementById("submit-error").style.display = "block";
                    document.getElementById("submit-error").innerHTML = "Mentor not found. Make sure to input all information correctly.";
                }
            }
        }
        // Send the request to identify the mentor
        xhttp.open("POST", "/identify");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(info));
    }
}

// Format names so that the first letter is uppercase and the rest are lowercase
// name (string): either the first name or last name
// Return the formatted version of the name
function format(name) {
    const specialChars = {" ":" ", "-":"-", "'":"'", ".":"."};
    let formatted = "";
    for (let i = 0; i < name.length; i++) {
        if (i === 0 || name.charAt(i - 1) in specialChars) {
            formatted += name.charAt(i).toUpperCase();
        } else {
            formatted += name.charAt(i).toLowerCase();
        }
    }
    return formatted;
}

// Create a pop-up window to ensure that the user wants to submit the form.
function confirmSubmission(form) {
    let submit = confirm("Are you sure you want to submit?");
    if (submit) {
        if (form === "mentor") {
            submitForm();
        } else if (form === "add") {
            addCoursesForm();
        }
    }
}

// Add a course to the "My Courses" list if it is not already there
// name (string): the name of the course, as in the database
function addCourse(name) {
    // Check for the course in myCourses
    let repeat = false;
    myCourses.forEach(course => {
        if (name === course) {
            repeat = true;
        }
    });

    // Delete the starter text if the first course is being added
    const starter = document.getElementById("starter");
    if (myCourses.length === 0 && starter !== null) {
        starter.parentNode.removeChild(starter);
    }

    // If the course is not already there, add it to myCourses and display it on the page
    if (!repeat) {
        myCourses.push(name);
        let course = document.createElement("li");
        course.id = name;
        course.className = "course-list-form";
        course.innerHTML = name;
        course.addEventListener("click", () => {
            myCourses = myCourses.filter(course => course !== name);
            const element = document.getElementById(name);
            element.parentNode.removeChild(element);
        });
        document.getElementById("my-courses").append(course);
    }
}