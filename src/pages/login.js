import { store } from '../store.js';

export function initLoginPage() {
    const loginPage = document.getElementById('login-page');
    if (!loginPage) return;

    const form = document.getElementById('login-form');
    const errorDiv = document.getElementById('login-error');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorDiv.classList.add('hidden');
        errorDiv.textContent = '';

        const email = form.email.value;
        const password = form.password.value;

        const user = await store.login(email, password);

        if (user) {
            window.location.href = 'profile.html';
        } else {
            errorDiv.textContent = 'Invalid email or password.';
            errorDiv.classList.remove('hidden');
        }
    });
}
