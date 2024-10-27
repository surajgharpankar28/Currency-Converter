# Currency Converter

This is a simple currency converter web application built using **React**, **Axios**, and the **ExchangeRate API**. The app allows users to convert an amount from one currency to another in real-time using up-to-date exchange rates.

## Demo
Check out the live demo [here](https://currency-converter-ssg.vercel.app/)

## Features
- Convert currency from one unit to another (USD, EUR, INR, GBP, AUD).
- Real-time exchange rates using the ExchangeRate API.
- Error handling for API failures and invalid inputs.
- Formatted currency display for better readability.

## Technologies Used
- **React**: Front-end library for building the user interface.
- **Axios**: Library for making HTTP requests to fetch exchange rates from the API.
- **ExchangeRate API**: Provides real-time exchange rates for currency conversion.

## Installation

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/your-username/currency-converter.git](https://github.com/surajgharpankar28/Currency-Converter.git)
   cd currency-converter

2. **Install dependencies**:
   ```bash
   npm install

3. **Set up the ExchangeRate API**:
   - To obtain an API key, sign up on [ExchangeRate API](https://www.exchangerate-api.com/).
   - Create a .env file in the project root and add your API key:
     ```bash
     VITE_API_KEY=your_api_key_here
4. **Add the following to your 'vite.config.js' file.**
  ```bash
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";
   
   // https://vite.dev/config/
   export default defineConfig({
     plugins: [
       react(),
       {
         name: "replace-process-env",
         // Use the "transform" hook to replace process.env variables
         transform(code) {
           return code.replace(
             /process\.env\.VITE_API_KEY/g,
             JSON.stringify(process.env.VITE_API_KEY)
           );
         },
       },
     ],
   });
```
5. **Run the application**
    ```bash
   npm start
