import { store } from '../store.js';

function renderOrderPage() {
    const cart = store.getCart();
    const orderItemsContainer = document.getElementById('order-items-container');
    const orderSummary = document.getElementById('order-summary');

    if (!orderItemsContainer) return;

    if (cart.length === 0) {
        orderItemsContainer.innerHTML = `
            <div class="text-center py-16">
                <span class="material-symbols-outlined text-6xl text-text-secondary">shopping_cart</span>
                <h2 class="text-2xl font-bold text-white mt-4">Your Cart is Empty</h2>
                <p class="text-text-secondary mt-2">Looks like you haven't added anything to your cart yet.</p>
                <a href="menu.html" class="mt-6 inline-block bg-primary-color text-black font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-colors">
                    Browse Menu
                </a>
            </div>
        `;
        if (orderSummary) {
            orderSummary.classList.add('hidden');
        }
    } else {
        if (orderSummary) {
            orderSummary.classList.remove('hidden');
        }
        orderItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item-card flex items-start gap-4 sm:gap-6 bg-surface-color p-4 rounded-xl">
                <img src="${item.image}" alt="${item.name}" class="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg">
                <div class="flex-1 flex flex-col h-full">
                    <div class="flex-1">
                        <h3 class="text-lg sm:text-xl font-bold text-white">${item.name}</h3>
                        <p class="text-primary-color font-bold text-base sm:text-lg mt-1">$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="flex items-center gap-3 mt-2">
                        <div class="flex items-center border border-border-color rounded-full">
                            <button class="quantity-change-btn p-1" data-item-id="${item.id}" data-amount="-1">
                                <span class="material-symbols-outlined text-sm">remove</span>
                            </button>
                            <span class="px-3 text-white text-sm font-medium">${item.quantity}</span>
                            <button class="quantity-change-btn p-1" data-item-id="${item.id}" data-amount="1">
                                <span class="material-symbols-outlined text-sm">add</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-end h-full">
                     <p class="text-lg sm:text-xl font-bold text-white flex-1">$${(item.price * item.quantity).toFixed(2)}</p>
                     <button class="remove-from-cart-btn text-text-secondary hover:text-red-500 transition-colors" data-item-id="${item.id}">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
        `).join('');
    }
    updateOrderSummary();
}

    updateOrderSummary();
}

function updateOrderSummary() {
    const cart = store.getCart();
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const taxes = subtotal * 0.08; // 8% tax
    const total = subtotal + taxes;

    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryTaxes = document.getElementById('summary-taxes');
    const summaryTotal = document.getElementById('summary-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (summarySubtotal) summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (summaryTaxes) summaryTaxes.textContent = `$${taxes.toFixed(2)}`;
    if (summaryTotal) summaryTotal.textContent = `$${total.toFixed(2)}`;

    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
        checkoutBtn.classList.toggle('opacity-50', cart.length === 0);
        checkoutBtn.classList.toggle('cursor-not-allowed', cart.length === 0);
    }
}

function initEventListeners() {
    const orderPage = document.getElementById('order-page');
    if (!orderPage) return;

    orderPage.addEventListener('click', e => {
        const quantityBtn = e.target.closest('.quantity-change-btn');
        const removeBtn = e.target.closest('.remove-from-cart-btn');
        const checkoutBtn = e.target.closest('#checkout-btn');

        if (quantityBtn) {
            const itemId = parseInt(quantityBtn.dataset.itemId, 10);
            const amount = parseInt(quantityBtn.dataset.amount, 10);
            const currentItem = store.getCart().find(item => item.id === itemId);
            if (currentItem) {
                store.updateCartItemQuantity(itemId, currentItem.quantity + amount);
                renderOrderPage(); // Re-render the whole page to reflect changes
            }
            return;
        }

        if (removeBtn) {
            const itemId = parseInt(removeBtn.dataset.itemId, 10);
            store.removeFromCart(itemId);
            renderOrderPage(); // Re-render the whole page
            return;
        }

        if (checkoutBtn && !checkoutBtn.disabled) {
            // Placeholder for checkout logic
            alert('Proceeding to checkout...');
            // window.location.href = 'checkout.html';
        }
    });
}


export async function initOrderPage() {
    if (!document.getElementById('order-page')) return;

    // Ensure menu is loaded so we can get item details if needed, though cart should have them
    await store.getMenu();

    renderOrderPage();
    initEventListeners();
}