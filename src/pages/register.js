import { store } from '../store.js';
import { initPasswordToggle } from '../auth.js';

export function initRegisterPage() {
    const registerPage = document.getElementById('register-page');
    if (!registerPage) return;

    initPasswordToggle();

    const form = document.getElementById('register-form');
    const errorDiv = document.getElementById('register-error');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorDiv.classList.add('hidden');
        errorDiv.textContent = '';

        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        if (!name || !email || !password) {
            errorDiv.textContent = store.get('register_error_fields');
            errorDiv.classList.remove('hidden');
            return;
        }

        const user = await store.register(name, email, password);

        if (user) {
            window.location.href = 'login.html?registered=true';
        } else {
            errorDiv.textContent = store.get('register_error_exists');
            errorDiv.classList.remove('hidden');
        }
    });
}
