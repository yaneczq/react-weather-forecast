// WeatherIcon.jsx
import PropTypes from "prop-types";

const weatherConditions = {
  thunderstorm: {
    day: "icons/thunderstorm-day-icon.svg",
    night: "icons/thunderstorm-night-icon.svg",
  },
  drizzle: {
    day: "icons/drizzle-day-icon.svg",
    night: "icons/drizzle-night-icon.svg",
  },
  rain: {
    day: "icons/rain-day-icon.svg",
    night: "icons/rain-night-icon.svg",
  },
  snow: {
    day: "icons/snow-day-icon.svg",
    night: "icons/snow-night-icon.svg",
  },
  clear: {
    day: "icons/clear-day.svg",
    night: "icons/clear-night.svg",
  },
  clouds: {
    day: "icons/cloudy-1-day.svg",
    night: "icons/cloudy-1-night.svg",
  },
  // Add more conditions as needed
};

const getWeatherIcon = (weatherId, timeOfDay) => {
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

  // Return a default icon if no conditions match
  return weatherConditions.clear[timeOfDay]; // Fallback to clear icon
};

const WeatherIcon = ({ weatherId, sunrise, sunset, timezone }) => {
  const getTimeOfDay = () => {
    const currentTime = Math.floor(Date.now() / 1000) + timezone; // Adjust current time for timezone
    const isDayTime = currentTime >= sunrise && currentTime < sunset;
    return isDayTime ? "day" : "night";
  };

  const timeOfDay = getTimeOfDay();
  const imageUrl = getWeatherIcon(weatherId, timeOfDay);
  console.log("Image URL:", imageUrl); // Debugging log

  return (
    <div className="weather-icon">
      <img src={`/public/${imageUrl}`} alt="weather-icon" />
    </div>
  );
};

WeatherIcon.propTypes = {
  weatherId: PropTypes.number.isRequired,
  sunrise: PropTypes.number.isRequired, // Sunrise time in seconds
  sunset: PropTypes.number.isRequired, // Sunset time in seconds
  timezone: PropTypes.number.isRequired, // Timezone offset in seconds
};

export default WeatherIcon;
