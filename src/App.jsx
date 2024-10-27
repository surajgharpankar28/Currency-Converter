import { useState } from "react";
import { currencyConverter } from "./api/postAPI";

const App = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const currency = ["INR", "USD"]; // Add more currencies as needed

  const handleConvertCurrency = () => {
    setIsLoading(true);
    // Simulated conversion
    setTimeout(() => {
      setConvertedAmount(amount * 0.012);
      setIsLoading(false);
    }, 1000);
  };

  const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  return (
    <>
      <section className="currency-converter">
        <div className="currency-div">
          <div className="header">
            <img src="/public/logo.png" alt="Currency Converter Logo" />
            <h1>Currency Converter</h1>
          </div>

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
                setConvertedAmount(null);
              }}
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
            {isLoading ? "Converting..." : "Convert"}
          </button>

          <hr />

          {convertedAmount !== null && (
            <div className="result">
              {formatCurrency(amount, fromCurrency)} ={" "}
              {formatCurrency(convertedAmount, toCurrency)}
            </div>
          )}

          {error && <p className="error">{error}</p>}
        </div>
      </section>
    </>
  );
};

export default App;
