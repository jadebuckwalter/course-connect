let express = require("express");
let app = express();
let mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vwV6bWuEfZoUyqAg3ff9!UJy",
    database: "courseconnect"
});
connection.connect();

app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.sendFile("home.html", {"root": __dirname + "/public"});
});

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

app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});