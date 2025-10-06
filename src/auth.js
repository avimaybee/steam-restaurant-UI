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