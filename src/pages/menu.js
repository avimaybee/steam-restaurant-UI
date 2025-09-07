import { store } from '../store.js';

let menuItems = [];

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function renderMenu(category) {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return;

    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }

    menuContainer.innerHTML = '';
    const filteredItems = category === 'all' ? menuItems : menuItems.filter(item => item.category.includes(category));

    const itemsBySubCategory = filteredItems.reduce((acc, item) => {
        const subCategory = item.subCategory;
        if (!acc[subCategory]) {
            acc[subCategory] = [];
        }
        acc[subCategory].push(item);
        return acc;
    }, {});

    for (const subCategory in itemsBySubCategory) {
        const section = document.createElement('section');
        section.innerHTML = `<h2 class="mb-6 text-2xl font-bold tracking-tight text-white sm:text-3xl border-l-4 border-[var(--accent-color)] pl-4">${toTitleCase(subCategory.replace('-', ' '))}</h2>`;

        const grid = document.createElement('div');
        grid.classList.add('grid', 'gap-6', 'rounded-lg', 'border', 'border-white/10', 'bg-white/5', 'p-6', 'backdrop-blur-sm', 'md:grid-cols-2');

        itemsBySubCategory[subCategory].forEach(item => {
            const menuItemElement = document.createElement('div');
            menuItemElement.classList.add('flex', 'flex-col', 'justify-between', 'gap-2');
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

function initMenuFilters() {
    const menuFilters = document.getElementById('menu-filters');
    if (menuFilters) {
        menuFilters.addEventListener('click', function(event) {
            const filterBtn = event.target.closest('.menu-filter-btn');
            if (filterBtn) {
                const category = filterBtn.dataset.category;
                document.querySelector('.menu-filter-btn.active').classList.remove('active');
                filterBtn.classList.add('active');
                renderMenu(category);
            }
        });
    }
}

export async function initMenuPage() {
    menuItems = await store.getMenu();
    renderMenu('all');
    initMenuFilters();
}
