
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (!validateContactForm()) {
                return;
            }

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            console.log('New Contact Form Submission:');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Subject:', subject);
            console.log('Message:', message);

            const formContainer = contactForm.parentElement;
            formContainer.innerHTML = `
                <div class="text-center text-white">
                    <h2 class="text-3xl font-bold">Thank You!</h2>
                    <p class="mt-4">Your message has been sent successfully. We will get back to you shortly.</p>
                </div>
            `;
        });
    }

    function validateContactForm() {
        let isValid = true;
        let firstInvalidField = null;
        const fields = ['name', 'email', 'subject', 'message'];

        fields.forEach(id => {
            const input = document.getElementById(id);
            const errorElement = document.getElementById(`${id}-error`);

            if (!input.value.trim()) {
                input.classList.add('border-red-500');
                if (errorElement) {
                    errorElement.textContent = 'This field is required.';
                    errorElement.classList.remove('hidden');
                }
                isValid = false;
                if (!firstInvalidField) {
                    firstInvalidField = input;
                }
            } else {
                input.classList.remove('border-red-500');
                if (errorElement) {
                    errorElement.classList.add('hidden');
                }
            }
        });

        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            emailInput.classList.add('border-red-500');
            if (emailError) {
                emailError.textContent = 'Please enter a valid email address.';
                emailError.classList.remove('hidden');
            }
            isValid = false;
            if (!firstInvalidField) {
                firstInvalidField = emailInput;
            }
        }

        if (firstInvalidField) {
            firstInvalidField.focus();
        }

        return isValid;
    }
});
