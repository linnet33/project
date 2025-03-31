// Get the form and order tracking details elements
const form = document.getElementById('order-tracking-form');
const orderTrackingDetails = document.getElementById('order-tracking-details');
const trackingIdDetail = document.getElementById('tracking-id-detail');
const orderDateDetail = document.getElementById('order-date-detail');
const orderStatusDetail = document.getElementById('order-status-detail');
const customerNameDetail = document.getElementById('customer-name-detail');
const customerAddressDetail = document.getElementById('customer-address-detail');
const customerPhoneDetail = document.getElementById('customer-phone-detail');
const paymentMethodDetail = document.getElementById('payment-method-detail');

// Add an event listener to the form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the tracking ID from the form
    const trackingId = document.getElementById('tracking-id').value;

    // Make an API call to get the order details
    fetch(`https://example.com/api/orders/${trackingId}`)
        .then((response) => response.json())
        .then((data) => {
            // Display the order details
            trackingIdDetail.textContent = data.tracking_id;
            orderDateDetail.textContent = data.order_date;
            orderStatusDetail.textContent = data.order_status;
            customerNameDetail.textContent = data.name;
            customerAddressDetail.textContent = data.address;
            customerPhoneDetail.textContent = data.phone;
            paymentMethodDetail.textContent = data.payment_method;

            // Show the order tracking details
            orderTrackingDetails.style.display = 'block';
        })
        .catch((error) => {
            console.error(error);
        });
});