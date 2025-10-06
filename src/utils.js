export function setActiveNavLink() {
    const navLinks = document.querySelectorAll('#main-header nav a, #mobile-menu nav a');
    const currentPageUrl = window.location.pathname;
    navLinks.forEach(link => {
        if (new URL(link.href).pathname === currentPageUrl) {
            link.classList.add('active-link');
        }
    });
}