import { store } from '../store.js';

let menuItems = [];

const form = {
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

const tableBody = document.getElementById('menu-items-table-body');

function renderTable() {
    if (!tableBody) return;
    tableBody.innerHTML = '';

    menuItems.forEach(item => {
        const row = document.createElement('tr');
        row.className = 'bg-gray-800 border-b border-gray-700';
        row.innerHTML = `
            <td class="px-6 py-4 font-medium text-white">${item.name}</td>
            <td class="px-6 py-4">$${item.price.toFixed(2)}</td>
            <td class="px-6 py-4">${item.category} / ${item.subCategory}</td>
            <td class="px-6 py-4 flex gap-4">
                <button class="font-medium text-blue-500 hover:underline edit-btn" data-id="${item.id}">Edit</button>
                <button class="font-medium text-red-500 hover:underline delete-btn" data-id="${item.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function resetForm() {
    form.title.textContent = 'Add New Menu Item';
    form.form.reset();
    form.id.value = '';
    form.cancelBtn.classList.add('hidden');
    form.submitBtn.textContent = 'Save Item';
}

function populateForm(itemId) {
    const item = menuItems.find(i => i.id == itemId);
    if (!item) return;

    form.title.textContent = `Editing: ${item.name}`;
    form.id.value = item.id;
    form.name.value = item.name;
    form.price.value = item.price;
    form.description.value = item.description;
    form.category.value = item.category;
    form.subCategory.value = item.subCategory;
    form.image.value = item.image;

    form.cancelBtn.classList.remove('hidden');
    form.submitBtn.textContent = 'Update Item';
    window.scrollTo(0, 0);
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form.form);
    const itemId = form.id.value;

    const newMenuItemData = {
        id: itemId ? parseInt(itemId) : Date.now(), // Create a new ID if it's a new item
        name: formData.get('name'),
        price: parseFloat(formData.get('price')),
        description: formData.get('description'),
        category: [formData.get('category')],
        subCategory: formData.get('subCategory'),
        image: formData.get('image') || 'https://via.placeholder.com/150'
    };

    if (itemId) {
        // This is an update
        await store.updateMenuItem(newMenuItemData);
    } else {
        // This is a new item
        await store.addMenuItem(newMenuItemData);
    }

    menuItems = await store.getMenu(true); // Force refresh from storage
    renderTable();
    resetForm();
}

async function handleDeleteClick(event) {
    if (!event.target.classList.contains('delete-btn')) return;

    const itemId = event.target.dataset.id;
    if (confirm('Are you sure you want to delete this item?')) {
        await store.deleteMenuItem(parseInt(itemId));
        menuItems = await store.getMenu(true); // Force refresh from storage
        renderTable();
    }
}

function handleEditClick(event) {
    if (!event.target.classList.contains('edit-btn')) return;
    const itemId = event.target.dataset.id;
    populateForm(itemId);
}

export async function initAdminPage() {
    if (!document.getElementById('admin-management')) return;

    menuItems = await store.getMenu();
    renderTable();

    form.form.addEventListener('submit', handleFormSubmit);
    tableBody.addEventListener('click', handleDeleteClick);
    tableBody.addEventListener('click', handleEditClick);
    form.cancelBtn.addEventListener('click', resetForm);
}
