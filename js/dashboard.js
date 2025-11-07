// Dashboard Interactivity Manager - Airavat B2B E-commerce Platform
// Handles all interactive elements, buttons, forms, and dynamic content

/**
 * DashboardManager Class
 * Manages all interactive features across dashboard pages
 */
class DashboardManager {
  constructor() {
    this.currentPage = this.getCurrentPage();
    this.init();
  }

  getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page.replace('.html', '');
  }

  init() {
    this.setupGlobalHandlers();
    this.setupPageSpecificHandlers();
    this.setupNotifications();
  }

  // ==================== GLOBAL HANDLERS ====================

  setupGlobalHandlers() {
    // Header navigation items
    this.setupHeaderNavigation();

    // Search functionality
    this.setupSearch();

    // Category links
    this.setupCategoryLinks();

    // Cart functionality
    this.setupCart();

    // Language selector
    this.setupLanguageSelector();

    // Copy to clipboard
    this.setupCopyButtons();

    // Quick action buttons
    this.setupQuickActions();
  }

  setupHeaderNavigation() {
    // Messages button
    const messagesButtons = document.querySelectorAll('[aria-label="Messages"], .nav-item:has(.nav-icon:contains("💬"))');
    messagesButtons.forEach(btn => {
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (sessionManager.checkAuth()) {
          const role = sessionManager.getRole();
          window.location.href = role === 'seller' ? 'seller-messages.html' : 'messages.html';
        } else {
          this.showNotification('Please sign in to access messages', 'info');
          setTimeout(() => window.location.href = 'sign-in.html', 1000);
        }
      });
    });

    // Discover button
    const discoverLinks = document.querySelectorAll('.nav-link, .category-link');
    discoverLinks.forEach(link => {
      if (link.textContent.includes('Discover')) {
        link.style.cursor = 'pointer';
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.showNotification('Discover page - Coming soon!', 'info');
        });
      }
      if (link.textContent.includes('RFQ') && !link.href) {
        link.style.cursor = 'pointer';
        link.addEventListener('click', (e) => {
          e.preventDefault();
          if (sessionManager.checkAuth()) {
            const role = sessionManager.getRole();
            window.location.href = role === 'seller' ? 'seller-rfq.html' : 'rfq.html';
          } else {
            this.showNotification('Please sign in to access RFQ', 'info');
            setTimeout(() => window.location.href = 'sign-in.html', 1000);
          }
        });
      }
      if (link.textContent.includes('Trade Protection')) {
        link.style.cursor = 'pointer';
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.showNotification('Trade Protection - Learn about buyer and seller protection', 'info');
        });
      }
    });

    // Become a merchant link
    const merchantLinks = document.querySelectorAll('a, .nav-item');
    merchantLinks.forEach(link => {
      if (link.textContent.includes('Become a merchant')) {
        link.style.cursor = 'pointer';
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.showNotification('Seller registration will be implemented. For demo, use: 9352787951', 'info');
        });
      }
    });

    // Help Center, About, Contact Us links
    const infoLinks = document.querySelectorAll('.nav-link');
    infoLinks.forEach(link => {
      if (link.textContent === 'About') {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.showNotification('About Airavat - B2B E-commerce Platform', 'info');
        });
      }
      if (link.textContent === 'Contact Us') {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.showNotification('Contact: support@airavat.com | +91 1800-XXX-XXXX', 'info');
        });
      }
      if (link.textContent === 'Help Center') {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.showNotification('Help Center - FAQs and Support', 'info');
        });
      }
    });
  }

  setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');

    if (searchInput && searchButton) {
      searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
          this.performSearch(query);
        }
      });

      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const query = searchInput.value.trim();
          if (query) {
            this.performSearch(query);
          }
        }
      });
    }
  }

  performSearch(query) {
    this.showNotification(`Searching for: "${query}"`, 'info');
    // In a real app, this would redirect to search results
    console.log('Search query:', query);
  }

  setupCategoryLinks() {
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.textContent.trim();
        this.showNotification(`Browsing ${category} category`, 'info');
      });
    });
  }

  setupCart() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
      cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        this.showNotification('Cart is empty', 'info');
      });
    }
  }

  setupLanguageSelector() {
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
      languageSelector.addEventListener('change', (e) => {
        const language = e.target.value;
        const languageNames = {
          'en': 'English',
          'hi': 'हिंदी',
          'ta': 'தமிழ்',
          'te': 'తెలుగు'
        };
        this.showNotification(`Language changed to ${languageNames[language]}`, 'success');
      });
    }
  }

  setupCopyButtons() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.btn-secondary') && e.target.textContent.includes('Copy')) {
        e.preventDefault();
        this.showNotification('Link copied to clipboard!', 'success');
      }
    });
  }

  setupQuickActions() {
    // Handle all button clicks with notifications
    document.addEventListener('click', (e) => {
      const button = e.target.closest('button');
      if (!button) return;

      const buttonText = button.textContent.trim();

      // Track Order
      if (buttonText === 'Track' || buttonText === 'Track Order') {
        e.preventDefault();
        this.showNotification('Opening tracking details...', 'info');
      }

      // Contact Seller/Buyer
      if (buttonText.includes('Contact Seller') || buttonText.includes('Contact Buyer')) {
        e.preventDefault();
        this.showNotification('Opening chat...', 'info');
        setTimeout(() => {
          window.location.href = 'messages.html';
        }, 500);
      }

      // View Details
      if (buttonText === 'View' || buttonText === 'View Details') {
        e.preventDefault();
        this.showNotification('Loading details...', 'info');
      }

      // Edit Profile/Product
      if (buttonText === 'Edit' || buttonText.includes('Edit Profile')) {
        e.preventDefault();
        this.showNotification('Edit mode activated', 'info');
      }

      // Support
      if (buttonText.includes('Support') || buttonText.includes('Contact Support')) {
        e.preventDefault();
        this.showNotification('Support chat opened', 'success');
      }
    });
  }

  // ==================== PAGE-SPECIFIC HANDLERS ====================

  setupPageSpecificHandlers() {
    switch (this.currentPage) {
      case 'profile':
      case 'seller-profile':
        this.setupProfilePage();
        break;
      case 'orders':
        this.setupOrdersPage();
        break;
      case 'messages':
      case 'seller-messages':
        this.setupMessagesPage();
        break;
      case 'payments':
      case 'seller-payments':
        this.setupPaymentsPage();
        break;
      case 'rfq':
      case 'seller-rfq':
        this.setupRFQPage();
        break;
      case 'rfq-post':
        this.setupRFQPostPage();
        break;
      case 'logistics':
        this.setupLogisticsPage();
        break;
      case 'seller-inventory':
        this.setupInventoryPage();
        break;
      case 'seller-sales':
        this.setupSalesPage();
        break;
      case 'seller-grow':
        this.setupGrowPage();
        break;
    }
  }

  setupProfilePage() {
    // Complete Profile button
    const completeProfileBtn = document.querySelector('button[onclick*="Complete"]');
    if (completeProfileBtn) {
      completeProfileBtn.onclick = null;
      completeProfileBtn.addEventListener('click', () => {
        this.showNotification('Profile completion form loading...', 'info');
      });
    }

    // Rate Product buttons
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.includes('Rate Product')) {
        btn.addEventListener('click', () => {
          this.showRatingModal();
        });
      }
      if (btn.textContent === 'Reorder') {
        btn.addEventListener('click', () => {
          this.showNotification('Adding items to cart...', 'success');
        });
      }
    });
  }

  setupOrdersPage() {
    // Already has filter functionality
    console.log('Orders page interactive features loaded');
  }

  setupMessagesPage() {
    // Send message
    const sendButtons = document.querySelectorAll('button');
    sendButtons.forEach(btn => {
      if (btn.textContent === 'Send') {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const input = document.querySelector('input[placeholder*="message"]');
          if (input && input.value.trim()) {
            this.sendMessage(input.value);
            input.value = '';
          }
        });
      }
    });

    // Quick reply buttons
    document.querySelectorAll('button[style*="border-radius: 20px"]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.showNotification('Quick reply sent!', 'success');
      });
    });
  }

  setupPaymentsPage() {
    // Add Money button
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.includes('Add Money')) {
        btn.addEventListener('click', () => {
          this.showAddMoneyModal();
        });
      }
      if (btn.textContent === 'Withdraw' || btn.textContent.includes('Withdraw to Bank')) {
        btn.addEventListener('click', () => {
          this.showWithdrawModal();
        });
      }
      if (btn.textContent.includes('Add New')) {
        btn.addEventListener('click', () => {
          this.showNotification('Payment method form loading...', 'info');
        });
      }
    });
  }

  setupRFQPage() {
    // Accept Quote buttons
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.includes('Accept Quote')) {
        btn.addEventListener('click', () => {
          this.acceptQuote();
        });
      }
      if (btn.textContent.includes('Send Quote')) {
        btn.addEventListener('click', () => {
          this.showSendQuoteModal();
        });
      }
    });
  }

  setupRFQPostPage() {
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitRFQ(form);
      });
    }
  }

  setupLogisticsPage() {
    // Live Track buttons
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.includes('Live Track')) {
        btn.addEventListener('click', () => {
          this.showNotification('Live tracking map loading...', 'info');
        });
      }
      if (btn.textContent.includes('Call')) {
        btn.addEventListener('click', () => {
          this.showNotification('Initiating call...', 'info');
        });
      }
    });
  }

  setupInventoryPage() {
    // Edit product buttons
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent === 'Edit') {
        btn.addEventListener('click', () => {
          this.showNotification('Product edit form loading...', 'info');
        });
      }
    });

    // Search and filters
    const searchInput = document.querySelector('input[placeholder*="Search products"]');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        // Debounced search would go here
        console.log('Searching inventory:', e.target.value);
      });
    }
  }

  setupSalesPage() {
    console.log('Sales analytics page loaded');
  }

  setupGrowPage() {
    // Growth tool buttons
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.includes('Start Campaign')) {
        btn.addEventListener('click', () => {
          this.showNotification('Campaign setup wizard opening...', 'success');
        });
      }
      if (btn.textContent.includes('Learn More')) {
        btn.addEventListener('click', () => {
          this.showNotification('Opening detailed information...', 'info');
        });
      }
      if (btn.textContent.includes('Check Eligibility')) {
        btn.addEventListener('click', () => {
          this.showNotification('Checking loan eligibility...', 'info');
        });
      }
    });
  }

  // ==================== MODAL FUNCTIONS ====================

  showRatingModal() {
    const modal = this.createModal('Rate Product', `
      <div style="text-align: center;">
        <div style="font-size: 48px; margin-bottom: 20px;">⭐⭐⭐⭐⭐</div>
        <p style="margin-bottom: 20px; color: var(--text-grey);">How would you rate this product?</p>
        <textarea placeholder="Write your review..." style="width: 100%; padding: 12px; border: 1px solid var(--border-grey); border-radius: 8px; margin-bottom: 20px; min-height: 100px;"></textarea>
        <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove(); dashboardManager.showNotification('Review submitted successfully!', 'success')">Submit Review</button>
      </div>
    `);
    document.body.appendChild(modal);
  }

  showAddMoneyModal() {
    const modal = this.createModal('Add Money to Wallet', `
      <div>
        <input type="number" placeholder="Enter amount (₹)" style="width: 100%; padding: 12px; border: 1px solid var(--border-grey); border-radius: 8px; margin-bottom: 16px; font-size: 16px;">
        <select style="width: 100%; padding: 12px; border: 1px solid var(--border-grey); border-radius: 8px; margin-bottom: 20px;">
          <option>Select Payment Method</option>
          <option>HDFC Bank Card</option>
          <option>Net Banking - SBI</option>
          <option>UPI</option>
        </select>
        <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove(); dashboardManager.showNotification('₹5000 added to wallet successfully!', 'success')" style="width: 100%;">Add Money</button>
      </div>
    `);
    document.body.appendChild(modal);
  }

  showWithdrawModal() {
    const modal = this.createModal('Withdraw to Bank', `
      <div>
        <p style="margin-bottom: 16px; color: var(--text-grey);">Available Balance: <strong style="color: var(--primary-teal);">₹8,24,500</strong></p>
        <input type="number" placeholder="Enter amount (₹)" style="width: 100%; padding: 12px; border: 1px solid var(--border-grey); border-radius: 8px; margin-bottom: 16px; font-size: 16px;">
        <div style="background: var(--light-grey); padding: 12px; border-radius: 8px; margin-bottom: 20px;">
          <div style="font-size: 12px; color: var(--text-grey); margin-bottom: 4px;">Withdrawing to</div>
          <div style="font-weight: 600;">HDFC Bank •••• 4532</div>
        </div>
        <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove(); dashboardManager.showNotification('Withdrawal request submitted!', 'success')" style="width: 100%;">Withdraw</button>
      </div>
    `);
    document.body.appendChild(modal);
  }

  showSendQuoteModal() {
    const modal = this.createModal('Send Quote to Buyer', `
      <div>
        <input type="number" placeholder="Unit Price (₹)" style="width: 100%; padding: 12px; border: 1px solid var(--border-grey); border-radius: 8px; margin-bottom: 12px;">
        <input type="number" placeholder="Total Amount (₹)" style="width: 100%; padding: 12px; border: 1px solid var(--border-grey); border-radius: 8px; margin-bottom: 12px;">
        <input type="number" placeholder="Delivery Days" style="width: 100%; padding: 12px; border: 1px solid var(--border-grey); border-radius: 8px; margin-bottom: 12px;">
        <textarea placeholder="Additional notes..." style="width: 100%; padding: 12px; border: 1px solid var(--border-grey); border-radius: 8px; margin-bottom: 20px; min-height: 80px;"></textarea>
        <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove(); dashboardManager.showNotification('Quote sent successfully!', 'success')" style="width: 100%;">Send Quote</button>
      </div>
    `);
    document.body.appendChild(modal);
  }

  createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
      </div>
    `;

    // Close on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    return modal;
  }

  acceptQuote() {
    if (confirm('Are you sure you want to accept this quote and proceed with the order?')) {
      this.showNotification('Quote accepted! Redirecting to checkout...', 'success');
      setTimeout(() => {
        this.showNotification('Order placed successfully!', 'success');
      }, 1500);
    }
  }

  submitRFQ(form) {
    const formData = new FormData(form);
    const productName = form.querySelector('input[placeholder*="Product"]').value;

    if (!productName) {
      this.showNotification('Please enter product name', 'error');
      return;
    }

    this.showNotification('Posting RFQ...', 'info');
    setTimeout(() => {
      this.showNotification('RFQ posted successfully!', 'success');
      setTimeout(() => {
        window.location.href = 'rfq.html';
      }, 1000);
    }, 1000);
  }

  sendMessage(message) {
    this.showNotification('Message sent!', 'success');
    console.log('Sending message:', message);
  }

  // ==================== NOTIFICATION SYSTEM ====================

  setupNotifications() {
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.2s ease;
      }

      .modal-content {
        background: white;
        border-radius: 16px;
        width: 90%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
        animation: modalSlideIn 0.3s ease;
      }

      .modal-header {
        padding: 24px 24px 16px 24px;
        border-bottom: 1px solid var(--border-grey);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .modal-title {
        font-size: 20px;
        font-weight: 700;
        color: var(--soft-grey);
        margin: 0;
      }

      .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        color: var(--text-grey);
        cursor: pointer;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s ease;
      }

      .modal-close:hover {
        background: var(--light-grey);
      }

      .modal-body {
        padding: 24px;
      }

      .notification {
        position: fixed;
        top: 24px;
        right: 24px;
        background: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 12px;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
      }

      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .notification.success {
        border-left: 4px solid var(--success-green);
      }

      .notification.error {
        border-left: 4px solid var(--error-red);
      }

      .notification.info {
        border-left: 4px solid var(--primary-teal);
      }

      .notification-icon {
        font-size: 24px;
      }

      .notification-text {
        font-size: 14px;
        font-weight: 500;
        color: var(--soft-grey);
      }
    `;
    document.head.appendChild(style);
  }

  showNotification(message, type = 'info') {
    const icons = {
      success: '✅',
      error: '❌',
      info: 'ℹ️'
    };

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-icon">${icons[type]}</div>
      <div class="notification-text">${message}</div>
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideInRight 0.3s ease reverse';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
}

// Initialize dashboard manager
let dashboardManager;
document.addEventListener('DOMContentLoaded', () => {
  dashboardManager = new DashboardManager();
  console.log('✨ Dashboard interactive features loaded');
});
