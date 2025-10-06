import { store } from '../store.js';

export function initLoginPage() {
    const loginPage = document.getElementById('login-page');
    if (!loginPage) return;

    const form = document.getElementById('login-form');
    const errorDiv = document.getElementById('login-error');
    const successDiv = document.createElement('div');
    successDiv.className = 'text-green-500 text-sm text-center mb-4';
    successDiv.style.display = 'none';
    form.parentNode.insertBefore(successDiv, form);

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('registered')) {
        successDiv.textContent = 'Registration successful! Please log in.';
        successDiv.style.display = 'block';
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorDiv.classList.add('hidden');
        errorDiv.textContent = '';

        const email = form.email.value;
        const password = form.password.value;

        const user = await store.dispatch('login', { email, password });

        if (user) {
            window.location.href = 'profile.html';
        } else {
            errorDiv.textContent = store.get('login_error');
            errorDiv.classList.remove('hidden');
        }
    });
}
