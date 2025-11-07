// Enhanced Session Management with Roles - Airavat B2B E-commerce Platform

/**
 * SessionManager Class
 * Handles user authentication, session storage, role management, and interface switching
 */
class SessionManager {
  constructor() {
    this.isAuthenticated = false;
    this.user = null;
    this.role = null; // 'buyer' or 'seller'
    this.currentInterface = null; // 'buyer' or 'seller'
    this.sessionKey = 'airavat_session';
    this.init();
  }

  /**
   * Initialize session manager
   * Checks for existing session in localStorage
   */
  init() {
    const savedSession = localStorage.getItem(this.sessionKey);
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        if (this.isSessionValid(session)) {
          this.isAuthenticated = true;
          this.user = session.user;
          this.role = session.role;
          this.currentInterface = session.currentInterface || session.role;
          console.log(`Session restored: ${this.user.name} (${this.role})`);
        } else {
          console.log('Session expired, clearing...');
          this.logout();
        }
      } catch (error) {
        console.error('Error parsing session:', error);
        this.logout();
      }
    }
  }

  /**
   * Check if session is still valid (less than 24 hours old)
   * @param {Object} session - Session object from localStorage
   * @returns {boolean}
   */
  isSessionValid(session) {
    if (!session || !session.timestamp || !session.user || !session.role) {
      return false;
    }

    const now = new Date().getTime();
    const sessionAge = now - session.timestamp;
    const twentyFourHours = 24 * 60 * 60 * 1000;

    return sessionAge < twentyFourHours;
  }

  /**
   * Determine user role based on phone number
   * @param {string} phoneNumber - User's phone number
   * @returns {string} - 'buyer' or 'seller'
   */
  determineRole(phoneNumber) {
    // Buyer account
    if (phoneNumber === '9352787989') {
      return 'buyer';
    }
    // Seller account
    else if (phoneNumber === '9352787951') {
      return 'seller';
    }
    // Default to buyer for any other number
    return 'buyer';
  }

  /**
   * Login user and create session
   * @param {string} phoneNumber - User's phone number
   * @returns {Object} User object
   */
  login(phoneNumber) {
    this.isAuthenticated = true;
    this.role = this.determineRole(phoneNumber);
    this.currentInterface = this.role;

    // Create user object based on role
    if (this.role === 'seller') {
      this.user = {
        phone: phoneNumber,
        name: 'Virendra Singh',
        memberId: 'SE8641784306743287',
        email: 'virendra.seller@airavat.com',
        role: 'seller',
        registeredAsSeller: true,
        verified: true,
        joinDate: '2024-01-15',
        companyName: 'Virendra Enterprises',
        gst: 'GSTIN1234567890'
      };
    } else {
      this.user = {
        phone: phoneNumber,
        name: 'Virendra Singh',
        memberId: 'SE8641784306743287',
        email: 'virendra@airavat.com',
        role: 'buyer',
        registeredAsSeller: false,
        verified: true,
        joinDate: '2024-01-15'
      };
    }

    // Save to localStorage
    const session = {
      user: this.user,
      role: this.role,
      currentInterface: this.currentInterface,
      timestamp: new Date().getTime()
    };

    try {
      localStorage.setItem(this.sessionKey, JSON.stringify(session));
      console.log(`User logged in: ${this.user.name} as ${this.role}`);
    } catch (error) {
      console.error('Error saving session:', error);
    }

    return this.user;
  }

  /**
   * Switch between buyer and seller interfaces
   * @param {string} newInterface - 'buyer' or 'seller'
   * @returns {Object} - Result object with success status and message
   */
  switchInterface(newInterface) {
    // Validate interface value
    if (newInterface !== 'buyer' && newInterface !== 'seller') {
      return { success: false, message: 'invalid' };
    }

    // Only sellers can switch to seller interface
    if (newInterface === 'seller' && this.role !== 'seller') {
      return {
        success: false,
        message: 'register',
        title: 'Register as Seller',
        description: 'You need to register as a seller to access seller features. Start selling your products on Airavat today!'
      };
    }

    // Sellers can switch between buyer and seller interfaces
    if (this.role === 'seller') {
      this.currentInterface = newInterface;

      // Update session in localStorage
      const savedSession = localStorage.getItem(this.sessionKey);
      if (savedSession) {
        try {
          const session = JSON.parse(savedSession);
          session.currentInterface = newInterface;
          localStorage.setItem(this.sessionKey, JSON.stringify(session));
          console.log(`Switched to ${newInterface} interface`);
        } catch (error) {
          console.error('Error updating interface:', error);
        }
      }

      return { success: true, interface: newInterface };
    }

    // Buyers can't switch to seller interface
    return {
      success: false,
      message: 'unauthorized',
      description: 'You do not have permission to access seller features.'
    };
  }

  /**
   * Get current interface
   * @returns {string|null} - 'buyer', 'seller', or null
   */
  getCurrentInterface() {
    return this.currentInterface;
  }

  /**
   * Get user role
   * @returns {string|null} - 'buyer', 'seller', or null
   */
  getRole() {
    return this.role;
  }

  /**
   * Check if user can access seller features
   * @returns {boolean}
   */
  canAccessSellerFeatures() {
    return this.role === 'seller';
  }

  /**
   * Check if currently in seller interface
   * @returns {boolean}
   */
  isSellerInterface() {
    return this.currentInterface === 'seller';
  }

  /**
   * Check if currently in buyer interface
   * @returns {boolean}
   */
  isBuyerInterface() {
    return this.currentInterface === 'buyer';
  }

  /**
   * Logout user and clear session
   */
  logout() {
    this.isAuthenticated = false;
    this.user = null;
    this.role = null;
    this.currentInterface = null;

    try {
      localStorage.removeItem(this.sessionKey);
      console.log('User logged out');
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  }

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  checkAuth() {
    return this.isAuthenticated;
  }

  /**
   * Get current user data
   * @returns {Object|null} User object or null if not logged in
   */
  getUser() {
    return this.user;
  }

  /**
   * Update user information
   * @param {Object} userData - Updated user data
   * @returns {boolean}
   */
  updateUser(userData) {
    if (!this.isAuthenticated) {
      console.error('Cannot update user: not authenticated');
      return false;
    }

    this.user = { ...this.user, ...userData };

    // Update localStorage
    const session = {
      user: this.user,
      role: this.role,
      currentInterface: this.currentInterface,
      timestamp: new Date().getTime()
    };

    try {
      localStorage.setItem(this.sessionKey, JSON.stringify(session));
      console.log('User data updated');
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  }

  /**
   * Get session age in milliseconds
   * @returns {number|null}
   */
  getSessionAge() {
    const savedSession = localStorage.getItem(this.sessionKey);
    if (!savedSession) return null;

    try {
      const session = JSON.parse(savedSession);
      return new Date().getTime() - session.timestamp;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get remaining session time in milliseconds
   * @returns {number|null}
   */
  getRemainingTime() {
    const age = this.getSessionAge();
    if (age === null) return null;

    const twentyFourHours = 24 * 60 * 60 * 1000;
    const remaining = twentyFourHours - age;

    return remaining > 0 ? remaining : 0;
  }

  /**
   * Refresh session timestamp (extend session)
   * @returns {boolean}
   */
  refreshSession() {
    if (!this.isAuthenticated) return false;

    const session = {
      user: this.user,
      role: this.role,
      currentInterface: this.currentInterface,
      timestamp: new Date().getTime()
    };

    try {
      localStorage.setItem(this.sessionKey, JSON.stringify(session));
      console.log('Session refreshed');
      return true;
    } catch (error) {
      console.error('Error refreshing session:', error);
      return false;
    }
  }
}

// Create global session instance
const sessionManager = new SessionManager();

// Auto-refresh session on user activity
let activityTimeout;
function resetActivityTimer() {
  clearTimeout(activityTimeout);
  activityTimeout = setTimeout(() => {
    if (sessionManager.checkAuth()) {
      sessionManager.refreshSession();
    }
  }, 5 * 60 * 1000); // Refresh every 5 minutes of activity
}

// Listen for user activity
if (typeof document !== 'undefined') {
  ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetActivityTimer, true);
  });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SessionManager;
}
