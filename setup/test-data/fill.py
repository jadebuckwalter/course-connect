# Write the necessary queries to fill the database with sample data in out.txt

import csv

out = open(r"setup/test-data/out.txt", "w")

# Add course queries
with open(r"setup/test-data/courses.tsv") as file:
    courses = csv.reader(file, delimiter="\t")
    for entry in courses:
        query = f"INSERT INTO courses (id, name) VALUES ('{entry[0]}', '{entry[1]}');\n"
        out.write(query)

# Add sample mentor queries
with open(r"setup/test-data/mentors.tsv") as file:
    mentors = csv.reader(file, delimiter="\t")
    for entry in mentors:
        query = f"INSERT INTO mentors (id, first, last, email, pmsg) VALUES ('{entry[0]}', '{entry[1]}', '{entry[2]}', '{entry[3]}', '{entry[4]}');\n"
        out.write(query)

# Add connection queries
with open(r"setup/test-data/connect.tsv") as file:
    connect = csv.reader(file, delimiter="\t")
    for entry in connect:
        query = f"INSERT INTO connect (studentID, course) VALUES ('{entry[0]}', '{entry[1]}');\n"
        out.write(query)

# Add sample codes
with open(r"setup/test-data/sample-codes.tsv") as file: # Change to codes.tsv if available
    codes = csv.reader(file, delimiter="\t")
    for entry in codes:
        query = f"INSERT INTO codes (code) VALUES ('{entry[0]}');\n"
        out.write(query)

out.close()