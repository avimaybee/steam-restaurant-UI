import { config } from './config.js';

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
const LANG_STORAGE_KEY = 'restaurantLang';

const mutations = {
    SET_MENU(state, menu) {
        state.menu = menu;
        localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menu));
    },
    ADD_MENU_ITEM(state, item) {
        state.menu.push(item);
        localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(state.menu));
    },
    UPDATE_MENU_ITEM(state, updatedItem) {
        const index = state.menu.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) {
            state.menu[index] = updatedItem;
            localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(state.menu));
        }
    },
    DELETE_MENU_ITEM(state, itemId) {
        state.menu = state.menu.filter(item => item.id !== itemId);
        localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(state.menu));
    },
    SET_CART(state, cart) {
        state.cart = cart;
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    },
    ADD_TO_CART(state, { item, quantity }) {
        const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            state.cart.push({ ...item, quantity });
        }
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
    },
    UPDATE_CART_ITEM_QUANTITY(state, { itemId, quantity }) {
        const itemInCart = state.cart.find(cartItem => cartItem.id === itemId);
        if (itemInCart) {
            itemInCart.quantity = quantity;
            if (itemInCart.quantity <= 0) {
                state.cart = state.cart.filter(cartItem => cartItem.id !== itemId);
            }
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
        }
    },
    REMOVE_FROM_CART(state, itemId) {
        state.cart = state.cart.filter(cartItem => cartItem.id !== itemId);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
    },
    CLEAR_CART(state) {
        state.cart = [];
        localStorage.removeItem(CART_STORAGE_KEY);
    },
    SET_ORDERS(state, orders) {
        state.orders = orders;
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    },
    UPDATE_ORDER_STATUS(state, { orderId, newStatus }) {
        const order = state.orders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(state.orders));
        }
    },
    DELETE_ORDER(state, orderId) {
        state.orders = state.orders.filter(o => o.id !== orderId);
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(state.orders));
    },
    SET_RESERVATIONS(state, reservations) {
        state.reservations = reservations;
    },
    UPDATE_RESERVATION_STATUS(state, { reservationId, newStatus }) {
        const reservation = state.reservations.find(r => r.id === reservationId);
        if (reservation) reservation.status = newStatus;
    },
    DELETE_RESERVATION(state, reservationId) {
        state.reservations = state.reservations.filter(r => r.id !== reservationId);
    },
    SET_REVIEWS(state, reviews) {
        state.reviews = reviews;
        localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    },
    ADD_REVIEW(state, { itemId, review }) {
        if (!state.reviews[itemId]) {
            state.reviews[itemId] = [];
        }
        state.reviews[itemId].unshift(review);
        localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(state.reviews));
    },
    SET_CURRENT_USER(state, user) {
        state.currentUser = user;
        if (user) {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(USER_STORAGE_KEY);
        }
    },
    SET_USERS(state, users) {
        state.users = users;
    },
    ADD_USER(state, user) {
        state.users.push(user);
    },
    UPDATE_USER_LOYALTY_POINTS(state, { userId, points }) {
        const user = state.users.find(u => u.id === userId);
        if (user) {
            user.loyaltyPoints = points;
            if (state.currentUser && state.currentUser.id === userId) {
                mutations.SET_CURRENT_USER(state, { ...state.currentUser, loyaltyPoints: points });
            }
        }
    },
    SET_LANGUAGE(state, lang) {
        state.currentLanguage = lang;
        localStorage.setItem(LANG_STORAGE_KEY, lang);
    },
    SET_TRANSLATIONS(state, translations) {
        state.translations = translations;
    }
};

