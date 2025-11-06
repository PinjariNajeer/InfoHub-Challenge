// import React, { useState } from "react";
// import WeatherModule from "./components/WeatherModule";
// import CurrencyConverter from "./components/CurrencyConverter";
// import QuoteGenerator from "./components/QuoteGenerator";
// import "./styles/App.css";

// const App = () => {
//   const [activeModule, setActiveModule] = useState("weather");

//   const renderModule = () => {
//     switch (activeModule) {
//       case "weather":
//         return <WeatherModule />;
//       case "currency":
//         return <CurrencyConverter />;
//       case "quote":
//         return <QuoteGenerator />;
//       default:
//         return <WeatherModule />;
//     }
//   };

//   return (
//     <div className="app-container">
//       <header className="app-header">
//         <button
//           className={`nav-btn ${activeModule === "weather" ? "active" : ""}`}
//           onClick={() => setActiveModule("weather")}
//         >
//           🌤 Weather
//         </button>
//         <button
//           className={`nav-btn ${activeModule === "currency" ? "active" : ""}`}
//           onClick={() => setActiveModule("currency")}
//         >
//           💱 Currency
//         </button>
//         <button
//           className={`nav-btn ${activeModule === "quote" ? "active" : ""}`}
//           onClick={() => setActiveModule("quote")}
//         >
//           💬 Quotes
//         </button>
//       </header>

//       <main className="module-section">{renderModule()}</main>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import WeatherModule from "./components/WeatherModule";
import CurrencyConverter from "./components/CurrencyConverter";
import QuoteGenerator from "./components/QuoteGenerator";
import "./styles/App.css";

const App = () => {
  const [activeModule, setActiveModule] = useState("weather");

  const renderModule = () => {
    switch (activeModule) {
      case "weather":
        return <WeatherModule />;
      case "currency":
        return <CurrencyConverter />;
      case "quote":
        return <QuoteGenerator />;
      default:
        return <WeatherModule />;
    }
  };

  return (
    <div className="app-container">
      <h1 className="main-heading"> This is Weather App</h1>

      <div className="button-group">
        <button
          className={`nav-btn ${activeModule === "weather" ? "active" : ""}`}
          onClick={() => setActiveModule("weather")}
        >
          Weather
        </button>
        <button
          className={`nav-btn ${activeModule === "currency" ? "active" : ""}`}
          onClick={() => setActiveModule("currency")}
        >
          Currency
        </button>
        <button
          className={`nav-btn ${activeModule === "quote" ? "active" : ""}`}
          onClick={() => setActiveModule("quote")}
        >
          Quotes
        </button>
      </div>

      <div className="module-section fade-in">{renderModule()}</div>
    </div>
  );
};

export default App;
