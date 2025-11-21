import json

menu_items = []
id_counter = 1

def add_item(name, desc, price, category, sub_category, tags=[]):
    global id_counter
    menu_items.append({
        "id": id_counter,
        "name": name,
        "description": desc,
        "price": price,
        "category": category,
        "subCategory": sub_category,
        "tags": tags
    })
    id_counter += 1

# Banquets
add_item("Everyone’s Favourite", "Duck pancakes, Pork gyoza, Bao bun (pork or chicken), Chicken spring rolls, San choy bow.<br>Choose one: Chicken Sambal (spicy), Pork Belly braised, Beef Bulgogi.<br>Choose one: Nasi Goreng, Pad Thai.<br>Chef’s choice dessert.<br>(Minimum 2 People)", 80, ["banquets"], "banquets")
add_item("Vegan & GF Favourite", "Duck pancakes, Crispy tofu, Vegetable gyoza, Veg sushi roll.<br>Choose one: Thai Vegan curry.<br>Choose one: Pad Thai (Veg), Nasi Goreng (Veg).<br>Chef’s choice dessert.<br>(Minimum 2 People)", 75, ["banquets"], "banquets", ["V", "GF"])
add_item("Chef’s Favourite", "Chinese dumplings, Calamari, Wagyu Beef dumplings, Chicken satay, Duck pancakes, Salmon Nigiri, Kingfish dressed, Scallop dressed, Prawn dumplings, Calamari.<br>Choose one: Eye fillet (greens), Beef Bulgogi, Duck curry, Pork Belly braised.<br>Dessert.<br>(Minimum 2 People)", 100, ["banquets"], "banquets")
add_item("Pescatarian Favourite", "Salmon Nigiri, Kingfish dressed, Scallop dressed, Prawn dumplings, Calamari.<br>Choose one: Seafood Curry, Barramundi, Seafood-on-hot-plate.<br>Dessert.<br>(Minimum 2 People)", 100, ["banquets"], "banquets")

# Oysters & Raw Bar
add_item("Natural Oysters", "Freshly shucked, served with lemon & condiments.<br>3 for $16 | 6 for $30 | 12 for $50", 16, ["dine-in"], "oysters-&-raw-bar")
add_item("Seafood Tower · For Two", "Sashimi platter, prawns, calamari, dressed scallop, veg sushi roll (8pc) , wakame, pickled ginger, house sauces", 80, ["dine-in"], "oysters-&-raw-bar")
add_item("Sashimi Platter", "Tuna, salmon, kingfish with traditional condiments", 40, ["dine-in"], "oysters-&-raw-bar", ["GF"])
add_item("Dressed Sashimi Scallop", "Gochujang mayo, sesame soy, soy pearls", 20, ["dine-in"], "oysters-&-raw-bar")
add_item("Kingfish", "Coconut cream, finger lime, ponzu", 20, ["dine-in"], "oysters-&-raw-bar")
add_item("Tuna", "Avo-wasabi, cucumber, wasabi pearls", 20, ["dine-in"], "oysters-&-raw-bar")
add_item("Salmon", "Pickled daikon, nam jim, ponzu pearls", 20, ["dine-in"], "oysters-&-raw-bar")

