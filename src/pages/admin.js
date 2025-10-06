import { store } from '../store.js';

// --- STATE ---
let menuItems = [];
let orders = [];
let reservations = [];

// --- DOM ELEMENTS ---
const adminPage = document.getElementById('admin-management');
const adminNav = document.getElementById('admin-nav');
const adminViews = document.querySelectorAll('.admin-view');

// Menu Management Elements
const menuForm = {
    title: document.getElementById('form-title'),
    form: document.getElementById('menu-item-form'),
    id: document.getElementById('item-id'),
    name: document.getElementById('item-name'),
    price: document.getElementById('item-price'),
    description: document.getElementById('item-description'),
    category: document.getElementById('item-category'),
    subCategory: document.getElementById('item-subCategory'),
    image: document.getElementById('item-image'),
    cancelBtn: document.getElementById('cancel-edit-btn'),
    submitBtn: document.querySelector('#menu-item-form button[type="submit"]')
};
const menuTableBody = document.getElementById('menu-items-table-body');

// Order and Reservation Elements
const ordersTableBody = document.getElementById('orders-table-body');
const reservationsTableBody = document.getElementById('reservations-table-body');


// --- RENDER FUNCTIONS ---

function renderMenuTable() {
    if (!menuTableBody) return;
    menuTableBody.innerHTML = '';
    menuItems.forEach(item => {
        const row = menuTableBody.insertRow();
        row.className = 'bg-gray-800 border-b border-gray-700';
        row.innerHTML = `
            <td class="px-6 py-4 font-medium text-white">${item.name}</td>
            <td class="px-6 py-4">$${item.price.toFixed(2)}</td>
            <td class="px-6 py-4">${item.category} / ${item.subCategory}</td>
            <td class="px-6 py-4 flex gap-4">
                <button class="font-medium text-blue-500 hover:underline edit-btn" data-id="${item.id}">${store.get('admin_menu_edit')}</button>
                <button class="font-medium text-red-500 hover:underline delete-btn" data-id="${item.id}">${store.get('admin_menu_delete')}</button>
            </td>
        `;
    });
}

function renderOrdersTable() {
    if (!ordersTableBody) return;
    ordersTableBody.innerHTML = '';
    orders.forEach(order => {
        const row = ordersTableBody.insertRow();
        row.className = 'bg-gray-800 border-b border-gray-700';
        row.innerHTML = `
            <td class="px-6 py-4 font-medium text-white">#${order.id}</td>
            <td class="px-6 py-4">${order.customer}</td>
            <td class="px-6 py-4">${order.date}</td>
            <td class="px-6 py-4">
                <select class="order-status-select bg-gray-700 text-white rounded-md p-2" data-id="${order.id}">
                    <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Completed" ${order.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
            <td class="px-6 py-4">$${order.total.toFixed(2)}</td>
            <td class="px-6 py-4">
                <button class="font-medium text-red-500 hover:underline delete-order-btn" data-id="${order.id}">${store.get('admin_menu_delete')}</button>
            </td>
        `;
    });
}

function renderReservationsTable() {
    if (!reservationsTableBody) return;
    reservationsTableBody.innerHTML = '';
    reservations.forEach(res => {
        const row = reservationsTableBody.insertRow();
        row.className = 'bg-gray-800 border-b border-gray-700';
        row.innerHTML = `
            <td class="px-6 py-4 font-medium text-white">#${res.id}</td>
            <td class="px-6 py-4">${res.customer}</td>
            <td class="px-6 py-4">${res.date}</td>
            <td class="px-6 py-4">${res.time}</td>
            <td class="px-6 py-4">${res.guests}</td>
            <td class="px-6 py-4">
                 <select class="reservation-status-select bg-gray-700 text-white rounded-md p-2" data-id="${res.id}">
                    <option value="Pending" ${res.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Confirmed" ${res.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="Cancelled" ${res.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
            <td class="px-6 py-4">
                <button class="font-medium text-red-500 hover:underline delete-reservation-btn" data-id="${res.id}">${store.get('admin_menu_delete')}</button>
            </td>
        `;
    });
}


// --- MENU FORM LOGIC ---

function resetMenuForm() {
    menuForm.title.textContent = store.get('admin_menu_form_title');
    menuForm.form.reset();
    menuForm.id.value = '';
    menuForm.cancelBtn.classList.add('hidden');
    menuForm.submitBtn.textContent = store.get('admin_menu_form_save');
}

