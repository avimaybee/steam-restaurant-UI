document.addEventListener("DOMContentLoaded", function() {

    /**
     * Applies a fade-in animation to the main content area.
     */
    function applyFadeInAnimation() {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.classList.add('fade-in');
        }
    }

    /**
     * Initializes the mobile menu button functionality.
     */
    function initializeMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
                mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
                mobileMenu.classList.toggle('hidden');
            });
        }
    }

    /**
     * Fetches and injects the header HTML, then initializes the mobile menu.
     */
    function loadHeader() {
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                const headerElement = document.getElementById('main-header');
                if (headerElement) {
                    headerElement.innerHTML = data;
                    initializeMobileMenu(); // Initialize menu after header is loaded
                }
            })
            .catch(error => console.error('Error loading header:', error));
    }

    /**
     * Fetches and injects the footer HTML.
     */
    function loadFooter() {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                const footerElement = document.getElementById('main-footer');
                if (footerElement) {
                    footerElement.innerHTML = data;
                }
            })
            .catch(error => console.error('Error loading footer:', error));
    }

    // --- Execute all initialization functions ---
    applyFadeInAnimation();
    loadHeader();
    loadFooter();
});
