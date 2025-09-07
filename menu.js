
document.addEventListener('DOMContentLoaded', function() {
    const menuContainer = document.getElementById('menu-container');
    const menuFilters = document.getElementById('menu-filters');
    let menuItems = [];

    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            menuItems = data;
            renderMenu('all');
        });

    menuFilters.addEventListener('click', function(event) {
        const filterBtn = event.target.closest('.menu-filter-btn');
        if (filterBtn) {
            const category = filterBtn.dataset.category;
            document.querySelector('.menu-filter-btn.active').classList.remove('active');
            filterBtn.classList.add('active');
            renderMenu(category);
        }
    });

    function renderMenu(category) {
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
                    <div class="flex justify-between items-start">
                        <h3 class="font-semibold text-white">${item.name}</h3>
                        <p class="shrink-0 font-medium text-white">$${item.price.toFixed(2)}</p>
                    </div>
                    <p class="text-sm text-white/60">${item.description}</p>
                `;
                grid.appendChild(menuItemElement);
            });

            section.appendChild(grid);
            menuContainer.appendChild(section);
        }
    }

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
});
