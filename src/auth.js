import { store } from './store.js';
import { updateAuthLinks } from './components.js';

export function setupLogout() {
    document.body.addEventListener('click', (e) => {
        // Updated to match the dynamically inserted link IDs
        if (e.target.matches('#logout-link, #logout-link-mobile, #logout-link-footer')) {
            e.preventDefault(); // Prevent following the href="#"
            store.logout();
            updateAuthLinks(); // Re-render the auth links to show "Login/Register"

            // If on a page that requires authentication, redirect to login
            const protectedPages = ['profile.html', 'admin.html', 'order-tracking.html', 'checkout.html'];
            if (protectedPages.some(page => window.location.pathname.endsWith(page))) {
                window.location.href = 'login.html';
            }
        }
    });
}

export function initPasswordToggle() {
    const togglePassword = document.getElementById('toggle-password');
    const password = document.getElementById('password');

    if (!togglePassword || !password) return;

    togglePassword.addEventListener('click', function (e) {
        // toggle the type attribute
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        // toggle the icon
        this.querySelector('span').textContent = type === 'password' ? 'visibility_off' : 'visibility';
    });
}