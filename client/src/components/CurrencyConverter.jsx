import React, { useState } from "react";
import axios from "axios";
import "../styles/Currency.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL;
function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const convertCurrency = async () => {
    if (!amount) {
      setError("Please enter an amount");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://info-hub-challenge-lb9m.vercel.app/api/currency?amount=${amount}`
      );
      setData(res.data);
    } catch {
      setError("Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="currency-container">
      <h2>Currency Converter</h2>
      <div className="converter-inputs">
        <input
          type="number"
          placeholder="Amount in INR"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={convertCurrency}>Convert</button>
      </div>

      {loading && <p className="loading-text">Converting...</p>}
      {error && <p className="error-text">{error}</p>}
      {data && !loading && !error && (
        <div className="result">
          <p>USD: ${data.usd}</p>
          <p>EUR: €{data.eur}</p>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
