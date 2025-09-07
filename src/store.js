import { config } from './config.js';

const state = {
    menu: [],
    order: []
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
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            state.menu = await response.json();
            saveMenuToStorage();
        } catch (error) {
            console.error("Could not fetch menu:", error);
            // If fetch fails, try to load from storage as a fallback
            if (!loadMenuFromStorage()) {
                return []; // Return empty if nothing in storage either
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

    getOrder: () => {
        return state.order;
    },

    addToOrder: (item) => {
        state.order.push(item);
        // Note: Order persistence is not implemented in this step
    }
};
