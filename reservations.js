
document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.querySelector('form');

    reservationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        const requests = document.getElementById('requests').value;

        // Basic validation
        if (!fullName || !email || !date || !time || !guests) {
            alert('Please fill out all required fields.');
            return;
        }

        // Log form data to the console
        console.log('New Reservation:');
        console.log('Full Name:', fullName);
        console.log('Email:', email);
        console.log('Date:', date);
        console.log('Time:', time);
        console.log('Number of Guests:', guests);
        console.log('Special Requests:', requests);

        // Display a confirmation message
        const formContainer = document.querySelector('.layout-content-container');
        formContainer.innerHTML = `
            <div class="text-center text-white">
                <h1 class="text-4xl md:text-5xl font-bold">Thank You!</h1>
                <p class="mt-4 text-lg">Your reservation request has been received. We will contact you shortly to confirm.</p>
                <a href="landing-page.html" class="mt-8 inline-block rounded-lg bg-[var(--primary-color)] px-8 py-4 text-lg font-semibold text-black shadow-sm hover:bg-opacity-80">Back to Home</a>
            </div>
        `;
    });
});
