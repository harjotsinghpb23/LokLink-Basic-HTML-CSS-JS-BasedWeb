function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.className = "toast show " + type;

    clearTimeout(showToast.timeoutId);
    showToast.timeoutId = setTimeout(function () {
        toast.className = "toast";
    }, 2200);
}

function setLoggedInState(isLoggedIn) {
    const navButtons = document.getElementById("navButtons");
    const userPill = document.getElementById("userPill");

    localStorage.setItem("loklink_logged_in", String(isLoggedIn));
    sessionStorage.setItem("loklink_logged_in", String(isLoggedIn));

    if (navButtons) {
        navButtons.style.display = isLoggedIn ? "none" : "flex";
    }

    if (userPill) {
        userPill.style.display = isLoggedIn ? "flex" : "none";
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const box = modal ? modal.querySelector(".modal-box") : null;

    if (!modal) return;

    modal.classList.add("closing");
    if (box) box.classList.add("closing-box");

    setTimeout(function () {
        modal.style.display = "none";
        modal.classList.remove("closing");
        if (box) box.classList.remove("closing-box");
    }, 220);
}

function openLogin() {
    const loginModal = document.getElementById("loginModal");
    if (loginModal) {
        loginModal.style.display = "flex";
    }
}

function closeLogin() {
    closeModal("loginModal");
}

function openRegister() {
    const registerModal = document.getElementById("registerModal");
    if (registerModal) {
        registerModal.style.display = "flex";
    }
}

function closeRegister() {
    closeModal("registerModal");
}

function switchToRegister() {
    closeLogin();
    setTimeout(openRegister, 220);
}

function switchToLogin() {
    closeRegister();
    setTimeout(openLogin, 220);
}

window.onclick = function (event) {
    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");

    if (event.target === loginModal) {
        closeLogin();
    }

    if (event.target === registerModal) {
        closeRegister();
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            setLoggedInState(true);
            showToast("Login successful! Welcome back.", "success");
            closeLogin();
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            setLoggedInState(true);
            showToast("Registration successful! Your account is ready.", "success");
            closeRegister();
        });
    }

    const isLoggedIn = localStorage.getItem("loklink_logged_in") === "true" || sessionStorage.getItem("loklink_logged_in") === "true";
    setLoggedInState(isLoggedIn);
});
