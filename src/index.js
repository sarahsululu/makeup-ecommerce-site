document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const cartCount = document.getElementById('cart-count');
  const toggleBtn = document.getElementById('toggle-dark-mode');
  const body = document.body;
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  // Set initial dark mode state
  const savedMode = localStorage.getItem('dark-mode');
  if (savedMode === 'on') {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }

  // Toggle dark mode
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDark ? 'on' : 'off');
  });

  // Cart management
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartCount();

  function updateCartCount() {
    if (cartCount) cartCount.textContent = cart.length;
  }

  function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`Added "${product.name}" to cart!`);
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
          <button class="add-to-cart">Add to Cart</button>
          <button class="order-now">Order Now</button>
        </div>
      `;

      // Button events
      productItem.querySelector('.add-to-cart').addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product);
      });

      productItem.querySelector('.order-now').addEventListener('click', (e) => {
        e.stopPropagation();
        orderNow(product);
      });

      // Whole card opens modal
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
      .then(products => {
        renderProducts(products);

        // Search logic
        searchButton.addEventListener('click', () => {
          const query = searchInput.value.toLowerCase();
          const filtered = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            (product.description && product.description.toLowerCase().includes(query))
          );
          renderProducts(filtered);
        });
      })
      .catch(error => {
        console.error("Error loading products:", error);
        productList.innerHTML = "<p style='color: red;'>Failed to load products. Is your JSON Server running?</p>";
      });
  }

  loadProducts();
});

document.getElementById('go-to-promos').addEventListener('click', () => {
  document.getElementById('main-banner').classList.add('hidden');
  document.getElementById('promo-section').classList.remove('hidden');
});

document.getElementById('back-to-main').addEventListener('click', () => {
  document.getElementById('promo-section').classList.add('hidden');
  document.getElementById('main-banner').classList.remove('hidden');
});

  const aboutLink = document.querySelector('a[href="#about"]');
  const aboutSection = document.getElementById('about');

  aboutLink.addEventListener('click', function (e) {
    e.preventDefault();
    aboutSection.style.display = aboutSection.style.display === 'none' ? 'block' : 'none';
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  });










  



