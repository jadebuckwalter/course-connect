// Search functionality for courses

// Send a request to the backend to search for the value in the search bar
// Return an array containing the courses in the search results
function searchCourses() {
    // User's input in the search box
    let search = document.getElementById("search").value;
    
    // String of results based on the user's search
    let results = "";

    // HTTP request to send the search terms to the backend and store the results
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            results = xhttp.responseText;
        }
    }
    xhttp.open("GET", "/search?key=" + search, false);
    xhttp.send();

    return formatCourseList(results);
}

// Convert the string of courses given by the backend to an array
// list (string): a string of courses formatted by JSON.stringify
// Return the resulting array
function formatCourseList(list) {
    // Array to store the search results
    let results = [];
    
    // String of characters that separates each course name in the string
    let separator = "\",\"";
    
    // Index of the first course
    let index = 2;

    // Iterate through the string and add each course name to the array
    while (index < list.lastIndexOf(separator)) {
        results.push(list.substring(index, list.indexOf(separator, index)));
        index = list.indexOf(separator, index) + 3;
    }
    results.push(list.substring(index, list.indexOf("\"]", index)));
    
    return results;
}

// Display the results of the search query as buttons
function displayResults() {
    // Clear the results from the previous search
    clear("result", "results-container");
    
    // Get the array of courses based on the current search terms
    let courses = searchCourses();
    
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