# EMPENO INVEST - React App with Azure SQL Database

## Overview

This project is a React-based web application using Vite and TypeScript, deployed as an Azure Static Web App with an Azure SQL Database and backend server.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)
- [Static Web Apps CLI](https://learn.microsoft.com/en-us/azure/static-web-apps/local-development) (`npm install -g @azure/static-web-apps-cli`)
- [Azure SQL Database](https://learn.microsoft.com/en-us/azure/azure-sql/database/) (Ensure you have access to an instance)
- [Vite](https://vitejs.dev/) (for fast front-end development)

## Running Locally

To start the application locally, follow these steps:

1. **Clone the repository**

   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up the environment variables**
   Create a `.env` file in the root of your project and configure it with your Azure SQL Database connection string:

   ```env
  DATABASE_CONNECTION_STRING="connection-string-sql-authentication"
   ```

4. **Run the application**
   Stand in the root directory and use the following command:
   ```sh
   swa start --data-api-location swa-db-connections
   ```
   This will start both the frontend and backend, connecting to the Azure SQL database.

## Deployment

1. Push your code to a GitHub repository.
2. Set up an Azure Static Web App in the Azure Portal.
3. Connect your repository to the Static Web App.
4. Azure will automatically build and deploy your application.

## License

This project is licensed under the MIT License.
