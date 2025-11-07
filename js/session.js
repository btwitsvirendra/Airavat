// Session Management for Airavat B2B E-commerce Platform

/**
 * SessionManager Class
 * Handles user authentication, session storage, and validation
 */
class SessionManager {
  constructor() {
    this.isAuthenticated = false;
    this.user = null;
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
          console.log('Session restored:', this.user.name);
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
    if (!session || !session.timestamp || !session.user) {
      return false;
    }

    const now = new Date().getTime();
    const sessionAge = now - session.timestamp;
    const twentyFourHours = 24 * 60 * 60 * 1000;

    return sessionAge < twentyFourHours;
  }

  /**
   * Login user and create session
   * @param {string} phoneNumber - User's phone number
   * @returns {Object} User object
   */
  login(phoneNumber) {
    this.isAuthenticated = true;
    this.user = {
      phone: phoneNumber,
      name: 'Virendra Singh',
      memberId: 'SE8641784306743287',
      email: 'virendra@airavat.com',
      joinDate: '2024-01-15',
      verified: true
    };

    // Save to localStorage
    const session = {
      user: this.user,
      timestamp: new Date().getTime()
    };

    try {
      localStorage.setItem(this.sessionKey, JSON.stringify(session));
      console.log('User logged in:', this.user.name);
    } catch (error) {
      console.error('Error saving session:', error);
    }

    return this.user;
  }

  /**
   * Logout user and clear session
   */
  logout() {
    this.isAuthenticated = false;
    this.user = null;

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
   */
  refreshSession() {
    if (!this.isAuthenticated) return false;

    const session = {
      user: this.user,
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

// Auto-refresh session on user activity (optional)
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
