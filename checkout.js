document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const form = document.getElementById('checkout-form');
    const modal = document.getElementById('confirmation-modal');
    const orderDetailsContainer = document.getElementById('order-details');
    const orderIdElement = document.getElementById('order-id');

    nameInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^A-Za-z ]/g, "");
    });

    phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!/^[A-Za-z ]+$/.test(nameInput.value)) {
            alert("Name should only contain letters!");
            return;
        }

        if (!/^\d+$/.test(phoneInput.value)) {
            alert("Phone number should only contain numbers!");
            return;
        }

        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        const pickupStation = form['pickup-station'].value;
        const name = nameInput.value;
        const phone = phoneInput.value;

        if (paymentMethod === 'cod') {
            const cart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
            orderDetailsContainer.innerHTML = "";

            if (cart.length === 0) {
                orderDetailsContainer.innerHTML = "<p>No items in the cart.</p>";
                return;
            } else {
                cart.forEach(item => {
                    const itemDiv = document.createElement("div");
                    itemDiv.innerHTML = `<strong>${item.name}</strong> - ${item.price} KShs x ${item.quantity}`;
                    orderDetailsContainer.appendChild(itemDiv);
                });
            }

            const orderId = generateOrderId();
            orderIdElement.textContent = orderId;

            const pickupStationDiv = document.createElement("div");
            pickupStationDiv.innerHTML = `<strong>Pickup Station:</strong> ${pickupStation}`;
            orderDetailsContainer.appendChild(pickupStationDiv);

            modal.style.display = 'block';

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
                    orderIdElement.textContent = data.tracking_id;
                } else {
                    alert('Error: ' + data.error);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else {
            document.getElementById('paypal-button-container').style.display = 'block';
        }
    });

    document.getElementById('close-modal').onclick = function () {
        modal.style.display = 'none';
    };

    document.getElementById('close-modal-button').onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    paypal.Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: '10.00'
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                modal.style.display = 'block';
                console.log('Transaction completed by ' + details.payer.name.given_name);
            });
        },
        onError: function (err) {
            console.error(err);
            alert('An error occurred during the transaction. Please try again.');
        }
    }).render('#paypal-button-container');

    function generateOrderId() {
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 10000);
        return `ORD-${timestamp}-${randomNum}`;
    }
});