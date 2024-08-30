const apiUrl = 'https://fakestoreapi.com/products';
let products = [];

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'), 10);
    
    if (productId) {
        fetchProductDetails(productId);
    }
});
function fetchProductDetails(productId) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            products = data;
            const product = products.find(p => p.id === productId);
            
            if (product) {
                displayProductDetails(product);
            } else {
                document.getElementById('product-details').innerHTML = '<p>Product not found.</p>';
            }
        })
        .catch(error => console.error('Error fetching product details:', error));
}
function displayProductDetails(product) {
    const detailsContainer = document.getElementById('product-details');
    detailsContainer.innerHTML = `
        <div class = "entire">
        <div class = "image" ><img src="${product.image}" alt="${product.title}"></div>
        <div class = 'desc'><h1>${product.title}</h1>
        <p>${product.description}</p>
        <p><strong>Price:</strong> $${product.price}</p>
        
        <p><strong>Category:</strong> ${product.category}</p>
        <center><button onclick="addToCart(${product.id})"> AddToCart</button>
        <button onclick="gotocart(${product.id})"> Go To Cart</button></center>
        </div>
        

        </div>
    `;
}



function gotocart(){
    window.location.href= 'cart.html';
}


