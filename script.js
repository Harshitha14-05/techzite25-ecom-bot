document.addEventListener("DOMContentLoaded", () => {
    // Navbar Toggle for Mobile View
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Add to Cart Functionality
    const cartButtons = document.querySelectorAll(".add-to-cart");

    cartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productCard = event.target.closest(".product");
            const productName = productCard.querySelector("h3").innerText;
            const productPrice = productCard.querySelector("p").innerText.replace("$", "");
            const productImage = productCard.querySelector("img").src;

            addToCart(productName, productPrice, productImage);
        });
    });

    // Function to Add Items to Cart (Stored in LocalStorage)
    function addToCart(name, price, image) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existingProduct = cart.find(item => item.name === name);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Item added to cart!");
    }
});
document.querySelectorAll(".product img").forEach(img => {
    img.addEventListener("click", (event) => {
        const productName = event.target.dataset.product;
        window.location.href = `products.html?product=${encodeURIComponent(productName)}`;
    });
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
