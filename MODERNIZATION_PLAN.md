# 🚀 Airavat B2B Platform - Professional Modernization Plan

## Overview
Transform Airavat into an enterprise-grade B2B e-commerce platform matching the quality of Alibaba, IndiaMART, and TradeIndia.

---

## 📋 Table of Contents
1. [Architecture & Framework](#1-architecture--framework)
2. [API Integration Layer](#2-api-integration-layer)
3. [State Management](#3-state-management)
4. [UI/UX Enhancements](#4-uiux-enhancements)
5. [Performance Optimization](#5-performance-optimization)
6. [Security Improvements](#6-security-improvements)
7. [Code Quality & Standards](#7-code-quality--standards)
8. [Modern Features](#8-modern-features)
9. [Data & Search](#9-data--search)
10. [Implementation Priority](#10-implementation-priority)

---

## 1. Architecture & Framework

### Current State
- Vanilla JavaScript with class-based architecture
- No build process
- Manual file loading
- No module bundling

### Professional Approach

#### Option A: Keep Vanilla JS (Lightweight)
```javascript
// Use ES6 modules with modern build tools
// package.json
{
  "name": "airavat-b2b",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "terser": "^5.0.0",
    "sass": "^1.69.0"
  }
}

// Convert to ES6 modules
// src/core/api.service.js
export class APIService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL;
  }
}

// src/main.js
import { APIService } from './core/api.service.js';
import { DashboardManager } from './managers/dashboard.manager.js';
```

#### Option B: Modern Framework (Recommended for Enterprise)
```javascript
// Use React + TypeScript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* ... */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
```

**Recommendation**: Start with Vite + vanilla JS modules, then migrate to React/Vue later.

---

## 2. API Integration Layer

### Create Professional API Service

```javascript
// src/services/api.service.js
export class APIService {
  constructor() {
    this.baseURL = process.env.API_BASE_URL || 'https://api.airavat.com/v1';
    this.timeout = 30000;
    this.token = localStorage.getItem('auth_token');
  }

  // Request interceptor
  async request(endpoint, options = {}) {
    const config = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.token ? `Bearer ${this.token}` : '',
        'X-Client-Version': '1.0.0',
        'X-Request-ID': this.generateRequestId(),
        ...options.headers
      },
      ...options
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...config,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Handle HTTP errors
      if (!response.ok) {
        throw await this.handleError(response);
      }

      const data = await response.json();
      return this.handleSuccess(data);

    } catch (error) {
      clearTimeout(timeoutId);
      throw this.handleError(error);
    }
  }

  // Response handling
  handleSuccess(data) {
    return {
      success: true,
      data: data.data || data,
      meta: data.meta || {},
      timestamp: new Date().toISOString()
    };
  }

  handleError(error) {
    const errorResponse = {
      success: false,
      error: {
        message: error.message || 'An error occurred',
        code: error.code || 'UNKNOWN_ERROR',
        status: error.status || 500
      }
    };

    // Log to monitoring service
    this.logError(errorResponse);

    return errorResponse;
  }

  // Retry logic for failed requests
  async retryRequest(endpoint, options, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await this.request(endpoint, options);
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await this.delay(Math.pow(2, i) * 1000); // Exponential backoff
      }
    }
  }

  generateRequestId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  logError(error) {
    // Send to monitoring service (Sentry, LogRocket, etc.)
    console.error('[API Error]', error);
  }
}

// Export singleton instance
export const apiService = new APIService();
```

### Domain-Specific API Modules

```javascript
// src/services/api/auth.api.js
import { apiService } from '../api.service.js';

export const authAPI = {
  login: (credentials) =>
    apiService.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),

  logout: () =>
    apiService.request('/auth/logout', { method: 'POST' }),

  refreshToken: () =>
    apiService.request('/auth/refresh', { method: 'POST' }),

  verifyOTP: (phone, otp) =>
    apiService.request('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, otp })
    })
};

// src/services/api/products.api.js
export const productsAPI = {
  getProducts: (params = {}) =>
    apiService.request(`/products?${new URLSearchParams(params)}`),

  getProductById: (id) =>
    apiService.request(`/products/${id}`),

  searchProducts: (query, filters = {}) =>
    apiService.request('/products/search', {
      method: 'POST',
      body: JSON.stringify({ query, filters })
    }),

  getCategories: () =>
    apiService.request('/categories'),

  getSimilarProducts: (productId) =>
    apiService.request(`/products/${productId}/similar`)
};

// src/services/api/orders.api.js
export const ordersAPI = {
  getOrders: (status, page = 1) =>
    apiService.request(`/orders?status=${status}&page=${page}`),

  getOrderById: (orderId) =>
    apiService.request(`/orders/${orderId}`),

  createOrder: (orderData) =>
    apiService.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    }),

  updateOrderStatus: (orderId, status) =>
    apiService.request(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    }),

  trackOrder: (orderId) =>
    apiService.request(`/orders/${orderId}/tracking`)
};

// src/services/api/rfq.api.js
export const rfqAPI = {
  getRFQs: (filters = {}) =>
    apiService.request(`/rfq?${new URLSearchParams(filters)}`),

  createRFQ: (rfqData) =>
    apiService.request('/rfq', {
      method: 'POST',
      body: JSON.stringify(rfqData)
    }),

  submitQuote: (rfqId, quoteData) =>
    apiService.request(`/rfq/${rfqId}/quotes`, {
      method: 'POST',
      body: JSON.stringify(quoteData)
    }),

  getQuotes: (rfqId) =>
    apiService.request(`/rfq/${rfqId}/quotes`)
};

// src/services/api/messages.api.js
export const messagesAPI = {
  getConversations: () =>
    apiService.request('/messages/conversations'),

  getMessages: (conversationId, page = 1) =>
    apiService.request(`/messages/${conversationId}?page=${page}`),

  sendMessage: (conversationId, message) =>
    apiService.request(`/messages/${conversationId}`, {
      method: 'POST',
      body: JSON.stringify({ message })
    }),

  markAsRead: (conversationId) =>
    apiService.request(`/messages/${conversationId}/read`, {
      method: 'PUT'
    })
};
```

---

## 3. State Management

### Create Centralized State Manager

```javascript
// src/core/state.manager.js
export class StateManager {
  constructor() {
    this.state = {
      user: null,
      cart: [],
      notifications: [],
      products: [],
      orders: [],
      loading: {},
      errors: {}
    };
    this.listeners = new Map();
  }

  // Subscribe to state changes
  subscribe(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key).add(callback);

    // Return unsubscribe function
    return () => {
      this.listeners.get(key).delete(callback);
    };
  }

  // Update state and notify listeners
  setState(key, value) {
    const oldValue = this.state[key];
    this.state[key] = value;

    // Notify listeners
    if (this.listeners.has(key)) {
      this.listeners.get(key).forEach(callback => {
        callback(value, oldValue);
      });
    }

    // Persist to localStorage if needed
    this.persistState(key, value);
  }

  getState(key) {
    return this.state[key];
  }

  // Loading states
  setLoading(key, isLoading) {
    this.setState('loading', {
      ...this.state.loading,
      [key]: isLoading
    });
  }

  isLoading(key) {
    return this.state.loading[key] || false;
  }

  // Error handling
  setError(key, error) {
    this.setState('errors', {
      ...this.state.errors,
      [key]: error
    });
  }

  clearError(key) {
    const errors = { ...this.state.errors };
    delete errors[key];
    this.setState('errors', errors);
  }

  // Persist important state
  persistState(key, value) {
    const persistKeys = ['user', 'cart'];
    if (persistKeys.includes(key)) {
      localStorage.setItem(`airavat_${key}`, JSON.stringify(value));
    }
  }

  // Load persisted state
  loadPersistedState() {
    const persistKeys = ['user', 'cart'];
    persistKeys.forEach(key => {
      const stored = localStorage.getItem(`airavat_${key}`);
      if (stored) {
        try {
          this.state[key] = JSON.parse(stored);
        } catch (e) {
          console.error(`Failed to load ${key}:`, e);
        }
      }
    });
  }
}

// Export singleton
export const stateManager = new StateManager();
```

### React-like Hooks Pattern (Vanilla JS)

```javascript
// src/core/hooks.js
import { stateManager } from './state.manager.js';

export function useState(key, initialValue) {
  const currentValue = stateManager.getState(key) ?? initialValue;

  const setState = (newValue) => {
    stateManager.setState(key, newValue);
  };

  return [currentValue, setState];
}

export function useEffect(callback, dependencies) {
  // Simple effect system
  const unsubscribers = dependencies.map(dep =>
    stateManager.subscribe(dep, callback)
  );

  return () => unsubscribers.forEach(unsub => unsub());
}

export function useAsync(asyncFunction, dependencies = []) {
  const [data, setData] = useState('asyncData', null);
  const [loading, setLoading] = useState('asyncLoading', false);
  const [error, setError] = useState('asyncError', null);

  const execute = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFunction(...args);
      setData(result.data);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute };
}
```

---

## 4. UI/UX Enhancements

### Add Professional Loading States

```javascript
// src/components/loaders/skeleton-loader.js
export class SkeletonLoader {
  static createProductSkeleton() {
    return `
      <div class="skeleton-product">
        <div class="skeleton-image shimmer"></div>
        <div class="skeleton-text shimmer" style="width: 80%;"></div>
        <div class="skeleton-text shimmer" style="width: 60%;"></div>
        <div class="skeleton-text shimmer" style="width: 40%;"></div>
      </div>
    `;
  }

  static createListSkeleton(count = 5) {
    return Array(count)
      .fill(null)
      .map(() => this.createProductSkeleton())
      .join('');
  }
}

// CSS for shimmer effect
/*
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
*/
```

### Infinite Scroll Implementation

```javascript
// src/utils/infinite-scroll.js
export class InfiniteScroll {
  constructor(container, callback, options = {}) {
    this.container = container;
    this.callback = callback;
    this.threshold = options.threshold || 300;
    this.loading = false;
    this.hasMore = true;
    this.page = 1;

    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      { rootMargin: `${this.threshold}px` }
    );

    // Create sentinel element
    this.sentinel = document.createElement('div');
    this.sentinel.className = 'infinite-scroll-sentinel';
    this.container.appendChild(this.sentinel);
    this.observer.observe(this.sentinel);
  }

  async handleIntersection(entries) {
    const entry = entries[0];
    if (entry.isIntersecting && !this.loading && this.hasMore) {
      this.loading = true;
      try {
        const hasMore = await this.callback(this.page);
        this.hasMore = hasMore;
        if (hasMore) this.page++;
      } finally {
        this.loading = false;
      }
    }
  }

  destroy() {
    this.observer.disconnect();
    this.sentinel.remove();
  }
}
```

### Advanced Search with Autocomplete

```javascript
// src/components/search/advanced-search.js
export class AdvancedSearch {
  constructor(inputElement, options = {}) {
    this.input = inputElement;
    this.debounceTime = options.debounceTime || 300;
    this.minChars = options.minChars || 2;
    this.onSearch = options.onSearch;
    this.onSelect = options.onSelect;

    this.debounceTimer = null;
    this.currentResults = [];

    this.init();
  }

  init() {
    this.createDropdown();
    this.attachEventListeners();
  }

  createDropdown() {
    this.dropdown = document.createElement('div');
    this.dropdown.className = 'search-dropdown';
    this.dropdown.style.display = 'none';
    this.input.parentElement.appendChild(this.dropdown);
  }

  attachEventListeners() {
    this.input.addEventListener('input', (e) => this.handleInput(e));
    this.input.addEventListener('focus', () => this.handleFocus());
    this.input.addEventListener('blur', () => this.handleBlur());
    document.addEventListener('click', (e) => this.handleClickOutside(e));
  }

  handleInput(e) {
    const query = e.target.value.trim();

    clearTimeout(this.debounceTimer);

    if (query.length < this.minChars) {
      this.hideDropdown();
      return;
    }

    // Show loading state
    this.showLoading();

    // Debounced search
    this.debounceTimer = setTimeout(async () => {
      try {
        const results = await this.onSearch(query);
        this.currentResults = results;
        this.renderResults(results);
      } catch (error) {
        this.showError('Search failed. Please try again.');
      }
    }, this.debounceTime);
  }

  renderResults(results) {
    if (results.length === 0) {
      this.dropdown.innerHTML = '<div class="search-no-results">No results found</div>';
      this.showDropdown();
      return;
    }

    const html = results.map((item, index) => `
      <div class="search-result-item" data-index="${index}">
        ${item.image ? `<img src="${item.image}" alt="${item.title}" class="search-result-image">` : ''}
        <div class="search-result-content">
          <div class="search-result-title">${this.highlightMatch(item.title, this.input.value)}</div>
          <div class="search-result-category">${item.category}</div>
          ${item.price ? `<div class="search-result-price">${item.price}</div>` : ''}
        </div>
      </div>
    `).join('');

    this.dropdown.innerHTML = html;
    this.showDropdown();

    // Attach click handlers
    this.dropdown.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const index = parseInt(item.dataset.index);
        this.onSelect(this.currentResults[index]);
        this.hideDropdown();
      });
    });
  }

  highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  showLoading() {
    this.dropdown.innerHTML = '<div class="search-loading">Searching...</div>';
    this.showDropdown();
  }

  showError(message) {
    this.dropdown.innerHTML = `<div class="search-error">${message}</div>`;
    this.showDropdown();
  }

  showDropdown() {
    this.dropdown.style.display = 'block';
  }

  hideDropdown() {
    setTimeout(() => {
      this.dropdown.style.display = 'none';
    }, 200);
  }

  handleFocus() {
    if (this.currentResults.length > 0) {
      this.showDropdown();
    }
  }

  handleBlur() {
    this.hideDropdown();
  }

  handleClickOutside(e) {
    if (!this.input.contains(e.target) && !this.dropdown.contains(e.target)) {
      this.hideDropdown();
    }
  }
}
```

### Advanced Filtering System

```javascript
// src/components/filters/advanced-filter.js
export class AdvancedFilter {
  constructor(container, options = {}) {
    this.container = container;
    this.filters = options.filters || [];
    this.onFilterChange = options.onFilterChange;
    this.activeFilters = new Map();

    this.render();
  }

  render() {
    const html = `
      <div class="advanced-filter">
        <div class="filter-header">
          <h3>Filters</h3>
          <button class="filter-clear">Clear All</button>
        </div>
        <div class="filter-sections">
          ${this.filters.map(filter => this.renderFilterSection(filter)).join('')}
        </div>
        <div class="filter-actions">
          <button class="filter-apply">Apply Filters</button>
        </div>
      </div>
    `;
    this.container.innerHTML = html;
    this.attachEventListeners();
  }

  renderFilterSection(filter) {
    switch (filter.type) {
      case 'checkbox':
        return this.renderCheckboxFilter(filter);
      case 'range':
        return this.renderRangeFilter(filter);
      case 'radio':
        return this.renderRadioFilter(filter);
      default:
        return '';
    }
  }

  renderCheckboxFilter(filter) {
    return `
      <div class="filter-section" data-filter="${filter.id}">
        <div class="filter-title">${filter.label}</div>
        <div class="filter-options">
          ${filter.options.map(option => `
            <label class="filter-checkbox">
              <input type="checkbox" value="${option.value}" data-filter="${filter.id}">
              <span>${option.label}</span>
              ${option.count ? `<span class="filter-count">(${option.count})</span>` : ''}
            </label>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderRangeFilter(filter) {
    return `
      <div class="filter-section" data-filter="${filter.id}">
        <div class="filter-title">${filter.label}</div>
        <div class="filter-range">
          <input type="range"
            min="${filter.min}"
            max="${filter.max}"
            value="${filter.min}"
            data-filter="${filter.id}"
            class="range-slider">
          <div class="range-values">
            <span class="range-min">${filter.min}</span>
            <span class="range-max">${filter.max}</span>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    // Handle filter changes
    this.container.querySelectorAll('input[type="checkbox"]').forEach(input => {
      input.addEventListener('change', () => this.updateFilters());
    });

    this.container.querySelectorAll('input[type="range"]').forEach(input => {
      input.addEventListener('input', () => this.updateFilters());
    });

    // Clear all button
    this.container.querySelector('.filter-clear').addEventListener('click', () => {
      this.clearAllFilters();
    });

    // Apply button
    this.container.querySelector('.filter-apply').addEventListener('click', () => {
      this.applyFilters();
    });
  }

  updateFilters() {
    this.activeFilters.clear();

    // Collect checkbox filters
    this.container.querySelectorAll('input[type="checkbox"]:checked').forEach(input => {
      const filterId = input.dataset.filter;
      if (!this.activeFilters.has(filterId)) {
        this.activeFilters.set(filterId, []);
      }
      this.activeFilters.get(filterId).push(input.value);
    });

    // Collect range filters
    this.container.querySelectorAll('input[type="range"]').forEach(input => {
      const filterId = input.dataset.filter;
      this.activeFilters.set(filterId, input.value);
    });
  }

  applyFilters() {
    const filters = Object.fromEntries(this.activeFilters);
    if (this.onFilterChange) {
      this.onFilterChange(filters);
    }
  }

  clearAllFilters() {
    this.activeFilters.clear();
    this.container.querySelectorAll('input[type="checkbox"]').forEach(input => {
      input.checked = false;
    });
    this.container.querySelectorAll('input[type="range"]').forEach(input => {
      input.value = input.min;
    });
    this.applyFilters();
  }
}
```

---

## 5. Performance Optimization

### Image Lazy Loading

```javascript
// src/utils/image-lazy-loader.js
export class ImageLazyLoader {
  constructor(options = {}) {
    this.threshold = options.threshold || 0.1;
    this.rootMargin = options.rootMargin || '50px';
    this.placeholder = options.placeholder || 'data:image/svg+xml,...';

    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: this.threshold,
        rootMargin: this.rootMargin
      }
    );

    this.observeImages();
  }

  observeImages() {
    document.querySelectorAll('img[data-src]').forEach(img => {
      this.observer.observe(img);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        this.loadImage(img);
        this.observer.unobserve(img);
      }
    });
  }

  loadImage(img) {
    const src = img.dataset.src;
    const srcset = img.dataset.srcset;

    // Show loading state
    img.classList.add('loading');

    // Create temp image to preload
    const tempImg = new Image();
    tempImg.onload = () => {
      img.src = src;
      if (srcset) img.srcset = srcset;
      img.classList.remove('loading');
      img.classList.add('loaded');
    };
    tempImg.onerror = () => {
      img.classList.remove('loading');
      img.classList.add('error');
    };
    tempImg.src = src;
  }

  // Usage: <img data-src="image.jpg" src="placeholder.jpg" alt="...">
}

// Auto-initialize
new ImageLazyLoader();
```

### Virtual Scrolling for Large Lists

```javascript
// src/utils/virtual-scroller.js
export class VirtualScroller {
  constructor(container, options = {}) {
    this.container = container;
    this.items = options.items || [];
    this.itemHeight = options.itemHeight || 100;
    this.renderItem = options.renderItem;
    this.bufferSize = options.bufferSize || 5;

    this.init();
  }

  init() {
    this.viewport = document.createElement('div');
    this.viewport.className = 'virtual-scroll-viewport';
    this.viewport.style.height = `${this.container.clientHeight}px`;
    this.viewport.style.overflow = 'auto';

    this.content = document.createElement('div');
    this.content.className = 'virtual-scroll-content';
    this.content.style.height = `${this.items.length * this.itemHeight}px`;

    this.viewport.appendChild(this.content);
    this.container.appendChild(this.viewport);

    this.viewport.addEventListener('scroll', () => this.handleScroll());
    this.render();
  }

  handleScroll() {
    this.render();
  }

  render() {
    const scrollTop = this.viewport.scrollTop;
    const visibleStart = Math.floor(scrollTop / this.itemHeight);
    const visibleEnd = Math.ceil((scrollTop + this.viewport.clientHeight) / this.itemHeight);

    const start = Math.max(0, visibleStart - this.bufferSize);
    const end = Math.min(this.items.length, visibleEnd + this.bufferSize);

    const visibleItems = this.items.slice(start, end);

    this.content.innerHTML = visibleItems
      .map((item, index) => {
        const actualIndex = start + index;
        const top = actualIndex * this.itemHeight;
        return `
          <div class="virtual-item" style="position: absolute; top: ${top}px; height: ${this.itemHeight}px; width: 100%;">
            ${this.renderItem(item, actualIndex)}
          </div>
        `;
      })
      .join('');
  }

  updateItems(newItems) {
    this.items = newItems;
    this.content.style.height = `${this.items.length * this.itemHeight}px`;
    this.render();
  }
}
```

### Caching Strategy

```javascript
// src/core/cache.manager.js
export class CacheManager {
  constructor(options = {}) {
    this.maxAge = options.maxAge || 5 * 60 * 1000; // 5 minutes
    this.maxSize = options.maxSize || 100;
    this.cache = new Map();
  }

  set(key, value, ttl = this.maxAge) {
    // Implement LRU eviction if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      value,
      expiry: Date.now() + ttl
    });
  }

  get(key) {
    const item = this.cache.get(key);

    if (!item) return null;

    // Check if expired
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  has(key) {
    return this.get(key) !== null;
  }

  clear() {
    this.cache.clear();
  }

  // Cache API responses
  async cacheRequest(key, requestFn, ttl) {
    const cached = this.get(key);
    if (cached) return cached;

    const result = await requestFn();
    this.set(key, result, ttl);
    return result;
  }
}

export const cacheManager = new CacheManager();
```

---

## 6. Security Improvements

### JWT Token Management

```javascript
// src/core/auth.manager.js
export class AuthManager {
  constructor() {
    this.tokenKey = 'auth_token';
    this.refreshTokenKey = 'refresh_token';
    this.tokenExpiryKey = 'token_expiry';
  }

  setTokens(accessToken, refreshToken, expiresIn) {
    localStorage.setItem(this.tokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);

    const expiry = Date.now() + (expiresIn * 1000);
    localStorage.setItem(this.tokenExpiryKey, expiry.toString());
  }

  getAccessToken() {
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken() {
    return localStorage.getItem(this.refreshTokenKey);
  }

  isTokenExpired() {
    const expiry = localStorage.getItem(this.tokenExpiryKey);
    if (!expiry) return true;
    return Date.now() > parseInt(expiry);
  }

  async refreshAccessToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });

      const data = await response.json();
      this.setTokens(data.accessToken, data.refreshToken, data.expiresIn);
      return data.accessToken;
    } catch (error) {
      this.clearTokens();
      throw error;
    }
  }

  clearTokens() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.tokenExpiryKey);
  }
}

export const authManager = new AuthManager();
```

### Input Sanitization

```javascript
// src/utils/sanitizer.js
export class Sanitizer {
  static sanitizeHTML(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  }

  static sanitizeInput(input) {
    return input
      .replace(/[<>]/g, '')
      .trim();
  }

  static validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  static validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  }

  static sanitizeURL(url) {
    try {
      const parsed = new URL(url);
      return parsed.href;
    } catch {
      return null;
    }
  }
}
```

---

## 7. Code Quality & Standards

### ESLint Configuration

```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': 'error',
    'curly': 'error',
    'brace-style': ['error', '1tbs'],
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always']
  }
};
```

### Error Boundary

```javascript
// src/core/error-boundary.js
export class ErrorBoundary {
  constructor(container) {
    this.container = container;
    this.setupGlobalErrorHandling();
  }

