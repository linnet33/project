document.getElementById("checkout-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;
    let paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    let orderData = { name, address, phone, paymentMethod };

    try {
        let response = await fetch("http://localhost:5000/api/order/place", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
        });

        let result = await response.json();

        if (response.ok) {
            alert(`Order placed! Your Tracking ID: ${result.trackingId}`);
            document.getElementById("checkout-form").reset();
        } else {
            alert("Order failed: " + result.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while placing the order.");
    }
});
