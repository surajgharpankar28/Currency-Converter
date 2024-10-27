import { useState } from "react";
import { currencyConverter } from "./api/postAPI";

function App() {
  const currency = ["USD", "EUR", "INR", "GBP", "AUD"];

  const [amount, setAmount] = useState("");
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
      setIsLoading(false); // Ensure loading is reset on error
      setError("Error fetching conversion rates");
      console.error(error);
    }
  };

  // Function to format currency
  const formatCurrency = (value, currencyCode) => {
    if (value !== null && value !== "") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode, // Use the specified currency code for formatting
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    }
    return "";
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
            onChange={(e) => {
              const value = e.target.value;
              setAmount(value);
              setConvertedAmount(null); // Reset convertedAmount when typing starts
            }}
          />

          {/* Display formatted input amount */}
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
              To:
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
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
        {convertedAmount !== null && (
          <div>
            <h2>
              {formatCurrency(amount, fromCurrency)} ={" "}
              {formatCurrency(convertedAmount, toCurrency)} {toCurrency}
            </h2>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </section>
  );
}

export default App;
