/**
 * Products API Module
 * Handles all product-related API calls
 */

import { apiService } from '../api.service.js';

export const productsAPI = {
  /**
   * Get paginated products list
   * @param {Object} params - Query parameters
   * @returns {Promise}
   */
  getProducts(params = {}) {
    const defaultParams = {
      page: 1,
      limit: 20,
      sortBy: 'createdAt',
      order: 'desc',
      ...params
    };
    return apiService.get('/products', defaultParams);
  },

  /**
   * Get product by ID
   * @param {string} productId
   * @returns {Promise}
   */
  getProductById(productId) {
    return apiService.get(`/products/${productId}`);
  },

  /**
   * Search products with filters
   * @param {string} query - Search query
   * @param {Object} filters - Filter options
   * @returns {Promise}
   */
  searchProducts(query, filters = {}) {
    return apiService.post('/products/search', {
      query,
      filters,
      page: filters.page || 1,
      limit: filters.limit || 20
    });
  },

  /**
   * Get product categories
   * @returns {Promise}
   */
  getCategories() {
    return apiService.get('/categories');
  },

  /**
   * Get category by ID with products
   * @param {string} categoryId
   * @param {Object} params
   * @returns {Promise}
   */
  getCategoryProducts(categoryId, params = {}) {
    return apiService.get(`/categories/${categoryId}/products`, params);
  },

  /**
   * Get similar/related products
   * @param {string} productId
   * @param {number} limit
   * @returns {Promise}
   */
  getSimilarProducts(productId, limit = 10) {
    return apiService.get(`/products/${productId}/similar`, { limit });
  },

  /**
   * Get recommended products for user
   * @param {number} limit
   * @returns {Promise}
   */
  getRecommendedProducts(limit = 10) {
    return apiService.get('/products/recommended', { limit });
  },

  /**
   * Get trending products
   * @param {number} limit
   * @returns {Promise}
   */
  getTrendingProducts(limit = 10) {
    return apiService.get('/products/trending', { limit });
  },

  /**
   * Get product reviews
   * @param {string} productId
   * @param {Object} params
   * @returns {Promise}
   */
  getProductReviews(productId, params = {}) {
    return apiService.get(`/products/${productId}/reviews`, params);
  },

  /**
   * Add product review
   * @param {string} productId
   * @param {Object} reviewData
   * @returns {Promise}
   */
  addProductReview(productId, reviewData) {
    return apiService.post(`/products/${productId}/reviews`, reviewData);
  },

  /**
   * Get product specifications
   * @param {string} productId
   * @returns {Promise}
   */
  getProductSpecs(productId) {
    return apiService.get(`/products/${productId}/specifications`);
  },

  /**
   * Check product availability
   * @param {string} productId
   * @param {number} quantity
   * @param {string} location
   * @returns {Promise}
   */
  checkAvailability(productId, quantity, location) {
    return apiService.post(`/products/${productId}/check-availability`, {
      quantity,
      location
    });
  },

  /**
   * Get bulk pricing for product
   * @param {string} productId
   * @returns {Promise}
   */
  getBulkPricing(productId) {
    return apiService.get(`/products/${productId}/bulk-pricing`);
  },

  /**
   * Request product quote
   * @param {string} productId
   * @param {Object} quoteData
   * @returns {Promise}
   */
  requestQuote(productId, quoteData) {
    return apiService.post(`/products/${productId}/quote`, quoteData);
  },

  /**
   * Add product to wishlist
   * @param {string} productId
   * @returns {Promise}
   */
  addToWishlist(productId) {
    return apiService.post('/wishlist', { productId });
  },

  /**
   * Remove product from wishlist
   * @param {string} productId
   * @returns {Promise}
   */
  removeFromWishlist(productId) {
    return apiService.delete(`/wishlist/${productId}`);
  },

  /**
   * Get user's wishlist
   * @returns {Promise}
   */
  getWishlist() {
    return apiService.get('/wishlist');
  },

  /**
   * Compare products
   * @param {Array<string>} productIds
   * @returns {Promise}
   */
  compareProducts(productIds) {
    return apiService.post('/products/compare', { productIds });
  }
};

export default productsAPI;
