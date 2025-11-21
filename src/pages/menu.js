import { store } from '../store.js';

let allMenuItems = [];

function toTitleCase(str) {
    if (!str) return '';
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

function formatDescription(desc, baseTextClass = "text-sm text-text-secondary leading-relaxed") {
    if (!desc) return '';
    // Split by <br> or newline
    const parts = desc.split(/<br>|\n/);
    let html = '<div class="space-y-2 mt-3">';

    parts.forEach(part => {
        part = part.trim();
        if (!part) return;

        // Check for "Choose one" or "Choose"
        if (part.toLowerCase().startsWith('choose one') || part.toLowerCase().startsWith('choose')) {
            const colonIndex = part.indexOf(':');
            let label, optionsStr;

            if (colonIndex !== -1) {
                label = part.substring(0, colonIndex + 1);
                optionsStr = part.substring(colonIndex + 1);
            } else {
                label = part;
                optionsStr = "";
            }

            html += `<div class="text-xs font-bold text-primary-color tracking-widest uppercase mt-2">${label}</div>`;

            if (optionsStr) {
                // Split options by comma or semi-colon
                const options = optionsStr.split(/,|;/).map(o => o.trim()).filter(o => o);
                html += `<ul class="list-none text-text-secondary text-sm pl-0 space-y-1 mt-1">`;
                options.forEach(opt => {
                    html += `<li class="flex items-start"><span class="text-primary-color mr-2 opacity-70 text-[10px] relative top-[3px]">▪</span> ${opt}</li>`;
                });
                html += `</ul>`;
            }
        }
        // Check for specific formatted items like "3 for $16 | 6 for $30"
        else if (part.includes('|')) {
             html += `<p class="text-sm text-primary-color font-medium mt-1 tracking-wide">${part.replace(/\|/g, '<span class="mx-2 text-text-secondary opacity-50 font-light">|</span>')}</p>`;
        }
        else {
            html += `<p class="${baseTextClass}">${part}</p>`;
        }
    });
    html += '</div>';
    return html;
}

function enhanceMenuItems(items) {
    return items.map(item => {
        const tags = new Set(item.tags || []);
        const fullText = `${item.name} ${item.description}`.toLowerCase();

        if (/\b(gf|gluten-free)\b/.test(fullText)) tags.add('GF');
        if (/\b(lf|lactose-free)\b/.test(fullText)) tags.add('LF');
        if (/\b(vegan)\b/.test(fullText) || item.tags.includes('V')) tags.add('V');
        if (/\b(veg|vegetarian)\b/.test(fullText) || item.tags.includes('VEG')) tags.add('VEG');
        if (/\b(df|dairy-free)\b/.test(fullText)) tags.add('DF');

        return { ...item, tags: Array.from(tags) };
    });
}

function renderTags(tags) {
    if (!tags || tags.length === 0) return '';
    return tags.map(tag => {
        let colorClass = 'text-text-secondary border-border-color';
        if (tag === 'GF') colorClass = 'text-amber-200 border-amber-700';
        if (tag === 'V') colorClass = 'text-green-200 border-green-700';
        if (tag === 'VEG') colorClass = 'text-green-100 border-green-800';
        return `<span class="inline-block border ${colorClass} text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider opacity-80">${tag}</span>`;
    }).join(' ');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

function renderIntroSection() {
    return `
        <div class="text-center max-w-4xl mx-auto mb-24 animate-fadeInUp px-4">
            <h2 class="text-4xl md:text-5xl font-serif text-primary-color mb-8">The Experience Matters</h2>
            <p class="text-lg md:text-xl text-text-secondary leading-relaxed font-light max-w-2xl mx-auto">
                We believe dining should awaken all the senses — the warm glow of the room, the
                rhythm of conversation, the aroma of fresh herbs and spices. Our wine and cocktail list
                is designed to enhance every course, while our team ensures each visit feels personal,
                relaxed, and unforgettable.
            </p>
            <p class="text-2xl font-serif text-white mt-12 italic">Let this be more than a meal. Let it be a memory.</p>
        </div>
        <div class="w-full h-px bg-gradient-to-r from-transparent via-primary-color to-transparent opacity-30 mb-24"></div>
    `;
}

function renderBanquetSection(items) {
    if (!items.length) return '';
    return `
        <section class="mb-24 px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-serif text-white tracking-wide uppercase">Banquet Style Dining</h2>
                <p class="text-primary-color mt-2 font-serif italic text-xl">Minimum 2 People</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                ${items.map(item => `
                    <div class="bg-surface-color border border-border-color p-8 rounded-sm hover:border-primary-color transition-colors duration-300 flex flex-col relative overflow-hidden group menu-item cursor-pointer h-full" data-id="${item.id}">
                        <div class="absolute top-0 left-0 w-1 h-full bg-primary-color transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                        <div class="flex justify-between items-baseline mb-6 border-b border-gray-800 pb-4">
                            <h3 class="text-2xl font-serif text-white group-hover:text-primary-color transition-colors">${item.name}</h3>
                            <span class="text-xl font-bold text-primary-color">$${item.price}<span class="text-sm text-text-secondary font-normal">pp</span></span>
                        </div>
                        <div class="text-text-secondary leading-loose flex-grow text-sm md:text-base">
                            ${formatDescription(item.description, "text-sm md:text-base text-text-secondary leading-relaxed")}
                        </div>
                        <div class="mt-6 flex gap-2 justify-end">
                             ${renderTags(item.tags)}
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

function renderDineInSection(items) {
    if (!items.length) return '';

    // Group by subcategory
    const subCategories = [
        'oysters-&-raw-bar',
        'small-plates',
        'sushi-selection',
        'main-plates',
        'sides',
        'desserts'
    ];

    let html = `
        <section class="mb-24 px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-serif text-white tracking-wide uppercase">Modern Asian Fusion</h2>
                <p class="text-text-secondary mt-2 font-light tracking-widest uppercase text-sm">Fine Dining À La Carte Menu</p>
            </div>
            <div class="max-w-6xl mx-auto space-y-24">
    `;

    subCategories.forEach(subCat => {
        const catItems = items.filter(i => i.subCategory === subCat);
        if (!catItems.length) return;

        const title = toTitleCase(subCat.replace(/-/g, ' ').replace('&', '<span class="text-primary-color">&</span>'));

        html += `
            <div class="break-inside-avoid">
                <h3 class="text-2xl font-serif text-primary-color mb-12 text-center relative flex items-center justify-center">
                    <span class="w-16 h-px bg-primary-color opacity-40 mr-4"></span>
                    <span class="uppercase tracking-widest">${title}</span>
                    <span class="w-16 h-px bg-primary-color opacity-40 ml-4"></span>
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                    ${catItems.map(item => `
                        <div class="menu-item group cursor-pointer" data-id="${item.id}">
                            <div class="flex justify-between items-baseline mb-2">
                                <h4 class="text-lg font-medium text-white group-hover:text-primary-color transition-colors tracking-wide">${item.name}</h4>
                                <div class="flex-grow border-b border-gray-800 border-dotted mx-4 relative top-[-6px]"></div>
                                <span class="text-lg font-serif text-primary-color">$${item.price}</span>
                            </div>
                            ${formatDescription(item.description)}
                            <div class="mt-2 opacity-60 group-hover:opacity-100 transition-opacity">${renderTags(item.tags)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });

    html += `</div></section>`;
    return html;
}

function renderTakeawaySection(items) {
    if (!items.length) return '';
    return `
        <section class="mb-24 max-w-7xl mx-auto px-4">
             <div class="bg-surface-color p-8 md:p-16 rounded-sm border border-border-color relative overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-color via-accent-color to-primary-color"></div>
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-serif text-white tracking-wide uppercase">Steam Takeaway Combos</h2>
                    <p class="text-text-secondary mt-4 max-w-2xl mx-auto">Modern Asian Fusion, crafted for convenience and indulgence.</p>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    ${items.map(item => `
                        <div class="bg-secondary-color p-8 rounded border border-gray-800 hover:border-primary-color transition-colors duration-300 menu-item cursor-pointer h-full flex flex-col" data-id="${item.id}">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-xl font-bold text-white">${item.name}</h3>
                                <span class="text-2xl font-serif text-primary-color">$${item.price}</span>
                            </div>
                            <div class="mb-6 flex-grow">
                                ${formatDescription(item.description)}
                            </div>
                            <div>${renderTags(item.tags)}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="mt-8 text-center text-xs text-text-secondary opacity-60">
                    <p>Please Note: During peak service hours, takeaway combo availability may be limited.</p>
                </div>
            </div>
        </section>
    `;
}

function renderBeverageSection(items) {
    if (!items.length) return '';

    const subCategories = [
        'signature-cocktails',
        'artisan-mocktails',
        'sparkling-&-champagne',
        'white-wines',
        'rosé-&-sweet-wines',
        'red-wines',
        'sommelier-selection',
        'premium-beers-&-ciders',
        'sake-collection',
        'japanese-whisky',
        'special-beer-selection',
        'hot-beverages',
        'cold-beverages'
    ];

    let html = `
        <section class="mb-24 px-4">
             <div class="w-full h-px bg-gradient-to-r from-transparent via-primary-color to-transparent opacity-30 mb-16"></div>
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-serif text-white tracking-wide uppercase">Beverage Selection</h2>
                <p class="text-text-secondary mt-2 font-light tracking-widest uppercase text-sm">Curated to elevate every course</p>
            </div>
            <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
    `;

    subCategories.forEach(subCat => {
        const catItems = items.filter(i => i.subCategory === subCat);
        if (!catItems.length) return;

        const title = toTitleCase(subCat.replace(/-/g, ' ').replace('&', '<span class="text-primary-color">&</span>'));

        html += `
            <div class="mb-8 break-inside-avoid">
                <h3 class="text-xl font-serif text-primary-color mb-8 border-l-2 border-primary-color pl-4 uppercase tracking-wider flex items-center">
                    ${title}
                </h3>
                <ul class="space-y-6">
                    ${catItems.map(item => `
                        <li class="menu-item cursor-pointer group" data-id="${item.id}">
                            <div class="flex justify-between items-baseline">
                                <span class="text-white font-medium group-hover:text-primary-color transition-colors text-lg">${item.name}</span>
                                <span class="text-primary-color font-serif whitespace-nowrap ml-4 text-lg">$${item.price}</span>
                            </div>
                            ${formatDescription(item.description)}
                             <div class="mt-1 opacity-60">${renderTags(item.tags)}</div>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    });

    html += `</div></section>`;
    return html;
}

function renderMenu() {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return;

    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) loadingSpinner.classList.add('hidden');

    const banquets = allMenuItems.filter(item => item.category.includes('banquets'));
    const dineIn = allMenuItems.filter(item => item.category.includes('dine-in'));
    const takeaway = allMenuItems.filter(item => item.category.includes('takeaway'));
    const beverages = allMenuItems.filter(item => item.category.includes('beverages'));

    let menuHtml = renderIntroSection();

    menuHtml += renderBanquetSection(banquets);
    menuHtml += renderDineInSection(dineIn);
    menuHtml += renderTakeawaySection(takeaway);
    menuHtml += renderBeverageSection(beverages);

    menuContainer.innerHTML = menuHtml;
}

export async function initMenuPage() {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return;

    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.classList.remove('hidden');

    try {
        const rawItems = await store.getMenu(true); // Force refresh
        allMenuItems = enhanceMenuItems(rawItems);
        renderMenu();

        const menuItemModal = document.getElementById('menu-item-modal');
        const closeMenuItemModalBtn = document.getElementById('close-menu-item-modal');
        const menuItemModalContent = document.getElementById('menu-item-modal-content');

        if (menuItemModal) {
            menuContainer.addEventListener('click', (e) => {
                const menuItemEl = e.target.closest('.menu-item');
                if (menuItemEl) {
                    const itemId = menuItemEl.dataset.id;
                    const item = allMenuItems.find(i => i.id == itemId);
                    if (item) {
                        menuItemModalContent.innerHTML = `
                            <h2 class="text-3xl font-serif text-white mb-4">${item.name}</h2>
                            <div class="mb-6">
                                ${formatDescription(item.description, "text-text-secondary leading-relaxed text-lg")}
                            </div>
                            <div class="flex justify-between items-center mb-8">
                                <p class="text-3xl font-bold text-primary-color">$${item.price.toFixed(2)}</p>
                                <div class="flex gap-2">${renderTags(item.tags)}</div>
                            </div>
                            <button class="btn btn-primary w-full py-3 text-lg uppercase tracking-widest font-bold add-to-order-btn" data-id="${item.id}">Add to Order</button>
                        `;
                        menuItemModal.classList.remove('hidden');
                        menuItemModal.classList.add('flex');
                    }
                }
            });

            menuItemModalContent.addEventListener('click', (e) => {
                if (e.target.classList.contains('add-to-order-btn')) {
                    const itemId = e.target.dataset.id;
                    store.addToCart(parseInt(itemId));
                    showToast('Item added to cart!');
                    setTimeout(() => {
                        menuItemModal.classList.add('hidden');
                        menuItemModal.classList.remove('flex');
                    }, 500);
                }
            });

            closeMenuItemModalBtn.addEventListener('click', () => {
                menuItemModal.classList.add('hidden');
                menuItemModal.classList.remove('flex');
            });

            menuItemModal.addEventListener('click', (e) => {
                if (e.target === menuItemModal) {
                    menuItemModal.classList.add('hidden');
                    menuItemModal.classList.remove('flex');
                }
            });
        }

    } catch (error) {
        console.error(error);
        menuContainer.innerHTML = `<p class="text-center text-red-500">Failed to load menu. Please try again later.</p>`;
    } finally {
        loadingSpinner.classList.add('hidden');
    }

    const mainContent = document.getElementById('main-content');
    const refreshIndicator = document.getElementById('refresh-indicator');
    let touchstartY = 0;
    let touchendY = 0;

    if (mainContent && refreshIndicator) {
        mainContent.addEventListener('touchstart', e => {
            touchstartY = e.changedTouches[0].screenY;
        }, false);

        mainContent.addEventListener('touchmove', e => {
            const touchY = e.changedTouches[0].screenY;
            if (window.scrollY === 0 && touchY > touchstartY) {
                const pullDistance = touchY - touchstartY;
                if (pullDistance > 50) {
                    refreshIndicator.classList.add('show');
                }
            }
        }, false);

        mainContent.addEventListener('touchend', e => {
            touchendY = e.changedTouches[0].screenY;
            if (window.scrollY === 0 && touchendY > touchstartY + 100) {
                refreshIndicator.classList.remove('show');
                initMenuPage();
            } else {
                refreshIndicator.classList.remove('show');
            }
        }, false);
    }
}
