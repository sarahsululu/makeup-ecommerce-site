const productList = document.getElementById('product-list');
const cartCount = document.getElementById('cart-count');

function loadProducts() {
  fetch("http://localhost:3000/products")
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    })
    .then(products => renderProducts(products))
    .catch(error => {
      console.error("Error loading products:", error);
      productList.innerHTML = "<p style='color: red;'>Failed to load products. Please start JSON Server.</p>";
    });
}

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  updateCartCount();
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  if (cartCount) cartCount.textContent = cart.length;
}

function addToCart(product) {
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function renderProducts(products) {
  productList.innerHTML = '';
  products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description || ''}</p>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    `;
    productList.appendChild(productItem);
  });
}


