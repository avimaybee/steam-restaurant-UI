import { store } from '../store.js';

function translatePage() {
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
        const key = el.dataset.i18nKey;
        const replacements = el.dataset.i18nReplacements ? JSON.parse(el.dataset.i18nReplacements) : {};
        el.innerHTML = store.get(key, replacements);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        el.placeholder = store.get(key);
    });
}

export function initLandingPage() {
    translatePage();
}
