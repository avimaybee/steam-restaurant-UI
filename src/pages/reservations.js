import { initRealTimeValidation, validate } from '../validate.js';
import { store } from '../store.js';

export function initReservationsPage() {
    initRealTimeValidation('reservation-form');

    const form = document.getElementById('reservation-form');
    const modal = document.getElementById('confirmation-modal');
    const closeModalBtn = document.getElementById('close-confirmation-modal');
    const summaryDiv = document.getElementById('reservation-summary');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!form || !modal) return;

    form.addEventListener('submit', async (e) => {
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

        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        const reservation = {
            id: Date.now(),
            customer: form.fullName.value,
            email: form.email.value,
            date: form.date.value,
            time: form.time.value,
            guests: form.guests.value,
            requests: form.requests.value,
            status: 'Confirmed'
        };

        await store.addReservation(reservation);

        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        summaryDiv.innerHTML = `
            <p><strong>Name:</strong> ${reservation.customer}</p>
            <p><strong>Date:</strong> ${reservation.date}</p>
            <p><strong>Time:</strong> ${reservation.time}</p>
            <p><strong>Guests:</strong> ${reservation.guests}</p>
        `;

        modal.classList.remove('hidden');
        modal.classList.add('flex');

        form.reset();
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    });
}
