import { config } from './config.js';

const state = {
    menu: [],
    order: []
};

let menuFetched = false;

export const store = {
    getMenu: async () => {
        if (!menuFetched) {
            try {
                const response = await fetch(config.api.menuUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                state.menu = await response.json();
                menuFetched = true;
            } catch (error) {
                console.error("Could not fetch menu:", error);
                return []; // Return empty array on error
            }
        }
        return state.menu;
    },
    getOrder: () => {
        return state.order;
    },
    addToOrder: (item) => {
        state.order.push(item);
    }
};
