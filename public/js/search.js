// Search functionality

// Sends a request to the backend to search for the value in the search bar
// Returns an array containing the courses in the search results
function searchCourses() {
    let search = document.getElementById("search").value;
    let results = "No results found.";

    if (search == null) {
        document.getElementById("result").innerHTML = "Please try again.";
    }

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
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

function displayResults() {
    let courses = searchCourses();
    for (let i = 0; i < courses.length; i++) {
        let button = document.createElement("button");
        let br = document.createElement("br");
        button.id = "button" + i;
        button.innerHTML = courses[i];
        document.getElementById("result").append(button, br);
    }
}