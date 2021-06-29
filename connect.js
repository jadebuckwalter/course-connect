// Connect to the MySQL database

let mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vwV6bWuEfZoUyqAg3ff9!UJy",
    database: "courseconnect"
});

connection.connect(function(err) {
    if (err) {
        return console.error("Error: " + err.message);
    }
    console.log("Connected to the MySQL server.");
});

connection.end(function(err) {
    if (err) {
        return console.log("Error: " + err.message);
    }
    console.log("Close the database connection.");
});