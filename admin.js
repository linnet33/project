document.addEventListener('DOMContentLoaded', function() {
    const orderStatusDiv = document.getElementById('adminOrderStatus');
    const statusUpdateDiv = document.getElementById('adminStatusUpdate');

    // Fetch all orders when the page loads
    fetch('fetch_orders.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                orderStatusDiv.innerHTML = data.error;
            } else {
                orderStatusDiv.innerHTML = data.map(order => `
                    <div class="order">
                        <strong>Order ID:</strong> ${order.id}<br>
                        <strong>Name:</strong> ${order.name}<br>
                        <strong>Address:</strong> ${order.address}<br>
                        <strong>Phone:</strong> ${order.phone}<br>
                        <strong>Payment Method:</strong> ${order.payment_method}<br>
                        <strong>Order Status:</strong> ${order.order_status}<br>
                        <strong>Order Date:</strong> ${order.order_date}<br>
                        <strong>Delivery Date:</strong> ${order.delivery_date}<br>
                        <select class="orderStatus" data-id="${order.tracking_id}">
                            <option value="Pending" ${order.order_status === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option value="Shipped" ${order.order_status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                            <option value="Delivered" ${order.order_status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                            <option value="Cancelled" ${order.order_status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                        </select>
                        <button class="updateStatus" data-id="${order.tracking_id}">Update Status</button>
                    </div>
                    <hr>
                `).join('');
            }
            orderStatusDiv.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            orderStatusDiv.innerHTML = 'An error occurred while fetching orders.';
            orderStatusDiv.style.display = 'block';
        });

    // Update order status functionality
    orderStatusDiv.addEventListener('click', function(event) {
        if (event.target.classList.contains('updateStatus')) {
            const trackId = event.target.getAttribute('data-id');
            const newStatus = event.target.previousElementSibling.value; // Get the selected status from the dropdown

            fetch('update_order_status.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tracking_id: trackId, status: newStatus })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    orderStatusDiv.innerHTML += `<br><strong>Status Updated for Order ID ${trackId}:</strong> ${newStatus}`;
                } else {
                    orderStatusDiv.innerHTML += `<br>Failed to update status: ${data.error}`;
                }
                orderStatusDiv.style.display = 'block';
            })
            .catch(error => {
                console.error('Error:', error);
                orderStatusDiv.innerHTML += `<br>An error occurred while updating the status.`;
                orderStatusDiv.style.display = 'block';
            });
        }
    });
});