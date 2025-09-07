import { store } from '../store.js';

export function initRegisterPage() {
    const registerPage = document.getElementById('register-page');
    if (!registerPage) return;

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
            errorDiv.textContent = 'Please fill out all fields.';
            errorDiv.classList.remove('hidden');
            return;
        }

        const user = await store.register(name, email, password);

        if (user) {
            window.location.href = 'profile.html';
        } else {
            errorDiv.textContent = 'An account with this email already exists.';
            errorDiv.classList.remove('hidden');
        }
    });
}
