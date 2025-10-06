import { store } from '../store.js';

let allMenuItems = [];
let processedMenuItems = [];
let currentStarRating = 0;

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

async function enhanceMenuItems(items) {
    const allReviews = await store.getAllReviews();
    return items.map(item => {
        const tags = new Set();
        const description = (item.description || "").toLowerCase();
        const name = (item.name || "").toLowerCase();

        if (name.includes('vegan') || description.includes(' vegan') || description.includes(' v.')) tags.add('vegan');
        if (tags.has('vegan') || description.includes('vegetarian') || description.includes('veg.')) tags.add('vegetarian');
        if (name.includes('gf') || description.includes('gf')) tags.add('gluten-free');
        if (description.includes('df')) tags.add('dairy-free');
        if (description.includes('spicy')) tags.add('spicy');
        if (name.includes('pescatarian')) tags.add('pescatarian');

        const popularity = (item.id * 37) % 5 + 1;
        const reviews = allReviews[item.id] || [];
        const averageRating = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;

        return { ...item, tags: Array.from(tags), popularity, reviews, averageRating };
    });
}

function renderStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        const icon = i <= rating ? 'star' : 'star_outline';
        stars += `<span class="material-symbols-outlined text-yellow-400">${icon}</span>`;
    }
    return `<div class="flex items-center">${stars}</div>`;
}

function renderMenu(itemsToRender) {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return;

    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) loadingSpinner.style.display = 'none';

    menuContainer.innerHTML = '';

    if (itemsToRender.length === 0) {
        menuContainer.innerHTML = `<p class="text-center text-text-secondary">${store.get('menu_no_items')}</p>`;
        return;
    }

    const itemsBySubCategory = itemsToRender.reduce((acc, item) => {
        const subCategory = item.subCategory;
        if (!acc[subCategory]) acc[subCategory] = [];
        acc[subCategory].push(item);
        return acc;
    }, {});

    for (const subCategory in itemsBySubCategory) {
        const section = document.createElement('section');
        section.innerHTML = `<h2 class="mb-8 text-3xl font-bold tracking-tight text-white sm:text-4xl border-l-4 border-primary-color pl-4">${toTitleCase(subCategory.replace('-', ' '))}</h2>`;

        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';

        itemsBySubCategory[subCategory].forEach(item => {
            const menuItemElement = document.createElement('div');
            menuItemElement.className = 'menu-item-card group bg-surface-color rounded-lg shadow-lg overflow-hidden flex flex-col';
            const itemName = item.name;
            const itemDescription = item.description;
            menuItemElement.innerHTML = `
                <div class="relative">
                    <img src="${item.image}" alt="${itemName}" class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110">
                    <div class="absolute top-4 right-4 bg-primary-color text-black font-bold text-lg py-1 px-3 rounded-full shadow-md">$${item.price.toFixed(2)}</div>
                </div>
                <div class="p-6 flex-grow flex flex-col">
                    <h3 class="text-xl sm:text-2xl font-bold text-white mb-2">${itemName}</h3>
                    <p class="text-text-secondary mb-4 flex-grow">${itemDescription}</p>
                    <div class="flex items-center justify-between mt-4">
                        <div class="flex items-center gap-2">
                            ${renderStarRating(item.averageRating)}
                            <span class="text-xs text-text-secondary">(${item.reviews.length} reviews)</span>
                        </div>
                        <button class="leave-review-btn text-sm text-primary-color hover:underline" data-item-id="${item.id}" data-item-name="${itemName}">Leave a review</button>
                    </div>
                </div>
                <div class="p-6 bg-secondary-color mt-auto">
                     <button class="add-to-cart-btn btn btn-primary w-full flex items-center justify-center gap-2" data-item-id="${item.id}">
                        <span class="material-symbols-outlined">shopping_bag</span>
                        <span>Add to Cart</span>
                    </button>
                </div>
            `;
            grid.appendChild(menuItemElement);
        });

        section.appendChild(grid);
        menuContainer.appendChild(section);
    }
}

function applyFilters() {
    const categoryFilter = document.querySelector('.menu-filter-btn.active').dataset.category;
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const sortBy = document.getElementById('sort-by').value;
    const selectedTags = Array.from(document.querySelectorAll('#dietary-tags input:checked')).map(cb => cb.value);

    let filteredItems = processedMenuItems;

    if (categoryFilter !== 'all') {
        filteredItems = filteredItems.filter(item => item.category.includes(categoryFilter));
    }
    if (searchTerm) {
        filteredItems = filteredItems.filter(item => {
            const itemName = (item.name || "").toLowerCase();
            const itemDescription = (item.description || "").toLowerCase();
            return itemName.includes(searchTerm) || itemDescription.includes(searchTerm);
        });
    }
    if (selectedTags.length > 0) {
        filteredItems = filteredItems.filter(item =>
            selectedTags.every(tag => item.tags.includes(tag))
        );
    }

    switch (sortBy) {
        case 'popularity':
            filteredItems.sort((a, b) => b.popularity - a.popularity);
            break;
        case 'price-asc':
            filteredItems.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredItems.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredItems.sort((a, b) => b.averageRating - a.averageRating);
            break;
    }

    renderMenu(filteredItems);
    initAddToCartListeners();
}

