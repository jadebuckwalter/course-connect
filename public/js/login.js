// Create the "sign in with Google" button
function renderButton() {
    gapi.signin2.render("login-google", {
      "scope": "profile email",
      "width": 240,
      "height": 50,
      "longtitle": true,
      "theme": "dark",
      "onsuccess": "login"
    });
}

// Log the user in or deny them access, based on their email address
function login(googleUser) {
    const profile = googleUser.getBasicProfile();

    // Check for CPSD emails
    if (profile.getEmail().substring(profile.getEmail().length - 8) === "@cpsd.us") {
        // User is on the admin login
        if (document.getElementById("auth-label") !== null) {
            // Send a request to verify the authentication code
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    // If the authentication code is in the database, log the user in
                    if (xhttp.responseText.length > 2) {
                        document.getElementById("login-google").parentNode.submit();
                    } else {
                        logOut();
                        document.getElementById("error").innerHTML = "Please enter a valid authentication code.";
                    }
                }
            }
            xhttp.open("POST", "/auth");
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify({code: document.getElementById("auth").value}));
        } else {
            document.getElementById("login-google").parentNode.submit();
        }
    } else {
        logOut();
        document.getElementById("login-prompt").innerHTML = "You must sign in with your CPSD Google Account.";
        document.getElementById("login-prompt").style = "color: red";
    }
}

// Log the user out
function logOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
}