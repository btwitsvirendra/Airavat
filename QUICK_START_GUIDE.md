# 🚀 Quick Start Implementation Guide

This guide shows you how to immediately integrate the professional API services into your existing Airavat codebase.

---

## 📦 Installation

### Step 1: Install Dependencies

```bash
# Install Node.js packages
npm install

# Or with yarn
yarn install
```

### Step 2: Configure Environment

Create `.env` file in the root directory:

```env
VITE_API_URL=https://api.airavat.com/v1
VITE_WS_URL=wss://api.airavat.com/ws
VITE_ENV=development
```

### Step 3: Start Development Server

```bash
# Using Vite (recommended)
npm run dev

# Or traditional Python server
python -m http.server 8000
```

---

## 🔌 Integration Examples

### 1. Replace Current Product Loading

**Before (Current Code):**
```javascript
// js/dashboard.js - Line ~500
loadProducts() {
  const products = [
    { id: 1, name: 'Product 1', price: 1000 },
    // ... hardcoded data
  ];
  this.renderProducts(products);
}
```

**After (With API):**
```javascript
// Import the API service
import { productsAPI } from './services/api/products.api.js';

async loadProducts() {
  try {
    // Show loading skeleton
    this.showLoadingSkeleton();

    // Fetch products from API
    const response = await productsAPI.getProducts({
      page: 1,
      limit: 20,
      category: this.currentCategory
    });

    // Render products
    this.renderProducts(response.data);

  } catch (error) {
    console.error('Failed to load products:', error);
    this.showNotification('Failed to load products', 'error');
  }
}
```

---

### 2. Implement Real-time Search

**Update your search handler:**

```javascript
// js/dashboard.js - setupSearch()
import { productsAPI } from './services/api/products.api.js';
import { AdvancedSearch } from './components/search/advanced-search.js';

setupSearch() {
  const searchInput = document.querySelector('.search-input');

  // Initialize advanced search with autocomplete
  const advancedSearch = new AdvancedSearch(searchInput, {
    debounceTime: 300,
    minChars: 2,

    // Search callback
    onSearch: async (query) => {
      try {
        const response = await productsAPI.searchProducts(query, {
          limit: 10
        });
        return response.data;
      } catch (error) {
        console.error('Search failed:', error);
        return [];
      }
    },

    // Selection callback
    onSelect: (product) => {
      window.location.href = `/product-detail.html?id=${product.id}`;
    }
  });
}
```

---

### 3. Load Orders with Filtering

**Update orders page:**

```javascript
// orders.html - Load real order data
import { ordersAPI } from './services/api/orders.api.js';

class OrdersManager {
  constructor() {
    this.currentStatus = 'all';
    this.currentPage = 1;
    this.init();
  }

  async init() {
    await this.loadOrders();
    this.setupFilters();
  }

  async loadOrders() {
    try {
      // Show loading state
      this.showLoadingSkeleton();

      // Fetch orders from API
      const response = await ordersAPI.getOrders({
        status: this.currentStatus,
        page: this.currentPage,
        limit: 20
      });

      // Render orders
      this.renderOrders(response.data);

      // Update pagination
      this.updatePagination(response.meta);

    } catch (error) {
      console.error('Failed to load orders:', error);
      this.showNotification('Failed to load orders', 'error');
    }
  }

  setupFilters() {
    const filterButtons = document.querySelectorAll('.order-filter-btn');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentStatus = btn.dataset.status;
        this.currentPage = 1;
        this.loadOrders();
      });
    });
  }

  renderOrders(orders) {
    const container = document.querySelector('.orders-list');

    if (orders.length === 0) {
      container.innerHTML = '<div class="no-orders">No orders found</div>';
      return;
    }

    container.innerHTML = orders.map(order => `
      <div class="order-card" data-order-id="${order.id}">
        <div class="order-header">
          <span class="order-id">Order #${order.orderNumber}</span>
          <span class="order-status status-${order.status}">${order.status}</span>
        </div>
        <div class="order-details">
          <div class="order-date">${this.formatDate(order.createdAt)}</div>
          <div class="order-total">₹${order.total.toLocaleString()}</div>
        </div>
        <div class="order-actions">
          <button onclick="viewOrder('${order.id}')">View Details</button>
          ${order.status === 'pending' ?
            `<button onclick="cancelOrder('${order.id}')">Cancel</button>` :
            ''
          }
        </div>
      </div>
    `).join('');
  }

  showLoadingSkeleton() {
    const container = document.querySelector('.orders-list');
    container.innerHTML = `
      <div class="skeleton-order"></div>
      <div class="skeleton-order"></div>
      <div class="skeleton-order"></div>
    `;
  }

  formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}

// Initialize
new OrdersManager();
```

---

### 4. Add Infinite Scroll to Product Listing

