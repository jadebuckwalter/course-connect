// Search functionality

function searchCourses() {
    let search = document.getElementById("search").value;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("result").innerHTML = xhttp.responseText;
        }
    }
    xhttp.open("GET", "http://localhost:3000/search?key=" + search, false);
    xhttp.send();
}