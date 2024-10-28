import { useState, useEffect } from "react";
import WeatherIcon from "./components/WeatherIcon/WeatherIcon";
import ForecastDisplay from "./components/ForecastDisplay/ForecastDisplay";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";

import "./App.scss";

const App = () => {
  const apiKey = "6a99ac672d954bcac92a244150fda6a9";
  const [city, setCity] = useState("Jasło");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async (city) => {
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`,
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`,
        ),
      ]);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error("Weather or Forecast data not found.");
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      console.log(weatherData);
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

  const formatLocalDate = (timestamp, timezone) => {
    const localTime = new Date((timestamp + timezone) * 1000);
    return localTime.toLocaleString("en-US", {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  return (
    <div className="app">
      <div className="search__container">
        <h1>Check the weather</h1>
        <p>Type name of your city...</p>
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
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        weatherData && (
          <div className="weather-data">
            <div className="weather-icon">
              {/* Pass sunrise, sunset, and timezone to WeatherIcon */}
              <WeatherIcon
                weatherId={weatherData.weather[0].id}
                sunrise={weatherData.sys.sunrise}
                sunset={weatherData.sys.sunset}
                timezone={weatherData.timezone}
              />
            </div>

            <div className="weather-location">
              <h2>{weatherData.name}</h2>
              <p>{formatLocalDate(weatherData.dt, weatherData.timezone)}</p>
              <p className="temp">{weatherData.main.temp}°C</p>
            </div>
          </div>
        )
      )}
      
      <WeatherDetails weatherData={weatherData} />

      {forecastData && <ForecastDisplay forecastData={forecastData} />}
    </div>
  );
};

export default App;
