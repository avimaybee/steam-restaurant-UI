import { config } from './config.js';

const state = {
    menu: [],
    orders: [],
    reservations: []
};

const MENU_STORAGE_KEY = 'restaurantMenu';

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

// --- FAKE DATA ---
function generateFakeData() {
    // Check if data already exists to avoid re-populating on hot-reloads
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
            { id: 103, customer: 'Charlie Davis', date: '2023-11-06', time: '18:00', guests: 3, status: 'Confirmed' }
        );
    }
}

// --- STORE ---
export const store = {
    getMenu: async (forceRefresh = false) => {
        if (!forceRefresh && state.menu.length > 0) {
            return state.menu;
        }
        if (!forceRefresh && loadMenuFromStorage()) {
            return state.menu;
        }
        try {
            const response = await fetch(config.api.menuUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            state.menu = await response.json();
            saveMenuToStorage();
        } catch (error) {
            console.error("Could not fetch menu:", error);
            if (!loadMenuFromStorage()) {
                return [];
            }
        }
        return state.menu;
    },
    addMenuItem: async (item) => {
        state.menu.push(item);
        saveMenuToStorage();
    },
    updateMenuItem: async (updatedItem) => {
        const index = state.menu.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) {
            state.menu[index] = updatedItem;
            saveMenuToStorage();
        }
    },
    deleteMenuItem: async (itemId) => {
        state.menu = state.menu.filter(item => item.id !== itemId);
        saveMenuToStorage();
    },

    // Order Management
    getOrders: async () => {
        return state.orders;
    },
    updateOrderStatus: async (orderId, newStatus) => {
        const order = state.orders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
        }
    },
    deleteOrder: async (orderId) => {
        state.orders = state.orders.filter(o => o.id !== orderId);
    },

    // Reservation Management
    getReservations: async () => {
        return state.reservations;
    },
    updateReservationStatus: async (reservationId, newStatus) => {
        const reservation = state.reservations.find(r => r.id === reservationId);
        if (reservation) {
            reservation.status = newStatus;
        }
    },
    deleteReservation: async (reservationId) => {
        state.reservations = state.reservations.filter(r => r.id !== reservationId);
    }
};

// Initialize fake data
generateFakeData();
