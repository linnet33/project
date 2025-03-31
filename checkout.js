document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const form = document.getElementById('checkout-form');
    const modal = document.getElementById('confirmation-modal');
    const orderDetailsContainer = document.getElementById('order-details');
    const orderIdElement = document.getElementById('order-id');

    // Prevent non-alphabetic characters in the name field
    nameInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^A-Za-z ]/g, ""); 
    });

    // Prevent non-numeric characters in the phone field
    phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, ""); 
    });

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        // Validate name field
        if (!/^[A-Za-z ]+$/.test(nameInput.value)) {
            alert("Name should only contain letters!");
            return;
        }

        // Validate phone field
        if (!/^\d+$/.test(phoneInput.value)) {
            alert("Phone number should only contain numbers!");
            return;
        }

        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        const pickupStation = form['pickup-station'].value; // Get selected pickup station
        const name = nameInput.value;
        const phone = phoneInput.value;

        if (paymentMethod === 'cod') {
            // Load cart details
            const cart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
            orderDetailsContainer.innerHTML = ""; // Clear previous details

            if (cart.length === 0) {
                orderDetailsContainer.innerHTML = "<p>No items in the cart.</p>";
                return; // Prevent submission if cart is empty
            } else {
                cart.forEach(item => {
                    const itemDiv = document.createElement("div");
                    itemDiv.innerHTML = `<strong>${item.name}</strong> - ${item.price} KShs x ${item.quantity}`;
                    orderDetailsContainer.appendChild(itemDiv);
                });
            }

            // Generate and display the order ID
            const orderId = generateOrderId();
            orderIdElement.textContent = orderId;

            // Display selected pickup station
            const pickupStationDiv = document.createElement("div");
            pickupStationDiv.innerHTML = `<strong>Pickup Station:</strong> ${pickupStation}`;
            orderDetailsContainer.appendChild(pickupStationDiv);

            // Show the confirmation modal
            modal.style.display = 'block';

            // Send order data to the server
            const orderData = {
                name: name,
                pickup_station: pickupStation,
                phone: phone,
                payment: paymentMethod
            };

            fetch('process_order.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    orderIdElement.textContent = data.tracking_id; // Display the tracking ID
                } else {
                    alert('Error: ' + data.error);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else {
            // Show PayPal button
            document.getElementById('paypal-button-container').style.display = 'block';
        }
    });

    // Close modal when the user clicks on <span> (x) or the close button
    document.getElementById('close-modal').onclick = function () {
        modal.style.display = 'none';
    };

    document.getElementById('close-modal-button').onclick = function () {
        modal.style.display = 'none';
    };

    // Close modal when the user clicks anywhere outside of the modal
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // PayPal Button Integration
    paypal.Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: '10.00' // Replace with the actual amount
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                // Show confirmation modal
                modal.style.display = 'block';
                console.log('Transaction completed by ' + details.payer.name.given_name);
            });
        },
        onError: function (err) {
            console.error(err);
            alert('An error occurred during the transaction. Please try again.');
        }
    }).render('#paypal-button-container'); // Renders the PayPal button into the container

    // Function to generate a unique order ID
    function generateOrderId() {
        const timestamp = Date.now(); // Current timestamp
        const randomNum = Math.floor(Math.random() * 10000); // Random number
        return `ORD-${timestamp}-${randomNum}`; // Format: ORD-<timestamp>-<randomNum>
    }
});