# Small Plates
add_item("Duck Pancakes", "Braised duck, iceberg, Asian herbs, chilli-plum glaze", 25, ["dine-in"], "small-plates")
add_item("Spicy Wagyu Dumplings", "Chilli-soy ponzu, sesame, micro herbs", 25, ["dine-in"], "small-plates")
add_item("Seafood Tartare", "Prawn, calamari, scallop, avocado, yuzu mayo, prawn cracker", 25, ["dine-in"], "small-plates")
add_item("Tuna Tartare", "Avocado-wasabi, sesame soy, shallots, egg yolk, sriracha oil (GF avail.)", 25, ["dine-in"], "small-plates", ["GFO"])
add_item("Bao Buns (2)", "Pork Belly / Chicken (VEG avail.)", 22, ["dine-in"], "small-plates", ["VGO"])
add_item("Bao Buns (2) - Tofu", "Tofu (VEG avail.)", 20, ["dine-in"], "small-plates", ["VGO"])
add_item("Vegetable Gyoza", "Sesame chilli ponzu (Vegan/GF avail.)", 20, ["dine-in"], "small-plates", ["V", "GFO"])
add_item("San Choy Bow", "Wombok, carrot, mushroom, sweet miso, peanuts", 20, ["dine-in"], "small-plates", ["VEG", "GF", "DF", "V"])
add_item("Karaage Chicken", "Pickled vegetables, daikon, house mayo", 20, ["dine-in"], "small-plates")
add_item("Pork Gyoza", "Sesame chilli ponzu", 23, ["dine-in"], "small-plates")
add_item("Crispy Tofu", "Sesame chilli ponzu", 20, ["dine-in"], "small-plates")
add_item("Calamari", "Rocket-herb salad, citrus dressing, yuzu mayo", 25, ["dine-in"], "small-plates")
add_item("Asian Loaded Fries", "Sweet potato fries, crispy tempeh, Gochujang mayo, chilli, spring onion, pickled vegetable ribbons, coriander, sesame seeds", 20, ["dine-in"], "small-plates", ["VEG"])
add_item("Chicken & Corn Spring Rolls", "Sweet chilli sauce", 20, ["dine-in"], "small-plates")
add_item("Vegetable fritters", "Sweet chilli", 15, ["dine-in"], "small-plates", ["V"])
add_item("Assorted Chinese Dumplings", "2 veg, 2 prawn, 2 scallop", 22, ["dine-in"], "small-plates")
add_item("Chicken Satay", "Peanuts sauce, roquette, pickled vegetable, fried shallots", 24, ["dine-in"], "small-plates")

# Sushi Selection
add_item("Salmon Nigiri", "Fresh, sushi-grade salmon over hand-pressed seasoned rice. A simple yet refined classic, served with wasabi and soy sauce on the side.", 20, ["dine-in"], "sushi-selection")
add_item("Vegetable Roll", "Cucumber, avocado, seasoned sushi rice, and nori. A simple yet refined classic, served with wasabi and soy sauce on the side.", 20, ["dine-in"], "sushi-selection")
add_item("California Roll", "Delicately rolled sushi with vinegared rice, nori, fresh avocado, salmon, cucumber, and Philadelphia cream cheese. Wasabi & Pickled Ginger", 20, ["dine-in"], "sushi-selection")
add_item("Crispy California Roll", "A golden, lightly deep-fried roll filled with avocado, salmon, cucumber, and Philadelphia cream cheese, wrapped in nori and seasoned rice. Wasabi & Pickled Ginger", 23, ["dine-in"], "sushi-selection")
add_item("Tuna Roll", "A refreshing combination of avocado, cucumber, and Philadelphia cream cheese, wrapped in rice and seaweed with tender tuna. Wasabi & Pickled Ginger", 20, ["dine-in"], "sushi-selection")
add_item("Crispy Tuna Roll", "A crisp, deep-fried variation of our classic Tuna Roll, featuring avocado, cucumber, and Philadelphia cream cheese. Wasabi & Pickled Ginger", 23, ["dine-in"], "sushi-selection")
add_item("Chicken Roll", "Crisp fried chicken paired with cucumber and Philadelphia cream cheese, rolled in seasoned rice and Nori. Wasabi & Pickled Ginger", 20, ["dine-in"], "sushi-selection")
add_item("Crispy Chicken Roll", "A rich, deep-fried roll filled Crisp chicken with avocado, cucumber, and Philadelphia cream cheese, wrapped in rice and Nori. Wasabi & Pickled Ginger", 23, ["dine-in"], "sushi-selection")

