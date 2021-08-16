// Send a request to search for mentors that have taken the courses in the myCourses list
function searchMentors(course) {
    // HTTP request to send the search terms to the backend and store the results
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            displayMentors(formatMentors(xhttp.responseText));
        }
    }

    // Update the text above the mentor table
    document.getElementById("mentor-results").innerHTML = "Mentors who have taken " + course + ":";

    xhttp.open("POST", "/results");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({course: course}));
}

// Convert the string of mentors given by the backend to an array
// list (string): a string of mentors formatted by JSON.stringify
// Return the resulting array
function formatMentors(list) {
    // Arrays to store names and emails
    const mentors = [];
    const names = [];
    const emails = [];
    
    // Index of the first course
    let index = 1;

    // Iterate through the string and add each mentor to the array
    while (index < list.lastIndexOf("{")) {
        names.push(list.substring(list.indexOf("\"first\"", index) + 9, list.indexOf("\"last\"", index) - 2) + " " +
                    list.substring(list.indexOf("\"last\"", index) + 8, list.indexOf("\"email\"", index) - 2));
        emails.push(list.substring(list.indexOf("\"email\"", index) + 9, list.indexOf("{", index + 1) - 3));

        index = list.indexOf("{", index + 1);
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

// Randomize the list of mentors
function randomize(mentors) {
    let name, email, index;
    const length = mentors[0].length;
    for (let i = 0; i < length; i++) {
        index = Math.floor(Math.random() * length);
        name = mentors[0][index];
        email = mentors[1][index];
        mentors[0][index] = mentors[0][i];
        mentors[1][index] = mentors[1][i];
        mentors[0][i] = name;
        mentors[1][i] = email;
    }
    return mentors;
}

// Display the list of mentors in a table
function displayMentors(mentors) {
    // Clear the mentor table
    clear("mentor-table", "table-container", "table");

    // Hide the homepage and show the mentor table
    document.getElementById("home").style.display = "none";
    document.getElementById("mentors").style.display = "block";
    
    // Check to see if there are any results
    if (mentors[0][0] === "[] []") {
        document.getElementById("mentor-table").innerHTML = "No results";
        document.getElementById("mentor-results").style.display = "none";
    } else {
        mentors = randomize(mentors);
        // Iterate through the mentors array and create a row for each mentor
        for (let i = 0; i < mentors[0].length; i++) {
            let row = document.createElement("tr");
            row.id = "row" + i;
            let name = document.createElement("td");
            let email = document.createElement("td");
            let link = document.createElement("a");
            link.href = "mailto:" + mentors[1][i];
            link.innerHTML = mentors[1][i];
            email.append(link);
            name.innerHTML = mentors[0][i];
            row.append(name, email);
            document.getElementById("mentor-table").append(row);
        }
    }
}

// Redirects back to the main page
function backToSearch() {
    // Hide the mentors page and show the home page
    document.getElementById("mentors").style.display = "none";
    document.getElementById("home").style.display = "block";
    
    // Clear the search box and the results
    clear("result", "results-container", "div");
    clear("search", "label", "input");
    
    initialize("home");
}