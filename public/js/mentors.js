// Send a request to search for mentors that have taken the courses in the myCourses list
function searchMentors(course) {
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

    // Update the text above the mentor table
    document.getElementById("mentor-results").innerHTML = "Mentors who have taken " + course + ":";

    xhttp.open("POST", "/", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({course: course}));
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
    
    // Check to see if there are any results
    if (mentors[0][0] === "[] []") {
        document.getElementById("table-container").innerHTML = "No results";
    } else {
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
}

// Redirects back to the main page
function backToSearch() {
    window.location.reload();
}