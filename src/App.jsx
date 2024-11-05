import { useState, useEffect } from "react";
import WeatherIcon from "./components/WeatherIcon/WeatherIcon";
import ForecastDisplay from "./components/ForecastDisplay/ForecastDisplay";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";
import { PiThermometerDuotone } from "react-icons/pi";
import { getCurrentDate } from "./components/utils/getCurrentDate";
import styles from "./App.module.scss";

const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

const App = () => {
  const [city, setCity] = useState("Kraków");
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

  return (
    <div className={styles.app}>
      <div className={styles.searchContainer}>
        <label htmlFor={styles.searchBar}>
          <h1>Check the weather</h1>
          <p>Type the name of your city...</p>
        </label>
        <input
          id="search-bar"
          name="search-bar"
          type="text"
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
            <div className={styles.weatherData}>
              <div className={styles.weatherIcon}>
                {/* Pass sunrise, sunset, and timezone to WeatherIcon */}
                <WeatherIcon
                  weatherId={weatherData.weather[0].id}
                  sunrise={weatherData.sys.sunrise}
                  sunset={weatherData.sys.sunset}
                  timezone={weatherData.timezone}
                />
              </div>

              <div className={styles.weatherLocation}>
                <h2>{weatherData.name}</h2>
                <p>{getCurrentDate(weatherData.dt, weatherData.timezone)}</p>
                <p className={styles.temp}>
                  <PiThermometerDuotone />
                  {weatherData.main.temp}°C
                </p>
              </div>
            </div>
          )
        )}
      </div>

      <WeatherDetails weatherData={weatherData} />
      {forecastData && <ForecastDisplay forecastData={forecastData} />}
    </div>
  );
};

export default App;
