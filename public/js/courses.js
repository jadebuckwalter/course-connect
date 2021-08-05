// Things to initialize when the page is loaded
function initialize(page) {
    document.getElementById("search").addEventListener("keydown", (event) => {
        if (event.code === "Enter") {
            searchCourses(page);
        }
    });
}

// Send a request to the backend to search for the value in the search bar
// Return an array containing the courses in the search results
function searchCourses(page) {
    // User's input in the search box
    const search = document.getElementById("search").value;

    // Check for valid input
    if (search === "") {
        document.getElementById("result").innerHTML = "Please enter a valid course name.";
    } else {
        // HTTP request to send the search terms to the backend and store the results
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                displayResults(formatCourseList(xhttp.responseText), page);
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
        query += abbreviations(search.substring(index, search.indexOf(" ", index))) + "% ";
        index = search.indexOf(" ", index) + 1;
    }
    query += abbreviations(search.substring(search.lastIndexOf(" ") + 1)) + "%";
    return query;
}

// Convert the string of courses given by the backend to an array
// list (string): a string of courses formatted by JSON.stringify
// Return the resulting array
function formatCourseList(list) {
    // Array to store the search results
    const results = [];
    
    // String of characters that separates each course name in the string
    const separator = "\",\"";
    
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
function displayResults(courses, page) {
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
            button.addEventListener("click", () => {
                page === "home" ? searchMentors(button.innerHTML) : addCourse(button.innerHTML);
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

// Check for abbreviations and return the substitution if available
function abbreviations(word) {
    const abbreviations = {
        "apcs": "AP Computer Science",
        "apcsp": "AP Computer Science Principles",
        "apes": "AP Environmental Science",
        "apush": "AP United States History",
        "asl": "American Sign Language",
        "cs": "computer science",
        "e&m": "Electricity and Magnetism",
        "precalc": "Pre-Calculus",
        "rsta": "TC",
        "stats": "Statistics",
        "ta": "Teaching Assistantship",
        "us": "United States",
        "u.s.": "United States"
    };

    if (abbreviations[word] !== undefined) {
        word = abbreviations[word];
    }
    return word;
}