# Main Plates
add_item("Korean Beef Bulgogi", "Soy-garlic glazed tender beef, stir-fried vegetables, sesame", 40, ["dine-in"], "main-plates")
add_item("Red Duck Curry", "Lychee, tomato, coconut chilli broth, steamed rice", 34, ["dine-in"], "main-plates")
add_item("Thai Vegan Curry", "Seasonal vegetables, coconut chilli broth, jasmine rice", 32, ["dine-in"], "main-plates", ["VEG", "GF", "DF"])
add_item("Barramundi Fillet", "Soy-ginger dashi, shiitake, steamed greens, jasmine rice (GF avail.)", 45, ["dine-in"], "main-plates", ["GFO"])
add_item("Seafood-on-hot-plate", "Calamari, Scallops, Fish, and Prawns — deep-fried and then wok-tossed with Oyster Sauce, Soy Sauce, Ginger, Garlic Zucchini Served with Rice.", 50, ["dine-in"], "main-plates")
add_item("Sizzling Eye Fillet", "Mushroom soy, spring onion, Asian greens, jasmine rice (GF avail.)", 50, ["dine-in"], "main-plates", ["GFO"])
add_item("Butter Chicken", "Tomato-cashew sauce, fragrant jasmine rice", 34, ["dine-in"], "main-plates")
add_item("Seafood Curry", "Fish, prawns, coconut lime curry, steamed rice", 40, ["dine-in"], "main-plates", ["GF", "DF"])
add_item("Chicken Sambal (spicy)", "Mozzarella, garlic-chilli sambal, jasmine rice", 32, ["dine-in"], "main-plates", ["GF"])
add_item("Pork Belly braised", "Soy-braised with shiitake, bok choy, ginger, chilli", 34, ["dine-in"], "main-plates")
add_item("Pad Thai", "Prawn or Tofu (VEG GF DF avail.)", 32, ["dine-in"], "main-plates", ["VGO", "GFO", "DFO"])
add_item("Nasi Goreng", "Chicken or Tofu (VEG GF DF avail.)", 32, ["dine-in"], "main-plates", ["VGO", "GFO", "DFO"])

# Sides
add_item("Edamame", "", 7, ["dine-in"], "sides")
add_item("Kimchi", "", 4, ["dine-in"], "sides", ["VEG"])
add_item("Jasmine Rice", "", 6, ["dine-in"], "sides")
add_item("Prawn or Cassava Crackers", "", 5, ["dine-in"], "sides")
add_item("Sauces & Condiments", "", 2.5, ["dine-in"], "sides")
add_item("Asian greens (bok choy)", "", 12, ["dine-in"], "sides")

# Desserts
add_item("Tapioca Pearl Pudding", "Coconut milk, roasted coconut, palm sugar", 15, ["dine-in"], "desserts", ["GF", "DF", "V"])
add_item("Affogato", "Vanilla ice cream, espresso pearls, hot espresso", 15, ["dine-in"], "desserts")
add_item("Banana Split or Pancake", "With ice cream, cream, chocolate drizzle", 15, ["dine-in"], "desserts")
add_item("Seasonal Sorbet or Ice Cream", "With fresh fruit", 10, ["dine-in"], "desserts", ["GF", "DF"])
add_item("Mochi with Seasonal Fruit & Cream", "", 10, ["dine-in"], "desserts", ["V", "GF"])

# Takeaway Combos
add_item("Single Pack", "Duck Pancakes (2 pc), Karaage Chicken, Calamari (4pc), Main: Korean Beef Bulgogi, 1 Soft Drink (Can)", 60, ["takeaway"], "combos")
add_item("Veggie Pack", "Vegetable Gyoza (4 pc), San Choy Bow, Asian Loaded Fries, Main: Thai Vegan Curry, 1 Soft Drink (Can)", 60, ["takeaway"], "combos", ["V"])
add_item("Couple Pack", "Spicy Wagyu Dumplings, Bao Buns (Pork Belly), Chicken & Corn Spring Rolls, Mains: Red Duck Curry, Nasi Goreng (Chicken), 2 Soft Drinks (Can)", 95, ["takeaway"], "combos")
add_item("Family Pack", "Assorted Chinese Dumplings, Crispy Tofu, Chicken Satay, Vegetable Fritters, Mains: Pad Thai (Prawn or Tofu), Sizzling Eye Fillet, 4 Soft Drinks (Can)", 120, ["takeaway"], "combos")

