import { store } from './store.js';

async function loadComponent(component, selector) {
    try {
        const response = await fetch(component);
        if (!response.ok) {
            throw new Error(`Failed to fetch component: ${component}`);
        }
        const text = await response.text();
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = text;
        } else {
            console.warn(`Selector "${selector}" not found for component "${component}".`);
        }
    } catch (error) {
        console.error(`Error loading component: ${component}`, error);
    }
}

export async function loadHeader() {
    await loadComponent('header.html', '#header-wrapper');
}

export async function loadFooter() {
    await loadComponent('footer.html', '#footer-wrapper');
}

export function updateAuthLinks() {
    const user = store.getCurrentUser();
    const authLinksDesktop = document.getElementById('auth-links');
    const authLinksMobile = document.getElementById('auth-links-mobile');
    const authLinksFooter = document.getElementById('footer-quick-links');
    const profileLinkBottomNav = document.querySelector('#bottom-nav a[href="profile.html"]');

    const isAuthenticated = !!user;

    // Desktop Header Links
    if (authLinksDesktop) {
        authLinksDesktop.innerHTML = isAuthenticated
            ? `
                <a href="profile.html" class="nav-link">Profile</a>
                <a href="#" id="logout-link" class="nav-link">Logout</a>
              `
            : `
                <a href="login.html" class="nav-link">Login</a>
                <a href="register.html" class="btn btn-secondary">Register</a>
              `;
    }

    // Mobile Menu Links
    if (authLinksMobile) {
        authLinksMobile.innerHTML = isAuthenticated
            ? `
                <a href="profile.html" class="nav-link">Profile</a>
                <a href="#" id="logout-link-mobile" class="nav-link">Logout</a>
              `
            : `
                <a href="login.html" class="nav-link">Login</a>
                <a href="register.html" class="nav-link">Register</a>
              `;
    }

    // Footer Links
    if (authLinksFooter) {
        const footerAuthLinks = isAuthenticated
            ? `
                <a href="profile.html" class="nav-link-footer">Profile</a>
                <a href="#" id="logout-link-footer" class="nav-link-footer">Logout</a>
              `
            : `
                <a href="login.html" class="nav-link-footer">Login / Register</a>
              `;
        // Append to existing links
        authLinksFooter.innerHTML += footerAuthLinks;
    }

    // Bottom Nav Profile/Login Link
    if (profileLinkBottomNav) {
        if (!isAuthenticated) {
            profileLinkBottomNav.href = "login.html";
            const icon = profileLinkBottomNav.querySelector('.material-symbols-outlined');
            const text = profileLinkBottomNav.querySelector('span:last-child');
            if (icon) icon.textContent = 'login';
            if (text) text.textContent = 'Login';
        } else {
            profileLinkBottomNav.href = "profile.html";
            const icon = profileLinkBottomNav.querySelector('.material-symbols-outlined');
            const text = profileLinkBottomNav.querySelector('span:last-child');
            if (icon) icon.textContent = 'person';
            if (text) text.textContent = 'Profile';
        }
    }
}

export function updateCartCount() {
    const cart = store.getCart();
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const countElements = [
        document.getElementById('cart-item-count'),
        document.getElementById('cart-item-count-mobile'),
        document.getElementById('cart-item-count-bottom-nav')
    ];

    countElements.forEach(el => {
        if (el) {
            if (cartCount > 0) {
                el.textContent = cartCount;
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        }
    });
}