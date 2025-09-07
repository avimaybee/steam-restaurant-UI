# Agent Instructions

This document provides instructions for agents working on this codebase.

## Project Structure

The project has been refactored to use a modular JavaScript structure. The main source code is in the `src/` directory.

- `src/app.js`: The main entry point of the application. It initializes the app, loads components, and routes to the correct page-specific logic.
- `src/components.js`: Handles loading of reusable HTML components like the header and footer.
- `src/config.js`: Contains configuration for the application, such as API endpoints.
- `src/store.js`: Manages the application's state. All data fetching should be done through the store.
- `src/pages/`: Contains page-specific JavaScript files.

## How to Add a New Page

1.  Create a new HTML file for your page (e.g., `new-page.html`).
2.  Add a new JavaScript file in `src/pages/` for your page's logic (e.g., `src/pages/new-page.js`).
3.  In your new page-specific JavaScript file, export an initialization function (e.g., `export function initNewPage() { ... }`).
4.  In `src/app.js`, import your new page's initialization function and call it based on the URL or an element ID present on your new page.

## How to Add a New Component

1.  Create a new HTML file for your component (e.g., `my-component.html`).
2.  In `src/components.js`, create a new function to load your component (e.g., `export async function loadMyComponent() { await loadComponent('my-component.html', 'my-component-element-id'); }`).
3.  Call your new component loader function from `src/app.js` or the relevant page-specific JavaScript file.

## Important Notes

-   **Do not use `fetch` directly in page-specific scripts.** All data should be fetched through the `src/store.js` module.
-   **Keep the code modular.** Avoid putting all your code in one file. Use the `src/pages/` directory to organize your code by page.
-   **Update the HTML files.** When you add a new page, make sure to update the script tag to load `src/app.js` as a module.