  setupGlobalErrorHandling() {
    // Catch all JavaScript errors
    window.addEventListener('error', (event) => {
      this.handleError(event.error);
    });

    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError(event.reason);
    });
  }

  handleError(error) {
    console.error('Global error caught:', error);

    // Log to error tracking service
    this.logErrorToService(error);

    // Show user-friendly error message
    this.showErrorUI(error);
  }

  logErrorToService(error) {
    // Send to Sentry, LogRocket, etc.
    // Example: Sentry.captureException(error);
  }

  showErrorUI(error) {
    const errorHTML = `
      <div class="error-boundary">
        <div class="error-icon">⚠️</div>
        <h2>Something went wrong</h2>
        <p>We're sorry for the inconvenience. Please try refreshing the page.</p>
        <button onclick="location.reload()">Refresh Page</button>
      </div>
    `;

    this.container.innerHTML = errorHTML;
  }
}
```

### Logger Service

```javascript
// src/services/logger.service.js
export class Logger {
  static levels = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
  };

  constructor(namespace, minLevel = Logger.levels.INFO) {
    this.namespace = namespace;
    this.minLevel = minLevel;
  }

  debug(...args) {
    if (this.minLevel <= Logger.levels.DEBUG) {
      console.debug(`[${this.namespace}]`, ...args);
    }
  }

  info(...args) {
    if (this.minLevel <= Logger.levels.INFO) {
      console.info(`[${this.namespace}]`, ...args);
    }
  }

  warn(...args) {
    if (this.minLevel <= Logger.levels.WARN) {
      console.warn(`[${this.namespace}]`, ...args);
    }
  }

  error(...args) {
    if (this.minLevel <= Logger.levels.ERROR) {
      console.error(`[${this.namespace}]`, ...args);
      // Send to error tracking
      this.sendToErrorTracking(args);
    }
  }

  sendToErrorTracking(args) {
    // Send to monitoring service
  }
}

