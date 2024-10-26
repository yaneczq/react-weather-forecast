// App.jsx
import { useState, useEffect } from "react";
import DisplayDate from "./components/DateDisplay/DateDisplay";
import WeatherIcon from "./components/WeatherIcon/WeatherIcon";
import ForecastDisplay from "./components/ForecastDisplay/ForecastDisplay"; // New import for forecast
import "./App.scss";

const App = () => {
  const apiKey = "6a99ac672d954bcac92a244150fda6a9";
  const [city, setCity] = useState("Jasło");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null); // New state for forecast data
  const [loading, setLoading] = useState(true);

  const fetchWeather = async (city) => {
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
      ]);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error("Weather or Forecast data not found.");
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      // console.log(weatherData); 
      console.log(forecastData);

      setWeatherData(weatherData);
      setForecastData(forecastData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    fetchWeather(city);
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return (
    <div className="weather">
      <h1>Check your weather!</h1>
      <input
        type="text"
        className="search-bar"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />

      {loading ? (
        <div>Loading...</div>
      ) : (
        weatherData && (
          <div className="content">

            <div className="presenter">
              <WeatherIcon weatherId={weatherData.weather[0].id} />
            </div>

            <div className="location-date">
              <div className="display">
                <h2>{weatherData.name}</h2>
                <DisplayDate />
              </div>
              <p className="temp">{weatherData.main.temp}°C</p>
            </div>

            <div className="line"></div>

            <div className="data">
              <div className="specs">
                <p className="description">Conditions: <strong>{weatherData.weather[0].description}</strong></p>
              </div>

              <div className="specs">
                <p className="humidity">Humidity: <strong>{weatherData.main.humidity}%</strong></p>
                <p className="wind">Wind speed: <strong>{weatherData.wind.speed} m/s</strong></p>
              </div>
            </div>

            {/* New Forecast Component */}
            {forecastData && <ForecastDisplay forecastData={forecastData} />}
          </div>
        )
      )}
    </div>
  );
};

export default App;
