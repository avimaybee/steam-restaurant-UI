import { config } from './config.js';
import { menuData } from './menu-data.js';

const state = {
    menu: [],
    cart: [],
    orders: [],
    reservations: [],
    users: [],
    currentUser: null,
    reviews: {}, // { itemId: [review, review] }
    currentLanguage: 'en',
    translations: {}
};

const MENU_STORAGE_KEY = 'restaurantMenu';
const USER_STORAGE_KEY = 'restaurantUser';
const REVIEWS_STORAGE_KEY = 'restaurantReviews';
const CART_STORAGE_KEY = 'restaurantCart';
const ORDERS_STORAGE_KEY = 'restaurantOrders';
const RESERVATIONS_STORAGE_KEY = 'restaurantReservations';
const LANG_STORAGE_KEY = 'restaurantLang';

// Function to save menu to localStorage
function saveMenuToStorage() {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(state.menu));
}

// Function to load menu from localStorage
function loadMenuFromStorage() {
    const menuFromStorage = localStorage.getItem(MENU_STORAGE_KEY);
    if (menuFromStorage) {
        state.menu = JSON.parse(menuFromStorage);
        return true;
    }
    return false;
}

// Function to load orders from localStorage
function loadOrdersFromStorage() {
    const ordersFromStorage = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (ordersFromStorage) {
        state.orders = JSON.parse(ordersFromStorage);
        return true;
    }
    return false;
}

function saveReservationsToStorage() {
    localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(state.reservations));
}

function loadReservationsFromStorage() {
    const reservationsFromStorage = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
    if (reservationsFromStorage) {
        state.reservations = JSON.parse(reservationsFromStorage);
        return true;
    }
    return false;
}

// Function to save user session to localStorage
function saveUserToLocalStorage(user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

// Function to load user from localStorage
function loadUserFromLocalStorage() {
    const userFromSession = localStorage.getItem(USER_STORAGE_KEY);
    if (userFromSession) {
        state.currentUser = JSON.parse(userFromSession);
        return true;
    }
    return false;
}

// Function to save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
}

// Function to load cart from localStorage
function loadCartFromStorage() {
    const cartFromStorage = localStorage.getItem(CART_STORAGE_KEY);
    if (cartFromStorage) {
        state.cart = JSON.parse(cartFromStorage);
        return true;
    }
    return false;
}

// Function to load reviews from localStorage
function loadReviewsFromStorage() {
    const reviewsFromStorage = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (reviewsFromStorage) {
        state.reviews = JSON.parse(reviewsFromStorage);
        return true;
    }
    return false;
}

// Function to save reviews to localStorage
function saveReviewsToStorage() {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(state.reviews));
}

// Function to save language to localStorage
function saveLanguageToStorage(lang) {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
}

// Function to load language from localStorage
function loadLanguageFromStorage() {
    return localStorage.getItem(LANG_STORAGE_KEY) || 'en';
}


