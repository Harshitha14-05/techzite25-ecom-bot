document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const clearCartButton = document.getElementById("clear-cart");

    // Load cart from localStorage
    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = ""; // Clear previous content

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<tr><td colspan='5'>Your cart is empty.</td></tr>";
            subtotalElement.innerText = "0.00";
            return;
        }

        let subtotal = 0;
        cart.forEach((item, index) => {
            let totalPrice = (item.price * item.quantity).toFixed(2);
            subtotal += parseFloat(totalPrice);

            cartItemsContainer.innerHTML += `
                <tr>
                    <td><img src="${item.image}" alt="${item.name}" class="cart-img"> ${item.name}</td>
                    <td>$${item.price}</td>
                    <td>
                        <button class="qty-btn decrease" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn increase" data-index="${index}">+</button>
                    </td>
                    <td>$${totalPrice}</td>
                    <td><button class="remove-btn" data-index="${index}">Remove</button></td>
                </tr>
            `;
        });

        subtotalElement.innerText = subtotal.toFixed(2);
        addEventListeners();
    }

    // Update Cart Quantity
    function updateQuantity(index, change) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart[index]) {
            cart[index].quantity += change;
            if (cart[index].quantity <= 0) cart.splice(index, 1); // Remove item if quantity is 0
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        }
    }

    // Remove Item from Cart
    function removeItem(index) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }

    // Add Event Listeners for Quantity and Remove Buttons
    function addEventListeners() {
        document.querySelectorAll(".increase").forEach(button => {
            button.addEventListener("click", () => updateQuantity(button.dataset.index, 1));
        });

        document.querySelectorAll(".decrease").forEach(button => {
            button.addEventListener("click", () => updateQuantity(button.dataset.index, -1));
        });

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", () => removeItem(button.dataset.index));
        });
    }

    // Clear Cart
    clearCartButton.addEventListener("click", () => {
        localStorage.removeItem("cart");
        loadCart();
        alert("Cart cleared!");
    });

    // Initialize cart on page load
    loadCart();
});
