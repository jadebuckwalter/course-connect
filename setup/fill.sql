-- Fill the courseconnect database with the test data

LOAD DATA LOCAL INFILE "/course-connect/setup/test-data/courses.tsv" INTO TABLE courses 
FIELDS TERMINATED BY "\t" LINES TERMINATED BY "\r\n";

LOAD DATA LOCAL INFILE "/course-connect/setup/test-data/mentors.tsv" INTO TABLE mentors 
FIELDS TERMINATED BY "\t" LINES TERMINATED BY "\r\n";

LOAD DATA LOCAL INFILE "/course-connect/setup/test-data/connect.tsv" INTO TABLE connect 
FIELDS TERMINATED BY "\t" LINES TERMINATED BY "\r\n";