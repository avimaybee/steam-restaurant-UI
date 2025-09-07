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
     * Sets the active state for the current page's navigation link.
     */
    function setActiveNavLink() {
        // Selects links in both desktop and mobile nav
        const navLinks = document.querySelectorAll('#main-header nav a');
        const mobileNavLinks = document.querySelectorAll('#mobile-menu nav a');
        const allLinks = [...navLinks, ...mobileNavLinks];
        const currentPageUrl = window.location.href;

        allLinks.forEach(link => {
            // Check if the link's href matches the current page's URL
            if (link.href === currentPageUrl) {
                link.classList.add('active-link');
            }
        });
    }

    /**
     * Handles scroll animations for elements with the .scroll-animate class.
     */
    function initializeScrollAnimations() {
        const animatedElements = document.querySelectorAll('.scroll-animate');

        if (!animatedElements.length) return;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
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
                    setActiveNavLink(); // Set active link
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
    initializeScrollAnimations();
});