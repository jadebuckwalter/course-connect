const express = require("express");
const app = express();
const mysql = require("mysql");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/public"));

// Connect to the MySQL database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vwV6bWuEfZoUyqAg3ff9!UJy",
    database: "courseconnect"
});
connection.connect();

// Direct to homepage
app.get("/", (req, res) => {
    res.sendFile("home.html", {"root": __dirname + "/public"});
});

// Direct to the mentor form
app.get("/form", (req, res) => {
    res.sendFile("form.html", {"root": __dirname + "/public"});
});

// Receive info from the mentor form and enter it into the database
app.post("/form", (req, res) => {
    // Delete previous instances of this id in the database
    let deleteMentor = "DELETE FROM mentors WHERE id = ?";
    connection.query(deleteMentor, req.body.id, (err) => {
        if (err) throw err;
    });
    let deleteCourses = "DELETE FROM connect WHERE studentID = ?";
    connection.query(deleteCourses, req.body.id, (err) => {
        if (err) throw err;
    });
    // Insert the latest mentor info
    let insert = "INSERT INTO mentors (id, first, last, email) VALUES (?, ?, ?, ?)";
    connection.query(insert, [req.body.id, req.body.first, req.body.last, req.body.email], (err) => {
        if (err) throw err;
    });
    // Insert all of the mentor's courses into the "connect" table
    let query = "INSERT INTO connect (studentID, course) VALUES (?, ?)";
    req.body.courses.forEach(course => {
        connection.query(query, [req.body.id, course], (err) => {
            if (err) throw err;
        })
    });
    res.end();
});

// Receive search results, query the database for them, and pass back a JSON with the results
app.post("/search", (req, res) => {
    let sql = "SELECT * FROM courses WHERE name LIKE ? OR name LIKE ?";
    connection.query(sql, [req.body.key, req.body.key.substring(2)], (err, rows) => {
        if (err) throw err;
        let courses = [];
        rows.forEach(row => {
            courses.push(row.name);
        });
        res.end(JSON.stringify(courses));
    });
});

// Receive a list of classes, query the database for mentors who have taken those classes,
// and pass back a JSON with the mentor info
app.post("/results", (req, res) => {
    let query = "SELECT first, last, email FROM mentors WHERE id IN (SELECT studentID FROM connect WHERE course = (?))";
    connection.query(query, req.body.course, (err, rows) => {
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
app.listen(port, () => {
    console.log(`CRLSCourseConnect listening at http://localhost:${port}`);
});