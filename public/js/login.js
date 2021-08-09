function login(googleUser) {
    const profile = googleUser.getBasicProfile();
    if (profile.getEmail().substring(profile.getEmail().length - 8) === "@cpsd.us") {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/login");
        xhttp.send();
    } else {
        document.getElementById("error").innerHTML = "Please log in with your CPSD Gmail account.";
    }
}