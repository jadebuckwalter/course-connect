// Functions related to the storage, addition, and deletion of courses to the myCourses array, 
// and using the myCourses array to search for mentors

// An array to store the user's list of courses that they will search on
let myCourses = [];

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

function myCoursesToString() {
    let result = "(";
    myCourses.forEach(course => {
        result += "\"" + course + "\", ";
    });
    result = result.substring(0, result.length - 2) + ")";
    console.log(result);
    return result;
}

// Send a request to search for mentors that have taken the courses in the myCourses list
function searchMentors() {
    // String to store the list of mentors
    let mentors = "";

    // HTTP request to send the search terms to the backend and store the results
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            mentors = xhttp.responseText;
            document.body.innerHTML = mentors;
        }
    }
    xhttp.open("POST", "/", true);
    xhttp.send(myCourses);
}