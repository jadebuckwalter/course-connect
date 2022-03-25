const mysql = require("mysql");
const dotenv = require("dotenv");
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
    // Create the version table if not already created
    const createTable = "CREATE TABLE IF NOT EXISTS version (ver varchar(8), timestamp varchar(255))";
    connection.query(createTable, (err) => {
        if (err) throw err;
        const addVer = "INSERT INTO version VALUES ('1.0.2', CURRENT_TIMESTAMP)";
        connection.query(addVer, (err) => {
            if (err) throw err;
        });
    });
    // Detect older version of the database without pmsg column
    const query = "SHOW COLUMNS FROM mentors LIKE 'pmsg'";
    connection.query(query, (err, rows) => {
        if (err) throw err;
        if (rows.length === 0) {
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
        }
    });
    // Update the database version
    const currentVersion = "SELECT ver FROM version";
    connection.query(currentVersion, (err, rows) => {
        if (err) throw err;
        if (rows[rows.length - 1] = "1.0.2") {
            const updateVersion = "INSERT INTO version VALUES ('1.0.3', CURRENT_TIMESTAMP)";
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
