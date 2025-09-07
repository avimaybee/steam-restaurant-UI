import { store } from '../store.js';

let allMenuItems = []; // This will hold the original, unmodified menu items.
let processedMenuItems = []; // This will hold items with tags and popularity.

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

/**
 * Processes raw menu items to add tags and a consistent popularity score.
 */
function enhanceMenuItems(items) {
    return items.map(item => {
        const tags = new Set();
        const description = (item.description || '').toLowerCase();
        const name = (item.name || '').toLowerCase();

        if (name.includes('vegan') || description.includes(' vegan') || description.includes('veg.')) tags.add('vegan');
        if (tags.has('vegan') || description.includes(' v.')) tags.add('vegetarian');
        if (name.includes('gf') || description.includes('gf')) tags.add('gluten-free');
        if (description.includes('df')) tags.add('dairy-free');
        if (description.includes('spicy')) tags.add('spicy');
        if (name.includes('pescatarian')) tags.add('pescatarian');

        // Pseudo-random popularity based on ID for consistency
        const popularity = (item.id * 37) % 5 + 1;

        return { ...item, tags: Array.from(tags), popularity };
    });
}

/**
 * Renders the menu based on a given set of items.
 */
function renderMenu(itemsToRender) {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return;

    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) loadingSpinner.style.display = 'none';

    menuContainer.innerHTML = '';

    if (itemsToRender.length === 0) {
        menuContainer.innerHTML = '<p class="text-center text-white/60">No items match your filters.</p>';
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
            menuItemElement.className = 'flex flex-col justify-between gap-2';
            menuItemElement.innerHTML = `
                <div class="flex items-center gap-4">
                    <img src="${item.image}" alt="${item.name}" class="h-16 w-16 rounded-md object-cover">
                    <div class="flex-grow">
                        <div class="flex justify-between items-start">
                            <h3 class="font-semibold text-white">${item.name}</h3>
                            <p class="shrink-0 font-medium text-white">$${item.price.toFixed(2)}</p>
                        </div>
                        <p class="text-sm text-white/60">${item.description}</p>
                    </div>
                </div>
            `;
            grid.appendChild(menuItemElement);
        });

        section.appendChild(grid);
        menuContainer.appendChild(section);
    }
}

/**
 * Applies all active filters and sorting to the menu items.
 */
function applyFilters() {
    const categoryFilter = document.querySelector('.menu-filter-btn.active').dataset.category;
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const sortBy = document.getElementById('sort-by').value;
    const selectedTags = Array.from(document.querySelectorAll('#dietary-tags input:checked')).map(cb => cb.value);

    let filteredItems = processedMenuItems;

    // 1. Filter by category
    if (categoryFilter !== 'all') {
        filteredItems = filteredItems.filter(item => item.category.includes(categoryFilter));
    }

    // 2. Filter by search term
    if (searchTerm) {
        filteredItems = filteredItems.filter(item =>
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)
        );
    }

    // 3. Filter by dietary tags
    if (selectedTags.length > 0) {
        filteredItems = filteredItems.filter(item =>
            selectedTags.every(tag => item.tags.includes(tag))
        );
    }

    // 4. Apply sorting
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
        // 'default' case does nothing, preserving original order
    }

    renderMenu(filteredItems);
}

/**
 * Initializes all event listeners for the filter controls.
 */
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
        // Use 'input' for instant search feedback
        if (event.target.matches('#search-input, #sort-by')) {
            applyFilters();
        }
    });

    advancedFilters.addEventListener('change', event => {
        // Use 'change' for checkboxes
        if (event.target.matches('input[type="checkbox"]')) {
            applyFilters();
        }
    });
}

/**
 * Initializes the entire menu page.
 */
export async function initMenuPage() {
    if (!document.getElementById('menu-container')) return;

    allMenuItems = await store.getMenu();
    processedMenuItems = enhanceMenuItems(allMenuItems);

    applyFilters(); // Initial render
    initFilterListeners();
}
