import { loadHeader, loadFooter } from './components.js';
import { initMenuPage } from './pages/menu.js';
import { initOrderPage } from './pages/order.js';

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

async function initApp() {
    await loadHeader();
    await loadFooter();

    // Initialize components that are loaded dynamically
    initializeMobileMenu();
    setActiveNavLink();
    initializeScrollAnimations();
    applyFadeInAnimation();

    // Page-specific initializations
    const path = window.location.pathname;
    if (path.endsWith('our-menu.html')) {
        initMenuPage();
    }
    if (path.endsWith('order-page.html')) {
        initOrderPage();
    }
}

document.addEventListener('DOMContentLoaded', initApp);