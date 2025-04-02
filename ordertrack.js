document.getElementById('trackingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const orderId = document.getElementById('orderId').value;
    const orderStatusDiv = document.getElementById('orderStatus');
    const cancelOrderButton = document.getElementById('cancelOrderButton');
    const cancellationStatusDiv = document.getElementById('cancellationStatus');

    fetch(`track_order.php?tracking_id=${orderId}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                orderStatusDiv.innerHTML = data.error;
                cancelOrderButton.style.display = 'none';
            } else {
                orderStatusDiv.innerHTML = `
                    <strong>Order ID:</strong> ${data.id}<br>
                    <strong>Name:</strong> ${data.name}<br>
                    <strong>Address:</strong> ${data.address}<br>
                    <strong>Order Status:</strong> ${data.order_status}<br>
                    <strong>Order Date:</strong> ${data.order_date}<br>
                    <strong>Delivery Date:</strong> ${data.delivery_date}
                `;
                cancelOrderButton.style.display = 'block';
            }
            orderStatusDiv.style.display = 'block';
        })
        .catch(error => {
            orderStatusDiv.innerHTML = 'An error occurred while tracking your order.';
            orderStatusDiv.style.display = 'block';
        });

    cancelOrderButton.onclick = function() {
        fetch(`cancel_order.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tracking_id: orderId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                cancellationStatusDiv.innerHTML = 'Your order has been successfully canceled.';
            } else {
                cancellationStatusDiv.innerHTML = 'Failed to cancel the order: ' + data.error;
            }
            cancellationStatusDiv.style.display = 'block';
        })
        .catch(error => {
            cancellationStatusDiv.innerHTML = 'An error occurred while canceling your order.';
            cancellationStatusDiv.style.display = 'block';
        });
    };
});