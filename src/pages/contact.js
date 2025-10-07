import { initRealTimeValidation, validate } from '../validate.js';

export function initContactPage() {
    initRealTimeValidation('contact-form');

    const form = document.getElementById('contact-form');
    const successDiv = document.getElementById('contact-success');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let isFormValid = true;
            const fields = form.querySelectorAll('[data-validate]');
            fields.forEach(field => {
                if (!validate(field, field.dataset.validate)) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                return;
            }

            // In a real app, you would send the form data to a server here.
            // For this demo, we'll just show the success message.
            successDiv.classList.remove('hidden');
            form.reset();

            // Hide the success message after a few seconds
            setTimeout(() => {
                successDiv.classList.add('hidden');
            }, 5000);
        });
    }

    // Initialize map
    const mapElement = document.getElementById('map');
    if (mapElement) {
        const map = L.map('map').setView([37.7749, -122.4194], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);
        L.marker([37.7749, -122.4194]).addTo(map)
            .bindPopup('<b>Steam Restaurant</b><br>123 Steam Street, Flavor Town').openPopup();
    }
}