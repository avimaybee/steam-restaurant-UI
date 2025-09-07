import { store } from '../store.js';

let allMenuItems = [];
let processedMenuItems = [];
let currentStarRating = 0;

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

async function enhanceMenuItems(items) {
    const allReviews = await store.getReviews();
    return items.map(item => {
        const tags = new Set();
        const description = store.get(`menu_item_${item.id}_description`).toLowerCase();
        const name = store.get(`menu_item_${item.id}_name`).toLowerCase();

        if (name.includes('vegan') || description.includes(' vegan') || description.includes('veg.')) tags.add('vegan');
        if (tags.has('vegan') || description.includes(' v.')) tags.add('vegetarian');
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
        menuContainer.innerHTML = `<p class="text-center text-white/60">${store.get('menu_no_items')}</p>`;
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
        section.innerHTML = `<h2 class="mb-6 text-2xl font-bold tracking-tight text-white sm:text-3xl border-l-4 border-[var(--accent-color)] pl-4">${toTitleCase(subCategory.replace('-', ' '))}</h2>`;

        const grid = document.createElement('div');
        grid.className = 'grid gap-6 rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:grid-cols-2';

        itemsBySubCategory[subCategory].forEach(item => {
            const menuItemElement = document.createElement('div');
            menuItemElement.className = 'flex flex-col justify-between gap-3';
            const itemName = store.get(`menu_item_${item.id}_name`);
            const itemDescription = store.get(`menu_item_${item.id}_description`);
            menuItemElement.innerHTML = `
                <div class="flex items-start gap-4">
                    <img src="${item.image}" alt="${itemName}" class="h-16 w-16 rounded-md object-cover">
                    <div class="flex-grow">
                        <div class="flex justify-between items-start">
                            <h3 class="font-semibold text-white">${itemName}</h3>
                            <p class="shrink-0 font-medium text-white">$${item.price.toFixed(2)}</p>
                        </div>
                        <p class="text-sm text-white/60 mt-1">${itemDescription}</p>
                    </div>
                </div>
                <div class="flex items-center justify-between mt-2">
                    <div class="flex items-center gap-2">
                        ${renderStarRating(item.averageRating)}
                        <span class="text-xs text-gray-400">(${item.reviews.length} ${store.get('menu_reviews')})</span>
                    </div>
                    <button class="leave-review-btn text-sm text-primary-color hover:underline" data-item-id="${item.id}" data-item-name="${itemName}">
                        ${store.get('menu_leave_review')}
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
            const itemName = store.get(`menu_item_${item.id}_name`).toLowerCase();
            const itemDescription = store.get(`menu_item_${item.id}_description`).toLowerCase();
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
