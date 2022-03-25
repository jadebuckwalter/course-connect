// Send a request to the backend to search for the value in the search bar
// page (string): either "home" or "form"
function searchCourses(page) {
    // Make user's input in the search box lowercase
    const search = document.getElementById("search").value.toLowerCase();

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
        if (search !== checkForSubject(search)) {
            xhttp.open("POST", "/search-subject");
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify({key: checkForSubject(search), original: formatQuery(search)}));
        } else {
            xhttp.open("POST", "/search");
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify({key: formatQuery(search)}));
        }
    }
}

// Format part of the search query based on the search terms
// search (string): the search term
// Return two SQL queries of the search term, one with abbreviations and one without
function formatQuery(search) {
    // Check for and remove a space at the end of a search term
    search = search.substring(search.length - 1) === " " ? search.substring(0, search.lastIndexOf(" ")) : search;

    let queries = ["% ", "% "];
    let index = 0;
    while (index < search.lastIndexOf(" ")) {
        queries[0] += abbreviations(search.substring(index, search.indexOf(" ", index))) + "% ";
        queries[1] += search.substring(index, search.indexOf(" ", index)) + "% ";
        index = search.indexOf(" ", index) + 1;
    }
    queries[0] += abbreviations(search.substring(search.lastIndexOf(" ") + 1)) + "%";
    queries[1] += search.substring(search.lastIndexOf(" ") + 1) + "%";
    return queries;
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
// courses (array): array of courses in the search results
// page (string): either "home" or "form"
function displayResults(courses, page) {
    // Clear the results from the previous search
    clear("result", "results-container", "table");

    // Check for valid results
    if (courses[0] === "[]") {
        document.getElementById("result").innerHTML = "Please enter a valid course name.";
    } else {
        // Iterate through the courses and create a button for each one
        for (let i = 0; i < courses.length; i++) {
            let name = courses[i];
            let row = document.createElement("tr");
            row.id = "row" + i;
            let course = document.createElement("td");
            course.id = "course" + i;
            course.className = "course-list";
            course.innerHTML = name;
            course.addEventListener("click", () => {
                page === "home" ? searchMentors(name) : addCourse(name);
            });
            row.append(course);
            document.getElementById("result").append(row);
        }
    }
}

// Check for abbreviations and return the substitution if available
// word (string): a word in the search terms
// Return the full version if the word was in the abbreviations list; otherwise return the word
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

// Check for subject searches
// search (string): the search term
// Return the abbreviation for the subject that will be inserted into the query
function checkForSubject(search) {
    const subjects = {
        "art": "A",
        "business": "B",
        "dance": "D",
        "ela": "E",
        "english": "E",
        "history": "H",
        "music": "I",
        "language": "L",
        "math": "M",
        "pe": "PE",
        "gym": "PE",
        "health": "PE",
        "wellness": "PE",
        "science": "S",
        "enhanced senior year": "Y"
    }

    if (subjects[search] !== undefined) {
        search = subjects[search] + "%";
    }
    return search;
}

// Hide and show the different resources on the resources page
// id (string): the id of each resource element
function toggleDisplay(id) {
    document.getElementById(id).style.display === "block" ? 
    document.getElementById(id).style.display = "none" : document.getElementById(id).style.display = "block";
}
