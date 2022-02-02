-- Create the courseconnect database, and add the four tables

CREATE DATABASE IF NOT EXISTS courseconnect;
USE courseconnect;

CREATE TABLE IF NOT EXISTS courses (
    id varchar(255),
    name varchar(255)
);

CREATE TABLE IF NOT EXISTS mentors (
    id varchar(255),
    first varchar(255),
    last varchar(255),
    email varchar(255),
    pmsg varchar(1)
);

CREATE TABLE IF NOT EXISTS connect (
    studentID varchar(255),
    course varchar(255)
);

CREATE TABLE IF NOT EXISTS codes (
    code varchar(255)
);

SET GLOBAL local_infile = 'ON';

DELETE FROM courses;
LOAD DATA LOCAL INFILE "setup/test-data/courses.tsv" INTO TABLE courses 
FIELDS TERMINATED BY "\t" LINES TERMINATED BY "\r\n";

DELETE FROM codes;
LOAD DATA LOCAL INFILE "setup/test-data/codes.tsv" INTO TABLE codes
FIELDS TERMINATED BY "\t" LINES TERMINATED BY "\n";
