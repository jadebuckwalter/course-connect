-- Fill the courseconnect database with the test data

SET GLOBAL local_infile = 'ON';

LOAD DATA LOCAL INFILE "setup/test-data/mentors.tsv" INTO TABLE mentors 
FIELDS TERMINATED BY "\t" LINES TERMINATED BY "\r\n";

LOAD DATA LOCAL INFILE "setup/test-data/connect.tsv" INTO TABLE connect 
FIELDS TERMINATED BY "\t" LINES TERMINATED BY "\r\n";