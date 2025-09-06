document.addEventListener('DOMContentLoaded', function() {
    // --- Existing DOM Elements ---
    const menuItemsContainer = document.getElementById('menu-items-container');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const subtotalElement = document.getElementById('subtotal');
    const taxesElement = document.getElementById('taxes');
    const totalElement = document.getElementById('total');
    const checkoutContainer = document.querySelector('aside .rounded-lg'); // The container for the whole checkout sidebar
    const reviewOrderButton = checkoutContainer.querySelector('button');
    const formEndpoint = 'https://formspree.io/f/mwkdbzyy'; // Public test endpoint

    // --- State Variables ---
    let menuItems = [];
    let cart = [];

    // --- Initial Setup ---
    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            menuItems = data;
            renderMenuItems(menuItems);
        });

    // --- Event Listeners ---
    menuItemsContainer.addEventListener('click', handleMenuClick);
    cartItemsContainer.addEventListener('click', handleCartClick);
    reviewOrderButton.addEventListener('click', handleCheckout);

    // --- Functions ---

    function renderMenuItems(items) {
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
                        <button class="add-to-cart-btn flex items-center justify-center rounded-full h-9 w-9 bg-[#2b2522] group-hover:bg-[var(--primary-color)] text-white transition-colors" data-item-id="${item.id}">
                            <span class="material-symbols-outlined text-xl"> add </span>
                        </button>
                    </div>
                </div>
            `;
            menuItemsContainer.appendChild(menuItemElement);
        });
    }

    function handleMenuClick(event) {
        const addToCartButton = event.target.closest('.add-to-cart-btn');
        if (addToCartButton) {
            const itemId = parseInt(addToCartButton.dataset.itemId);
            addToCart(itemId);
        }
    }

    function handleCartClick(event) {
        const addToCartButton = event.target.closest('.add-to-cart-btn');
        const removeFromCartButton = event.target.closest('.remove-from-cart-btn');
        if (addToCartButton) {
            addToCart(parseInt(addToCartButton.dataset.itemId));
        }
        if (removeFromCartButton) {
            removeFromCart(parseInt(removeFromCartButton.dataset.itemId));
        }
    }

    function addToCart(itemId) {
        const item = menuItems.find(i => i.id === itemId);
        if (item) {
            const cartItem = cart.find(i => i.id === itemId);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ ...item, quantity: 1 });
            }
            updateCartView();
        }
    }

    function removeFromCart(itemId) {
        const cartItem = cart.find(i => i.id === itemId);
        if (cartItem) {
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
            } else {
                cart = cart.filter(i => i.id !== itemId);
            }
            updateCartView();
        }
    }

    function updateCartView() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="flex justify-center items-center h-full"><p class="text-gray-400">Your cart is empty</p></div>';
            reviewOrderButton.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            reviewOrderButton.classList.remove('opacity-50', 'cursor-not-allowed');
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('flex', 'justify-between', 'items-start', 'mb-4');
                cartItemElement.innerHTML = `
                    <div>
                        <p class="font-bold">${item.name}</p>
                        <div class="flex items-center gap-2 mt-1">
                            <button class="remove-from-cart-btn flex items-center justify-center rounded-full h-6 w-6 bg-[#2b2522] hover:bg-[#382f29] transition-colors" data-item-id="${item.id}"><span class="material-symbols-outlined text-sm"> remove </span></button>
                            <span class="text-sm">${item.quantity}</span>
                            <button class="add-to-cart-btn flex items-center justify-center rounded-full h-6 w-6 bg-[#2b2522] hover:bg-[#382f29] transition-colors" data-item-id="${item.id}"><span class="material-symbols-outlined text-sm"> add </span></button>
                        </div>
                    </div>
                    <p class="font-bold text-lg">$${(item.price * item.quantity).toFixed(2)}</p>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
        }
        updateTotals();
    }

    function updateTotals() {
        const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const taxes = subtotal * 0.1; // 10% tax
        const total = subtotal + taxes;
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        taxesElement.textContent = `$${taxes.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    function handleCheckout() {
        if (cart.length === 0) return;

        // Step 2: Collect User Details
        checkoutContainer.innerHTML = `
            <div class="flex items-center justify-between border-b border-[#382f29] pb-4">
                <h3 class="text-xl font-bold">Your Details</h3>
                <span class="text-sm text-gray-400">Step 2 of 3</span>
            </div>
            <form id="checkout-form" class="py-6 space-y-4">
                <div>
                    <label for="fullName" class="text-sm text-gray-300">Full Name</label>
                    <input type="text" id="fullName" name="fullName" required class="w-full mt-1 bg-[#2b2522] border border-[#382f29] rounded-lg p-2 focus:ring-1 focus:ring-[var(--primary-color)] focus:outline-none">
                </div>
                <div>
                    <label for="email" class="text-sm text-gray-300">Email</label>
                    <input type="email" id="email" name="email" required class="w-full mt-1 bg-[#2b2522] border border-[#382f29] rounded-lg p-2 focus:ring-1 focus:ring-[var(--primary-color)] focus:outline-none">
                </div>
                 <div>
                    <label for="phone" class="text-sm text-gray-300">Phone Number</label>
                    <input type="tel" id="phone" name="phone" required class="w-full mt-1 bg-[#2b2522] border border-[#382f29] rounded-lg p-2 focus:ring-1 focus:ring-[var(--primary-color)] focus:outline-none">
                </div>
                <button type="submit" class="w-full mt-4 rounded-lg bg-[var(--primary-color)] py-3 text-white font-bold text-base hover:bg-opacity-90 transition-colors">
                    Confirm Details
                </button>
            </form>
        `;

        const checkoutForm = document.getElementById('checkout-form');
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(checkoutForm);
            const userDetails = Object.fromEntries(formData.entries());
            showConfirmationStep(userDetails);
        });
    }

    function showConfirmationStep(userDetails) {
        // Step 3: Confirmation
        const orderSummaryHtml = cart.map(item => `
            <div class="flex justify-between text-sm">
                <span>${item.quantity} x ${item.name}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');

        checkoutContainer.innerHTML = `
            <div class="flex items-center justify-between border-b border-[#382f29] pb-4">
                <h3 class="text-xl font-bold">Confirm Order</h3>
                <span class="text-sm text-gray-400">Step 3 of 3</span>
            </div>
            <div class="py-6 space-y-4">
                <div class="space-y-2 border-b border-[#382f29] pb-4">
                    <h4 class="font-bold">Your Details:</h4>
                    <p class="text-sm">${userDetails.fullName}</p>
                    <p class="text-sm">${userDetails.email}</p>
                    <p class="text-sm">${userDetails.phone}</p>
                </div>
                <div class="space-y-2 pt-2">
                     <h4 class="font-bold">Order Summary:</h4>
                     ${orderSummaryHtml}
                     <div class="flex justify-between font-bold text-lg pt-4 border-t border-[#382f29] mt-4">
                        <span>Total</span>
                        <span>${totalElement.textContent}</span>
                     </div>
                </div>
            </div>
            <button id="place-order-btn" class="w-full mt-4 rounded-lg bg-[var(--primary-color)] py-3 text-white font-bold text-base hover:bg-opacity-90 transition-colors">
                Place Order
            </button>
        `;

        const placeOrderBtn = document.getElementById('place-order-btn');
        placeOrderBtn.addEventListener('click', () => submitOrder(userDetails));
    }

    function submitOrder(userDetails) {
        const placeOrderBtn = document.getElementById('place-order-btn');
        placeOrderBtn.disabled = true;
        placeOrderBtn.innerHTML = 'Submitting...';

        const orderData = {
            ...userDetails,
            orderItems: cart.map(item => `${item.quantity} x ${item.name}`).join(', '),
            total: totalElement.textContent,
            submittedAt: new Date().toISOString()
        };

        fetch(formEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(orderData)
        })
        .then(response => {
            if (!response.ok) throw new Error('Submission failed');
            return response.json();
        })
        .then(() => {
            checkoutContainer.innerHTML = `
                <div class="text-center py-10">
                    <h3 class="text-2xl font-bold text-[var(--primary-color)]">Thank You!</h3>
                    <p class="text-gray-300 mt-2">Your order has been placed successfully.</p>
                     <p class="text-gray-400 text-sm mt-4">We will contact you shortly to confirm the details.</p>
                    <a href="order-page.html" class="mt-8 inline-block rounded-lg bg-gray-600 px-6 py-2 text-sm font-semibold text-white hover:bg-opacity-80">Place Another Order</a>
                </div>
            `;
        })
        .catch(error => {
            console.error(error);
            placeOrderBtn.disabled = false;
            placeOrderBtn.innerHTML = 'Place Order';
            alert('There was an error submitting your order. Please try again.');
        });
    }

    updateCartView(); // Initial call
});
