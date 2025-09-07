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
    await loadComponent('header.html', 'main-header');
    // We will need to re-attach event listeners for the mobile menu
    // This will be handled in the main app.js after the header is loaded.
}

/**
 * Updates the authentication links in the header based on user login status.
 */
import { store } from './store.js';

export function updateAuthLinks() {
    const user = store.getCurrentUser();
    const authLinks = document.getElementById('auth-links');
    const authLinksMobile = document.getElementById('auth-links-mobile');

    if (!authLinks || !authLinksMobile) return;

    const loggedInLinks = `
        <a href="profile.html" class="text-base font-medium text-gray-300 hover:text-white transition-colors duration-300">Profile</a>
        <button id="logout-btn" class="text-base font-medium text-gray-300 hover:text-white transition-colors duration-300">Logout</button>
    `;
    const loggedOutLinks = `
        <a href="login.html" class="text-base font-medium text-gray-300 hover:text-white transition-colors duration-300">Login</a>
    `;

    const loggedInLinksMobile = `
        <a href="profile.html" class="text-base font-medium text-gray-300 hover:text-white transition-colors duration-300">Profile</a>
        <button id="logout-btn-mobile" class="text-base font-medium text-gray-300 hover:text-white transition-colors duration-300">Logout</button>
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
}
