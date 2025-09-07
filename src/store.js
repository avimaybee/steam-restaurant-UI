import { config } from './config.js';

const state = {
    menu: [],
    orders: [],
    reservations: [],
    users: [],
    currentUser: null,
    reviews: {} // { itemId: [review, review] }
};

const MENU_STORAGE_KEY = 'restaurantMenu';
const USER_SESSION_KEY = 'restaurantUser';
const REVIEWS_STORAGE_KEY = 'restaurantReviews';

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

// Function to save user session to sessionStorage
function saveUserToSession(user) {
    sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
}

// Function to load user from sessionStorage
function loadUserFromSession() {
    const userFromSession = sessionStorage.getItem(USER_SESSION_KEY);
    if (userFromSession) {
        state.currentUser = JSON.parse(userFromSession);
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


// --- FAKE DATA ---
function generateFakeData() {
    // Check if data already exists to avoid re-populating on hot-reloads
    if (state.users.length === 0) {
        state.users.push(
            { id: 1, name: 'John Doe', email: 'john.doe@example.com', password: 'password123' },
            { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', password: 'password456' }
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
        try {
            const response = await fetch(config.api.menuUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            state.menu = await response.json();
            saveMenuToStorage();
        } catch (error) {
            console.error("Could not fetch menu:", error);
            if (!loadMenuFromStorage()) return [];
        }
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
    deleteMenuItem: async (itemId) => {
        state.menu = state.menu.filter(item => item.id !== itemId);
        saveMenuToStorage();
    },

    // Order Management
    getOrders: async () => state.orders,
    getOrderById: async (orderId) => {
        // The + converts orderId to a number in case it's a string
        return state.orders.find(o => o.id === +orderId);
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
    getReservations: async () => state.reservations,
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
            loadUserFromSession();
        }
        return state.currentUser;
    },
    login: async (email, password) => {
        const user = state.users.find(u => u.email === email && u.password === password);
        if (user) {
            state.currentUser = user;
            saveUserToSession(user);
            return user;
        }
        return null;
    },
    logout: () => {
        state.currentUser = null;
        sessionStorage.removeItem(USER_SESSION_KEY);
    },
    register: async (name, email, password) => {
        if (state.users.some(u => u.email === email)) {
            return null; // User already exists
        }
        const newUser = {
            id: Date.now(),
            name,
            email,
            password
        };
        state.users.push(newUser);
        state.currentUser = newUser;
        saveUserToSession(newUser);
        return newUser;
    }
};

// Initialize fake data
generateFakeData();
