const AUTH_KEY = "loklink_logged_in";

function getAuthState() {
    return localStorage.getItem(AUTH_KEY) === "true" || sessionStorage.getItem(AUTH_KEY) === "true";
}

function applyAuthState() {
    const navButtons = document.getElementById("navButtons");
    const userPill = document.getElementById("userPill");
    const isLoggedIn = getAuthState();

    if (navButtons) {
        navButtons.style.display = isLoggedIn ? "none" : "flex";
    }

    if (userPill) {
        userPill.style.display = isLoggedIn ? "flex" : "none";
    }
}

function setLoggedInState(isLoggedIn) {
    localStorage.setItem(AUTH_KEY, String(isLoggedIn));
    sessionStorage.setItem(AUTH_KEY, String(isLoggedIn));
    applyAuthState();
}

document.addEventListener("DOMContentLoaded", function () {
    applyAuthState();

    window.addEventListener("storage", function (event) {
        if (event.key === AUTH_KEY) {
            applyAuthState();
        }
    });
});