**Implement infinite scrolling:**

```javascript
// product listing page
import { productsAPI } from './services/api/products.api.js';
import { InfiniteScroll } from './utils/infinite-scroll.js';

class ProductListingManager {
  constructor() {
    this.currentPage = 1;
    this.products = [];
    this.init();
  }

  async init() {
    await this.loadInitialProducts();
    this.setupInfiniteScroll();
  }

  async loadInitialProducts() {
    const response = await productsAPI.getProducts({ page: 1, limit: 20 });
    this.products = response.data;
    this.renderProducts(this.products);
  }

  setupInfiniteScroll() {
    const container = document.querySelector('.products-grid');

    new InfiniteScroll(container, async (page) => {
      try {
        const response = await productsAPI.getProducts({
          page: page,
          limit: 20
        });

        // Append new products
        this.products.push(...response.data);
        this.appendProducts(response.data);

        // Return true if more items available
        return response.data.length > 0;

      } catch (error) {
        console.error('Failed to load more products:', error);
        return false;
      }
    });
  }

  renderProducts(products) {
    const container = document.querySelector('.products-grid');
    container.innerHTML = products.map(product => this.createProductCard(product)).join('');
  }

  appendProducts(products) {
    const container = document.querySelector('.products-grid');
    const html = products.map(product => this.createProductCard(product)).join('');
    container.insertAdjacentHTML('beforeend', html);
  }

  createProductCard(product) {
    return `
      <div class="product-card" data-product-id="${product.id}">
        <img data-src="${product.image}" src="placeholder.jpg" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="product-price">₹${product.price.toLocaleString()}</div>
        <div class="product-moq">MOQ: ${product.moq} units</div>
        <button onclick="viewProduct('${product.id}')">View Details</button>
      </div>
    `;
  }
}

// Initialize
new ProductListingManager();
```

---

### 5. Implement Advanced Filtering

**Add professional filtering:**

```javascript
// product listing page
import { AdvancedFilter } from './components/filters/advanced-filter.js';
import { productsAPI } from './services/api/products.api.js';

class ProductFilterManager {
  constructor() {
    this.activeFilters = {};
    this.init();
  }

  init() {
    this.setupFilters();
  }

  setupFilters() {
    const filterContainer = document.querySelector('.filter-sidebar');

    const advancedFilter = new AdvancedFilter(filterContainer, {
      filters: [
        {
          id: 'category',
          label: 'Category',
          type: 'checkbox',
          options: [
            { label: 'Electronics', value: 'electronics', count: 245 },
            { label: 'Construction', value: 'construction', count: 189 },
            { label: 'Textile', value: 'textile', count: 321 }
          ]
        },
        {
          id: 'price',
          label: 'Price Range',
          type: 'range',
          min: 0,
          max: 100000
        },
        {
          id: 'brand',
          label: 'Brand',
          type: 'checkbox',
          options: [
            { label: 'Brand A', value: 'brand-a', count: 89 },
            { label: 'Brand B', value: 'brand-b', count: 156 }
          ]
        },
        {
          id: 'rating',
          label: 'Rating',
          type: 'checkbox',
          options: [
            { label: '4★ & above', value: '4', count: 234 },
            { label: '3★ & above', value: '3', count: 456 }
          ]
        }
      ],

      onFilterChange: async (filters) => {
        this.activeFilters = filters;
        await this.applyFilters();
      }
    });
  }

  async applyFilters() {
    try {
      // Show loading
      this.showLoadingSkeleton();

      // Fetch filtered products
      const response = await productsAPI.searchProducts('', {
        filters: this.activeFilters,
        page: 1,
        limit: 20
      });

      // Update product display
      this.renderProducts(response.data);

      // Update result count
      this.updateResultCount(response.meta.total);

    } catch (error) {
      console.error('Failed to apply filters:', error);
      this.showNotification('Failed to apply filters', 'error');
    }
  }

  showLoadingSkeleton() {
    const container = document.querySelector('.products-grid');
    container.innerHTML = `
      <div class="skeleton-product"></div>
      <div class="skeleton-product"></div>
      <div class="skeleton-product"></div>
      <div class="skeleton-product"></div>
    `;
  }

  updateResultCount(total) {
    const countElement = document.querySelector('.result-count');
    if (countElement) {
      countElement.textContent = `${total} products found`;
    }
  }
}

// Initialize
new ProductFilterManager();
```

---

### 6. Add Loading States

**Professional loading indicators:**

