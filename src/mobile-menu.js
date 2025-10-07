export function initializeMobileMenu() {
    const openMenu = () => {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuButton = document.getElementById('mobile-menu-button-bottom');
        const overlay = document.getElementById('mobile-menu-overlay');
        if (!mobileMenu || !mobileMenuButton) return;

        if (overlay) {
            overlay.classList.remove('bg-opacity-0', 'pointer-events-none');
            overlay.classList.add('bg-opacity-50');
        }

        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('open');
        mobileMenuButton.setAttribute('aria-expanded', 'true');
        document.body.classList.add('body-no-scroll');
        const firstFocusable = mobileMenu.querySelector('a, button');
        if (firstFocusable) firstFocusable.focus();
    };

    const closeMenu = () => {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuButton = document.getElementById('mobile-menu-button-bottom');
        const overlay = document.getElementById('mobile-menu-overlay');
        if (!mobileMenu || !mobileMenuButton) return;

        if (overlay) {
            overlay.classList.remove('bg-opacity-50');
            overlay.classList.add('bg-opacity-0', 'pointer-events-none');
        }

        mobileMenu.classList.remove('open');
        mobileMenu.addEventListener('transitionend', () => {
            mobileMenu.classList.add('hidden');
        }, { once: true });
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('body-no-scroll');
        mobileMenuButton.focus();
    };

    // Use event delegation for all interactions
    document.body.addEventListener('click', (e) => {
        // Handle menu button click
        if (e.target.closest('#mobile-menu-button-bottom')) {
            const mobileMenuButton = document.getElementById('mobile-menu-button-bottom');
            if (mobileMenuButton) {
                const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
                isExpanded ? closeMenu() : openMenu();
            }
        }

        // Handle menu link click
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('open') && e.target.tagName === 'A' && mobileMenu.contains(e.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu || !mobileMenu.classList.contains('open')) return;

        // Handle Escape key
        if (e.key === 'Escape') {
            closeMenu();
        }

        // Handle Tab key for focus trapping
        if (e.key === 'Tab') {
            const focusableElements = mobileMenu.querySelectorAll('a, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}