import { store } from '../store.js';

const statusMap = {
    'Pending': { level: 0, progress: '12.5%' },
    'Confirmed': { level: 1, progress: '37.5%' },
    'Preparing': { level: 2, progress: '62.5%' },
    'Out for Delivery': { level: 3, progress: '87.5%' },
    'Delivered': { level: 4, progress: '100%' },
    'Cancelled': { level: -1, progress: '0%' }
};

function updateTrackerUI(status) {
    const currentStatusInfo = statusMap[status];
    if (!currentStatusInfo) return;

    // Update progress bar
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = currentStatusInfo.progress;

    // Update status text
    const currentStatusText = document.getElementById('current-status-text');
    currentStatusText.textContent = `Current Status: ${status}`;

    // Update status points
    const points = document.querySelectorAll('.status-point');
    points.forEach(point => {
        const pointStatus = point.id.split('-')[1]; // e.g., "confirmed"
        const pointLevel = statusMap[pointStatus.charAt(0).toUpperCase() + pointStatus.slice(1)]?.level;

        const circle = point.querySelector('.status-circle');
        if (pointLevel <= currentStatusInfo.level) {
            circle.classList.add('bg-primary-color');
            circle.classList.remove('bg-gray-700');
        } else {
            circle.classList.remove('bg-primary-color');
            circle.classList.add('bg-gray-700');
        }
    });
}

function renderOrderItems(items) {
    const container = document.getElementById('order-items-container');
    if (!container || !items) {
        container.innerHTML = '<p class="text-gray-400">Could not load order items.</p>';
        return;
    }

    let content = '<ul class="divide-y divide-gray-700">';
    items.forEach(item => {
        content += `
            <li class="py-3 flex justify-between items-center">
                <span class="text-white">${item.name} (x${item.quantity})</span>
            </li>
        `;
    });
    content += '</ul>';
    container.innerHTML = content;
}

function simulateStatusChanges(order) {
    let currentStatus = order.status;
    const statuses = ['Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];
    let currentIndex = statuses.indexOf(currentStatus);

    if (currentIndex === -1 || currentStatus === 'Delivered' || currentStatus === 'Cancelled') {
        return; // Don't simulate if status is not in the normal flow
    }

    const simulate = () => {
        currentIndex++;
        if (currentIndex < statuses.length) {
            currentStatus = statuses[currentIndex];
            updateTrackerUI(currentStatus);
            // Simulate next change after a delay
            setTimeout(simulate, 5000); // 5-second delay
        }
    };

    // Start the first simulation after a delay
    setTimeout(simulate, 3000); // 3-second initial delay
}


export async function initOrderTrackingPage() {
    const page = document.getElementById('order-tracking-page');
    if (!page) return;

    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('id');

    const orderIdDisplay = document.getElementById('order-id-display');

    if (!orderId) {
        orderIdDisplay.textContent = 'No order ID provided.';
        return;
    }

    const order = await store.getOrderById(orderId);

    if (!order) {
        orderIdDisplay.textContent = `Order #${orderId} not found.`;
        return;
    }

    orderIdDisplay.textContent = `Order #${order.id} - For ${order.customer}`;

    updateTrackerUI(order.status);
    renderOrderItems(order.items);
    simulateStatusChanges(order);
}