# Beverages - Cocktails
add_item("Ginger & Lychee Martini", "Vodka, lychee liqueur, fresh lime, lychee juice, and ginger syrup. Garnished with a whole lychee.", 21, ["beverages"], "signature-cocktails")
add_item("Mojito", "Bacardi, muddled mint and lime, sugar syrup, finished with soda over crushed ice.", 20, ["beverages"], "signature-cocktails")
add_item("Kraken Coffee Martini", "Kraken spiced rum, Mr Black coffee liqueur, double espresso, sweetened with condensed milk.", 20, ["beverages"], "signature-cocktails")
add_item("Cosmopolitan", "Vodka, Cointreau, cranberry juice, and lime. Finished with a citrus twist.", 18, ["beverages"], "signature-cocktails")
add_item("Margarita", "Tequila, Cointreau, triple sec, and fresh lime. Served with a salted rim and lime wheel.", 21, ["beverages"], "signature-cocktails")
add_item("Dirty Martini", "Gin or vodka with dry vermouth. Garnished with Spanish olives.", 18, ["beverages"], "signature-cocktails")
add_item("French Martini", "Chambord black raspberry liqueur, premium vodka, and pineapple juice shaken to a velvety froth and served with a lime wheel and a salted rim", 21, ["beverages"], "signature-cocktails")

# Mocktails
add_item("Pink Fusion", "Dragon fruit, strawberry, raspberry, guava, and fresh mint — vibrant and tropical.", 13, ["beverages"], "artisan-mocktails")
add_item("Ginger Lychee Mojito", "Lychee juice, ginger syrup, lime, mint, and soda — a refreshing, sophisticated non-alcoholic blend.", 13, ["beverages"], "artisan-mocktails")

# Sparkling
add_item("Westwood Cuvée Brut", "Sonoma County, USA. Crisp and refined with citrus blossom, pear, and almond.", 12, ["beverages"], "sparkling-&-champagne")
add_item("Prosecco DOC", "The Victorian, Italy, NV. Elegant florals and ripe apples, with a refreshing dry finish.", 12, ["beverages"], "sparkling-&-champagne")

# White Wines
add_item("Little Goat Creek Sauvignon Blanc", "Marlborough, NZ (Vegan). Herbaceous with notes of lime, gooseberry, and tropical fruit.", 13, ["beverages"], "white-wines", ["V"])
add_item("Foxy’s Hangout Pinot Gris", "Mornington Peninsula, VIC. Round and aromatic, showing pear, stone fruit, and minerality.", 15, ["beverages"], "white-wines")
add_item("Byrne Vineyard Riesling", "Clare Valley, SA. Zesty and focused with citrus, green apple, and racy acidity.", 12, ["beverages"], "white-wines")
add_item("Indented Head Chardonnay", "Bellarine, VIC (Vegan). Creamy texture with peach, almond, and subtle oak influence.", 13, ["beverages"], "white-wines", ["V"])
add_item("Red Hill Estate Pinot Gris", "VIC. Expressive orchard fruit, spice, and a clean, mineral finish. (Bottle Only)", 78, ["beverages"], "white-wines")
add_item("Portsea Estate Chardonnay", "Portsea, VIC. Elegant and refined with French oak, white peach, and a lingering palate. (Bottle Only)", 98, ["beverages"], "white-wines")

# Rosé & Sweet
add_item("Day Dreamer Moscato", "South Australia. Floral, lightly sparkling, with notes of lychee, peach, and honeysuckle.", 13, ["beverages"], "rosé-&-sweet-wines")
add_item("Chalmers Rosato", "Campania, Italy (Dry). Refreshing acidity with strawberry, watermelon, and a crisp dry finish.", 13, ["beverages"], "rosé-&-sweet-wines")
add_item("Choya Umeshu Plum Wine", "Japan (60ml). Sweet, rich, and aromatic. Served chilled as a luxurious digestif.", 13, ["beverages"], "rosé-&-sweet-wines")

