// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update the cart count in the navbar
const updateCartCount = () => {
    document.getElementById("cart-count").innerText = cart.length;
};

// Function to add an item to the cart
const addToCart = (id) => {
    const products = [
        { id: 0, image: "images/dog food/dog7.png", title: "Reflex Hunting & Active Adult Dog Food-Beef & Rice 15Kg", price: 8820 },
        { id: 1, image: "images/dog food/Migliorcane.jpg", title: "Migliorcane Adult Dog Food chunks with Game 405g", price: 257 },
        { id: 2, image: "images/dog food/dog3.jpg", title: "Migliorcane Adult Dog Food chunks with Chicken and Turkey 405g", price: 269 },
        { id: 3, image: "images/dog food/king dog.png", title: "King Plus Adult Dog Food-Beef 15kg", price: 5665 }
    ];

    let product = products.find((item) => item.id === id);

    if (product) {
        // Check if item is already in the cart
        let existingItem = cart.find((item) => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        // Save updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(`${product.title} added to cart!`);
    }
};

// Function to remove an item from the cart
const removeFromCart = (index) => {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
};

// Function to update the quantity of a product
const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = newQuantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    }
};

// Function to calculate and display the total price
const calculateTotal = () => {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("total-price").innerText = `Total: ${total} KShs`;
};

// Function to display the cart items
const updateCartDisplay = () => {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("total-price").innerText = "";
        return;
    }

    cart.forEach((item, index) => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p class="price">${item.price} KShs</p>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    calculateTotal();
};

// Function to clear the cart
const clearCart = () => {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
};

// Display cart items and update cart count on page load
document.addEventListener("DOMContentLoaded", () => {
    updateCartDisplay();
    updateCartCount();
});
