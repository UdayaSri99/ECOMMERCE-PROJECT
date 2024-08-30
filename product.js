const apiUrl = 'https://fakestoreapi.com/products';
let products = []; // Array to hold fetched products
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateCartCount();
});

function fetchProducts(category = 'all') {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            products = data; // Save fetched products to the global variable
            displayProducts(products, category);
        })
        .catch(error => console.error('Error fetching products:', error));
}
function displayProducts(products, category) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    const filteredProducts = (category === 'all') ? products : products.filter(product => product.category.toLowerCase() === category.toLowerCase());

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3 class="title">${product.title}</h3>
            <p class="des">${product.description}</p>
            <p>$${product.price}</p>
            <button onclick="viewDetails(${product.id})">Details</button>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}


function addToCart(productId) {
    // Find the product by ID
    const product = products.find(p => p.id === productId);

    if (product) {
        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex(p => p.id === productId);

        if (existingProductIndex > -1) {
            // If it is, increase the quantity
            cart[existingProductIndex].quantity += 1;
        } else {// If it's not, add it with quantity 1
            cart.push({ ...product, quantity: 1  } );
        }

        // Save the cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update the cart count
        updateCartCount();
    }
}
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');

    if (cartCountElement) {
        // Calculate the total number of items in the cart
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

        // Update the cart count display
        cartCountElement.textContent = totalItems;
    }
}
function viewDetails(productId) {
    // Redirect to the details page with the product ID as a query parameter
    window.location.href = `details.html?id=${productId}`;
}
function filterProducts(category) {
    displayProducts(products, category);
}