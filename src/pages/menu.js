import { store } from '../store.js';

let allMenuItems = [];

function toTitleCase(str) {
    if (!str) return '';
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

function enhanceMenuItems(items) {
    return items.map(item => {
        const tags = new Set();
        const fullText = `${item.name} ${item.description}`.toLowerCase();

        if (/\b(gf|gluten-free)\b/.test(fullText)) tags.add('GF');
        if (/\b(lf|lactose-free)\b/.test(fullText)) tags.add('LF');
        if (/\b(v|vegan)\b/.test(fullText)) tags.add('V');
        if (/\b(veg|vgo|vegetarian)\b/.test(fullText)) tags.add('VGO');

        return { ...item, tags: Array.from(tags) };
    });
}

function renderTags(tags) {
    if (!tags || tags.length === 0) return '';
    return tags.map(tag => `<span class="inline-block bg-gray-700 text-gray-300 text-xs font-semibold px-2 py-1 rounded-full">${tag}</span>`).join(' ');
}

function renderDineInSection(items) {
    const itemsBySubCategory = items.reduce((acc, item) => {
        const subCategory = item.subCategory || 'uncategorized';
        if (!acc[subCategory]) acc[subCategory] = [];
        acc[subCategory].push(item);
        return acc;
    }, {});

    let html = '';
    for (const subCategory in itemsBySubCategory) {
        html += `
            <div class="bg-surface-color rounded-2xl p-8 md:p-12" style="background-color: #1E1E1E;">
                <h3 class="text-3xl font-bold tracking-tight font-serif text-white border-l-4 border-primary-color pl-4 mb-8">${toTitleCase(subCategory.replace(/-/g, ' '))}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    ${itemsBySubCategory[subCategory].map(item => `
                        <div>
                            <div class="flex justify-between items-start">
                                <h4 class="text-xl font-semibold text-white pr-4">${item.name}</h4>
                                <span class="text-xl font-bold text-white whitespace-nowrap">$${item.price.toFixed(2)}</span>
                            </div>
                            <p class="text-text-secondary mt-2">${item.description}</p>
                            <div class="mt-3 flex gap-2">${renderTags(item.tags)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    return html;
}

function renderBeverageSection(items) {
    const itemsBySubCategory = items.reduce((acc, item) => {
        const subCategory = item.subCategory || 'uncategorized';
        if (!acc[subCategory]) acc[subCategory] = [];
        acc[subCategory].push(item);
        return acc;
    }, {});

    let html = `
        <div class="beverage-menu-gradient-bg rounded-2xl p-8 md:p-12">
            <h2 class="text-4xl font-bold tracking-tight font-serif text-white text-center mb-12">Beverage Menu</h2>
    `;

    const categoryGridClass = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10";
    let subCategoryHtml = '<div class="' + categoryGridClass + '">';

    for (const subCategory in itemsBySubCategory) {
        subCategoryHtml += `
            <div class="space-y-6">
                <h3 class="text-2xl font-semibold tracking-tight font-serif text-white border-b-2 border-primary-color pb-2">${toTitleCase(subCategory.replace(/-/g, ' '))}</h3>
                <div class="space-y-5">
                    ${itemsBySubCategory[subCategory].map(item => `
                        <div>
                            <div class="flex justify-between items-start">
                                <h4 class="text-lg font-semibold text-white pr-4">${item.name}</h4>
                                <span class="text-lg font-bold text-white whitespace-nowrap">$${item.price.toFixed(2)}</span>
                            </div>
                            <p class="text-text-secondary mt-1">${item.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    subCategoryHtml += '</div>';
    html += subCategoryHtml + '</div>';
    return html;
}


function renderMenu() {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return;

    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) loadingSpinner.classList.add('hidden');

    const dineInItems = allMenuItems.filter(item => item.category.includes('dine-in'));
    const beverageItems = allMenuItems.filter(item => item.category.includes('beverages'));

    let menuHtml = '';
    if (dineInItems.length > 0) {
        menuHtml += renderDineInSection(dineInItems);
    }
    if (beverageItems.length > 0) {
        menuHtml += renderBeverageSection(beverageItems);
    }

    menuContainer.innerHTML = menuHtml;
}

export async function initMenuPage() {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return;

    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.classList.remove('hidden');

    try {
        const rawItems = await store.getMenu();
        allMenuItems = enhanceMenuItems(rawItems);
        renderMenu();
    } catch (error) {
        console.error("Failed to load menu:", error);
        menuContainer.innerHTML = `<p class="text-center text-red-500">Failed to load menu. Please try again later.</p>`;
    } finally {
        loadingSpinner.classList.add('hidden');
    }
}
