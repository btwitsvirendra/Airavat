// Home Page JavaScript - Airavat B2B E-commerce Platform

document.addEventListener('DOMContentLoaded', function() {
  // Initialize home page
  initCategoryCarousel();
  loadProducts();
  loadRecommendedProducts();
});

// Category Carousel Functionality
function initCategoryCarousel() {
  const carousel = document.getElementById('categoryCarousel');
  const prevBtn = document.getElementById('categoryPrev');
  const nextBtn = document.getElementById('categoryNext');

  if (!carousel || !prevBtn || !nextBtn) return;

  const scrollAmount = 300;

  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
}

// Load and Display Products
function loadProducts() {
  const productsGrid = document.getElementById('productsGrid');
  if (!productsGrid) return;

  productsGrid.innerHTML = '';

  products.forEach(product => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });
}

// Load Recommended Products (same products for demo)
function loadRecommendedProducts() {
  const recommendedGrid = document.getElementById('recommendedGrid');
  if (!recommendedGrid) return;

  recommendedGrid.innerHTML = '';

  products.forEach(product => {
    const productCard = createProductCard(product);
    recommendedGrid.appendChild(productCard);
  });
}

// Create Product Card Element
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.productId = product.id;

  // Get category icon
  const categoryIcon = getCategoryIcon(product.category);

  card.innerHTML = `
    <div class="product-image-container">
      <div class="product-image">${categoryIcon}</div>
      <div class="image-indicators">
        <span class="indicator-dot active"></span>
        <span class="indicator-dot"></span>
        <span class="indicator-dot"></span>
      </div>
    </div>
    <div class="product-info">
      <div class="product-title">${product.shortName || product.name}</div>
      ${product.hasEasyReturn ? '<span class="easy-return-badge">Easy return</span>' : ''}
      <div class="product-price">Rs ${product.price}</div>
      <div class="product-moq">MOQ: ${product.moq} pieces</div>
      <div class="product-supplier">${product.supplier}, ${product.location}</div>
      <div class="product-listing">Listing: ${product.listingDate}</div>
      <div class="product-actions">
        <div class="quantity-selector">
          <button class="qty-btn qty-minus" onclick="decrementQty(event)">-</button>
          <span class="qty-display">2</span>
          <button class="qty-btn qty-plus" onclick="incrementQty(event)">+</button>
        </div>
        <button class="icon-btn" onclick="addToCart(event, ${product.id})" aria-label="Add to cart">🛒</button>
        <button class="icon-btn" onclick="addToCompare(event, ${product.id})" aria-label="Compare">⚖️</button>
      </div>
    </div>
  `;

  // Add click event to navigate to product detail page
  card.addEventListener('click', function(e) {
    // Prevent navigation if clicking on buttons
    if (e.target.closest('.product-actions') ||
        e.target.closest('.qty-btn') ||
        e.target.closest('.icon-btn')) {
      return;
    }

    window.location.href = `product-detail.html?id=${product.id}`;
  });

  return card;
}

// Get category icon emoji
function getCategoryIcon(category) {
  const icons = {
    'Construction & Real Estate': '🏗️',
    'Electronics & Technology': '💻',
    'Home & Garden': '🏡',
    'Fashion & Apparel': '👔',
    'Food & Beverage': '🍕',
    'Automotive & Parts': '🚗',
    'Health & Beauty': '💄',
    'Industrial Equipment': '⚙️',
    'Packaging': '📦'
  };
  return icons[category] || '📦';
}

// Quantity Controls
function incrementQty(event) {
  event.stopPropagation();
  const qtyDisplay = event.target.parentElement.querySelector('.qty-display');
  let currentQty = parseInt(qtyDisplay.textContent);
  qtyDisplay.textContent = currentQty + 1;
}

function decrementQty(event) {
  event.stopPropagation();
  const qtyDisplay = event.target.parentElement.querySelector('.qty-display');
  let currentQty = parseInt(qtyDisplay.textContent);
  if (currentQty > 1) {
    qtyDisplay.textContent = currentQty - 1;
  }
}

// Add to Cart Functionality
function addToCart(event, productId) {
  event.stopPropagation();
  const product = products.find(p => p.id === productId);
  if (product) {
    // Get quantity from the card
    const card = event.target.closest('.product-card');
    const qty = parseInt(card.querySelector('.qty-display').textContent);

    // Store in localStorage (simple cart implementation)
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        quantity: qty,
        supplier: product.supplier
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Show confirmation
    showNotification(`Added ${qty} x ${product.shortName} to cart!`);
  }
}

// Add to Compare Functionality
function addToCompare(event, productId) {
  event.stopPropagation();
  const product = products.find(p => p.id === productId);
  if (product) {
    showNotification(`Added ${product.shortName} to comparison list!`);
  }
}

// Show Notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background-color: #0DC4CB;
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;

  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Search Functionality
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

if (searchInput && searchButton) {
  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
}

function performSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (!searchTerm) return;

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.supplier.toLowerCase().includes(searchTerm)
  );

  // Display filtered products
  const productsGrid = document.getElementById('productsGrid');
  if (productsGrid) {
    productsGrid.innerHTML = '';

    if (filteredProducts.length > 0) {
      filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
      });
    } else {
      productsGrid.innerHTML = `
        <div style="padding: 40px; text-align: center; width: 100%;">
          <p style="font-size: 18px; color: #666;">No products found for "${searchTerm}"</p>
        </div>
      `;
    }
  }
}
