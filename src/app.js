import { loadHeader, loadFooter, updateAuthLinks } from './components.js';
import { store } from './store.js';
import { setActiveNavLink } from './utils.js';
import { initializeMobileMenu } from './mobile-menu.js';

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
import { initReservationsPage } from './pages/reservations.js';
import { initBackToTopButton, initScrollAnimations, initRippleEffect, initHeroAnimation } from './ui.js';


async function initApp() {
    // Header and footer are now part of the static HTML.
    // We can initialize everything directly.
    initializeMobileMenu();
    setActiveNavLink();
    initBackToTopButton();
    initScrollAnimations();
    initRippleEffect();

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
        '/get-in-touch.html': initContactPage,
        '/table-reservations.html': initReservationsPage
    };

    const initializer = Object.keys(pageInitializers).find(key => path.endsWith(key));
    if (initializer) {
        pageInitializers[initializer]();
    }

    if (window.location.pathname.endsWith('/landing-page.html')) {
        initHeroAnimation();
    }
}

document.addEventListener('DOMContentLoaded', initApp);