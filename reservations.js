document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.querySelector('form');
    const formContainer = document.querySelector('.layout-content-container');
    const formEndpoint = 'https://formspree.io/f/mwkdbzyy'; // Public test endpoint

    if (reservationForm) {
        reservationForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (!validateForm()) {
                return;
            }

            const submitButton = reservationForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = `<span class="truncate">Submitting...</span>`;

            const formData = new FormData(reservationForm);
            const data = Object.fromEntries(formData.entries());

            fetch(formEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                formContainer.innerHTML = `
                    <div class="text-center text-white">
                        <h1 class="text-4xl md:text-5xl font-bold">Thank You!</h1>
                        <p class="mt-4 text-lg">Your reservation request has been received. We will contact you shortly to confirm.</p>
                        <a href="landing-page.html" class="mt-8 inline-block rounded-lg bg-[var(--primary-color)] px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-opacity-80">Back to Home</a>
                    </div>
                `;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                // Restore button state and show an error to the user
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                // You could add a user-facing error message here
                alert('There was an error submitting your reservation. Please try again.');
            });
        });
    }

    function validateForm() {
        let isValid = true;
        let firstInvalidField = null;
        const fields = ['fullName', 'email', 'date', 'time', 'guests'];

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

        // Special email validation
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
