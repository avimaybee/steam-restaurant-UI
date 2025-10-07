/**
 * Fetches and injects an HTML component into a specified element.
 * @param {string} componentPath - The path to the HTML component file.
 * @param {string} elementId - The ID of the element to inject the component into.
 * @returns {Promise<void>}
 */
async function loadComponent(componentPath, elementId) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = data;
        } else {
            
        }
    } catch (error) {
        
    }
}

/**
 * Loads the header component and initializes its functionality.
 */
export async function loadHeader() {
    await loadComponent('header.html', 'main-header');

    const headerWrapper = document.getElementById('header-wrapper');
    if (headerWrapper) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                headerWrapper.classList.add('scrolled');
            } else {
                headerWrapper.classList.remove('scrolled');
            }
        });
    }
    updateCartCount();
}

/**
 * Updates the authentication links in the header based on user login status.
 */
import { store } from './store.js';

export function updateCartCount() {
    const cart = store.getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartItemCount = document.getElementById('cart-item-count');
    const cartItemCountMobile = document.getElementById('cart-item-count-mobile');

    const update = (element) => {
        if (!element) return;
        if (totalItems > 0) {
            element.textContent = totalItems;
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    };

    update(cartItemCount);
    update(cartItemCountMobile);
}

export function updateAuthLinks() {
    const user = store.getCurrentUser();
    const authLinks = document.getElementById('auth-links');
    const authLinksMobile = document.getElementById('auth-links-mobile');

    if (!authLinks || !authLinksMobile) return;

    const loggedInLinks = `
        <a href="profile.html" class="nav-link">Profile</a>
        <button id="logout-btn" class="nav-link">Logout</button>
    `;
    const loggedOutLinks = `
        <a href="login.html" class="nav-link">Login</a>
    `;

    const loggedInLinksMobile = `
        <a href="profile.html" class="nav-link">Profile</a>
        <button id="logout-btn-mobile" class="nav-link">Logout</button>
    `;

    if (user) {
        authLinks.innerHTML = loggedInLinks;
        authLinksMobile.innerHTML = loggedInLinksMobile;
    } else {
        authLinks.innerHTML = loggedOutLinks;
        authLinksMobile.innerHTML = loggedOutLinks;
    }
}

/**
 * Loads the footer component.
 */
export async function loadFooter() {
    await loadComponent('footer.html', 'main-footer');

    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.remove('hidden');
                backToTopButton.classList.add('opacity-100');
            } else {
                backToTopButton.classList.remove('opacity-100');
                backToTopButton.classList.add('hidden');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
