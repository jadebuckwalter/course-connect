function login(googleUser) {
    const profile = googleUser.getBasicProfile();
    if (profile.getEmail().substring(profile.getEmail().length - 8) === "@cpsd.us") {
        document.getElementById("login").parentNode.submit();
    } else {
        logOut();
        document.getElementById("error").innerHTML = "Please log in with your CPSD Gmail account.";
    }
}

function logOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
}