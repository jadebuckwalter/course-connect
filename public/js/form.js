// Array to store list of courses that the mentor has taken
let myCourses = [];

// Function to submit the form
function submitForm() {
    // User's inputs in the form
    let info = {
        id: document.getElementById("student-id").value,
        first: document.getElementById("first-name").value,
        last: document.getElementById("last-name").value,
        email: document.getElementById("email").value,
        courses: myCourses
    };

    // Check for user input
    if (info.id === "" || info.first === "" || info.last === "" || info.email === "" || info.courses.length === 0) {
        document.getElementById("error").hidden = false;
    } else {
        // HTTP request to send the search terms to the backend and store the results
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/form");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(info));

        // Display a "submitted" message
        document.body.innerHTML = "Success! Your information has been submitted.";
    }
}

// For the form, display the results of the search query as buttons
function displayResultsForm(courses) {
    // Clear the results from the previous search
    clear("result", "results-container");

    // Check for valid results
    if (courses[0] === "[]") {
        document.getElementById("result").innerHTML = "Please enter a valid course name.";
    } else {
        // Iterate through the courses and create a button for each one
        for (let i = 0; i < courses.length; i++) {
            let button = document.createElement("button");
            let br = document.createElement("br");
            button.id = "button" + i;
            button.innerHTML = courses[i];
            button.addEventListener("click", function() {
                addCourse(button.innerHTML);
            });
            document.getElementById("result").append(button, br);
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

    // If the course is not already there, add it to myCourses and display it on the page
    if (!repeat) {
        myCourses.push(name);
        let course = document.createElement("p");
        course.innerHTML = name;
        document.getElementById("my-courses").append(course);
    }
}

// Call the clear function on the "My Courses" list, and reset the array
function clearCourses() {
    clear('my-courses', 'courses-container');
    myCourses = [];
}