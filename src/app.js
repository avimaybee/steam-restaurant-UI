import { loadHeader, loadFooter, updateAuthLinks } from './components.js';
import { store } from './store.js';
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

function initializeMobileMenu() {
    const openMenu = () => {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        if (!mobileMenu || !mobileMenuButton) return;

        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('open');
        mobileMenuButton.setAttribute('aria-expanded', 'true');
        document.body.classList.add('body-no-scroll');
        const firstFocusable = mobileMenu.querySelector('a, button');
        if (firstFocusable) firstFocusable.focus();
    };

    const closeMenu = () => {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        if (!mobileMenu || !mobileMenuButton) return;

        mobileMenu.classList.remove('open');
        mobileMenu.addEventListener('transitionend', () => {
            mobileMenu.classList.add('hidden');
        }, { once: true });
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('body-no-scroll');
        mobileMenuButton.focus();
    };

    // Use event delegation for all interactions
    document.body.addEventListener('click', (e) => {
        // Handle menu button click
        if (e.target.closest('#mobile-menu-button')) {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            if (mobileMenuButton) {
                const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
                isExpanded ? closeMenu() : openMenu();
            }
        }

        // Handle menu link click
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('open') && e.target.tagName === 'A' && mobileMenu.contains(e.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu || !mobileMenu.classList.contains('open')) return;

        // Handle Escape key
        if (e.key === 'Escape') {
            closeMenu();
        }

        // Handle Tab key for focus trapping
        if (e.key === 'Tab') {
            const focusableElements = mobileMenu.querySelectorAll('a, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

function setActiveNavLink() {
    const navLinks = document.querySelectorAll('#main-header nav a, #mobile-menu nav a');
    const currentPageUrl = window.location.pathname;
    navLinks.forEach(link => {
        if (new URL(link.href).pathname === currentPageUrl) {
            link.classList.add('active-link');
        }
    });
}

function initializeThemeSwitcher() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const themeToggleDarkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
    const themeToggleLightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');

    if (!themeToggleBtn) return;

    const updateIcons = (theme) => {
        const isDark = theme === 'dark';
        themeToggleDarkIcon.classList.toggle('hidden', !isDark);
        themeToggleLightIcon.classList.toggle('hidden', isDark);
        themeToggleDarkIconMobile.classList.toggle('hidden', !isDark);
        themeToggleLightIconMobile.classList.toggle('hidden', isDark);
    };

    let theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    updateIcons(theme);

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcons(newTheme);
    };

    themeToggleBtn.addEventListener('click', toggleTheme);
    themeToggleMobileBtn.addEventListener('click', toggleTheme);
}

function setupLogout() {
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('#logout-btn, #logout-btn-mobile')) {
            store.logout();
            updateAuthLinks();
            if (window.location.pathname.endsWith('profile.html')) {
                window.location.href = 'login.html';
            }
        }
    });
}

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