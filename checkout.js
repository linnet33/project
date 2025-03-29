// Handle form submission
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    if (paymentMethod === 'cod') {
        // Show confirmation modal for Cash on Delivery
        document.getElementById('confirmation-modal').style.display = 'block';
    } else {
        // Show PayPal button
        document.getElementById('paypal-button-container').style.display = 'block';
    }
});

// Close modal when the user clicks on <span> (x) or the close button
document.getElementById('close-modal').onclick = function() {
    document.getElementById('confirmation-modal').style.display = 'none';
}

document.getElementById('close-modal-button').onclick = function() {
    document.getElementById('confirmation-modal').style.display = 'none';
}

// Close modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    const modal = document.getElementById('confirmation-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// PayPal Button Integration
paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '10.00' // Replace with the actual amount
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // Show confirmation modal
            document.getElementById('confirmation-modal').style.display = 'block';
            console.log('Transaction completed by ' + details.payer.name.given_name);
        });
    },
    onError: function(err) {
        console.error(err);
        alert('An error occurred during the transaction. Please try again.');
    }
}).render('#paypal-button-container'); // Renders the PayPal button into the container