// --- FAKE DATA ---
function generateFakeData() {
    // Check if data already exists to avoid re-populating on hot-reloads
    if (state.users.length === 0) {
        state.users.push(
            { id: 1, name: 'John Doe', email: 'john.doe@example.com', password: 'password123', loyaltyPoints: 1250 },
            { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', password: 'password456', loyaltyPoints: 450 }
        );
    }
    if (state.orders.length === 0) {
        state.orders.push(
            { id: 1, customer: 'John Doe', date: '2023-10-27', status: 'Pending', total: 55.00, items: [{ name: 'Ramen', quantity: 2 }] },
            { id: 2, customer: 'Jane Smith', date: '2023-10-27', status: 'Completed', total: 42.50, items: [{ name: 'Sushi Platter', quantity: 1 }] },
            { id: 3, customer: 'Mike Johnson', date: '2023-10-26', status: 'Pending', total: 78.25, items: [{ name: 'Dumplings', quantity: 3 }, { name: 'Bao Buns', quantity: 2 }] }
        );
    }
    if (state.reservations.length === 0) {
        state.reservations.push(
            { id: 101, customer: 'Alice Williams', date: '2023-11-05', time: '19:00', guests: 2, status: 'Confirmed' },
            { id: 102, customer: 'Bob Brown', date: '2023-11-06', time: '20:30', guests: 4, status: 'Pending' },
            { id: 103, customer: 'John Doe', date: '2023-11-08', time: '19:30', guests: 2, status: 'Confirmed' }
        );
    }
    // Generate fake reviews only if none exist in storage
    if (Object.keys(state.reviews).length === 0 && !loadReviewsFromStorage()) {
        state.reviews = {
            '13': [ // Spicy Wagyu Dumplings
                { user: 'Jane Smith', rating: 5, comment: 'Absolutely amazing, the right amount of kick!' },
                { user: 'John Doe', rating: 4, comment: 'Very tasty, but a bit too spicy for me.' }
            ],
            '37': [ // Korean Beef Bulgogi
                { user: 'Mike Johnson', rating: 5, comment: 'Best bulgogi in town. A must-try!' }
            ]
        };
        saveReviewsToStorage();
    }
}

// --- STORE ---
export const store = {
    // Menu Management
    getMenu: async (forceRefresh = false) => {
        if (!forceRefresh && state.menu.length > 0) return state.menu;
        if (!forceRefresh && loadMenuFromStorage()) return state.menu;

        // Use the hardcoded menu data
        state.menu = menuData;
        saveMenuToStorage();

        return state.menu;
    },
    addMenuItem: async (item) => {
        state.menu.push(item);
        saveMenuToStorage();
    },
    updateMenuItem: async (updatedItem) => {
        const index = state.menu.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) state.menu[index] = updatedItem;
        saveMenuToStorage();
    },
    // Cart Management
    getCart: () => {
        if (state.cart.length === 0) {
            loadCartFromStorage();
        }
        return state.cart;
    },
    addToCart: (itemId, quantity = 1) => {
        const itemToAdd = state.menu.find(item => item.id === itemId);
        if (!itemToAdd) {
            
            return;
        }

        const existingItem = state.cart.find(cartItem => cartItem.id === itemId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            state.cart.push({ ...itemToAdd, quantity });
        }
        saveCartToStorage();
    },
    updateCartItemQuantity: (itemId, quantity) => {
        const itemInCart = state.cart.find(cartItem => cartItem.id === itemId);
        if (itemInCart) {
            itemInCart.quantity = quantity;
            if (itemInCart.quantity <= 0) {
                store.removeFromCart(itemId);
            } else {
                saveCartToStorage();
            }
        }
    },
    removeFromCart: (itemId) => {
        state.cart = state.cart.filter(cartItem => cartItem.id !== itemId);
        saveCartToStorage();
    },
    clearCart: () => {
        state.cart = [];
        saveCartToStorage();
    },
    deleteMenuItem: async (itemId) => {
        state.menu = state.menu.filter(item => item.id !== itemId);
        saveMenuToStorage();
    },

    // Order Management
    getOrders: async () => state.orders,
    getOrderById: async (orderId) => {
        // Find order by string ID
        return state.orders.find(o => o.id === orderId);
    },
    getOrdersByCustomer: async (customerName) => {
        return state.orders.filter(o => o.customer === customerName);
    },
    updateOrderStatus: async (orderId, newStatus) => {
        const order = state.orders.find(o => o.id === orderId);
        if (order) order.status = newStatus;
    },
    deleteOrder: async (orderId) => {
        state.orders = state.orders.filter(o => o.id !== orderId);
    },

    // Reservation Management
    getReservations: async () => {
        if (state.reservations.length === 0) {
            loadReservationsFromStorage();
        }
        return state.reservations;
    },
    addReservation: async (reservation) => {
        state.reservations.push(reservation);
        saveReservationsToStorage();
    },
    getReservationsByCustomer: async (customerName) => {
        return state.reservations.filter(r => r.customer === customerName);
    },
    updateReservationStatus: async (reservationId, newStatus) => {
        const reservation = state.reservations.find(r => r.id === reservationId);
        if (reservation) reservation.status = newStatus;
    },
    deleteReservation: async (reservationId) => {
        state.reservations = state.reservations.filter(r => r.id !== reservationId);
    },

    // Review Management
    getReviews: async (itemId) => {
        return state.reviews[itemId] || [];
    },
    getAllReviews: async () => {
        return state.reviews;
    },
    addReview: async (itemId, review) => {
        if (!state.reviews[itemId]) {
            state.reviews[itemId] = [];
        }
        state.reviews[itemId].unshift(review); // Add to the beginning
        saveReviewsToStorage();
    },

    // Auth Management
    getCurrentUser: () => {
        if (!state.currentUser) {
            loadUserFromLocalStorage();
        }
        return state.currentUser;
    },
    login: async (email, password) => {
        const user = state.users.find(u => u.email === email && u.password === password);
        if (user) {
            state.currentUser = user;
            saveUserToLocalStorage(user);
            return user;
        }
        return null;
    },
    logout: () => {
        state.currentUser = null;
        localStorage.removeItem(USER_STORAGE_KEY);
    },
    register: async (name, email, password) => {
        if (state.users.some(u => u.email === email)) {
            return null; // User already exists
        }
        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            loyaltyPoints: 0 // New users start with 0 points
        };
        state.users.push(newUser);
        // Do not automatically log in the user after registration
        // Do not automatically log in the user after registration
        // state.currentUser = newUser;
        // saveUserToLocalStorage(newUser);
        return newUser;
    },

    // Loyalty Points Management
    addLoyaltyPoints: async (userId, points) => {
        const user = state.users.find(u => u.id === userId);
        if (user) {
            user.loyaltyPoints += points;
            if (state.currentUser && state.currentUser.id === userId) {
                saveUserToLocalStorage(user);
            }
        }
    },
    redeemLoyaltyPoints: async (userId, points) => {
        const user = state.users.find(u => u.id === userId);
        if (user && user.loyaltyPoints >= points) {
            user.loyaltyPoints -= points;
            if (state.currentUser && state.currentUser.id === userId) {
                saveUserToLocalStorage(user);
            }
            return true;
        }
        return false;
    },

    // Language Management
    setLanguage: async (lang) => {
        state.currentLanguage = lang;
        saveLanguageToStorage(lang);
        await store.loadTranslations();
    },
    loadTranslations: async () => {
        try {
            const response = await fetch(`locales/${state.currentLanguage}.json`);
            if (!response.ok) throw new Error('Translation file not found');
            state.translations = await response.json();
        } catch (error) {
            
            // Fallback to English if the chosen language fails
            if (state.currentLanguage !== 'en') {
                state.currentLanguage = 'en';
                await store.loadTranslations();
            }
        }
    },
    get: (key, replacements = {}) => {
        let translation = state.translations[key] || key;
        for (const placeholder in replacements) {
            translation = translation.replace(`{${placeholder}}`, replacements[placeholder]);
        }
        return translation;
    },
    initLanguage: () => {
        const savedLang = loadLanguageFromStorage();
        state.currentLanguage = savedLang;
    }
};

// Initialize state from storage first
loadOrdersFromStorage();

// Initialize fake data if storage is empty
generateFakeData();
