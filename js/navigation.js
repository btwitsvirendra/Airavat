// Global Navigation Manager - Airavat B2B E-commerce Platform
// Handles role-based navigation, interface switching, and account dropdowns

/**
 * NavigationManager Class
 * Manages global navigation with role-based menus
 */
class NavigationManager {
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
    if (sessionManager.checkAuth()) {
      this.updateAccountIcon();
      this.setupAccountDropdown();
      this.setupInterfaceSwitch();
      this.highlightActivePage();
    }
  }

  updateAccountIcon() {
    const user = sessionManager.getUser();
    const accountText = document.getElementById('accountText');
    if (accountText && user) {
      const firstName = user.name.split(' ')[0];
      accountText.textContent = firstName;
    }
  }

  setupAccountDropdown() {
    const accountIcon = document.getElementById('accountIcon');
    if (!accountIcon) return;

    accountIcon.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleAccountDropdown();
    });
  }

  toggleAccountDropdown() {
    // Remove existing dropdown
    const existing = document.querySelector('.account-dropdown');
    if (existing) {
      existing.remove();
      return;
    }

    const dropdown = this.createAccountDropdown();
    const accountIcon = document.getElementById('accountIcon');
    accountIcon.appendChild(dropdown);

    // Close on outside click
    setTimeout(() => {
      document.addEventListener('click', function closeDropdown(e) {
        if (!accountIcon.contains(e.target)) {
          dropdown.remove();
          document.removeEventListener('click', closeDropdown);
        }
      });
    }, 0);
  }

  createAccountDropdown() {
    const currentInterface = sessionManager.getCurrentInterface();
    const role = sessionManager.getRole();
    const user = sessionManager.getUser();

    const dropdown = document.createElement('div');
    dropdown.className = 'account-dropdown';

    let menuItems = [];

    if (currentInterface === 'buyer' || !currentInterface) {
      // Buyer menu items
      menuItems = [
        { icon: '🏠', text: 'Home', link: 'profile.html' },
        { icon: '📦', text: 'Orders', link: 'orders.html' },
        { icon: '💬', text: 'Messages', link: 'messages.html' },
        { icon: '📋', text: 'RFQ', link: 'rfq.html' },
        { icon: '💰', text: 'Payments', link: 'payments.html' },
        { icon: '🚚', text: 'Logistics', link: 'logistics.html' }
      ];
    } else {
      // Seller menu items
      menuItems = [
        { icon: '🏠', text: 'Home', link: 'seller-profile.html' },
        { icon: '📦', text: 'Orders', link: 'orders.html' },
        { icon: '💬', text: 'Messages', link: 'seller-messages.html' },
        { icon: '📋', text: 'RFQ', link: 'seller-rfq.html' },
        { icon: '💰', text: 'Payments', link: 'seller-payments.html' },
        { icon: '🚚', text: 'Transport', link: 'logistics.html' },
        { icon: '💼', text: 'Sales', link: 'seller-sales.html' },
        { icon: '📊', text: 'Inventory', link: 'seller-inventory.html' },
        { icon: '📈', text: 'Grow', link: 'seller-grow.html' }
      ];
    }

    // Build dropdown HTML
    let html = `
      <div style="padding: 16px 20px; border-bottom: 1px solid var(--border-grey);">
        <div style="font-size: 16px; font-weight: 700; color: var(--regal-blue);">${user.name}</div>
        <div style="font-size: 13px; color: var(--text-grey); margin-top: 4px;">${user.email}</div>
        <div style="font-size: 12px; color: var(--text-grey); margin-top: 4px;">ID: ${user.memberId}</div>
      </div>
    `;

    menuItems.forEach(item => {
      html += `
        <a href="${item.link}" class="dropdown-item">
          <span class="dropdown-icon">${item.icon}</span>
          <span class="dropdown-text">${item.text}</span>
        </a>
      `;
    });

    html += `
      <div class="dropdown-separator"></div>
      <a href="#" class="dropdown-item" id="dropdownLogout">
        <span class="dropdown-icon">🚪</span>
        <span class="dropdown-text">Logout</span>
      </a>
    `;

    dropdown.innerHTML = html;

    // Setup logout handler
    setTimeout(() => {
      const logoutBtn = document.getElementById('dropdownLogout');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleLogout();
        });
      }
    }, 0);

    return dropdown;
  }

  setupInterfaceSwitch() {
    const switchContainer = document.getElementById('switchContainer');
    if (!switchContainer) return;

    const role = sessionManager.getRole();
    const currentInterface = sessionManager.getCurrentInterface();

    // Only show for sellers or on dashboard pages
    if (role !== 'seller') {
      switchContainer.style.display = 'none';
      return;
    }

    switchContainer.innerHTML = `
      <div class="interface-switch">
        <div class="switch-label ${currentInterface === 'buyer' ? 'active' : ''}">
          Buy
        </div>
        <div class="switch-toggle" id="interfaceToggle">
          <div class="switch-slider ${currentInterface === 'seller' ? 'seller-mode' : ''}"></div>
        </div>
        <div class="switch-label ${currentInterface === 'seller' ? 'active' : ''}">
          Sell
        </div>
      </div>
    `;

    // Handle toggle click
    const toggle = document.getElementById('interfaceToggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        this.handleInterfaceSwitch();
      });
    }
  }

  handleInterfaceSwitch() {
    const currentInterface = sessionManager.getCurrentInterface();
    const newInterface = currentInterface === 'buyer' ? 'seller' : 'buyer';

    const result = sessionManager.switchInterface(newInterface);

    if (!result.success) {
      if (result.message === 'register') {
        this.showRegisterModal();
      } else {
        alert('You do not have permission to switch interfaces.');
      }
      return;
    }

    // Switch successful - redirect to appropriate dashboard
    if (newInterface === 'seller') {
      window.location.href = 'seller-profile.html';
    } else {
      window.location.href = 'profile.html';
    }
  }

  showRegisterModal() {
    // Remove existing modal if any
    const existing = document.querySelector('.register-modal-overlay');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'register-modal-overlay';
    modal.innerHTML = `
      <div class="register-modal">
        <div class="register-modal-icon">🏪</div>
        <h2 class="register-modal-title">Register as Seller</h2>
        <p class="register-modal-description">
          You need to register as a seller to access seller features.
          Start selling your products on Airavat today!
        </p>
        <div class="register-modal-buttons">
          <button class="modal-btn modal-btn-cancel" id="cancelRegister">
            Cancel
          </button>
          <button class="modal-btn modal-btn-primary" id="registerNow">
            Register Now
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Handle cancel
    document.getElementById('cancelRegister').addEventListener('click', () => {
      modal.remove();
    });

    // Handle register
    document.getElementById('registerNow').addEventListener('click', () => {
      modal.remove();
      alert('Seller registration will be implemented. For demo, use phone: 9352787951');
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  highlightActivePage() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
      const itemPage = item.getAttribute('data-page');
      if (itemPage === this.currentPage) {
        item.classList.add('active');
      }
    });
  }

  handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
      sessionManager.logout();
      window.location.href = 'index.html';
    }
  }
}

// Initialize navigation on dashboard pages
document.addEventListener('DOMContentLoaded', () => {
  // Check if on dashboard page
  const isDashboardPage = document.querySelector('.dashboard-container') !== null;

  if (isDashboardPage && sessionManager.checkAuth()) {
    new NavigationManager();
  }
});