# Red Wines
add_item("Foxey’s Hangout Pinot Noir", "Mornington Peninsula, VIC", 16, ["beverages"], "red-wines")
add_item("Heartland ‘Spice Trader’ Cabernet Sauvignon", "Langhorne Creek, SA", 15, ["beverages"], "red-wines")
add_item("Radio Boka Tempranillo", "Spain", 15, ["beverages"], "red-wines")
add_item("Mt Avoca Shiraz", "Multi-Regional, VIC", 13, ["beverages"], "red-wines")
add_item("Red Hill Estate Pinot Noir", "VIC (Bottle Only)", 78, ["beverages"], "red-wines")
add_item("Te Mata Estate Merlot-Cabernet", "Hawke’s Bay, NZ (Bottle Only)", 78, ["beverages"], "red-wines")
add_item("Glaetzer ‘Anaperenna’ Shiraz Cabernet", "Barossa Valley, SA (Bottle Only)", 89, ["beverages"], "red-wines")
add_item("Kay Brothers Basket Pressed Shiraz", "McLaren Vale, SA (Bottle Only)", 89, ["beverages"], "red-wines")
add_item("Yangarra GSM", "McLaren Vale, SA (Bottle Only)", 77, ["beverages"], "red-wines")
add_item("Rockford Basket Press Shiraz", "Barossa Valley, SA (Bottle Only)", 175, ["beverages"], "red-wines")

# Beers
add_item("Sapporo", "Japanese", 12, ["beverages"], "premium-beers-&-ciders")
add_item("Kirin Ichiban", "Japanese", 12, ["beverages"], "premium-beers-&-ciders")
add_item("Asahi Super Dry", "Japanese", 12, ["beverages"], "premium-beers-&-ciders")
add_item("Asahi 3.5 Mid-Strength", "Japanese", 11, ["beverages"], "premium-beers-&-ciders")
add_item("Corona Extra", "Mexico", 12, ["beverages"], "premium-beers-&-ciders")
add_item("Tsingtao", "China", 12, ["beverages"], "premium-beers-&-ciders")
add_item("Sevenoaks Apple Cider", "Mornington Peninsula", 15, ["beverages"], "premium-beers-&-ciders")
add_item("Alcoholic Ginger Beer", "", 15, ["beverages"], "premium-beers-&-ciders")
add_item("St Andrews ‘Strapper’ Lager", "", 15, ["beverages"], "premium-beers-&-ciders")
add_item("Carlton Draught", "Classic Australian", 11, ["beverages"], "premium-beers-&-ciders")
add_item("Victoria Bitter", "Classic Australian", 11, ["beverages"], "premium-beers-&-ciders")
add_item("Non-Alcoholic Beer", "Classic Australian", 10, ["beverages"], "premium-beers-&-ciders")

# Sake
add_item("Kizakura Nigori", "300ml", 28, ["beverages"], "sake-collection")
add_item("Aai Sparkling Sake", "330ml", 28, ["beverages"], "sake-collection")
add_item("Kizakura", "150ml", 15, ["beverages"], "sake-collection")
add_item("Nenohi Nagoya", "Glass", 20, ["beverages"], "sake-collection")
add_item("Onigoroshi “Demon Slayer”", "Glass", 18, ["beverages"], "sake-collection")
add_item("Rihaku Tokubetsu Junmai", "Glass", 25, ["beverages"], "sake-collection")
add_item("Kaganotsuki Gekko", "Glass", 25, ["beverages"], "sake-collection")
add_item("Kizakura “S”", "Glass", 18, ["beverages"], "sake-collection")
add_item("Dassai “45”", "Glass", 20, ["beverages"], "sake-collection")

# Whisky
add_item("Suntory Hibiki Harmony Blend", "30ml", 26, ["beverages"], "japanese-whisky")
add_item("Suntory Hakushu Single Malt", "30ml", 26, ["beverages"], "japanese-whisky")
add_item("Nikka From The Barrel", "30ml", 20, ["beverages"], "japanese-whisky")

