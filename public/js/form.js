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

        // Display a "submitted" message
        document.body.innerHTML = "";
        const submitted = document.createElement("p");
        submitted.innerHTML = "Success! The form was submitted.";
        document.body.append(submitted);
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
function confirmSubmission() {
    let submit = confirm("Are you sure you want to submit?");
    if (submit) {
        submitForm();
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