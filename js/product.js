// Product Detail Page JavaScript - Airavat B2B E-commerce Platform

let currentProduct = null;

document.addEventListener('DOMContentLoaded', function() {
  // Get product from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));

  if (!productId) {
    window.location.href = 'index.html';
    return;
  }

  // Find product
  currentProduct = products.find(p => p.id === productId);

  if (!currentProduct) {
    alert('Product not found');
    window.location.href = 'index.html';
    return;
  }

  // Load product details
  loadProductDetails();
  loadImageGallery();
  loadCustomizationOptions();
  loadAttributesTable();
  loadReviews();
  loadSimilarProducts();
  initTabs();
  initButtons();
});

// Load Product Details
function loadProductDetails() {
  document.getElementById('productTitle').textContent = currentProduct.name;
  document.getElementById('productStars').innerHTML = generateStars(currentProduct.rating);
  document.getElementById('productRating').textContent = `(${currentProduct.rating}) ${currentProduct.reviews} reviews`;
  document.getElementById('supplierName').textContent = currentProduct.supplier;
  document.getElementById('supplierLocation').textContent = currentProduct.location;
  document.getElementById('productMOQ').textContent = `${currentProduct.moq} pieces`;
  document.getElementById('productPrice').textContent = `Rs ${currentProduct.priceRange}`;
  document.getElementById('productDescription').textContent = currentProduct.description;
  document.getElementById('shippingInfo').textContent = currentProduct.shipping;

  // Update supplier details
  document.getElementById('companyName').textContent = currentProduct.supplier;
  document.getElementById('supplierLocationDetail').textContent = currentProduct.location;
  document.getElementById('mainProducts').textContent = currentProduct.category;

  // Update review summary
  document.getElementById('averageRating').textContent = currentProduct.rating;
  document.getElementById('averageStars').innerHTML = generateStars(currentProduct.rating);
  document.getElementById('totalReviews').textContent = `${currentProduct.reviews} reviews`;

  // Update packaging
  document.getElementById('packagingDetails').textContent = currentProduct.packaging;
}

// Load Image Gallery
function loadImageGallery() {
  const mainImage = document.getElementById('mainImage');
  const thumbnailContainer = document.getElementById('thumbnailContainer');

  const categoryIcon = getCategoryIcon(currentProduct.category);

  // Set main image
  mainImage.innerHTML = `<div class="main-image">${categoryIcon}</div>`;

  // Create thumbnails
  thumbnailContainer.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const thumbnail = document.createElement('div');
    thumbnail.className = `thumbnail ${i === 0 ? 'active' : ''}`;
    thumbnail.innerHTML = categoryIcon;
    thumbnail.dataset.index = i;

    thumbnail.addEventListener('click', function() {
      // Remove active class from all thumbnails
      document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
      // Add active class to clicked thumbnail
      this.classList.add('active');
      // Update main image (in a real app, this would change the image)
      mainImage.innerHTML = `<div class="main-image">${categoryIcon}</div>`;
    });

    thumbnailContainer.appendChild(thumbnail);
  }
}

// Load Customization Options
function loadCustomizationOptions() {
  const container = document.getElementById('customizationOptions');
  container.innerHTML = '';

  if (currentProduct.customization && currentProduct.customization.length > 0) {
    currentProduct.customization.forEach((option, index) => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'checkbox-option';
      optionDiv.innerHTML = `
        <input type="checkbox" id="custom-${index}" value="${option.price}">
        <label for="custom-${index}" class="option-text">${option.name}</label>
        <span class="option-price">Rs ${option.price}/per piece</span>
      `;
      container.appendChild(optionDiv);
    });
  }
}

// Load Attributes Table
function loadAttributesTable() {
  const table = document.getElementById('attributesTable');
  const specs = currentProduct.specifications;

  if (!specs) return;

  let html = '<tr><th>Attribute</th><th>Value</th></tr>';

  Object.keys(specs).forEach(key => {
    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    html += `
      <tr>
        <th>${label}</th>
        <td>${specs[key]}</td>
      </tr>
    `;
  });

  table.innerHTML = html;
}

