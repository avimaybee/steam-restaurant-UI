export function initVouchersPage() {
    const voucherForm = document.getElementById('voucher-form');
    const purchaseContainer = document.getElementById('voucher-purchase-container');

    if (!voucherForm || !purchaseContainer) return;

    voucherForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation
        const requiredFields = ['recipient-name', 'recipient-email', 'your-name', 'your-email', 'card-number', 'expiry-date', 'cvv'];
        let isValid = true;
        requiredFields.forEach(id => {
            const input = document.getElementById(id);
            if (!input.value) {
                input.classList.add('border-red-500');
                isValid = false;
            } else {
                input.classList.remove('border-red-500');
            }
        });

        if (!isValid) {
            alert('Please fill out all required fields.');
            return;
        }

        // Simulate purchase
        const recipientName = document.getElementById('recipient-name').value;
        purchaseContainer.innerHTML = `
            <div class="text-center py-12">
                <h2 class="text-2xl font-bold text-white">Thank You!</h2>
                <p class="text-gray-400 mt-2">A gift voucher has been successfully sent to ${recipientName}.</p>
                <a href="landing-page.html" class="btn btn-primary mt-6">Back to Home</a>
            </div>
        `;
    });
}