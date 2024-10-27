/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { currencyConverter } from "./api/postAPI";

function App() {
  const currency = ["USD", "EUR", "INR", "GBP", "AUD"];

  const [amount, setAmount] = useState();
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConvertCurrency = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await currencyConverter(fromCurrency, toCurrency, amount);
      const data = await res.data;
      setIsLoading(false);
      setConvertedAmount(data.conversion_result);
    } catch (error) {
      setError("Error fetching conversion rates");
      console.error(error);
    }
  };

  return (
    <section className="currency-converter">
      <div className="currency-div">
        <h1>Currency Converter</h1>
        <hr />
        <div className="input-div">
          <label htmlFor="currency_amount">Amount:</label>
          <input
            type="number"
            id="currency_amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="currency-selector">
          <div>
            <label>
              From:
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {currency.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              To :
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)} // Use onChange instead of setToCurrency
              >
                {currency.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <button
          disabled={isLoading || amount <= 0}
          onClick={handleConvertCurrency}
        >
          {isLoading ? "converting.." : "Convert"}
        </button>

        <hr />
        {convertedAmount && (
          <div>
            <h2>
              {amount} {fromCurrency} = {convertedAmount.toFixed(2)}{" "}
              {toCurrency}
            </h2>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </section>
  );
}

export default App;
