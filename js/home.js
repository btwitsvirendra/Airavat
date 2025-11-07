// Home Page JavaScript - Airavat B2B E-commerce Platform

document.addEventListener('DOMContentLoaded', function() {
  // Check authentication status
  checkAuthStatus();

  // Initialize home page
  initCategoryCarousel();
  loadProducts();
  loadRecommendedProducts();

  // Setup account icon handler
  setupAccountIcon();
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

// Authentication Integration Functions

/**
 * Check authentication status and update UI
 */
function checkAuthStatus() {
  if (sessionManager.checkAuth()) {
    const user = sessionManager.getUser();
    const accountText = document.getElementById('accountText');
    if (accountText && user) {
      // Show user's first name instead of "Account"
      const firstName = user.name.split(' ')[0];
      accountText.textContent = firstName;
    }
  }
}

/**
 * Setup account icon click handler
 */
function setupAccountIcon() {
  const accountIcon = document.getElementById('accountIcon');
  if (accountIcon) {
    accountIcon.addEventListener('click', function(e) {
      e.preventDefault();

      if (sessionManager.checkAuth()) {
        // User is logged in - show account menu
        showAccountMenu();
      } else {
        // User is not logged in - redirect to sign in
        window.location.href = 'sign-in.html';
      }
    });
  }
}

/**
 * Show account menu for logged-in users
 */
function showAccountMenu() {
  const user = sessionManager.getUser();

  // Create account menu overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding-top: 80px;
    padding-right: 20px;
  `;

  const menu = document.createElement('div');
  menu.style.cssText = `
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    min-width: 280px;
    padding: 20px;
    animation: slideDown 0.3s ease;
  `;

  menu.innerHTML = `
    <div style="padding-bottom: 15px; border-bottom: 1px solid #E0E0E0; margin-bottom: 15px;">
      <div style="font-size: 18px; font-weight: 700; color: #054A4E; margin-bottom: 5px;">${user.name}</div>
      <div style="font-size: 13px; color: #666;">${user.email}</div>
      <div style="font-size: 12px; color: #999; margin-top: 5px;">Member ID: ${user.memberId}</div>
    </div>
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <a href="#" style="padding: 10px; color: #424242; text-decoration: none; border-radius: 6px; transition: background 0.3s;" onmouseover="this.style.background='#F5F5F5'" onmouseout="this.style.background='transparent'">👤 My Profile</a>
      <a href="#" style="padding: 10px; color: #424242; text-decoration: none; border-radius: 6px; transition: background 0.3s;" onmouseover="this.style.background='#F5F5F5'" onmouseout="this.style.background='transparent'">📦 My Orders</a>
      <a href="#" style="padding: 10px; color: #424242; text-decoration: none; border-radius: 6px; transition: background 0.3s;" onmouseover="this.style.background='#F5F5F5'" onmouseout="this.style.background='transparent'">⚙️ Settings</a>
      <a href="#" style="padding: 10px; color: #424242; text-decoration: none; border-radius: 6px; transition: background 0.3s;" onmouseover="this.style.background='#F5F5F5'" onmouseout="this.style.background='transparent'">❓ Help Center</a>
      <div style="height: 1px; background: #E0E0E0; margin: 10px 0;"></div>
      <button id="logoutBtn" style="padding: 10px; background: #E53935; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600; transition: background 0.3s;" onmouseover="this.style.background='#C62828'" onmouseout="this.style.background='#E53935'">🚪 Logout</button>
    </div>
  `;

  // Add animation styles
  if (!document.querySelector('style[data-account-menu]')) {
    const style = document.createElement('style');
    style.dataset.accountMenu = 'true';
    style.textContent = `
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }

  overlay.appendChild(menu);
  document.body.appendChild(overlay);

  // Close menu on overlay click
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });

  // Logout button handler
  document.getElementById('logoutBtn').addEventListener('click', function() {
    sessionManager.logout();
    document.body.removeChild(overlay);
    showNotification('Logged out successfully');
    // Update account text back to "Account"
    const accountText = document.getElementById('accountText');
    if (accountText) {
      accountText.textContent = 'Account';
    }
  });
}
