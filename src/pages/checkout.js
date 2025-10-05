import { store } from '../store.js';

function renderOrderSummary() {
    const cart = store.getCart();
    const summaryItemsContainer = document.getElementById('summary-items');
    const subtotalEl = document.getElementById('summary-subtotal');
    const taxesEl = document.getElementById('summary-taxes');
    const totalEl = document.getElementById('summary-total');

    if (!summaryItemsContainer || cart.length === 0) {
        // If cart is empty, redirect back to the order page, which will show the empty cart message.
        window.location.href = 'order-page.html';
        return;
    }

    summaryItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex justify-between items-center text-sm';
        itemElement.innerHTML = `
            <div>
                <span class="font-semibold">${item.name}</span>
                <span class="text-gray-400"> x ${item.quantity}</span>
            </div>
            <span class="font-medium">$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        summaryItemsContainer.appendChild(itemElement);
    });

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const taxes = subtotal * 0.10;
    const total = subtotal + taxes;

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    taxesEl.textContent = `$${taxes.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
}

function handleFormSubmission() {
    const form = document.getElementById('checkout-form');
    const payBtn = document.getElementById('pay-btn');

    if (!form || !payBtn) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation
        const requiredFields = ['fullName', 'email', 'address', 'city', 'zip', 'card-number', 'expiry-date', 'cvc'];
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

        // Simulate payment processing
        payBtn.disabled = true;
        payBtn.innerHTML = '<span>Processing...</span>';

        setTimeout(() => {
            // Create a fake order object
            const cart = store.getCart();
            const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) * 1.10;
            const customerName = document.getElementById('fullName').value;
            const newOrder = {
                id: `ORD-${Date.now()}`,
                date: new Date().toISOString(),
                items: cart,
                total: total,
                status: 'Preparing',
                customer: customerName
            };

            // Save order to localStorage
            const orders = JSON.parse(localStorage.getItem('restaurantOrders')) || [];
            orders.push(newOrder);
            localStorage.setItem('restaurantOrders', JSON.stringify(orders));

            // Clear the cart
            store.clearCart();

            // Redirect to order tracking page
            window.location.href = `order-tracking.html?order_id=${newOrder.id}`;

        }, 2000); // 2-second delay to simulate processing
    });
}

export function initCheckoutPage() {
    renderOrderSummary();
    handleFormSubmission();
}