// Array to store list of courses that the mentor has taken
let myCourses = [];

// Function to submit the form
function submitForm() {
    // User's inputs in the form
    const info = {
        id: document.getElementById("student-id").value,
        first: document.getElementById("first-name").value,
        last: document.getElementById("last-name").value,
        email: document.getElementById("email").value,
        courses: myCourses
    };

    // Check for user input
    if (info.id === "" || info.first === "" || info.last === "" || info.email === "" || info.courses.length === 0) {
        document.getElementById("error").style.display = "block";
    } else {
        // HTTP request to send the search terms to the backend and store the results
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/submit");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(info));

        // Display a "submitted" message
        document.body.innerHTML = "Success! Your information has been submitted.";
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
        course.id = name;
        course.className = "course-list";
        course.innerHTML = name;
        course.addEventListener("click", () => {
            myCourses = myCourses.filter(course => course !== name);
            const element = document.getElementById(name);
            element.parentNode.removeChild(element);
        });
        document.getElementById("my-courses").append(course);
    }
}

// Call the clear function on the "My Courses" list, and reset the array
function clearCourses() {
    clear("my-courses", "courses-container", "div");
    myCourses = [];
}