// Usage
const logger = new Logger('ProductService');
logger.info('Loading products...');
```

---

## 8. Modern Features

### WebSocket for Real-time Updates

```javascript
// src/services/websocket.service.js
export class WebSocketService {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.listeners = new Map();
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.emit('connected');
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.emit('error', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.emit('disconnected');
      this.attemptReconnect();
    };
  }

  handleMessage(data) {
    const { type, payload } = data;
    this.emit(type, payload);
  }

  send(type, payload) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    } else {
      console.warn('WebSocket not connected');
    }
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => callback(data));
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

// Usage
const ws = new WebSocketService('wss://api.airavat.com/ws');
ws.connect();

ws.on('new_message', (message) => {
  console.log('New message:', message);
  // Update UI
});

ws.on('order_update', (order) => {
  console.log('Order updated:', order);
  // Update UI
});
```

### Service Worker for Offline Support

```javascript
// public/service-worker.js
const CACHE_NAME = 'airavat-v1';
const urlsToCache = [
  '/',
  '/css/style.css',
  '/css/dashboard.css',
  '/js/main.js',
  '/images/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          return response;
        });
      })
  );
});

// Register in main app
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/service-worker.js');
// }
```

### Push Notifications

```javascript
// src/services/notification.service.js
export class NotificationService {
  async requestPermission() {
    if (!('Notification' in window)) {
      console.warn('Notifications not supported');
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  async subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    });

