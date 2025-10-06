import { loadHeader, loadFooter, updateAuthLinks } from './components.js';
import { store } from './store.js';
import { setActiveNavLink } from './utils.js';
import { initializeMobileMenu } from './mobile-menu.js';
import { initializeThemeSwitcher } from './theme.js';
import { setupLogout } from './auth.js';
import { initMenuPage } from './pages/menu.js';
import { initOrderPage } from './pages/order.js';
import { initAdminPage } from './pages/admin.js';
import { initLoginPage } from './pages/login.js';
import { initRegisterPage } from './pages/register.js';
import { initProfilePage } from './pages/profile.js';
import { initOrderTrackingPage } from './pages/order-tracking.js';
import { initAnalyticsPage } from './pages/analytics.js';
import { initLandingPage } from './pages/landing.js';
import { initCheckoutPage } from './pages/checkout.js';
import { initVouchersPage } from './pages/vouchers.js';
import { initGalleryPage } from './pages/gallery.js';
import { initAboutPage } from './pages/about.js';
import { initContactPage } from './pages/contact.js';


async function initApp() {
    // Wait for header and footer to load before initializing dependent components
    await Promise.all([loadHeader(), loadFooter()]);

    // Now that the header and footer are loaded, we can initialize everything else.
    initializeMobileMenu();
    setActiveNavLink();
    initializeThemeSwitcher();
    updateAuthLinks();
    setupLogout();

    const path = window.location.pathname;
    const pageInitializers = {
        '/our-menu.html': initMenuPage,
        '/order-page.html': initOrderPage,
        '/admin.html': initAdminPage,
        '/login.html': initLoginPage,
        '/register.html': initRegisterPage,
        '/profile.html': initProfilePage,
        '/order-tracking.html': initOrderTrackingPage,
        '/analytics.html': initAnalyticsPage,
        '/landing-page.html': initLandingPage,
        '/checkout.html': initCheckoutPage,
        '/gift-vouchers.html': initVouchersPage,
        '/gallery.html': initGalleryPage,
        '/about-us.html': initAboutPage,
        '/get-in-touch.html': initContactPage
    };

    const initializer = Object.keys(pageInitializers).find(key => path.endsWith(key));
    if (initializer) {
        pageInitializers[initializer]();
    }
}

document.addEventListener('DOMContentLoaded', initApp);