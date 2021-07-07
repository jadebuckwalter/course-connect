// Functions related to the storage, addition, and deletion of courses to the myCourses array

// An array to store the user's list of courses that they will search on
let myCourses = [];

// Add a course to the "My Courses" list if it is not already there
// name (string): the name of the course, as in the database
function addCourse(name) {
    // Check for the course in myCourses
    let repeat = false;
    myCourses.forEach(course => {
        if (name === course) {
            repeat = true;
        }
    });

    // If the course is not already there, add it to myCourses and display it on the page
    if (!repeat) {
        myCourses.push(name);
        let course = document.createElement("p");
        course.innerHTML = name;
        document.getElementById("my-courses").append(course);
    }
}

// Call the clear function on the "My Courses" list, and reset the array
function clearCourses() {
    clear('my-courses', 'courses-container');
    myCourses = [];
}