const actions = {
    async getMenu({ commit }, forceRefresh = false) {
        if (!forceRefresh && state.menu.length > 0) return state.menu;
        try {
            const response = await fetch(config.api.menuUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const menu = await response.json();
            commit('SET_MENU', menu);
            return menu;
        } catch (error) {
            console.error("Could not fetch menu:", error);
            return state.menu;
        }
    },
    addMenuItem({ commit }, item) {
        commit('ADD_MENU_ITEM', item);
    },
    updateMenuItem({ commit }, updatedItem) {
        commit('UPDATE_MENU_ITEM', updatedItem);
    },
    deleteMenuItem({ commit }, itemId) {
        commit('DELETE_MENU_ITEM', itemId);
    },
    getCart() {
        return state.cart;
    },
    addToCart({ commit }, { itemId, quantity = 1 }) {
        const itemToAdd = state.menu.find(item => item.id === itemId);
        if (itemToAdd) {
            commit('ADD_TO_CART', { item: itemToAdd, quantity });
        } else {
            console.error(`Item with id ${itemId} not found in menu.`);
        }
    },
    updateCartItemQuantity({ commit }, { itemId, quantity }) {
        commit('UPDATE_CART_ITEM_QUANTITY', { itemId, quantity });
    },
    removeFromCart({ commit }, itemId) {
        commit('REMOVE_FROM_CART', itemId);
    },
    clearCart({ commit }) {
        commit('CLEAR_CART');
    },
    getOrders() {
        return state.orders;
    },
    getOrderById(_, orderId) {
        return state.orders.find(o => o.id === orderId);
    },
    getOrdersByCustomer(_, customerName) {
        return state.orders.filter(o => o.customer === customerName);
    },
    updateOrderStatus({ commit }, { orderId, newStatus }) {
        commit('UPDATE_ORDER_STATUS', { orderId, newStatus });
    },
    deleteOrder({ commit }, orderId) {
        commit('DELETE_ORDER', orderId);
    },
    getReservations() {
        return state.reservations;
    },
    getReservationsByCustomer(_, customerName) {
        return state.reservations.filter(r => r.customer === customerName);
    },
    updateReservationStatus({ commit }, { reservationId, newStatus }) {
        commit('UPDATE_RESERVATION_STATUS', { reservationId, newStatus });
    },
    deleteReservation({ commit }, reservationId) {
        commit('DELETE_RESERVATION', reservationId);
    },
    getReviews(_, itemId) {
        return state.reviews[itemId] || [];
    },
    getAllReviews() {
        return state.reviews;
    },
    addReview({ commit }, { itemId, review }) {
        commit('ADD_REVIEW', { itemId, review });
    },
    getCurrentUser() {
        return state.currentUser;
    },
    login({ commit }, { email, password }) {
        const user = state.users.find(u => u.email === email && u.password === password);
        if (user) {
            commit('SET_CURRENT_USER', user);
            return user;
        }
        return null;
    },
    logout({ commit }) {
        commit('SET_CURRENT_USER', null);
    },
    register({ commit }, { name, email, password }) {
        if (state.users.some(u => u.email === email)) {
            return null; // User already exists
        }
        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            loyaltyPoints: 0
        };
        commit('ADD_USER', newUser);
        return newUser;
    },
    addLoyaltyPoints({ commit }, { userId, points }) {
        const user = state.users.find(u => u.id === userId);
        if (user) {
            const newTotal = user.loyaltyPoints + points;
            commit('UPDATE_USER_LOYALTY_POINTS', { userId, points: newTotal });
        }
    },
    redeemLoyaltyPoints({ commit }, { userId, points }) {
        const user = state.users.find(u => u.id === userId);
        if (user && user.loyaltyPoints >= points) {
            const newTotal = user.loyaltyPoints - points;
            commit('UPDATE_USER_LOYALTY_POINTS', { userId, points: newTotal });
            return true;
        }
        return false;
    },
    async setLanguage({ commit }, lang) {
        commit('SET_LANGUAGE', lang);
        await actions.loadTranslations({ commit });
    },
    async loadTranslations({ commit }) {
        try {
            const response = await fetch(`locales/${state.currentLanguage}.json`);
            if (!response.ok) throw new Error('Translation file not found');
            const translations = await response.json();
            commit('SET_TRANSLATIONS', translations);
        } catch (error) {
            console.error('Error loading translations:', error);
            if (state.currentLanguage !== 'en') {
                commit('SET_LANGUAGE', 'en');
                await actions.loadTranslations({ commit });
            }
        }
    },
    get(key, replacements = {}) {
        let translation = state.translations[key] || key;
        for (const placeholder in replacements) {
            translation = translation.replace(`{${placeholder}}`, replacements[placeholder]);
        }
        return translation;
    }
};

