// Arrays to store courses and mentors
let myCourses = [];

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

// Send a request to search for mentors that have taken the courses in the myCourses list
function searchMentors() {
    // String to store the list of mentors
    let results = "";

    // HTTP request to send the search terms to the backend and store the results
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            results = xhttp.responseText;
            displayMentors(formatMentors(results));
        }
    }

    let string = "";
    myCourses.forEach(course => {
        string += course + ", ";
    });
    string = string.substring(0, string.length - 2);

    xhttp.open("POST", "/", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({list: string}));
}

// Convert the string of mentors given by the backend to an array
// list (string): a string of mentors formatted by JSON.stringify
// Return the resulting array
function formatMentors(list) {
    // Arrays to store names and emails
    let mentors = [];
    let names = [];
    let emails = [];

    // String of characters that separates each mentor in the string
    let separator = "{";
    
    // Index of the first course
    let index = 1;

    // Iterate through the string and add each mentor to the array
    while (index < list.lastIndexOf(separator)) {
        names.push(list.substring(list.indexOf("\"first\"", index) + 9, list.indexOf("\"last\"", index) - 2) + " " +
                    list.substring(list.indexOf("\"last\"", index) + 8, list.indexOf("\"email\"", index) - 2));
        emails.push(list.substring(list.indexOf("\"email\"", index) + 9, list.indexOf(separator, index + 1) - 3));

        index = list.indexOf(separator, index + 1);
    }

    // Add the last mentor
    names.push(list.substring(list.indexOf("\"first\"", index) + 9, list.indexOf("\"last\"", index) - 2) + " " + 
                list.substring(list.indexOf("\"last\"", index) + 8, list.indexOf("\"email\"", index) - 2));
    emails.push(list.substring(list.indexOf("\"email\"", index) + 9, list.indexOf("}", index + 1) - 1));

    // Add the names and emails to the results array
    mentors.push(names);
    mentors.push(emails);

    return mentors;
}

// Display the list of mentors in a table
function displayMentors(mentors) {
    // Clear the course search page
    clear("home", "container");

    // Show the mentor table
    document.getElementById("mentors").hidden = false;
    
    // Iterate through the mentors array and create a row for each mentor
    for (let i = 0; i < mentors[0].length; i++) {
        let row = document.createElement("tr");
        row.id = "row" + i;
        let name = document.createElement("td");
        let email = document.createElement("td");
        name.innerHTML = mentors[0][i];
        email.innerHTML = mentors[1][i];
        row.append(name, email);
        document.getElementById("mentor-table").append(row);
    }
}