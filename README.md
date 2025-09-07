# Restaurant Frontend Project

This project is a frontend for a restaurant website. It has been refactored to improve code quality, maintainability, and to follow best practices.

## Project Structure

The project is structured as follows:

- `src/`: This directory contains all the main JavaScript source code.
  - `app.js`: The main application entry point.
  - `config.js`: Stores configuration variables like API endpoints.
  - `store.js`: Manages the application's state, including fetching and storing data.
  - `components.js`: Handles the loading of reusable HTML components (e.g., header, footer).
  - `pages/`: Contains page-specific JavaScript files.
    - `menu.js`: Logic for the menu page.
    - `order.js`: Logic for the order page.
- `*.html`: The main HTML files for the different pages of the website.
- `style.css`: The main stylesheet for the project.
- `menu.json`: A local JSON file used as a mock backend for the menu data.

## Getting Started

1.  Clone the repository.
2.  Open the `index.html` file in your browser to view the landing page.

## How It Works

The application is built using vanilla JavaScript, with a focus on modularity and separation of concerns.

- **State Management:** The `src/store.js` module is the single source of truth for the application's data. It fetches the menu data and makes it available to other modules.
- **Component Loading:** The `src/components.js` module dynamically loads the header and footer into the pages.
- **Configuration:** The `src/config.js` module provides a centralized location for all configuration variables.
- **Pages:** Each page with dynamic content has its own JavaScript file in the `src/pages/` directory.

This refactoring addresses several key issues, including:

- **DRY Principle:** Code is no longer repeated for fetching data or loading components.
- **Centralized State:** All application data is managed in one place.
- **Configuration Management:** API endpoints and other settings are not hardcoded.
- **Documentation:** This `README.md` file provides a starting point for new developers.
