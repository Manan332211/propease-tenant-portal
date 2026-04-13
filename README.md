# PropEase Tenant Portal

This is the frontend application for the PropEase Tenant Portal. It provides a dedicated interface for tenants to manage their properties, view details, communicate, and handle other tenancy-related activities.

## Project Details

- **Name:** PropEase Tenant Portal
- **Type:** Frontend Single Page Application (SPA)
- **Environment:** Node.js

## Tech Stack

This project is built using modern web technologies:

- **[React](https://react.dev/) (v19)** - UI Library
- **[TypeScript](https://www.typescriptlang.org/)** - For type-safe codebase
- **[Vite](https://vitejs.dev/)** - Fast frontend tooling and bundler
- **[Tailwind CSS](https://tailwindcss.com/) (v4)** - Utility-first CSS framework for styling
- **[React Router DOM](https://reactrouter.com/) (v7)** - Declarative routing
- **[Axios](https://axios-http.com/)** - Promise-based HTTP client for API requests
- **[ESLint](https://eslint.org/)** - For code linting and maintaining code quality

## Prerequisites

Make sure you have Node.js and npm installed on your system.
- Node.js (v18 or higher is recommended)

## How to Run the Project Local Environment

Follow these steps to set up and run the project on your local machine:

1. **Navigate to the project directory** (if you haven't already):
   ```bash
   cd propease-tenant-portal
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   This will start the Vite development server. By default, it will be available at `http://localhost:5173`. Open this URL in your web browser to view the application.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode with Hot Module Replacement (HMR).
- `npm run build`: Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.
- `npm run lint`: Runs ESLint to check for code issues.
- `npm run preview`: Bootstraps a local web server that serves the production build from the `dist` folder. Use this to preview the production build locally.
