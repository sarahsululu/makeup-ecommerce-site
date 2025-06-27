document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const cartCount = document.getElementById('cart-count');
  const toggleBtn = document.getElementById('toggle-dark-mode');
  const body = document.body;

  // Start in dark mode by default
  body.classList.add('dark-mode');
  if (localStorage.getItem('dark-mode') === 'off') {
    body.classList.remove('dark-mode');
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDark ? 'on' : 'off');
  });

  loadProducts();
  updateCartCount();

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
        <div class="product-buttons">
          <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
          <button onclick='orderNow(${JSON.stringify(product)})'>Order Now</button>
        </div>
      `;
      productItem.addEventListener('click', () => {
        showProductDetails(product);
      });
      productList.appendChild(productItem);
    });
  }

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

  function orderNow(product) {
    const phoneNumber = "254796454057";
    const message = `Hello, I would like to order "${product.name}" for $${product.price}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  }

  function showProductDetails(product) {
    document.getElementById('detail-image').src = product.image;
    document.getElementById('detail-name').textContent = product.name;
    document.getElementById('detail-description').textContent = product.description || '';
    document.getElementById('detail-price').textContent = product.price.toFixed(2);

    document.getElementById('detail-add-to-cart').onclick = () => addToCart(product);
    document.getElementById('detail-order-now').onclick = () => orderNow(product);

    document.getElementById('product-detail-modal').classList.remove('hidden');
  }

  document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('product-detail-modal').classList.add('hidden');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-dark-mode');
  const body = document.body;

  // Always start in dark mode by default
  body.classList.add('dark-mode');

  // If user turned off dark mode earlier, respect that
  if (localStorage.getItem('dark-mode') === 'off') {
    body.classList.remove('dark-mode');
  }

  // Handle toggle button click
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      localStorage.setItem('dark-mode', isDark ? 'on' : 'off');
    });
  } else {
    console.warn("Dark mode toggle button not found.");
  }
});





  



