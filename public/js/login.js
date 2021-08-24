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
        document.getElementById("login-google").parentNode.submit();
    } else {
        logOut();
        document.getElementById("error").innerHTML = "You must sign in with your CPSD Google Account.";
    }
}

function logOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
}