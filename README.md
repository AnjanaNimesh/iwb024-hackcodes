# Getting Started with React and Vite

This project was bootstrapped using Vite, a fast build tool optimized for modern web development.

## Running the Project

### Installation
Follow the steps below to install the required dependencies and run the project locally:

Install the required dependencies:
### npm install

Install additional packages:
### npm install react-icons
### npm install react-outside-click-handler
### npm install framer-motion
### npm install react-accessible-accordion
### npm install react-toastify
### npm install payhere-embed-sdk --save

Install daisyUI as a Node package:
npm i -D daisyui@latest

In the project directory, you can run:

### npm run dev

Runs the app in development mode.
Open [http://localhost:5173] to view it in the browser.

The page will reload if you make edits. You may also see any errors or warnings in the console.

### Starting the PayHere Server:
The project handles payment callbacks, where PayHere sends a response to the backend to confirm the payment status.
To run the PayHere server, execute the following command in your project directory:

### node index.js

### MongoDB Connection:
Ensure MongoDB is running on your local machine. You can start MongoDB using MongoDB Compass.

Connect to your database using MongoDB Compass:
### localhost:27017

To build the project for production:
### npm run build

Serve the production build locally:
### npm run serve

You can run tests using:
### npm test
