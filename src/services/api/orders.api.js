/**
 * Orders API Module
 * Handles all order-related API calls
 */

import { apiService } from '../api.service.js';

export const ordersAPI = {
  /**
   * Get user's orders
   * @param {Object} params - Query parameters
   * @returns {Promise}
   */
  getOrders(params = {}) {
    const defaultParams = {
      page: 1,
      limit: 20,
      status: 'all', // all, pending, processing, shipped, delivered, cancelled
      ...params
    };
    return apiService.get('/orders', defaultParams);
  },

  /**
   * Get order by ID
   * @param {string} orderId
   * @returns {Promise}
   */
  getOrderById(orderId) {
    return apiService.get(`/orders/${orderId}`);
  },

  /**
   * Create new order
   * @param {Object} orderData
   * @returns {Promise}
   */
  createOrder(orderData) {
    return apiService.post('/orders', orderData);
  },

  /**
   * Update order status
   * @param {string} orderId
   * @param {string} status
   * @returns {Promise}
   */
  updateOrderStatus(orderId, status) {
    return apiService.patch(`/orders/${orderId}/status`, { status });
  },

  /**
   * Cancel order
   * @param {string} orderId
   * @param {string} reason
   * @returns {Promise}
   */
  cancelOrder(orderId, reason) {
    return apiService.post(`/orders/${orderId}/cancel`, { reason });
  },

  /**
   * Track order shipment
   * @param {string} orderId
   * @returns {Promise}
   */
  trackOrder(orderId) {
    return apiService.get(`/orders/${orderId}/tracking`);
  },

  /**
   * Get order invoice
   * @param {string} orderId
   * @returns {Promise}
   */
  getInvoice(orderId) {
    return apiService.get(`/orders/${orderId}/invoice`);
  },

  /**
   * Download order invoice
   * @param {string} orderId
   * @returns {Promise}
   */
  downloadInvoice(orderId) {
    return apiService.get(`/orders/${orderId}/invoice/download`, {}, {
      headers: { 'Accept': 'application/pdf' }
    });
  },

  /**
   * Request order return
   * @param {string} orderId
   * @param {Object} returnData
   * @returns {Promise}
   */
  requestReturn(orderId, returnData) {
    return apiService.post(`/orders/${orderId}/return`, returnData);
  },

  /**
   * Get order return status
   * @param {string} orderId
   * @returns {Promise}
   */
  getReturnStatus(orderId) {
    return apiService.get(`/orders/${orderId}/return`);
  },

  /**
   * Rate order/seller
   * @param {string} orderId
   * @param {Object} ratingData
   * @returns {Promise}
   */
  rateOrder(orderId, ratingData) {
    return apiService.post(`/orders/${orderId}/rating`, ratingData);
  },

  /**
   * Reorder (create new order from existing)
   * @param {string} orderId
   * @returns {Promise}
   */
  reorder(orderId) {
    return apiService.post(`/orders/${orderId}/reorder`);
  },

  /**
   * Get order statistics
   * @param {Object} params
   * @returns {Promise}
   */
  getOrderStats(params = {}) {
    return apiService.get('/orders/statistics', params);
  }
};

export default ordersAPI;
