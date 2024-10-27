import axios from "axios";

// Access the API key using Vite's import.meta.env
const apiKey = import.meta.env.VITE_API_KEY;

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: `https://v6.exchangerate-api.com/v6/${apiKey}`,
});

// Function to convert currencies
export const currencyConverter = (fromCurrency, toCurrency, amount) => {
  return api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
};
