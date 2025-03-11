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

    // Handle Signup
    if (signupForm) {
        signupForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = document.getElementById("signup-name").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if user already exists
            if (users.find(u => u.email === email)) {
                alert("User already exists! Please log in.");
                return;
            }

            const newUser = { name, email, password };
            users.push(newUser);

            localStorage.setItem("users", JSON.stringify(users));

            alert("Signup successful! You can now log in.");
            window.location.href = "login.html"; // Redirect to login
        });
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];

            let user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem("user", JSON.stringify(user)); // Save session
                alert("Login successful!");
                window.location.href = "profile.html"; // Redirect to profile page
            } else {
                alert("Invalid email or password.");
            }
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
