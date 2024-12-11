import { useState, useEffect } from "react";
import logo from "/src/logo.png";

const App = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [exchangeRates, setExchangeRates] = useState({});

  const currency = ["INR", "USD", "AED", "EUR", "GBP", "JPY", "AUD", "CAD"]; // Extended list

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (e) {
        setError("Failed to fetch exchange rates. Please try again later.");
      }
    };

    fetchExchangeRates();
  }, []);

  // Reset convertedAmount when currencies change
  useEffect(() => {
    setConvertedAmount(null);
  }, [fromCurrency, toCurrency]);

  const handleConvertCurrency = () => {
    setIsLoading(true);
    setError("");

    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      setError("Invalid currency selection or rates unavailable.");
      setIsLoading(false);
      return;
    }

    const conversionRate =
      exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    setConvertedAmount(amount * conversionRate);
    setIsLoading(false);
  };

  const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(value);
  };

  return (
    <section className="currency-converter">
      <div className="container">
        <header className="header">
          <img src={logo} alt="Currency Converter Logo" className="logo" />
          <h1>Currency Converter</h1>
        </header>

        <div className="input-section">
          <label htmlFor="currency_amount">Amount:</label>
          <input
            type="number"
            id="currency_amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setConvertedAmount(null);
            }}
            placeholder="Enter amount"
          />

          <div className="selectors">
            <div>
              <label>From:</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {currency.map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>To:</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {currency.map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            className="convert-btn"
            disabled={isLoading || amount <= 0 || !exchangeRates}
            onClick={handleConvertCurrency}
          >
            {isLoading ? "Converting..." : "Convert"}
          </button>
        </div>

        {convertedAmount !== null && (
          <div className="result">
            <p>
              {formatCurrency(amount, fromCurrency)} ={" "}
              {formatCurrency(convertedAmount, toCurrency)}
            </p>
          </div>
        )}

        {error && <p className="error">{error}</p>}
      </div>

      <style jsx>{`
        .currency-converter {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #f0f4f8;
        }

        .container {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        .header {
          text-align: center;
        }

        .logo {
          width: 50px;
          margin-bottom: 10px;
        }

        h1 {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .input-section label {
          display: block;
          margin-bottom: 5px;
        }

        input,
        select {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .selectors {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }

        .convert-btn {
          width: 100%;
          padding: 10px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
        }

        .convert-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .result {
          margin-top: 20px;
          text-align: center;
          font-size: 1.2rem;
          font-weight: bold;
        }

        .error {
          color: red;
          text-align: center;
          margin-top: 10px;
        }
      `}</style>
    </section>
  );
};

export default App;
