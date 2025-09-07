import { store } from '../store.js';

export async function initProfilePage() {
    const profilePage = document.getElementById('profile-page');
    if (!profilePage) return;

    const user = store.getCurrentUser();

    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Display user's name
    document.getElementById('user-name').textContent = user.name;

    // Display loyalty points
    const loyaltyPointsSpan = document.getElementById('loyalty-points');
    loyaltyPointsSpan.textContent = user.loyaltyPoints || 0;

    // Handle redeem form
    const redeemForm = document.getElementById('redeem-form');
    const redeemMessage = document.getElementById('redeem-message');
    redeemForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const amount = parseInt(redeemForm.amount.value);
        if (isNaN(amount) || amount <= 0) {
            redeemMessage.textContent = store.get('profile_loyalty_error_amount');
            redeemMessage.classList.remove('hidden', 'text-green-500');
            redeemMessage.classList.add('text-red-500');
            return;
        }

        const success = await store.redeemLoyaltyPoints(user.id, amount);

        if (success) {
            const voucherValue = (amount / 1000) * 10;
            redeemMessage.textContent = store.get('profile_loyalty_success', { value: voucherValue, timestamp: Date.now() });
            redeemMessage.classList.remove('hidden', 'text-red-500');
            redeemMessage.classList.add('text-green-500');
            // Update points display
            const updatedUser = store.getCurrentUser();
            loyaltyPointsSpan.textContent = updatedUser.loyaltyPoints;
            redeemForm.reset();
        } else {
            redeemMessage.textContent = store.get('profile_loyalty_error_insufficient');
            redeemMessage.classList.remove('hidden', 'text-green-500');
            redeemMessage.classList.add('text-red-500');
        }
    });

    // Fetch and display order history
    const orderHistoryContainer = document.getElementById('order-history-container');
    const orders = await store.getOrdersByCustomer(user.name);
    if (orders.length > 0) {
        orderHistoryContainer.innerHTML = createHistoryTable(orders, ['Order ID', 'Date', 'Status', 'Total']);
    } else {
        orderHistoryContainer.innerHTML = `<p class="text-gray-400">${store.get('profile_orders_none')}</p>`;
    }

    // Fetch and display reservation history
    const reservationHistoryContainer = document.getElementById('reservation-history-container');
    const reservations = await store.getReservationsByCustomer(user.name);
    if (reservations.length > 0) {
        reservationHistoryContainer.innerHTML = createHistoryTable(reservations, ['Reservation ID', 'Date', 'Time', 'Guests', 'Status']);
    } else {
        reservationHistoryContainer.innerHTML = `<p class="text-gray-400">${store.get('profile_reservations_none')}</p>`;
    }
}

function createHistoryTable(items, headers) {
    const isOrderTable = headers.includes('Total');
    if (isOrderTable) {
        headers.push('Actions');
    }

    let table = '<table class="min-w-full text-sm text-left text-gray-400">';
    // Table header
    table += '<thead class="text-xs text-gray-300 uppercase bg-gray-700">';
    table += '<tr>';
    headers.forEach(header => {
        table += `<th scope="col" class="px-6 py-3">${header}</th>`;
    });
    table += '</tr></thead>';

    // Table body
    table += '<tbody>';
    items.forEach(item => {
        table += '<tr class="bg-gray-800 border-b border-gray-700">';
        if (isOrderTable) { // It's an order
            table += `<td class="px-6 py-4 font-medium text-white">#${item.id}</td>`;
            table += `<td class="px-6 py-4">${item.date}</td>`;
            table += `<td class="px-6 py-4">${item.status}</td>`;
            table += `<td class="px-6 py-4">$${item.total.toFixed(2)}</td>`;
            // Actions column
            table += '<td class="px-6 py-4">';
            if (['Pending', 'Confirmed', 'Preparing', 'Out for Delivery'].includes(item.status)) {
                table += `<a href="order-tracking.html?id=${item.id}" class="btn btn-secondary btn-sm">Track Order</a>`;
            }
            table += '</td>';
        } else { // It's a reservation
            table += `<td class="px-6 py-4 font-medium text-white">#${item.id}</td>`;
            table += `<td class="px-6 py-4">${item.date}</td>`;
            table += `<td class="px-6 py-4">${item.time}</td>`;
            table += `<td class="px-6 py-4">${item.guests}</td>`;
            table += `<td class="px-6 py-4">${item.status}</td>`;
        }
        table += '</tr>';
    });
    table += '</tbody></table>';

    return table;
}
