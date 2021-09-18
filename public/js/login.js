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

function login(googleUser) {
    const profile = googleUser.getBasicProfile();
    if (profile.getEmail().substring(profile.getEmail().length - 8) === "@cpsd.us") {
        if (document.getElementById("auth-label") !== null) {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
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
        document.getElementById("error").innerHTML = "You must sign in with your CPSD Google Account.";
    }
}

function logOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
}