// Load Reviews
function loadReviews() {
  const reviewsList = document.getElementById('reviewsList');

  // Generate sample reviews
  const sampleReviews = [
    {
      name: 'Rajesh Kumar',
      rating: 5,
      date: '2025-10-28',
      text: 'Excellent product quality! The supplier was very professional and delivery was on time. Highly recommended for bulk orders.'
    },
    {
      name: 'Priya Sharma',
      rating: 4,
      date: '2025-10-25',
      text: 'Good quality products. Packaging was secure and product matched the description. Will order again.'
    },
    {
      name: 'Amit Patel',
      rating: 5,
      date: '2025-10-20',
      text: 'Outstanding service and product quality. The customization options are great and pricing is competitive.'
    },
    {
      name: 'Sneha Reddy',
      rating: 4,
      date: '2025-10-15',
      text: 'Very satisfied with the purchase. Product quality is good and MOQ is reasonable for small businesses.'
    }
  ];

  reviewsList.innerHTML = '';
  sampleReviews.forEach(review => {
    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';
    reviewCard.innerHTML = `
      <div class="review-header">
        <div class="reviewer-name">${review.name}</div>
        <div class="review-stars">${generateStars(review.rating)}</div>
      </div>
      <div class="review-date">${review.date}</div>
      <div class="review-text">${review.text}</div>
    `;
    reviewsList.appendChild(reviewCard);
  });
}

// Load Similar Products
function loadSimilarProducts() {
  const similarGrid = document.getElementById('similarProductsGrid');
  const similarBottom = document.getElementById('similarProductsBottom');

  // Get products from same category or all products if not enough
  let similarProducts = products.filter(p => p.id !== currentProduct.id && p.category === currentProduct.category);

  if (similarProducts.length < 5) {
    similarProducts = products.filter(p => p.id !== currentProduct.id);
  }

  // Limit to 5 products
  similarProducts = similarProducts.slice(0, 5);

  // Load to both grids
  [similarGrid, similarBottom].forEach(container => {
    container.innerHTML = '';
    similarProducts.forEach(product => {
      const card = createSimilarProductCard(product);
      container.appendChild(card);
    });
  });
}

// Create Similar Product Card
function createSimilarProductCard(product) {
  const card = document.createElement('div');
  card.className = 'similar-product-card';
  card.onclick = () => {
    window.location.href = `product-detail.html?id=${product.id}`;
  };

  const categoryIcon = getCategoryIcon(product.category);

  card.innerHTML = `
    <div class="similar-product-image">${categoryIcon}</div>
    <div class="similar-product-info">
      <div class="similar-product-title">${product.shortName || product.name}</div>
      <div class="similar-product-price">Rs ${product.price}</div>
      <div class="similar-product-moq">MOQ: ${product.moq} pieces</div>
    </div>
  `;

  return card;
}

// Initialize Tabs
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const tabName = this.dataset.tab;

      // Remove active class from all buttons and contents
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      document.getElementById(tabName).classList.add('active');
    });
  });
}

// Initialize Buttons
function initButtons() {
  // Add to Cart Button
  document.getElementById('addToCartBtn').addEventListener('click', function() {
    // Get selected customizations
    const selectedCustomizations = [];
    let customizationCost = 0;

    document.querySelectorAll('#customizationOptions input[type="checkbox"]:checked').forEach(checkbox => {
      const label = checkbox.nextElementSibling.textContent;
      const price = parseFloat(checkbox.value);
      selectedCustomizations.push(label);
      customizationCost += price;
    });

    // Add to cart
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const cartItem = {
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      quantity: currentProduct.moq,
      supplier: currentProduct.supplier,
      customizations: selectedCustomizations,
      customizationCost: customizationCost
    };

    const existingItem = cart.find(item => item.id === currentProduct.id);
    if (existingItem) {
      existingItem.quantity += currentProduct.moq;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Show notification
    showNotification('Product added to cart successfully!');
  });

  // Share Button
  document.getElementById('shareBtn').addEventListener('click', function() {
    if (navigator.share) {
      navigator.share({
        title: currentProduct.name,
        text: `Check out this product: ${currentProduct.name}`,
        url: window.location.href
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        showNotification('Product link copied to clipboard!');
      });
    }
  });

  // Contact Supplier Button
  const contactBtn = document.querySelector('.contact-supplier-btn');
  if (contactBtn) {
    contactBtn.addEventListener('click', function() {
      showNotification(`Connecting you with ${currentProduct.supplier}...`);
    });
  }
}

// Generate Star Rating HTML
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let starsHtml = '';

  for (let i = 0; i < fullStars; i++) {
    starsHtml += '★';
  }

  if (hasHalfStar) {
    starsHtml += '⯨';
  }

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '☆';
  }

  return starsHtml;
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

// Show Notification
function showNotification(message) {
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

  if (!document.querySelector('style[data-notification]')) {
    style.dataset.notification = 'true';
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Search functionality (same as home page)
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
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) return;

  // Redirect to home page with search term
  window.location.href = `index.html?search=${encodeURIComponent(searchTerm)}`;
}
