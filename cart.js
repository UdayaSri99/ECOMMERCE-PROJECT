document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    const orderSummaryElement = document.getElementById('order-summary');

    const shippingCost = 30; // Example shipping cost

    cartItemsContainer.innerHTML = ''; // Clear any existing content

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalAmountElement.innerHTML = '';
        orderSummaryElement.innerHTML = '';
        return;
    }

    let totalAmount = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.image}" alt="${item.title}">
                <div>
                    <h3>${item.title}</h3>
                    <p>Price: $${item.price}</p>
                    <p>Quantity: <span id="quantity-${item.id}">${item.quantity}</span></p>
                    <p>Total: $${itemTotal.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button onclick="changeQuantity(${item.id}, -1)">-</button>Product
                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update total amount and order summary
    const totalWithShipping = totalAmount + shippingCost;
    totalAmountElement.innerHTML = `<h2>Total Amount: $${totalWithShipping.toFixed(2)}</h2>`;

    // Generate order summary
    orderSummaryElement.innerHTML = `
        <div class="order-summary">
            <h3>Order Summary</h3>
            <div class="summary-row">
                <p>Products (${cart.length})</p>
                <span>$${totalAmount.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <p>Shipping</p>
                <span>$${shippingCost.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <p>Total amount</p>
                <strong>$${totalWithShipping.toFixed(2)}</strong>
            </div>
            <button onclick="goToCheckout()">Go to checkout</button>
        </div>
    `;
}

function changeQuantity(productId, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(p => p.id === productId);

    if (productIndex > -1) {
        const newQuantity = cart[productIndex].quantity + change;

        if (newQuantity <= 0) {
            // Remove item from cart if quantity is zero or less
            cart.splice(productIndex, 1);
        } else {
            // Update the quantity
            cart[productIndex].quantity = newQuantity;
        }

        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
}

function goToCheckout() {
    // Functionality for checkout process
    alert('Redirecting to checkout...');
}
