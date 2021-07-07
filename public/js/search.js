// Search functionality

let myCourses = [];

// Sends a request to the backend to search for the value in the search bar
// Returns an array containing the courses in the search results
function searchCourses() {
    let search = document.getElementById("search").value;
    let results = "No results found.";

    if (search === undefined) {
        document.getElementById("result").innerHTML = "Please try again.";
    }

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            results = xhttp.responseText;
        }
    }
    xhttp.open("GET", "http://localhost:3000/search?key=" + search, false);
    xhttp.send();

    return formatCourseList(results);
}

// Convert the string of courses to an array
function formatCourseList(list) {
    let results = [];
    let separator = "\",\"";
    let index = 2;
    while (index < list.lastIndexOf(separator)) {
        results.push(list.substring(index, list.indexOf(separator, index)));
        index = list.indexOf(separator, index) + 3;
    }
    results.push(list.substring(index, list.indexOf("\"]", index)));
    return results;
}

// Display the results of the search query as buttons
function displayResults() {
    clear("result", "results-container");
    let courses = searchCourses();
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

// Clear the contents of a div
// id (string): id of the div
// container (string): id of the container surrounding the div
function clear(id, container) {
    let result = document.getElementById(id);
    result.parentNode.removeChild(result);
    result = document.createElement("div");
    result.id = id;
    document.getElementById(container).appendChild(result);
}

// Add a course to the "My Courses" list, and return false if that course is already in the list
function addCourse(name) {
    let repeat = false;
    myCourses.forEach(course => {
        if (name === course) {
            repeat = true;
        }
    });
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