# Special Beers
add_item("TWOBAYS Japanese Rice Lager", "Gluten Free", 10.50, ["beverages"], "special-beer-selection", ["GF"])
add_item("TWOBAYS Pale Ale", "Gluten Free", 10.50, ["beverages"], "special-beer-selection", ["GF"])
add_item("GFB Aussie Ale", "Gluten Free", 10.50, ["beverages"], "special-beer-selection", ["GF"])
add_item("GFB Draught", "Gluten Free", 10.50, ["beverages"], "special-beer-selection", ["GF"])

# Sommelier / Add Ons
add_item("Twelve Signs Sparkling", "Lively bubbles, citrus zest. (Glass $10 / Bottle $25)", 10, ["beverages"], "sommelier-selection")
add_item("Lake Breeze Moscato", "Sweet Sparkling. Floral, low alcohol, easy-drinking. (Glass $10 / Bottle $25)", 10, ["beverages"], "sommelier-selection")
add_item("Young Poets Moscato", "Sweet Sparkling. Juicy grape, delicate fizz. (Glass $10 / Bottle $25)", 10, ["beverages"], "sommelier-selection")
add_item("Fireside Red - Rockford Alicante Bouchet", "Velvety and fruit-forward with juicy red berry notes. A warm embrace in a glass, perfect for winter evenings. (Bottle Only)", 77, ["beverages"], "sommelier-selection")
add_item("Cellar Classic - Rockford Hand Picked Riesling", "Eden Valley. A classic dry Riesling with bright acidity, layered lime, and mineral complexity. Age-worthy and beautifully structured. (Bottle Only)", 77, ["beverages"], "sommelier-selection")
add_item("Alpine Breeze - Schlumberger Pinot Blanc", "Elegant and crisp, with soft orchard fruit and alpine minerality. A refined white for cool climates and creamy dishes. (Bottle Only)", 77, ["beverages"], "sommelier-selection")
add_item("Toasted Arrival - Billecart-Salmon Brut Réserve", "A prestigious French champagne showcasing refined bubbles, citrus zest, and brioche. (375ml)", 77, ["beverages"], "sommelier-selection")
add_item("Billecart-Salmon Brut Rosé", "Aromas of red berries and rose petals with fine mousse and elegance. (375ml)", 77, ["beverages"], "sommelier-selection")
add_item("Veuve Clicquot Brut", "Bold and classic – the hallmark of celebration. (Bottle Only)", 117, ["beverages"], "sommelier-selection")
add_item("Golden Hour - Montalto The Eleven Chardonnay", "Rounded and elegant, with subtle oak and stone fruit richness. (Bottle Only)", 77, ["beverages"], "sommelier-selection")
add_item("Mount Mary Chardonnay", "Iconic and impeccably balanced, featuring toasted nuts, ripe peach, and flinty minerality. (Bottle Only)", 197, ["beverages"], "sommelier-selection")

# Hot Beverages
add_item("Coffee", "Latte, Cappuccino, Flat White, Long Black, Chai, Hot Chocolate. (S: $5 / M: $6)", 5, ["beverages"], "hot-beverages")
add_item("Teas", "Peppermint, Lemongrass Ginger, Sencha Green, English Breakfast, Jasmine Pearls", 6, ["beverages"], "hot-beverages")
add_item("Loose Leaf Chai", "Soy, Oat, Almond, Lactose-Free milks available.", 6.5, ["beverages"], "hot-beverages")

# Cold Beverages
add_item("Soft Drinks", "Coke, Diet Coke, Coke Zero, Lemonade, Ginger Beer, Lemon Lime Bitters, Orange, Apple, Guava, Pineapple", 6.5, ["beverages"], "cold-beverages")
add_item("Iced Lychee Tea", "", 6.5, ["beverages"], "cold-beverages")
add_item("Coconut Water", "", 6.5, ["beverages"], "cold-beverages")


with open('src/menu-data.js', 'w') as f:
    f.write("export const menuData = ")
    f.write(json.dumps(menu_items, indent=2))
    f.write(";")
