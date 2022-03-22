// Query the database with a "SELECT" query
function query() {
    const query = document.getElementById("input").value;
    if (query.substring(0, 6).toUpperCase() !== "SELECT") {
        document.getElementById("error").innerHTML = "Invalid query";
    } else {
        // HTTP request to send the query to the backend
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                display(format(xhttp.responseText));
            }
        }
        xhttp.open("POST", "/query");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({query: query}));
    }
}

// Format and display the results of the query
function format(list) {
    // Array to store the results
    const results = [];

    // Strings of characters that separate the items, and the rows
    const sepItemLeft = "\":";
    const sepItemRight = ",\"";
    const sepRow = "},{";
    const end = "\"}]";

    // Starting index
    let index = 2;

    // Array for each row
    let row = [];

    // Check for valid results
    if (list === "[]") {
        results.push(["Please enter a valid query."]);
    } else {
        // Iterate through the string and add items to the results array
        while (index < list.lastIndexOf(sepRow)) {
            row = [];
            while (list.indexOf(sepItemRight, index) < list.indexOf(sepRow, index)) {
                row.push(list.substring(list.indexOf(sepItemLeft, index) + 3, list.indexOf(sepItemRight, index) - 1));
                index = list.indexOf(sepItemRight, index) + 3;
            }
            row.push(list.substring(list.indexOf(sepItemLeft, index) + 3, list.indexOf(sepRow, index) - 1));
            results.push(row);
            index = list.indexOf(sepRow, index) + 3;
        }
        // Add the last item
        row = [];
        while (index < list.lastIndexOf(sepItemRight)) {
            row.push(list.substring(list.indexOf(sepItemLeft, index) + 3, list.indexOf(sepItemRight, index) - 1));
            index = list.indexOf(sepItemRight, index) + 3;
        }
        row.push(list.substring(list.indexOf(sepItemLeft, index) + 3, list.indexOf(end)));
        results.push(row);
    }
    return results;
}

// Display the list of formatted results
function display(results) {
    // Clear the results from the previous search
    clear("results", "admin-results-container", "table");

    let table = document.getElementById("results");
    for (let i = 0; i < results.length; i++) {
        let row = document.createElement("tr");
        row.id = "row" + i;
        table.append(row);
        for (let j = 0; j < results[i].length; j++) {
            let cell = document.createElement("td");
            cell.id = "cell" + i + j;
            cell.innerHTML = results[i][j];
            row.append(cell);
        }
    }
}