function initAddToCartListeners() {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.addEventListener('click', e => {
        const button = e.target.closest('.add-to-cart-btn');
        if (button) {
            const itemId = parseInt(button.dataset.itemId, 10);
            store.addToCart(itemId);

            // Provide visual feedback
            const originalText = button.innerHTML;
            button.innerHTML = `
                <span class="material-symbols-outlined">check_circle</span>
                <span>Added!</span>
            `;
            button.disabled = true;
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 1500);
        }
    });
}

function initFilterListeners() {
    const categoryFilters = document.getElementById('menu-filters');
    const advancedFilters = document.getElementById('advanced-filters');

    categoryFilters.addEventListener('click', event => {
        const filterBtn = event.target.closest('.menu-filter-btn');
        if (filterBtn) {
            document.querySelector('.menu-filter-btn.active').classList.remove('active');
            filterBtn.classList.add('active');
            applyFilters();
        }
    });

    advancedFilters.addEventListener('input', event => {
        if (event.target.matches('#search-input, #sort-by')) {
            applyFilters();
        }
    });

    advancedFilters.addEventListener('change', event => {
        if (event.target.matches('input[type="checkbox"]')) {
            applyFilters();
        }
    });
}

function initReviewModal() {
    const modal = document.getElementById('review-modal');
    const menuContainer = document.getElementById('menu-container');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const reviewForm = document.getElementById('review-form');
    const starRatingContainer = document.getElementById('star-rating');

    if (!modal) return; // In case modal is not on the page

    // Star rating interaction
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'material-symbols-outlined text-gray-400 cursor-pointer';
        star.textContent = 'star_outline';
        star.dataset.value = i;
        starRatingContainer.appendChild(star);
    }

    starRatingContainer.addEventListener('click', e => {
        if (e.target.dataset.value) {
            currentStarRating = parseInt(e.target.dataset.value);
            const stars = starRatingContainer.querySelectorAll('span');
            stars.forEach(star => {
                star.textContent = parseInt(star.dataset.value) <= currentStarRating ? 'star' : 'star_outline';
                star.classList.toggle('text-yellow-400', parseInt(star.dataset.value) <= currentStarRating);
                star.classList.toggle('text-gray-400', parseInt(star.dataset.value) > currentStarRating);
            });
        }
    });

    // Open modal
    menuContainer.addEventListener('click', e => {
        if (e.target.classList.contains('leave-review-btn')) {
            const user = store.getCurrentUser();
            if (!user) {
                alert(store.get('review_modal_login_alert'));
                window.location.href = 'login.html';
                return;
            }
            const itemId = e.target.dataset.itemId;
            const itemName = e.target.dataset.itemName;
            document.getElementById('review-item-id').value = itemId;
            document.getElementById('review-item-name').textContent = itemName;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    });

    // Close modal
    const closeModal = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        reviewForm.reset();
        currentStarRating = 0; // Reset rating
        const stars = starRatingContainer.querySelectorAll('span');
        stars.forEach(star => {
            star.textContent = 'star_outline';
            star.classList.remove('text-yellow-400');
            star.classList.add('text-gray-400');
        });
    };
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });

    // Handle form submission
    reviewForm.addEventListener('submit', async e => {
        e.preventDefault();
        const itemId = document.getElementById('review-item-id').value;
        const comment = document.getElementById('review-comment').value;
        const errorDiv = document.getElementById('review-error');

        if (currentStarRating === 0) {
            errorDiv.textContent = store.get('review_modal_error_rating');
            errorDiv.classList.remove('hidden');
            return;
        }
        errorDiv.classList.add('hidden');

        const user = store.getCurrentUser();
        const newReview = {
            user: user.name,
            rating: currentStarRating,
            comment: comment
        };

        await store.addReview(itemId, newReview);
        processedMenuItems = await enhanceMenuItems(allMenuItems);
        applyFilters();
        closeModal();
    });
}

export async function initMenuPage() {
    if (!document.getElementById('menu-container')) return;

    allMenuItems = await store.getMenu();
    processedMenuItems = await enhanceMenuItems(allMenuItems);

    applyFilters();
    initFilterListeners();
    initReviewModal();
}
