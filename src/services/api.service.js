/**
 * Professional API Service Layer
 * Handles all HTTP requests with retry logic, error handling, and caching
 */

class APIService {
  constructor() {
    // Use environment variable in production, fallback for development
    this.baseURL = import.meta?.env?.VITE_API_URL || 'https://api.airavat.com/v1';
    this.timeout = 30000;
    this.retryAttempts = 3;
    this.retryDelay = 1000;
  }

  /**
   * Get authentication token
   */
  getToken() {
    return localStorage.getItem('auth_token');
  }

  /**
   * Generate unique request ID for tracking
   */
  generateRequestId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Build request headers
   */
  buildHeaders(customHeaders = {}) {
    const token = this.getToken();

    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Client-Version': '1.0.0',
      'X-Request-ID': this.generateRequestId(),
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...customHeaders
    };
  }

  /**
   * Main request method with timeout and abort controller
   */
  async request(endpoint, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    const config = {
      method: options.method || 'GET',
      headers: this.buildHeaders(options.headers),
      signal: controller.signal,
      ...(options.body && { body: JSON.stringify(options.body) })
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      clearTimeout(timeoutId);

      // Handle different response types
      if (!response.ok) {
        throw await this.handleErrorResponse(response);
      }

      const data = await response.json();
      return this.handleSuccessResponse(data);

    } catch (error) {
      clearTimeout(timeoutId);

      // Handle timeout
      if (error.name === 'AbortError') {
        throw this.createError('Request timeout', 'TIMEOUT', 408);
      }

      throw error;
    }
  }

  /**
   * Request with automatic retry logic
   */
  async requestWithRetry(endpoint, options = {}, maxRetries = this.retryAttempts) {
    let lastError;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await this.request(endpoint, options);
      } catch (error) {
        lastError = error;

        // Don't retry on client errors (4xx) or auth errors
        if (error.status >= 400 && error.status < 500) {
          throw error;
        }

        // Wait before retrying (exponential backoff)
        if (attempt < maxRetries - 1) {
          await this.delay(this.retryDelay * Math.pow(2, attempt));
          console.log(`Retry attempt ${attempt + 1}/${maxRetries} for ${endpoint}`);
        }
      }
    }

    throw lastError;
  }

  /**
   * Handle successful response
   */
  handleSuccessResponse(data) {
    return {
      success: true,
      data: data.data || data,
      meta: data.meta || {},
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Handle error response
   */
  async handleErrorResponse(response) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }

    const error = this.createError(
      errorData.message || 'An error occurred',
      errorData.code || 'API_ERROR',
      response.status,
      errorData.errors
    );

    // Log error for monitoring
    this.logError(error, response);

    return error;
  }

  /**
   * Create standardized error object
   */
  createError(message, code, status, details = null) {
    const error = new Error(message);
    error.code = code;
    error.status = status;
    error.details = details;
    error.timestamp = new Date().toISOString();
    return error;
  }

  /**
   * Log errors to monitoring service
   */
  logError(error, response = null) {
    const errorLog = {
      message: error.message,
      code: error.code,
      status: error.status,
      url: response?.url,
      timestamp: error.timestamp,
      userAgent: navigator.userAgent
    };

    console.error('[API Error]', errorLog);

    // TODO: Send to monitoring service (Sentry, LogRocket, etc.)
    // Sentry.captureException(error);
  }

  /**
   * Utility: Delay promise
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * GET request
   */
  async get(endpoint, params = {}, options = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.requestWithRetry(url, { method: 'GET', ...options });
  }

  /**
   * POST request
   */
  async post(endpoint, body = {}, options = {}) {
    return this.requestWithRetry(endpoint, {
      method: 'POST',
      body,
      ...options
    });
  }

  /**
   * PUT request
   */
  async put(endpoint, body = {}, options = {}) {
    return this.requestWithRetry(endpoint, {
      method: 'PUT',
      body,
      ...options
    });
  }

  /**
   * PATCH request
   */
  async patch(endpoint, body = {}, options = {}) {
    return this.requestWithRetry(endpoint, {
      method: 'PATCH',
      body,
      ...options
    });
  }

  /**
   * DELETE request
   */
  async delete(endpoint, options = {}) {
    return this.requestWithRetry(endpoint, {
      method: 'DELETE',
      ...options
    });
  }

  /**
   * Upload file with progress tracking
   */
  async uploadFile(endpoint, file, onProgress = null) {
    const formData = new FormData();
    formData.append('file', file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      if (onProgress) {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percentComplete = (e.loaded / e.total) * 100;
            onProgress(percentComplete);
          }
        });
      }

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(this.createError('Upload failed', 'UPLOAD_ERROR', xhr.status));
        }
      });

      xhr.addEventListener('error', () => {
        reject(this.createError('Upload failed', 'NETWORK_ERROR', 0));
      });

      xhr.open('POST', `${this.baseURL}${endpoint}`);
      xhr.setRequestHeader('Authorization', `Bearer ${this.getToken()}`);
      xhr.send(formData);
    });
  }
}

// Export singleton instance
export const apiService = new APIService();

// Export class for testing
export { APIService };
