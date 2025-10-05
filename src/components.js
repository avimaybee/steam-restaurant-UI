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
            console.warn(`Element with ID "${elementId}" not found.`);
        }
    } catch (error) {
        console.error(`Error loading component from ${componentPath}:`, error);
    }
}

/**
 * Loads the header component and initializes its functionality.
 */
export async function loadHeader() {
    // The main-header div from the old structure is no longer used.
    // We target the body and prepend the header.
    const headerPlaceholder = document.createElement('div');
    headerPlaceholder.id = 'main-header';
    document.body.prepend(headerPlaceholder);

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
    const cartItemCount = document.getElementById('cart-item-count');
    if (!cartItemCount) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (totalItems > 0) {
        cartItemCount.textContent = totalItems;
        cartItemCount.classList.remove('hidden');
    } else {
        cartItemCount.classList.add('hidden');
    }
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