```javascript
// Add to your CSS
/*
.skeleton-product {
  background: #f0f0f0;
  border-radius: 8px;
  padding: 16px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
*/

// Use in your code
class LoadingStateManager {
  showProductSkeleton(count = 6) {
    const container = document.querySelector('.products-grid');
    const skeletons = Array(count).fill(null).map(() => `
      <div class="skeleton-product">
        <div class="skeleton-image shimmer"></div>
        <div class="skeleton-text shimmer" style="width: 80%; height: 16px; margin: 8px 0;"></div>
        <div class="skeleton-text shimmer" style="width: 60%; height: 16px; margin: 8px 0;"></div>
        <div class="skeleton-text shimmer" style="width: 40%; height: 16px; margin: 8px 0;"></div>
      </div>
    `).join('');

    container.innerHTML = skeletons;
  }

  showOrderSkeleton(count = 5) {
    const container = document.querySelector('.orders-list');
    const skeletons = Array(count).fill(null).map(() => `
      <div class="skeleton-order">
        <div class="skeleton-text shimmer" style="width: 30%; height: 20px; margin: 8px 0;"></div>
        <div class="skeleton-text shimmer" style="width: 80%; height: 16px; margin: 8px 0;"></div>
        <div class="skeleton-text shimmer" style="width: 50%; height: 16px; margin: 8px 0;"></div>
      </div>
    `).join('');

    container.innerHTML = skeletons;
  }
}
```

---

## 🎨 CSS Updates Needed

Add these styles for professional look:

```css
/* Loading States */
.skeleton-product,
.skeleton-order {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.skeleton-image {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  background: #f0f0f0;
  margin-bottom: 12px;
}

.skeleton-text {
  height: 16px;
  background: #f0f0f0;
  border-radius: 4px;
  margin: 8px 0;
}

.shimmer {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Search Dropdown */
.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  margin-top: 8px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
}

.search-result-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.search-result-item:hover {
  background: #f5f5f5;
}

.search-result-image {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 12px;
}

.search-result-content {
  flex: 1;
}

.search-result-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.search-result-title mark {
  background: #fff3cd;
  padding: 2px 4px;
  border-radius: 2px;
}

.search-result-category {
  font-size: 12px;
  color: #666;
}

.search-result-price {
  font-weight: 700;
  color: var(--primary-teal);
  margin-top: 4px;
}

/* Filter Sidebar */
.filter-section {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e0e0e0;
}

.filter-title {
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 12px;
  color: #333;
}

.filter-checkbox {
  display: flex;
  align-items: center;
  padding: 8px 0;
  cursor: pointer;
}

.filter-checkbox input {
  margin-right: 8px;
}

.filter-count {
  margin-left: auto;
  color: #999;
  font-size: 13px;
}

.filter-apply {
  width: 100%;
  padding: 12px;
  background: var(--primary-teal);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.filter-apply:hover {
  background: var(--accent-teal);
}
```

---

## 📱 Usage in HTML Files

Update your HTML files to include the new modules:

```html
<!-- index.html -->
<script type="module">
  import { DashboardManager } from './js/dashboard.js';
  import { productsAPI } from './src/services/api/products.api.js';

  // Initialize
  const dashboard = new DashboardManager();
</script>

<!-- orders.html -->
<script type="module">
  import { ordersAPI } from './src/services/api/orders.api.js';
  // Your orders code
</script>
```

---

## 🔧 Development Workflow

### 1. Mock API During Development

Create a mock API for development:

```javascript
// src/services/api/mock.api.js
export const mockAPI = {
  products: [
    {
      id: '1',
      name: 'Industrial Pump',
      price: 25000,
      image: '/images/products/pump.jpg',
      category: 'Industrial Machinery',
      moq: 10
    },
    // ... more mock data
  ],

  getProducts() {
    return Promise.resolve({
      success: true,
      data: this.products,
      meta: { total: this.products.length, page: 1 }
    });
  }
};

// Use in development
import { mockAPI } from './mock.api.js';
const api = process.env.NODE_ENV === 'development' ? mockAPI : productsAPI;
```

### 2. Enable Hot Module Replacement (HMR)

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    hot: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
```

---

## ✅ Next Steps

1. **Install dependencies**: `npm install`
2. **Start with one feature**: Implement real product loading first
3. **Test thoroughly**: Test each feature before moving to the next
4. **Add error handling**: Always handle API errors gracefully
5. **Optimize performance**: Add caching and lazy loading
6. **Monitor**: Add error tracking (Sentry, LogRocket)

---

## 🆘 Troubleshooting

### CORS Issues
Add this to your API server or use a proxy in `vite.config.js`:

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://api.airavat.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
```

### Module Not Found
Make sure file paths use `.js` extension:
```javascript
// ✅ Correct
import { apiService } from './services/api.service.js';

// ❌ Wrong
import { apiService } from './services/api.service';
```

---

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [Modern JavaScript](https://javascript.info/)
- [API Design Best Practices](https://swagger.io/resources/articles/best-practices-in-api-design/)
- [Performance Optimization](https://web.dev/fast/)

---

**Ready to modernize your platform! 🚀**
