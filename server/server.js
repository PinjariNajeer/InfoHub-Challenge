import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// QUOTE API
const localQuotes = [
  "Believe you can and you're halfway there.",
  "Success is not final; failure is not fatal: it is the courage to continue that counts.",
  "Dream big. Start small. Act now.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Push yourself, because no one else is going to do it for you.",
];

app.get("/api/quote", async (req, res) => {
  try {
    // Option A: use local mock data
    const randomQuote =
      localQuotes[Math.floor(Math.random() * localQuotes.length)];

    // Option B (Advanced): Uncomment to use external API like Quotable
    // const response = await axios.get("https://api.quotable.io/random");
    // const randomQuote = response.data.content;

    res.json({ quote: randomQuote });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch quote." });
  }
});

// WEATHER API
app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city || "London";
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);

    const data = response.data;
    const weatherInfo = {
      location: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].description,
      windspeed: data.wind.speed,
    };

    res.json(weatherInfo);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch weather data." });
  }
});

// CURRENCY CONVERTER API
app.get("/api/currency", async (req, res) => {
  try {
    const { amount } = req.query;
    const apiKey = process.env.EXCHANGE_API_KEY;

    // Example using ExchangeRate-API (replace with your own key)
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`;
    const response = await axios.get(url);

    const rates = response.data.conversion_rates;
    const converted = {
      usd: (amount * rates.USD).toFixed(2),
      eur: (amount * rates.EUR).toFixed(2),
    };

    res.json(converted);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch currency data." });
  }
});

// SERVER START
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
