import { store } from '../store.js';
import { triggerHapticFeedback } from '../ui.js';

let allMenuItems = [];
let categorizedItems = {};

const CATEGORY_MAP = {
    'featured': ['special-beer', 'cellar-classics', 'add-ons'],
    'appetizers': ['small-plates', 'raw-bar', 'sushi'],
    'main courses': ['main-plates', 'banquet'],
    'desserts': ['desserts'],
    'drinks': ['hot-beverages', 'cold-beverages', 'cocktails', 'mocktails', 'beer-cider', 'sake', 'japanese-whisky', 'sparkling-wine', 'white-wine', 'rose-wine', 'red-wine']
};

function categorizeMenuItems(items) {
    const categories = {
        'Featured': [],
        'Appetizers': [],
        'Main Courses': [],
        'Desserts': [],
        'Drinks': []
    };

    // A few hand-picked featured items
    const featuredIds = [12, 13, 37, 40, 69, 77];

    items.forEach(item => {
        if (featuredIds.includes(item.id)) {
            categories['Featured'].push(item);
        }
        if (CATEGORY_MAP['appetizers'].includes(item.subCategory)) {
            categories['Appetizers'].push(item);
        }
        if (CATEGORY_MAP['main courses'].includes(item.subCategory)) {
            categories['Main Courses'].push(item);
        }
        if (CATEGORY_MAP['desserts'].includes(item.subCategory)) {
            categories['Desserts'].push(item);
        }
        if (CATEGORY_MAP['drinks'].includes(item.subCategory)) {
            categories['Drinks'].push(item);
        }
    });
    return categories;
}

function renderTabs() {
    const tabsContainer = document.getElementById('category-tabs');
    if (!tabsContainer) return;

    const tabNames = Object.keys(categorizedItems);
    tabsContainer.innerHTML = tabNames.map((name, index) => `
        <button class="category-tab ${index === 0 ? 'active' : ''} py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap">
            ${name}
        </button>
    `).join('');

    document.querySelectorAll('.category-tab').forEach((tab, index) => {
        tab.addEventListener('click', () => {
            document.querySelector('.category-tab.active').classList.remove('active');
            tab.classList.add('active');
            renderMenuItems(tabNames[index]);
        });
    });
}

function renderMenuItems(category) {
    const menuContainer = document.getElementById('menu-items-container');
    if (!menuContainer) return;

    const items = categorizedItems[category];
    if (!items) {
        menuContainer.innerHTML = '<p>No items in this category.</p>';
        return;
    }

    menuContainer.innerHTML = items.map(item => `
        <div class="menu-item-card flex items-center gap-6 bg-surface-color p-4 rounded-xl" style="background-color: #1E1E1E;">
            <img src="${item.image.replace('150', '200')}" alt="${item.name}" class="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg">
            <div class="flex-1">
                <h3 class="text-lg sm:text-xl font-bold text-white">${item.name}</h3>
                <p class="text-sm text-text-secondary mt-1 sm:mt-2">${item.description}</p>
                <p class="text-lg font-bold text-primary-color mt-2 sm:mt-4">$${item.price.toFixed(2)}</p>
            </div>
            <button class="add-to-cart-btn self-start" data-item-id="${item.id}">
                <span class="material-symbols-outlined text-3xl p-2 rounded-full bg-gray-700 hover:bg-primary-color hover:text-black transition-colors duration-300">add_circle</span>
            </button>
        </div>
    `).join('');
}

