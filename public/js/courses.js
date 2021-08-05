// Things to initialize when the page is loaded
function initialize(page) {
    document.getElementById("search").addEventListener("keydown", function(event) {
        if (event.code === "Enter") {
            searchCourses(page);
        }
    });
}

// Send a request to the backend to search for the value in the search bar
// Return an array containing the courses in the search results
function searchCourses(page) {
    // User's input in the search box
    let search = document.getElementById("search").value;

    // Check for valid input
    if (search === "") {
        document.getElementById("result").innerHTML = "Please enter a valid course name.";
    } else {
        // HTTP request to send the search terms to the backend and store the results
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                let results = formatCourseList(xhttp.responseText);
                page === "home" ? displayResults(results) : displayResultsForm(results);
            }
        }
        xhttp.open("POST", "/search");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({key: formatQuery(search)}));
    }
}

// Format part of the search query based on the search terms
function formatQuery(search) {
    let query = "% ";
    let index = 0;
    while (index < search.lastIndexOf(" ")) {
        query += search.substring(index, search.indexOf(" ", index)) + "% ";
        index = search.indexOf(" ", index) + 1;
    }
    query += search.substring(search.lastIndexOf(" ") + 1) + "%";
    return query;
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

// Display the results of the search query as buttons that when clicked on, search mentors
function displayResults(courses) {
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
                searchMentors(button.innerHTML);
            });
            document.getElementById("result").append(button, br);
        }
    }
}

// Clear the contents of a div
// id (string): id of the div
// container (string): id of the container surrounding the div
function clear(id, container) {
    // Remove the div
    let div = document.getElementById(id);
    div.parentNode.removeChild(div);
    
    // Create a new div with the same id and append it to the container div
    div = document.createElement("div");
    div.id = id;
    document.getElementById(container).appendChild(div);
}