const mysql = require("mysql");
const dotenv = require("dotenv");
const package = require("./package.json");
dotenv.config();

let connection;

function init() {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    connection.connect();
    return connection;
}

// Make sure that the database schema is up to date
function ensureVersion() {
    // Add the current version to the "version" table if it is empty
    const checkVer = "SHOW COLUMNS FROM version LIKE 'ver'";
    connection.query(checkVer, (err, rows) => {
        if (err) throw err;
        if (rows.length === 0) {
            const addVer = "INSERT INTO version VALUES (?)";
            connection.query(addVer, [package.version], (err) => {
                if (err) throw err;
            });
        }
    });
    // Detect older versions of the database
    const query = "SELECT ver FROM version";
    connection.query(query, (err, rows) => {
        if (err) throw err;
        if (rows[0] === "1.0.2") {
            // pmsg column not present
            console.log("Database version 1.0.2 detected. Migrating to version 1.0.3...");
            const addPmsg = "ALTER TABLE mentors ADD pmsg varchar(1)";
            connection.query(addPmsg, (err) => {
                if (err) throw err;
            });
            const setPmsg = "UPDATE mentors SET pmsg = '0'";
            connection.query(setPmsg, (err) => {
                if (err) throw err;
            });
            // Update the database version
            const updateVersion = "UPDATE version SET ver = '1.0.3'";
            connection.query(updateVersion, (err) => {
                if (err) throw err;
            });
            console.log("Migration to database version 1.0.3 complete.");
        }
    });
}

module.exports = {
    init,
    ensureVersion,
};
