export function initBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');

    if (!backToTopButton) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('hidden');
            // We need a small delay to allow the browser to render the element before starting the transition
            setTimeout(() => backToTopButton.classList.remove('opacity-0'), 20);
        } else {
            backToTopButton.classList.add('opacity-0');
            // Hide the element completely after the transition
            backToTopButton.addEventListener('transitionend', () => {
                if (window.scrollY <= 300) { // Re-check condition in case user scrolled back up
                    backToTopButton.classList.add('hidden');
                }
            }, { once: true });
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

export function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up');

    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

export function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.classList.add('ripple');
        button.addEventListener('click', function (e) {
            const circle = document.createElement('span');
            const diameter = Math.max(this.clientWidth, this.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - this.offsetLeft - radius}px`;
            circle.style.top = `${e.clientY - this.offsetTop - radius}px`;
            circle.classList.add('ripple-effect');

            const ripple = this.getElementsByClassName('ripple-effect')[0];

            if (ripple) {
                ripple.remove();
            }

            this.appendChild(circle);
        });
    });
}

export function initHeroAnimation() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        heroBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
}

export function triggerHapticFeedback() {
    if (window.navigator.vibrate) {
        window.navigator.vibrate(50); // Vibrate for 50ms
    }
}