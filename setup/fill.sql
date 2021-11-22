-- Fill the courseconnect database with the test data

USE courseconnect;

SET GLOBAL local_infile = 'ON';

DELETE FROM mentors;
LOAD DATA LOCAL INFILE "setup/test-data/mentors.tsv" INTO TABLE mentors 
FIELDS TERMINATED BY "\t" LINES TERMINATED BY "\r\n";

DELETE FROM connect;
LOAD DATA LOCAL INFILE "setup/test-data/connect.tsv" INTO TABLE connect 
FIELDS TERMINATED BY "\t" LINES TERMINATED BY "\r\n";
