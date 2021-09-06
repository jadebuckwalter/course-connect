-- Create the courseconnect database, and add the three tables

CREATE DATABASE courseconnect;
USE courseconnect;

CREATE TABLE courses (
    id varchar(255),
    name varchar(255)
);

CREATE TABLE mentors (
    id varchar(255),
    first varchar(255),
    last varchar(255),
    email varchar(255)
);

CREATE TABLE connect (
    studentID varchar(255),
    course varchar(255)
);