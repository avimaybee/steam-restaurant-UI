import { store } from './store.js';
import { updateAuthLinks } from './components.js';

export function setupLogout() {
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