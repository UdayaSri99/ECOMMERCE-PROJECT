document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');

    cartItemsContainer.innerHTML = ''; // Clear any existing content

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalAmountElement.innerHTML = '';
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
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Quantity: <span id="quantity-${item.id}">${item.quantity}</span></p>
                    <p>Total: $${itemTotal.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button onclick="changeQuantity(${item.id}, -1)">-</button>
                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    const shippingCost = 30; // Example shipping cost
    const totalWithShipping = totalAmount + shippingCost;

    const orderSummaryDiv = document.createElement('div');
    orderSummaryDiv.classList.add('order-summary');
    orderSummaryDiv.innerHTML = `
        <h3>Order Summary</h3>
        <p>Products (${cart.length}) <span>$${totalAmount.toFixed(2)}</span></p>
        <p>Shipping <span>$${shippingCost.toFixed(2)}</span></p>
        <p>Total amount <strong>$${totalWithShipping.toFixed(2)}</strong></p>
        <button onclick="goToCheckout()">Go to checkout</button>
    `;
    cartItemsContainer.appendChild(orderSummaryDiv);

    totalAmountElement.innerHTML = `<h2>Total Amount: $${totalAmount.toFixed(2)}</h2>`;
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
    // Placeholder function to handle checkout logic
    alert('Redirecting to checkout...');
}
