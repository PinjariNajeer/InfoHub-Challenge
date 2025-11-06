import React, { useState } from "react";
import axios from "axios";
import "../styles/Quote.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL;

function QuoteGenerator() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fade, setFade] = useState(false);

  const getQuote = async () => {
    setLoading(true);
    setError("");
    setFade(false);
    try {
      const res = await axios.get(`https://info-hub-challenge-lb9m.vercel.app/api/quote`);
      setQuote(res.data.quote);
      setFade(true);
    } catch {
      setError("Failed to fetch quote");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quote-container">
      <div className={`quote-card ${fade ? "fade-in" : ""}`}>
        <h2 className="quote-title"> Inspirational Quote</h2>

        {loading ? (
          <p className="quote-text">Loading...</p>
        ) : (
          <>{quote && <p className="quote-text">“{quote}”</p>}</>
        )}

        <button className="quote-btn" onClick={getQuote}>
          {loading ? "Fetching..." : "Get New Quote"}
        </button>
      </div>
    </div>
  );
}

export default QuoteGenerator;