function generateFakeData(commit) {
    if (state.users.length === 0) {
        const fakeUsers = [
            { id: 1, name: 'John Doe', email: 'john.doe@example.com', password: 'password123', loyaltyPoints: 1250 },
            { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', password: 'password456', loyaltyPoints: 450 }
        ];
        commit('SET_USERS', fakeUsers);
    }
    if (state.orders.length === 0) {
        const fakeOrders = [
            { id: 1, customer: 'John Doe', date: '2023-10-27', status: 'Pending', total: 55.00, items: [{ name: 'Ramen', quantity: 2 }] },
            { id: 2, customer: 'Jane Smith', date: '2023-10-27', status: 'Completed', total: 42.50, items: [{ name: 'Sushi Platter', quantity: 1 }] },
            { id: 3, customer: 'Mike Johnson', date: '2023-10-26', status: 'Pending', total: 78.25, items: [{ name: 'Dumplings', quantity: 3 }, { name: 'Bao Buns', quantity: 2 }] }
        ];
        commit('SET_ORDERS', fakeOrders);
    }
    if (state.reservations.length === 0) {
        const fakeReservations = [
            { id: 101, customer: 'Alice Williams', date: '2023-11-05', time: '19:00', guests: 2, status: 'Confirmed' },
            { id: 102, customer: 'Bob Brown', date: '2023-11-06', time: '20:30', guests: 4, status: 'Pending' },
            { id: 103, customer: 'John Doe', date: '2023-11-08', time: '19:30', guests: 2, status: 'Confirmed' }
        ];
        commit('SET_RESERVATIONS', fakeReservations);
    }
    if (Object.keys(state.reviews).length === 0) {
        const fakeReviews = {
            '13': [
                { user: 'Jane Smith', rating: 5, comment: 'Absolutely amazing, the right amount of kick!' },
                { user: 'John Doe', rating: 4, comment: 'Very tasty, but a bit too spicy for me.' }
            ],
            '37': [
                { user: 'Mike Johnson', rating: 5, comment: 'Best bulgogi in town. A must-try!' }
            ]
        };
        commit('SET_REVIEWS', fakeReviews);
    }
}

function commit(mutationName, payload) {
    if (typeof mutations[mutationName] !== 'function') {
        console.error(`Mutation "${mutationName}" doesn't exist.`);
        return;
    }
    mutations[mutationName](state, payload);
}

const store = {
    state,
    dispatch(actionName, payload) {
        if (typeof actions[actionName] !== 'function') {
            console.error(`Action "${actionName}" doesn't exist.`);
            return;
        }
        return actions[actionName]({ commit }, payload);
    },
    get(key, replacements) {
        return actions.get(key, replacements);
    },
    init() {
        // Load data from localStorage
        const menu = localStorage.getItem(MENU_STORAGE_KEY);
        if (menu) commit('SET_MENU', JSON.parse(menu));

        const cart = localStorage.getItem(CART_STORAGE_KEY);
        if (cart) commit('SET_CART', JSON.parse(cart));

        const orders = localStorage.getItem(ORDERS_STORAGE_KEY);
        if (orders) commit('SET_ORDERS', JSON.parse(orders));

        const reviews = localStorage.getItem(REVIEWS_STORAGE_KEY);
        if (reviews) commit('SET_REVIEWS', JSON.parse(reviews));

        const currentUser = localStorage.getItem(USER_STORAGE_KEY);
        if (currentUser) commit('SET_CURRENT_USER', JSON.parse(currentUser));

        const lang = localStorage.getItem(LANG_STORAGE_KEY) || 'en';
        commit('SET_LANGUAGE', lang);

        // Populate with fake data if parts of the state are still empty
        generateFakeData(commit);

        // Load translations
        return actions.loadTranslations({ commit });
    }
};

// This is a simplified event bus for state changes.
const eventBus = {
    listeners: [],
    subscribe(callback) {
        this.listeners.push(callback);
    },
    unsubscribe(callback) {
        this.listeners = this.listeners.filter(listener => listener !== callback);
    },
    notify(data) {
        this.listeners.forEach(callback => callback(data));
    }
};

// Wrap commit to notify listeners
const originalCommit = commit;
commit = (mutationName, payload) => {
    originalCommit(mutationName, payload);
    eventBus.notify({ mutation: mutationName, payload });
};

// Add event bus to the exported store
store.subscribe = eventBus.subscribe;
store.unsubscribe = eventBus.unsubscribe;

export { store };