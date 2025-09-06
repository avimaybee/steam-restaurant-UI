
document.addEventListener('DOMContentLoaded', function() {
    const menuItemsContainer = document.getElementById('menu-items-container');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const subtotalElement = document.getElementById('subtotal');
    const taxesElement = document.getElementById('taxes');
    const totalElement = document.getElementById('total');

    let menuItems = [];
    let cart = [];

    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            menuItems = data;
            renderMenuItems(menuItems);
        });

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

    menuItemsContainer.addEventListener('click', function(event) {
        const addToCartButton = event.target.closest('.add-to-cart-btn');
        if (addToCartButton) {
            const itemId = parseInt(addToCartButton.dataset.itemId);
            addToCart(itemId);
        }
    });

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
        } else {
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('flex', 'justify-between', 'items-start', 'mb-4');
                cartItemElement.innerHTML = `
                    <div>
                        <p class="font-bold">${item.name}</p>
                        <div class="flex items-center gap-2 mt-1">
                            <button class="remove-from-cart-btn flex items-center justify-center rounded-full h-6 w-6 bg-[#2b2522] hover:bg-[#382f29] transition-colors" data-item-id="${item.id}">
                                <span class="material-symbols-outlined text-sm"> remove </span>
                            </button>
                            <span class="text-sm">${item.quantity}</span>
                            <button class="add-to-cart-btn flex items-center justify-center rounded-full h-6 w-6 bg-[#2b2522] hover:bg-[#382f29] transition-colors" data-item-id="${item.id}">
                                <span class="material-symbols-outlined text-sm"> add </span>
                            </button>
                        </div>
                    </div>
                    <p class="font-bold text-lg">$${(item.price * item.quantity).toFixed(2)}</p>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
        }

        const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const taxes = subtotal * 0.1; // 10% tax
        const total = subtotal + taxes;

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        taxesElement.textContent = `$${taxes.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    cartItemsContainer.addEventListener('click', function(event) {
        const addToCartButton = event.target.closest('.add-to-cart-btn');
        const removeFromCartButton = event.target.closest('.remove-from-cart-btn');

        if (addToCartButton) {
            const itemId = parseInt(addToCartButton.dataset.itemId);
            addToCart(itemId);
        }

        if (removeFromCartButton) {
            const itemId = parseInt(removeFromCartButton.dataset.itemId);
            removeFromCart(itemId);
        }
    });
});
