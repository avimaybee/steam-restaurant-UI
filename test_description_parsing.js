
function formatDescription(desc) {
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
                // Maybe "Choose one" without colon? Asssume it's the label and next items are options?
                // But based on data, it usually has colon.
                // If no colon, treat as header?
                label = part;
                optionsStr = "";
            }

            html += `<div class="text-sm font-medium text-primary-color tracking-wide uppercase text-xs mt-2">${label}</div>`;

            if (optionsStr) {
                // Split options by comma or semi-colon
                const options = optionsStr.split(/,|;/).map(o => o.trim()).filter(o => o);
                html += `<ul class="list-none text-text-secondary text-sm pl-0 space-y-1 mt-1">`;
                options.forEach(opt => {
                    html += `<li class="flex items-start"><span class="text-primary-color mr-2 opacity-70">▪</span> ${opt}</li>`;
                });
                html += `</ul>`;
            }
        }
        // Check for specific formatted items like "3 for $16 | 6 for $30"
        else if (part.includes('|')) {
             html += `<p class="text-sm text-primary-color font-medium mt-1">${part.replace(/\|/g, '<span class="mx-2 text-text-secondary opacity-50">|</span>')}</p>`;
        }
        else {
            html += `<p class="text-sm text-text-secondary leading-relaxed">${part}</p>`;
        }
    });
    html += '</div>';
    return html;
}

const testCases = [
    "Duck pancakes, Pork gyoza, Bao bun (pork or chicken), Chicken spring rolls, San choy bow.<br>Choose one: Chicken Sambal (spicy), Pork Belly braised, Beef Bulgogi.<br>Choose one: Nasi Goreng, Pad Thai.<br>Chef\u2019s choice dessert.<br>(Minimum 2 People)",
    "Freshly shucked, served with lemon & condiments.<br>3 for $16 | 6 for $30 | 12 for $50",
    "Sashimi platter, prawns, calamari, dressed scallop, veg sushi roll (8pc) , wakame, pickled ginger, house sauces",
    "Soy-garlic glazed tender beef, stir-fried vegetables, sesame"
];

testCases.forEach((tc, i) => {
    console.log(`--- Test Case ${i+1} ---`);
    console.log(formatDescription(tc));
    console.log('\n');
});
