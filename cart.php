<?php
session_start();
require 'databaseconn.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopping Cart</title>
    <link rel="stylesheet" href="cart.css">
    <script src="cart.js" defer></script>
</head>
<body>
    <div class="container">
        <h1>Your Cart</h1>
        <div class="cart-items"></div>
        <div class="cart-summary">
            <h2>Total Items: <span id="total-items">0</span></h2>
            <h2>Total Price: <span id="total-price">0</span> KShs</h2>
        </div>
        <button onclick="clearCart()">Clear Cart</button>
        <button onclick="proceedToCheckout()">Proceed to Checkout</button>
    </div>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            loadCart();
        });

        function getCart() {
            return JSON.parse(localStorage.getItem("cart")) || [];
        }

        function loadCart() {
            const cartItemsContainer = document.querySelector(".cart-items");
            const totalItemsElement = document.getElementById("total-items");
            const totalPriceElement = document.getElementById("total-price");

            let cart = getCart();
            cartItemsContainer.innerHTML = "";

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
                totalItemsElement.textContent = "0";
                totalPriceElement.textContent = "0 KShs";
                return;
            }

            let totalItems = 0;
            let totalPrice = 0;

            cart.forEach((item, index) => {
                const cartItemDiv = document.createElement("div");
                cartItemDiv.classList.add("cart-item");
                cartItemDiv.innerHTML = `
                    <p><strong>${item.name}</strong> - ${item.price} KShs x ${item.quantity}</p>
                    <button onclick="increaseQuantity(${index})">+</button>
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <button onclick="removeItem(${index})">Remove</button>
                `;
                cartItemsContainer.appendChild(cartItemDiv);

                totalItems += item.quantity;
                totalPrice += parseFloat(item.price.replace(/[^\d.]/g, "")) * item.quantity;
            });

            totalItemsElement.textContent = totalItems;
            totalPriceElement.textContent = totalPrice.toFixed(2) + " KShs";
        }

        function increaseQuantity(index) {
            let cart = getCart();
            cart[index].quantity += 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        }

        function decreaseQuantity(index) {
            let cart = getCart();
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        }

        function removeItem(index) {
            let cart = getCart();
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        }

        function clearCart() {
            localStorage.removeItem("cart");
            loadCart();
        }

        function proceedToCheckout() {
            const userId = <?php echo json_encode($_SESSION['user_id'] ?? null); ?>;
            const isGuest = <?php echo json_encode($_SESSION['guest'] ?? false); ?>;

            if (!userId || isGuest) {
                alert("You need to sign in to proceed to checkout.");
                window.location.href = "index.php";
                return;
            }

            const cart = getCart();
            localStorage.setItem("checkoutCart", JSON.stringify(cart));

            const totalPrice = cart.reduce((total, item) => total + (parseFloat(item.price.replace(/[^\d.]/g, "")) * item.quantity), 0);
            localStorage.setItem("checkoutTotal", totalPrice.toFixed(2));

            window.location.href = "checkout.html";
        }
    </script>
</body>
</html>