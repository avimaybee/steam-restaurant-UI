import { store } from '../store.js';

function renderMenuItems(items) {
    const menuItemsContainer = document.getElementById('menu-items-container');
    if (!menuItemsContainer) return;

    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }

    menuItemsContainer.innerHTML = '';
    items.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.classList.add('flex', 'items-center', 'gap-6', 'rounded-lg', 'bg-[#1c1815]', 'p-4', 'transition-all', 'hover:bg-[#221d19]', 'group');
        menuItemElement.innerHTML = `
            <div class="h-28 w-28 flex-shrink-0 bg-cover bg-center rounded-lg" style="background-image: url('${item.image}')"></div>
            <div class="flex-grow">
                <h3 class="text-lg font-bold">${item.name}</h3>
                <p class="text-sm text-gray-400 mt-1">${item.description}</p>
                <div class="flex items-center justify-between mt-3">
                    <p class="text-lg font-bold text-[var(--primary-color)]">$${item.price.toFixed(2)}</p>
                    <button
                        class="snipcart-add-item flex items-center justify-center rounded-full h-9 w-9 bg-[#2b2522] group-hover:bg-[var(--primary-color)] text-white transition-colors"
                        data-item-id="${item.id}"
                        data-item-price="${item.price}"
                        data-item-url="/order-page.html"
                        data-item-name="${item.name}"
                        data-item-image="${item.image}">
                        <span class="material-symbols-outlined text-xl"> add </span>
                    </button>
                </div>
            </div>
        `;
        menuItemsContainer.appendChild(menuItemElement);
    });
}

export async function initOrderPage() {
    const menuItems = await store.getMenu();
    renderMenuItems(menuItems);
}
