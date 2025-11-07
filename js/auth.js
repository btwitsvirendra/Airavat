// Authentication Logic for Airavat B2B E-commerce Platform

// Valid phone number for demo (can be extended to multiple numbers or API validation)
const VALID_PHONE = '9352787989';

document.addEventListener('DOMContentLoaded', function() {

  // Check if user is already logged in
  if (sessionManager.checkAuth()) {
    // Redirect to home page if already authenticated
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'sign-in.html' || currentPage === 'create-account.html') {
      console.log('User already logged in, redirecting to home...');
      window.location.href = 'index.html';
      return;
    }
  }

  // Initialize authentication UI
  initAuthUI();
});

/**
 * Initialize Authentication UI and Event Listeners
 */
function initAuthUI() {
  // Phone Modal Elements
  const phoneModal = document.getElementById('phoneModal');
  const phoneButton = document.getElementById('phoneButton');
  const phoneInput = document.getElementById('phoneInput');
  const submitPhoneBtn = document.getElementById('submitPhone');
  const cancelPhoneBtn = document.getElementById('cancelPhone');
  const errorMessage = document.getElementById('errorMessage');

  // Show phone modal when clicking "Continue with Phone"
  if (phoneButton) {
    phoneButton.addEventListener('click', function() {
      openPhoneModal();
    });
  }

  // Cancel button
  if (cancelPhoneBtn) {
    cancelPhoneBtn.addEventListener('click', function() {
      closePhoneModal();
    });
  }

  // Close modal on background click
  if (phoneModal) {
    phoneModal.addEventListener('click', function(e) {
      if (e.target === phoneModal) {
        closePhoneModal();
      }
    });
  }

  // Submit phone number
  if (submitPhoneBtn) {
    submitPhoneBtn.addEventListener('click', function() {
      validateAndLogin();
    });
  }

  // Enter key to submit
  if (phoneInput) {
    phoneInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        validateAndLogin();
      }
    });

    // Only allow numbers
    phoneInput.addEventListener('input', function(e) {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
  }

  // Social login buttons (placeholder functionality)
  const socialButtons = document.querySelectorAll('.auth-button-social');
  socialButtons.forEach(button => {
    button.addEventListener('click', function() {
      showNotification('Social login will be implemented in production. Use phone login with: 9352787989', 'info');
    });
  });

  // Email continue button
  const emailContinueBtn = document.getElementById('emailContinue');
  const emailInput = document.getElementById('emailInput');

  if (emailContinueBtn && emailInput) {
    emailContinueBtn.addEventListener('click', function() {
      handleEmailContinue();
    });

    emailInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleEmailContinue();
      }
    });
  }
}

/**
 * Open Phone Modal
 */
function openPhoneModal() {
  const phoneModal = document.getElementById('phoneModal');
  const phoneInput = document.getElementById('phoneInput');
  const errorMessage = document.getElementById('errorMessage');

  if (phoneModal) {
    phoneModal.classList.add('active');
    if (phoneInput) {
      phoneInput.focus();
      phoneInput.value = '';
    }
    if (errorMessage) {
      errorMessage.classList.remove('active');
    }
  }
}

/**
 * Close Phone Modal
 */
function closePhoneModal() {
  const phoneModal = document.getElementById('phoneModal');
  const phoneInput = document.getElementById('phoneInput');
  const errorMessage = document.getElementById('errorMessage');

  if (phoneModal) {
    phoneModal.classList.remove('active');
  }
  if (phoneInput) {
    phoneInput.value = '';
    phoneInput.classList.remove('error');
  }
  if (errorMessage) {
    errorMessage.classList.remove('active');
  }
}

/**
 * Validate and Login with Phone Number
 */
function validateAndLogin() {
  const phoneInput = document.getElementById('phoneInput');
  const phone = phoneInput.value.trim();

  // Validate phone number
  if (phone === '') {
    showError('Please enter your phone number');
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    showError('Please enter a valid 10-digit phone number');
    return;
  }

  if (phone !== VALID_PHONE) {
    showError('Invalid phone number. Demo number: 9352787989');
    return;
  }

  // Show loading state
  const submitBtn = document.getElementById('submitPhone');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Logging in...';
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  // Simulate API call delay
  setTimeout(() => {
    // Login successful
    sessionManager.login(phone);

    // Show success message
    showNotification('Login successful! Welcome back.', 'success');

    // Redirect to home page after short delay
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 500);
  }, 1000);
}

/**
 * Handle Email Continue
 */
function handleEmailContinue() {
  const emailInput = document.getElementById('emailInput');
  const email = emailInput ? emailInput.value.trim() : '';

  if (!email) {
    showNotification('Please enter your email address', 'error');
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }

  // For demo, show message to use phone login
  showNotification('Email login will be implemented in production. Use phone login with: 9352787989', 'info');
}

/**
 * Show Error Message in Modal
 * @param {string} message - Error message to display
 */
function showError(message) {
  const errorMessage = document.getElementById('errorMessage');
  const phoneInput = document.getElementById('phoneInput');

  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.classList.add('active');
  }

  if (phoneInput) {
    phoneInput.classList.add('error');
  }

  // Remove error after 3 seconds
  setTimeout(() => {
    if (errorMessage) {
      errorMessage.classList.remove('active');
    }
    if (phoneInput) {
      phoneInput.classList.remove('error');
    }
  }, 3000);
}

/**
 * Show Notification Toast
 * @param {string} message - Notification message
 * @param {string} type - Type of notification (success, error, info)
 */
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#E53935' : '#0DC4CB'};
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    max-width: 350px;
    font-size: 14px;
    line-height: 1.5;
  `;
  notification.textContent = message;

  // Add animation styles if not already present
  if (!document.querySelector('style[data-notification]')) {
    const style = document.createElement('style');
    style.dataset.notification = 'true';
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
  }

  document.body.appendChild(notification);

  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

/**
 * Format phone number for display
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
function formatPhoneNumber(phone) {
  if (!phone || phone.length !== 10) return phone;
  return `+91 ${phone.substring(0, 5)} ${phone.substring(5)}`;
}
