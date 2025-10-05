# Steam - Modern Restaurant Frontend

This project is a visually stunning and fully interactive frontend for a modern restaurant website. It has been meticulously designed and developed to provide a seamless user experience, with a completely faked backend that simulates all necessary functionalities, including user authentication, online ordering, and table reservations.

## Features

- **Modern & Responsive Design:** A minimalist, dark-themed design that is fully responsive and looks great on all devices.
- **Faked Backend:** All backend interactions are simulated using `localStorage`, providing a realistic and persistent user experience without the need for a server.
- **Full Ordering Flow:** A complete online ordering system, including a dynamic menu, a shopping cart, a checkout process with a simulated payment, and an order tracking page.
- **User Authentication:** A mock user authentication system that allows users to "register," "log in," and view a profile page with their order and reservation history.
- **Interactive Pages:** Engaging and interactive pages for the gallery (with a modal for viewing images) and gift vouchers (with a simulated purchase form).
- **Firebase Ready:** Includes a `firebase.json` file for easy deployment to Firebase Hosting.

## Project Structure

The project is structured as follows:

- `src/`: This directory contains all the main JavaScript source code.
  - `app.js`: The main application entry point.
  - `store.js`: Manages the application's state, including the faked backend data in `localStorage`.
  - `components.js`: Handles the loading of reusable HTML components (e.g., header, footer).
  - `pages/`: Contains page-specific JavaScript files for all the different pages.
- `*.html`: The main HTML files for the different pages of the website.
- `style.css`: The main stylesheet for the project, which includes all the new design styles.
- `menu.json`: A local JSON file used as a mock data source for the restaurant's menu.
- `firebase.json`: The configuration file for deploying the application to Firebase Hosting.

## Getting Started

1.  **Clone the repository.**
2.  **Start a local server:** Since the application uses JavaScript modules, you need to run it from a local server. A simple way to do this is with Python's built-in HTTP server. Open your terminal in the project's root directory and run:
    ```bash
    python3 -m http.server
    ```
3.  **Open the application:** Open your browser and navigate to `http://localhost:8000/landing-page.html`.

## How It Works

The application is built using vanilla JavaScript, with a focus on modularity and a faked backend to simulate a real-world application.

- **State Management & Faked Backend:** The `src/store.js` module is the single source of truth for the application's data. It manages the state of the menu, user authentication, shopping cart, orders, and reservations by using `localStorage` to persist the data.
- **Component Loading:** The `src/components.js` module dynamically loads the header and footer into the pages.
- **Page-Specific Logic:** Each page with dynamic content has its own JavaScript file in the `src/pages/` directory, which is initialized by `src/app.js`.

## Deployment

This project is configured for deployment on Firebase Hosting. The `firebase.json` file includes the necessary settings for a single-page application, including rewrite rules and caching headers. To deploy the application, you will need to have the Firebase CLI installed and configured. Then, you can simply run `firebase deploy` from the project's root directory.