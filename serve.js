const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/public"));

// Connect to the MySQL database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
connection.connect();

// Direct to login first (will automatically redirect to home if user is logged in)
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/html/login.html");
});

// Redirect to the home page if the user has logged in with correct credentials
app.post("/", (req, res) => {
    res.sendFile(__dirname + "/public/html/home.html");
});

// Direct to the login page for the mentor form
app.get("/form", (req, res) => {
    res.sendFile(__dirname + "/public/html/form-login.html");
});

// Redirect to the mentor form once the user has logged in
app.post("/form", (req, res) => {
    res.sendFile(__dirname + "/public/html/form.html");
});

// Check the user's authentication code
app.post("/auth", (req, res) => {
    const query = "SELECT * FROM codes WHERE code = ?";
    connection.query(query, req.body.code, (err, rows) => {
        if (err) throw err;
        rows.forEach(row => {
            const del = "DELETE FROM codes WHERE code = ?";
            connection.query(del, req.body.code, (err) => {
                if (err) throw err;
            });
        });
        res.end(JSON.stringify(rows));
    });
});

// Receive search results, query the database for them, and pass back a JSON with the results
app.post("/search", (req, res) => {
    const query = "SELECT * FROM courses WHERE name LIKE ? OR name LIKE ?";
    connection.query(query, [req.body.key, req.body.key.substring(2)], (err, rows) => {
        if (err) throw err;
        const courses = [];
        rows.forEach(row => {
            courses.push(row.name);
        });
        res.end(JSON.stringify(courses));
    });
});

// Receive a list of classes, query the database for mentors who have taken those classes,
// and pass back a JSON with the mentor info
app.post("/results", (req, res) => {
    const query = "SELECT first, last, email FROM mentors WHERE id IN (SELECT studentID FROM connect WHERE course = (?))";
    connection.query(query, req.body.course, (err, rows) => {
        if (err) throw err;
        const mentors = [];
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

// Receive info from the mentor form and enter it into the database
app.post("/submit", (req, res) => {
    // Delete previous instances of this id in the database
    const deleteMentor = "DELETE FROM mentors WHERE id = ?";
    connection.query(deleteMentor, req.body.id, (err) => {
        if (err) throw err;
    });
    const deleteCourses = "DELETE FROM connect WHERE studentID = ?";
    connection.query(deleteCourses, req.body.id, (err) => {
        if (err) throw err;
    });
    // Insert the latest mentor info
    const insert = "INSERT INTO mentors (id, first, last, email) VALUES (?, ?, ?, ?)";
    connection.query(insert, [req.body.id, req.body.first, req.body.last, req.body.email], (err) => {
        if (err) throw err;
    });
    // Insert all of the mentor's courses into the "connect" table
    const query = "INSERT INTO connect (studentID, course) VALUES (?, ?)";
    req.body.courses.forEach(course => {
        connection.query(query, [req.body.id, course], (err) => {
            if (err) throw err;
        })
    });
    res.redirect("/");
});

// Run the app on the server
app.listen(port, () => {
    console.log(`CRLS Course Connect listening at http://localhost:${port}`);
});