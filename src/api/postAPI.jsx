import axios from "axios";

const api = axios.create({
  baseURL: "https://v6.exchangerate-api.com/v6/fa1341044d823ba48dc534cc",
});

//we need to create get request
export const currencyConverter = (fromCurrency, toCurrency, amount) => {
  return api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
};
