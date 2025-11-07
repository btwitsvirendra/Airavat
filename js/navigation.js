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
        { icon: '🏠', text: 'Home', link: 'index.html' },
        { icon: '👤', text: 'My Profile', link: 'profile.html' },
        { icon: '📦', text: 'Orders', link: 'orders.html' },
        { icon: '💬', text: 'Messages', link: 'messages.html' },
        { icon: '📋', text: 'RFQ', link: 'rfq.html' },
        { icon: '💰', text: 'Payments', link: 'payments.html' },
        { icon: '🚚', text: 'Logistics', link: 'logistics.html' }
      ];
    } else {
      // Seller menu items
      menuItems = [
        { icon: '🏠', text: 'Home', link: 'index.html' },
        { icon: '👤', text: 'My Profile', link: 'seller-profile.html' },
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

    // Setup logout handler and menu item navigation
    setTimeout(() => {
      const logoutBtn = document.getElementById('dropdownLogout');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleLogout();
        });
      }

      // Ensure dropdown menu items navigate properly
      const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
      dropdownItems.forEach(item => {
        if (item.id !== 'dropdownLogout') {
          item.addEventListener('click', (e) => {
            // Allow the link to navigate normally
            const href = item.getAttribute('href');
            if (href && href !== '#') {
              window.location.href = href;
            }
          });
        }
      });
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

// Add styles for account dropdown
const style = document.createElement('style');
style.textContent = `
  .account-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 280px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    animation: dropdownSlideIn 0.2s ease;
  }

  @keyframes dropdownSlideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    color: var(--soft-grey);
    text-decoration: none;
    transition: background 0.2s ease;
  }

  .dropdown-item:hover {
    background: var(--light-grey);
  }

  .dropdown-icon {
    font-size: 18px;
    width: 24px;
    text-align: center;
  }

  .dropdown-text {
    font-size: 14px;
    font-weight: 500;
  }

  .dropdown-separator {
    height: 1px;
    background: var(--border-grey);
    margin: 8px 0;
  }

  .account-icon {
    position: relative;
  }

  .register-modal-overlay {
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

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .register-modal {
    background: white;
    border-radius: 16px;
    padding: 40px;
    max-width: 450px;
    text-align: center;
    animation: modalSlideIn 0.3s ease;
  }

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .register-modal-icon {
    font-size: 64px;
    margin-bottom: 20px;
  }

  .register-modal-title {
    font-size: 24px;
    font-weight: 700;
    color: var(--soft-grey);
    margin-bottom: 16px;
  }

  .register-modal-description {
    font-size: 15px;
    color: var(--text-grey);
    line-height: 1.6;
    margin-bottom: 32px;
  }

  .register-modal-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
  }

  .modal-btn {
    padding: 12px 32px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
  }

  .modal-btn-cancel {
    background: var(--light-grey);
    color: var(--soft-grey);
  }

  .modal-btn-cancel:hover {
    background: #e0e0e0;
  }

  .modal-btn-primary {
    background: var(--primary-teal);
    color: white;
  }

  .modal-btn-primary:hover {
    background: #0ab3ba;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(13, 196, 203, 0.3);
  }
`;
document.head.appendChild(style);

// Initialize navigation on ALL pages
document.addEventListener('DOMContentLoaded', () => {
  if (sessionManager.checkAuth()) {
    new NavigationManager();
  }
});