function renderCart() {
    const cart = store.getCart();
    const cartItemsContainer = document.getElementById('cart-items-container');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-8">
                <span class="material-symbols-outlined text-5xl text-text-secondary">shopping_cart</span>
                <p class="text-text-secondary mt-2">Your cart is empty.</p>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item relative overflow-hidden" data-item-id="${item.id}">
                <div class="cart-item-content bg-surface-color p-4 transition-transform duration-300">
                    <div class="flex items-center justify-between gap-4">
                        <div>
                            <h4 class="font-semibold text-white">${item.name}</h4>
                            <p class="text-primary-color font-bold">$${item.price.toFixed(2)}</p>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="flex items-center border border-border-color rounded-full">
                                <button class="quantity-change-btn p-1" data-item-id="${item.id}" data-amount="-1">
                                    <span class="material-symbols-outlined text-sm">remove</span>
                                </button>
                                <span class="px-2 text-white text-sm">${item.quantity}</span>
                                <button class="quantity-change-btn p-1" data-item-id="${item.id}" data-amount="1">
                                    <span class="material-symbols-outlined text-sm">add</span>
                                </button>
                            </div>
                            <p class="font-bold text-white w-16 text-right">$${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div class="absolute top-0 right-0 h-full">
                    <button class="delete-cart-item-btn h-full bg-red-500 text-white px-6 flex items-center justify-center" data-item-id="${item.id}">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
        `).join('');
    }
    updateOrderSummary();
}

function updateOrderSummary() {
    const cart = store.getCart();
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const taxes = subtotal * 0.08; // 8% tax
    const total = subtotal + taxes;

    document.getElementById('summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('summary-taxes').textContent = `$${taxes.toFixed(2)}`;
    document.getElementById('summary-total').textContent = `$${total.toFixed(2)}`;

    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.disabled = cart.length === 0;
    checkoutBtn.classList.toggle('opacity-50', cart.length === 0);
    checkoutBtn.classList.toggle('cursor-not-allowed', cart.length === 0);
}

function initEventListeners() {
    const orderPage = document.getElementById('order-page');
    if (!orderPage) return;

    const cartItemsContainer = document.getElementById('cart-items-container');
    let touchstartX = 0;
    let touchendX = 0;

    cartItemsContainer.addEventListener('touchstart', e => {
        const cartItem = e.target.closest('.cart-item');
        if (cartItem) {
            touchstartX = e.changedTouches[0].screenX;
        }
    }, false);

    cartItemsContainer.addEventListener('touchend', e => {
        const cartItem = e.target.closest('.cart-item');
        if (cartItem) {
            touchendX = e.changedTouches[0].screenX;
            handleSwipe(cartItem);
        }
    }, false);

    function handleSwipe(cartItem) {
        if (touchendX < touchstartX - 50) { // Swiped left
            // Reset other items
            document.querySelectorAll('.cart-item.swiped').forEach(item => {
                if (item !== cartItem) {
                    item.classList.remove('swiped');
                }
            });
            cartItem.classList.add('swiped');
        }
        if (touchendX > touchstartX + 50) { // Swiped right
            cartItem.classList.remove('swiped');
        }
    }

    orderPage.addEventListener('click', e => {
        const addToCartBtn = e.target.closest('.add-to-cart-btn');
        const quantityBtn = e.target.closest('.quantity-change-btn');
        const checkoutBtn = e.target.closest('#checkout-btn');
        const deleteBtn = e.target.closest('.delete-cart-item-btn');

        if (deleteBtn) {
            const itemId = parseInt(deleteBtn.dataset.itemId, 10);
            store.removeFromCart(itemId);
            triggerHapticFeedback();
            renderCart();
            return;
        }

        if (addToCartBtn) {
            const itemId = parseInt(addToCartBtn.dataset.itemId, 10);
            store.addToCart(itemId);
            triggerHapticFeedback();
            renderCart();
            return;
        }

        if (quantityBtn) {
            const itemId = parseInt(quantityBtn.dataset.itemId);
            const amount = parseInt(quantityBtn.dataset.amount);
            const currentItem = store.getCart().find(item => item.id === itemId);
            if (currentItem) {
                store.updateCartItemQuantity(itemId, currentItem.quantity + amount);
                triggerHapticFeedback();
                renderCart();
            }
            return;
        }

        if (checkoutBtn && store.getCart().length > 0) {
            window.location.href = 'checkout.html';
        }
    });
}

export async function initOrderPage() {
    if (!document.getElementById('order-page')) return;

    allMenuItems = await store.getMenu();
    categorizedItems = categorizeMenuItems(allMenuItems);

    renderTabs();
    renderMenuItems('Featured'); // Show featured items by default
    renderCart();
    initEventListeners();
}