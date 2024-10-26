// WeatherIcon.jsx
import PropTypes from "prop-types";

const WeatherIcon = ({ weatherId, sunrise, sunset, timezone }) => {
  const getWeatherIcon = (weatherId, sunrise, sunset, timezone) => {
    // Adjust sunrise and sunset using the timezone parameter
    const adjustedSunrise = sunrise + timezone; // Sunrise adjusted to local time
    const adjustedSunset = sunset + timezone; // Sunset adjusted to local time

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const isDayTime =
      currentTime >= adjustedSunrise && currentTime < adjustedSunset;
    const timeOfDay = isDayTime ? "day" : "night";

    const weatherConditions = {
      thunderstorm: {
        day: "/thunderstorm-day.svg",
        night: "/thunderstorm-night.svg",
      },
      drizzle: {
        day: "/drizzle-day.svg",
        night: "/drizzle-night.svg",
      },
      rain: {
        day: "/rainy-1-day.svg",
        night: "/rainy-1-night.svg",
      },
      snow: {
        day: "/snow-day.svg",
        night: ".//snow-night-icon.svg",
      },
      clear: {
        day: "/clear-day.svg",
        night: "/clear-night.svg",
      },
      clouds: {
        day: "/cloudy-1-day.svg",
        night: "/cloudy-1-night.svg",
      },
      // Add more conditions as needed
      default: {
        day: "/default-day.svg",
        night: "/default-night.svg",
      },
    };

    if (weatherId >= 200 && weatherId < 300)
      return weatherConditions.thunderstorm[timeOfDay];
    if (weatherId >= 300 && weatherId < 400)
      return weatherConditions.drizzle[timeOfDay];
    if (weatherId >= 500 && weatherId < 600)
      return weatherConditions.rain[timeOfDay];
    if (weatherId >= 600 && weatherId < 700)
      return weatherConditions.snow[timeOfDay];
    if (weatherId === 800) return weatherConditions.clear[timeOfDay];
    if (weatherId >= 801 && weatherId < 900)
      return weatherConditions.clouds[timeOfDay];

    return weatherConditions.default[timeOfDay]; // Fallback image
  };

  const imageUrl = getWeatherIcon(weatherId, sunrise, sunset, timezone);
  console.log("Image URL:", imageUrl); // Debugging log

  return (
    <div className="weather-icon">
      <img src={`/public/weather-icons${imageUrl}`} alt={`${imageUrl}`} />
    </div>
  );
};

WeatherIcon.propTypes = {
  weatherId: PropTypes.number.isRequired,
  sunrise: PropTypes.number.isRequired,
  sunset: PropTypes.number.isRequired,
  timezone: PropTypes.number.isRequired,
};

export default WeatherIcon;
