document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.querySelector(".cart-icon");
    const cartNotification = document.querySelector(".cart-notification");

    
    function getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    let cart = getCart(); 
    function updateCartCount() {
        cart = getCart(); 
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        
        if (cartIcon) {
            let cartCountElement = cartIcon.querySelector(".cart-count");
            if (!cartCountElement) {
                cartCountElement = document.createElement("span");
                cartCountElement.classList.add("cart-count");
                cartIcon.appendChild(cartCountElement);
            }
            cartCountElement.textContent = `(${cartCount})`;
        }
    }

    
    function addToCart(productName, productPrice) {
        cart = getCart(); 
        const existingItem = cart.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity += 1; 
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart)); 
        updateCartCount();
        showNotification(`${productName} has been successfully added to the cart`);
    }

    
    const addToCartButtons = document.querySelectorAll(".item-box button");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productName = this.parentElement.querySelector("p").innerText;
            const productPrice = this.parentElement.querySelector("h6").innerText; 
            addToCart(productName, productPrice);
        });
    });

   
    function showNotification(message) {
        if (cartNotification) {
            cartNotification.innerText = message;
            cartNotification.style.display = "block";
            setTimeout(() => {
                cartNotification.style.display = "none";
            }, 3000);
        }
    }

    
    updateCartCount();

    
    window.addEventListener("storage", updateCartCount);

    
    loadCart();
    
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

    window.increaseQuantity = function(index) {
        let cart = getCart();
        cart[index].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    };

    window.decreaseQuantity = function(index) {
        let cart = getCart();
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    };

    window.removeItem = function(index) {
        let cart = getCart();
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    };

    window.clearCart = function() {
        localStorage.removeItem("cart");
        loadCart();
    };

    window.proceedToCheckout = function() {
        const cart = getCart();
        localStorage.setItem("checkoutCart", JSON.stringify(cart)); 
        const totalPrice = cart.reduce((total, item) => total + (parseFloat(item.price.replace(/[^\d.]/g, "")) * item.quantity), 0);
        localStorage.setItem("checkoutTotal", totalPrice.toFixed(2)); 
        window.location.href = "checkout.html"; 
    };
});