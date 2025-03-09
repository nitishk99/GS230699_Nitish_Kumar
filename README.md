# Data Viewer App

This project is a Data Viewer App built with React, Redux, Firebase, MUI, and TypeScript. It allows users to view and manage data related to stores and SKUs, and visualize planning data in a grid format.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all the dependencies required for the project.

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`

Runs ESLint to check for linting errors in the project.

## Project Structure

### `src/components`

Contains reusable React components such as `AddNewData`, `DataGrid`, `LeftMenu`, and `Navbar`.

### `src/config`

Contains configuration files for Firebase.

### `src/pages`

Contains the main pages of the application, including `LandingPage`, `SignIn`, `Store`, `Sku`, and `Planning`.

### `src/redux`

Contains Redux slices and thunks for managing application state.

### `src/router`

Contains routing configuration for the application.

## Firebase Configuration

The Firebase configuration is located in `src/config/FireBase.ts`. Make sure to replace the configuration with your own Firebase project details.

## Styling

The project uses Material-UI (MUI) for styling. Custom styles are defined in separate style files such as `AddNewDatatyles.ts`, `LeftMenuStyles.ts`, `NavbarStyles.ts`, `SkuStyles.ts`, and `StoreStyles.ts`.

## Data Grid

The `DataGrid` component is used to display data in a tabular format. It is configured with columns and rows, and supports features like sorting, filtering, and editing.

## Planning Page

The `Planning` page displays planning data in a grid format. It dynamically generates columns for each week of a month and calculates values like sales dollars, GM dollars, and GM percentage.

## Elements Done Well

### Reusable Components and Methods

I created reusable components and methods to reduce code duplication and improve readability. This demonstrates my ability to write clean, maintainable, and efficient code.

### Working with ag-Grid

I worked with the ag-Grid npm package to create the data grid. This was a challenging part for me because I had never used ag-Grid before. It demonstrates my ability to quickly learn and implement new technologies.

### Dynamic Column Generation

I implemented dynamic column generation for each week of a month in the `Planning` page. This demonstrates my proficiency in handling dynamic data structures and creating flexible, reusable components.

### Value Calculation and Formatting

I implemented value calculation and formatting for sales dollars, GM dollars, and GM percentage. This showcases my ability to work with complex data transformations and present them in a user-friendly format.

## Improvements with More Time

### Optional Items

I would have implemented the optional items like charts page, CI/CD, test cases, etc.

## Feedback

The challenge was well-structured and covered a wide range of skills. One suggestion for improvement would be to provide more detailed requirements or constraints for certain tasks to help focus the implementation efforts. It was not clear in the planning page what the connection between stores and SKUs was. Additionally, the Excel file contained too many data sheets, which were hard to understand without proper explanation.