function populateMenuForm(itemId) {
    const item = menuItems.find(i => i.id == itemId);
    if (!item) return;

    menuForm.title.textContent = `${store.get('admin_menu_edit')}: ${item.name}`;
    menuForm.id.value = item.id;
    menuForm.name.value = item.name;
    menuForm.price.value = item.price;
    menuForm.description.value = item.description;
    menuForm.category.value = item.category;
    menuForm.subCategory.value = item.subCategory;
    menuForm.image.value = item.image;

    menuForm.cancelBtn.classList.remove('hidden');
    menuForm.submitBtn.textContent = store.get('admin_menu_form_update');
    window.scrollTo(0, 0);
}


// --- EVENT HANDLERS ---

async function handleMenuFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(menuForm.form);
    const itemId = menuForm.id.value;

    const newMenuItemData = {
        id: itemId ? parseInt(itemId) : Date.now(),
        name: formData.get('name'),
        price: parseFloat(formData.get('price')),
        description: formData.get('description'),
        category: [formData.get('category')],
        subCategory: formData.get('subCategory'),
        image: formData.get('image') || 'https://via.placeholder.com/150'
    };

    if (itemId) {
        await store.updateMenuItem(newMenuItemData);
    } else {
        await store.addMenuItem(newMenuItemData);
    }

    menuItems = await store.getMenu(true);
    renderMenuTable();
    resetMenuForm();
}

async function handleMenuTableClick(event) {
    const target = event.target;
    if (target.classList.contains('delete-btn')) {
        const itemId = target.dataset.id;
        if (confirm(store.get('admin_menu_delete_confirm'))) {
            await store.deleteMenuItem(parseInt(itemId));
            menuItems = await store.getMenu(true);
            renderMenuTable();
        }
    } else if (target.classList.contains('edit-btn')) {
        const itemId = target.dataset.id;
        populateMenuForm(itemId);
    }
}

async function handleOrdersTableChange(event) {
    if (event.target.classList.contains('order-status-select')) {
        const orderId = parseInt(event.target.dataset.id);
        const newStatus = event.target.value;
        await store.updateOrderStatus(orderId, newStatus);
        // Optional: Add visual feedback
    }
}

async function handleReservationsTableChange(event) {
    if (event.target.classList.contains('reservation-status-select')) {
        const resId = parseInt(event.target.dataset.id);
        const newStatus = event.target.value;
        await store.updateReservationStatus(resId, newStatus);
        // Optional: Add visual feedback
    }
}

async function handleOrdersTableClick(event) {
    if (event.target.classList.contains('delete-order-btn')) {
        const orderId = parseInt(event.target.dataset.id);
        if (confirm(store.get('admin_orders_delete_confirm'))) {
            await store.deleteOrder(orderId);
            orders = await store.getOrders();
            renderOrdersTable();
        }
    }
}

async function handleReservationsTableClick(event) {
    if (event.target.classList.contains('delete-reservation-btn')) {
        const resId = parseInt(event.target.dataset.id);
        if (confirm(store.get('admin_reservations_delete_confirm'))) {
            await store.deleteReservation(resId);
            reservations = await store.getReservations();
            renderReservationsTable();
        }
    }
}

function handleTabClick(event) {
    const clickedTab = event.target.closest('.admin-tab');
    if (!clickedTab) return;

    const tabName = clickedTab.dataset.tab;

    // Update tab appearance
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('text-white', 'border-primary-color');
        tab.classList.add('text-gray-400', 'border-transparent');
    });
    clickedTab.classList.add('text-white', 'border-primary-color');
    clickedTab.classList.remove('text-gray-400', 'border-transparent');


    // Show the correct view
    adminViews.forEach(view => {
        if (view.dataset.view === tabName) {
            view.classList.remove('hidden');
        } else {
            view.classList.add('hidden');
        }
    });
}


// --- INITIALIZATION ---

export async function initAdminPage() {
    if (!adminPage) return;

    const currentUser = store.getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Fetch all data
    [menuItems, orders, reservations] = await Promise.all([
        store.getMenu(),
        store.getOrders(),
        store.getReservations()
    ]);

    // Render all tables
    renderMenuTable();
    renderOrdersTable();
    renderReservationsTable();

    // Add event listeners
    adminNav.addEventListener('click', handleTabClick);
    menuForm.form.addEventListener('submit', handleMenuFormSubmit);
    menuTableBody.addEventListener('click', handleMenuTableClick);
    menuForm.cancelBtn.addEventListener('click', resetMenuForm);

    ordersTableBody.addEventListener('change', handleOrdersTableChange);
    ordersTableBody.addEventListener('click', handleOrdersTableClick);
    reservationsTableBody.addEventListener('change', handleReservationsTableChange);
    reservationsTableBody.addEventListener('click', handleReservationsTableClick);
}