    // Send subscription to server
    await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription)
    });

    return subscription;
  }

  showNotification(title, options = {}) {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/images/logo.png',
        badge: '/images/badge.png',
        ...options
      });
    }
  }

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
```

---

## 9. Data & Search

### Elasticsearch-like Search Implementation

```javascript
// src/services/search.service.js
export class SearchService {
  constructor() {
    this.index = new Map();
    this.documents = new Map();
  }

  // Index a document
  indexDocument(id, document) {
    this.documents.set(id, document);

    // Build inverted index
    Object.keys(document).forEach(field => {
      const value = document[field];
      if (typeof value === 'string') {
        const tokens = this.tokenize(value);
        tokens.forEach(token => {
          if (!this.index.has(token)) {
            this.index.set(token, new Set());
          }
          this.index.get(token).add(id);
        });
      }
    });
  }

  // Tokenize text
  tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(token => token.length > 0);
  }

  // Search with ranking
  search(query, options = {}) {
    const tokens = this.tokenize(query);
    const scores = new Map();

    tokens.forEach(token => {
      if (this.index.has(token)) {
        this.index.get(token).forEach(docId => {
          const score = scores.get(docId) || 0;
          scores.set(docId, score + 1);
        });
      }
    });

    // Sort by relevance
    const results = Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([docId, score]) => ({
        id: docId,
        document: this.documents.get(docId),
        score
      }));

    // Apply filters
    if (options.filters) {
      return this.applyFilters(results, options.filters);
    }

    return results.slice(0, options.limit || 20);
  }

  applyFilters(results, filters) {
    return results.filter(result => {
      return Object.keys(filters).every(key => {
        const filterValue = filters[key];
        const docValue = result.document[key];

        if (Array.isArray(filterValue)) {
          return filterValue.includes(docValue);
        }
        return docValue === filterValue;
      });
    });
  }
}
```

---

## 10. Implementation Priority

### Phase 1: Foundation (Week 1-2)
1. ✅ Set up Vite build system
2. ✅ Convert to ES6 modules
3. ✅ Create API service layer
4. ✅ Implement state management
5. ✅ Set up error handling

### Phase 2: Core Features (Week 3-4)
1. ✅ Integrate real APIs
2. ✅ Add loading states (skeletons)
3. ✅ Implement advanced search
4. ✅ Add filtering system
5. ✅ Image lazy loading

### Phase 3: Performance (Week 5)
1. ✅ Virtual scrolling
2. ✅ Caching strategy
3. ✅ Code splitting
4. ✅ Bundle optimization

### Phase 4: Advanced Features (Week 6-7)
1. ✅ WebSocket integration
2. ✅ Push notifications
3. ✅ Service Worker
4. ✅ Offline support

### Phase 5: Polish (Week 8)
1. ✅ Testing
2. ✅ Documentation
3. ✅ Performance auditing
4. ✅ Security review

---

## 📊 Success Metrics

After implementation, the platform should achieve:

- ⚡ **Performance**: Lighthouse score > 90
- 🎨 **UI/UX**: Professional, smooth animations
- 🔒 **Security**: JWT auth, XSS protection, HTTPS
- 📱 **Responsive**: Works on all devices
- ♿ **Accessible**: WCAG 2.1 AA compliant
- 🚀 **Fast**: < 2s initial load, < 100ms interactions
- 📈 **Scalable**: Handles 10,000+ products efficiently

---

## 🎯 Next Steps

1. Review this plan
2. Set up development environment
3. Start with Phase 1
4. Iterate and improve
5. Get feedback and refine

This plan will transform Airavat into a professional, enterprise-grade B2B platform! 🚀
