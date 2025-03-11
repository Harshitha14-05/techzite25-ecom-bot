document.addEventListener("DOMContentLoaded", () => {
    const profileForm = document.getElementById("profile-form");
    const logoutBtn = document.getElementById("logout-btn");

    // Load user data from localStorage
    function loadProfile() {
        let user = JSON.parse(localStorage.getItem("user")) || {
            name: "John Doe",
            email: "johndoe@example.com",
            phone: "123-456-7890",
            address: "123 Main Street, City, Country"
        };

        document.getElementById("name").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("phone").value = user.phone;
        document.getElementById("address").value = user.address;
    }

    // Save profile changes
    profileForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let user = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value
        };

        localStorage.setItem("user", JSON.stringify(user));
        alert("Profile updated successfully!");
    });
    document.addEventListener("DOMContentLoaded", () => {
        const logoutBtn = document.getElementById("logout-btn");
    
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("user");
                alert("Logged out successfully!");
                window.location.href = "login.html"; // Redirect to login page
            });
        }
    });
    
   

    // Initialize profile on page load
    loadProfile();
});
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        document.getElementById("user-email").innerText = user.email;
    }
});
