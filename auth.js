document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const logoutBtn = document.getElementById("logout-btn");
    const userDisplay = document.getElementById("user-display");

    // Check if user is logged in
    function checkAuth() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            if (userDisplay) userDisplay.innerText = `Welcome, ${user.name}!`;
            if (logoutBtn) logoutBtn.style.display = "block";
        } else {
            if (logoutBtn) logoutBtn.style.display = "none";
        }
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            const user = JSON.parse(localStorage.getItem("user"));
            if (user && user.email === email && user.password === password) {
                alert("Login successful!");
                window.location.href = "index.html"; // Redirect to home
            } else {
                alert("Invalid email or password.");
            }
        });
    }

    // Handle Signup
    if (signupForm) {
        signupForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = document.getElementById("signup-name").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;

            const newUser = { name, email, password };
            localStorage.setItem("user", JSON.stringify(newUser));
            alert("Signup successful! You can now log in.");
            window.location.href = "login.html"; // Redirect to login
        });
    }

    // Handle Logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("user");
            alert("Logged out successfully!");
            window.location.href = "login.html"; // Redirect to login page
        });
    }

    // Run authentication check
    checkAuth();
});
document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    localStorage.setItem("user", JSON.stringify({ email }));
    window.location.href = "profile.html";
});
