import React, { useState } from "react";
import axios from "axios";
import "../styles/Weather.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL;

function WeatherModule() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`https://info-hub-challenge-lb9m.vercel.app/api/weather?city=${city}`);
      setWeather(res.data);
      console.log(res.data);
      console.log("Weather data fetched successfully");
    } catch {
      setError("Unable to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <h2>Weather Information</h2>
      <div className="weather-input">
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {loading && <p className="loading-text">Fetching data...</p>}
      {error && <p className="error-text">{error}</p>}
      {weather && !loading && !error && (
        <div className="weather-result">
          <h1>Weather in {weather.location}</h1>
          <p>🌡 Temperature: {weather.temperature}°C</p>
          <p>🌬 Wind Speed: {weather.windspeed} km/h</p>
          <p>☁ Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherModule;
