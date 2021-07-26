let express = require("express");
let app = express();
let mysql = require("mysql");

app.use(express.json());
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/public"));

// Connect to the MySQL database
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vwV6bWuEfZoUyqAg3ff9!UJy",
    database: "courseconnect"
});
connection.connect();

// Direct to homepage
app.get("/", function(req, res) {
    res.sendFile("home.html", {"root": __dirname + "/public"});
});

// Direct to the mentor form
app.get("/form", function(req, res) {
    res.sendFile("form.html", {"root": __dirname + "/public"});
});

// Receive info from the mentor form and enter it into the database
app.post("/form", function(req, res) {
    // Delete previous instances of this id in the database
    let deleteMentor = "DELETE FROM mentors WHERE id = ?";
    connection.query(deleteMentor, req.body.id, function(err) {
        if (err) throw err;
    });
    let deleteCourses = "DELETE FROM connect WHERE studentID = ?";
    connection.query(deleteCourses, req.body.id, function(err) {
        if (err) throw err;
    });
    // Insert the latest mentor info
    let insert = "INSERT INTO mentors (id, first, last, email) VALUES (?, ?, ?, ?)";
    connection.query(insert, [req.body.id, req.body.first, req.body.last, req.body.email], function(err) {
        if (err) throw err;
    });
    // Insert all of the mentor's courses into the "connect" table
    let query = "INSERT INTO connect (studentID, course) VALUES (?, ?)";
    req.body.courses.forEach(course => {
        connection.query(query, [req.body.id, course], function(err) {
            if (err) throw err;
        })
    });
    res.end();
});

// Receive search results, query the database for them, and pass back a JSON with the results
app.get("/search", function(req, res) {
    let sql = "SELECT * FROM courses WHERE name LIKE ?";
    connection.query(sql, ["%" + req.query.key + "%"], function(err, rows) {
        if (err) throw err;
        let data = [];
        for (let i = 0; i < rows.length; i++) {
            data.push(rows[i].name);
        }
        res.end(JSON.stringify(data));
    });
});

// Receive a list of classes, query the database for mentors who have taken those classes,
// and pass back a JSON with the mentor info
app.post("/", function(req, res) {
    let query = "SELECT first, last, email FROM mentors WHERE id IN (SELECT studentID FROM connect WHERE course = (?))";
    connection.query(query, req.body.course, function(err, rows) {
        if (err) throw err;
        let mentors = [];
        rows.forEach(r => {
            mentors.push({
                "first": r.first,
                "last": r.last,
                "email": r.email
            });
        });
        res.end(JSON.stringify(mentors));
    });
});

// Run the app on the server
app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});