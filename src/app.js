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

function translatePage() {
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
        const key = el.dataset.i18nKey;
        const replacements = el.dataset.i18nReplacements ? JSON.parse(el.dataset.i18nReplacements) : {};
        el.innerHTML = store.get(key, replacements);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        el.placeholder = store.get(key);
    });
}

async function initializeI18n() {
    store.initLanguage();
    await store.loadTranslations();
    translatePage();

    const langSelect = document.getElementById('language-select');
    const langSelectMobile = document.getElementById('language-select-mobile');

    if (langSelect) {
        langSelect.value = store.state.currentLanguage;
        langSelect.addEventListener('change', async (e) => {
            await store.setLanguage(e.target.value);
            window.location.reload(); // Simple way to re-render everything
        });
    }
    if (langSelectMobile) {
        langSelectMobile.value = store.state.currentLanguage;
        langSelectMobile.addEventListener('change', async (e) => {
            await store.setLanguage(e.target.value);
            window.location.reload();
        });
    }
}

function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        const menuLinks = mobileMenu.querySelectorAll('a');
        if (menuLinks.length === 0) return;
        const firstLink = menuLinks[0];
        const lastLink = menuLinks[menuLinks.length - 1];

        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');

            if (!isExpanded) {
                firstLink.focus();
            }
        });

        mobileMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstLink) {
                        e.preventDefault();
                        lastLink.focus();
                    }
                } else { // Tab
                    if (document.activeElement === lastLink) {
                        e.preventDefault();
                        firstLink.focus();
                    }
                }
            }
        });
    }
}

function setActiveNavLink() {
    const navLinks = document.querySelectorAll('#main-header nav a, #mobile-menu nav a');
    const currentPageUrl = window.location.pathname;

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPageUrl) {
            link.classList.add('active-link');
        }
    });
}

function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate');
    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function applyFadeInAnimation() {
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('fade-in');
    }
}

function initializeThemeSwitcher() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');

    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const themeToggleDarkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
    const themeToggleLightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');

    if (!themeToggleBtn) return;

    // Function to update icon visibility
    const updateIcons = (theme) => {
        if (theme === 'dark') {
            themeToggleDarkIcon.classList.remove('hidden');
            themeToggleLightIcon.classList.add('hidden');
            themeToggleDarkIconMobile.classList.remove('hidden');
            themeToggleLightIconMobile.classList.add('hidden');
        } else {
            themeToggleDarkIcon.classList.add('hidden');
            themeToggleLightIcon.classList.remove('hidden');
            themeToggleDarkIconMobile.classList.add('hidden');
            themeToggleLightIconMobile.classList.remove('hidden');
        }
    };

    // Check for saved theme in localStorage or use system preference
    let theme = localStorage.getItem('theme');
    if (!theme) {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

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

function handle404() {
    const validPageNames = [
        '/',
        'index.html',
        'about-us.html',
        'admin.html',
        'gallery.html',
        'get-in-touch.html',
        'gift-vouchers.html',
        'landing-page.html',
        'login.html',
        'profile.html',
        'register.html',
        'order-page.html',
        'order-tracking.html',
        'our-menu.html',
        'table-reservations.html',
        'analytics.html',
        '404.html'
    ];

    const currentPath = window.location.pathname.split('/').pop();

    if (!validPageNames.includes(currentPath)) {
        // This is a client-side fallback for servers that don't handle 404s correctly.
        // A properly configured server would serve the 404.html page directly.
        // We check if the body has content other than the header/footer.
        const mainContent = document.querySelector('main');
        if (!mainContent || mainContent.children.length === 0) {
             window.location.href = '404.html';
        }
    }
}

function setupLogout() {
    // Use event delegation on a parent element
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('#logout-btn') || e.target.matches('#logout-btn-mobile')) {
            store.logout();
            updateAuthLinks();
            if (document.getElementById('profile-page')) {
                window.location.href = 'login.html';
            }
        }
    });
}

async function initApp() {
    await initializeI18n();

    await loadHeader();
    await loadFooter();

    // Initialize components that are loaded dynamically
    initializeMobileMenu();
    setActiveNavLink();
    initializeScrollAnimations();
    applyFadeInAnimation();
    initializeThemeSwitcher();
    updateAuthLinks();
    setupLogout();

    handle404();

    // Page-specific initializations
    const path = window.location.pathname;
    if (path.endsWith('our-menu.html')) initMenuPage();
    if (path.endsWith('order-page.html')) initOrderPage();
    if (path.endsWith('admin.html')) initAdminPage();
    if (path.endsWith('login.html')) initLoginPage();
    if (path.endsWith('register.html')) initRegisterPage();
    if (path.endsWith('profile.html')) initProfilePage();
    if (path.endsWith('order-tracking.html')) initOrderTrackingPage();
    if (path.endsWith('analytics.html')) initAnalyticsPage();
    if (path.endsWith('landing-page.html')) initLandingPage();
}

document.addEventListener('DOMContentLoaded', initApp);