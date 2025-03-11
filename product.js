document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productName = params.get("product");

    if (productName) {
        document.getElementById("search").value = productName;
        filterProducts(productName);
    }
});

function filterProducts(searchTerm) {
    const allProducts = document.querySelectorAll(".product");
    allProducts.forEach(product => {
        const name = product.querySelector("h3").innerText.toLowerCase();
        if (!name.includes(searchTerm.toLowerCase())) {
            product.style.display = "none";
        } else {
            product.style.display = "block";
        }
    });
}
