import { store } from '../store.js';

function renderCart() {
    const cart = store.getCart();
    const cartItemsContainer = document.getElementById('cart-items-container');
    const orderSummaryContainer = document.getElementById('order-summary');

    if (!cartItemsContainer || !orderSummaryContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-12">
                <span class="material-symbols-outlined text-6xl text-text-secondary">shopping_cart</span>
                <h2 class="text-2xl font-bold text-text-primary mt-4">Your cart is empty</h2>
                <p class="text-text-secondary mt-2">Looks like you haven't added anything to your cart yet.</p>
                <a href="our-menu.html" class="btn btn-primary mt-6">Browse Menu</a>
            </div>
        `;
        orderSummaryContainer.classList.add('hidden');
        return;
    }

    orderSummaryContainer.classList.remove('hidden');
    cartItemsContainer.innerHTML = ''; // Clear previous content

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border-color pb-4';
        itemElement.innerHTML = `
            <div class="flex items-center gap-4">
                <img src="${item.image}" alt="${item.name}" class="h-20 w-20 rounded-lg object-cover">
                <div>
                    <h3 class="font-semibold text-text-primary">${item.name}</h3>
                    <p class="text-sm text-text-secondary">$${item.price.toFixed(2)} each</p>
                    <button class="remove-item-btn text-sm text-primary-color hover:underline mt-1" data-item-id="${item.id}">Remove</button>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="flex items-center border border-border-color rounded-full">
                    <button class="quantity-change-btn p-2" data-item-id="${item.id}" data-amount="-1">
                        <span class="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span class="px-3 text-text-primary">${item.quantity}</span>
                    <button class="quantity-change-btn p-2" data-item-id="${item.id}" data-amount="1">
                        <span class="material-symbols-outlined text-sm">add</span>
                    </button>
                </div>
                <p class="font-bold text-text-primary w-20 text-right">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    updateOrderSummary();
}

function updateOrderSummary() {
    const cart = store.getCart();
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const taxes = subtotal * 0.10; // 10% tax
    const total = subtotal + taxes;

    document.getElementById('summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('summary-taxes').textContent = `$${taxes.toFixed(2)}`;
    document.getElementById('summary-total').textContent = `$${total.toFixed(2)}`;
}

function initCartEventListeners() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    if (!cartItemsContainer) return;

    cartItemsContainer.addEventListener('click', e => {
        const target = e.target;

        if (target.matches('.quantity-change-btn')) {
            const itemId = parseInt(target.dataset.itemId);
            const amount = parseInt(target.dataset.amount);
            const currentItem = store.getCart().find(item => item.id === itemId);
            if (currentItem) {
                store.updateCartItemQuantity(itemId, currentItem.quantity + amount);
                renderCart(); // Re-render the cart to reflect changes
            }
        }

        if (target.matches('.remove-item-btn')) {
            const itemId = parseInt(target.dataset.itemId);
            store.removeFromCart(itemId);
            renderCart(); // Re-render the cart
        }
    });

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }
}

export function initOrderPage() {
    renderCart();
    initCartEventListeners();
}