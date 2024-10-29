import PropTypes from "prop-types";
import { useEffect } from "react";

const WeatherIcon = ({ weatherId, sunrise, sunset, timezone }) => {
  // Weather conditions mapping
  const weatherConditions = {
    thunderstorm: {
      day: "/icons/thunderstorm-day.svg",
      night: "/icons/thunderstorm-night.svg",
    },
    drizzle: {
      day: "/icons/drizzle-day.svg",
      night: "/icons/drizzle-night.svg",
    },
    rain: {
      day: "/icons/rainy-1-day.svg",
      night: "/icons/rainy-1-night.svg",
    },
    snow: {
      day: "/icons/snowy-2-day.svg",
      night: "/icons/snowy-2-night.svg",
    },
    clear: {
      day: "/icons/clear-day.svg",
      night: "/icons/clear-night.svg",
    },
    clouds: {
      day: "/icons/cloudy-1-day.svg",
      night: "/icons/cloudy-1-night.svg",
    },
    default: {
      day: "/icons/fog.svg",
      night: "/icons/fog.svg",
    },
  };

  // Preload icons
  const preloadWeatherIcons = (conditions) => {
    const preloadLinks = conditions.map(condition => 
      `<link rel="preload" href="${condition}" as="image">`
    ).join("\n");
  
    // Append the preload links to the head
    document.head.insertAdjacentHTML('beforeend', preloadLinks);
  };

  useEffect(() => {
    // Preload most common weather icons only once when the component mounts
    preloadWeatherIcons([
      "/icons/thunderstorm-day.svg",
      "/icons/thunderstorm-night.svg",
      "/icons/drizzle-day.svg",
      "/icons/drizzle-night.svg",
      "/icons/rainy-1-day.svg",
      "/icons/rainy-1-night.svg",
      "/icons/snowy-1-day.svg",
      "/icons/snowy-1-night.svg",
      "/icons/clear-day.svg",
      "/icons/clear-night.svg",
      "/icons/cloudy-1-day.svg",
      "/icons/cloudy-1-night.svg",
      "/icons/fog.svg",
      // Add more if necessary
    ]);
  }, []); // Empty dependency array to run once on mount

  // Determine if it's day or night
  const getWeatherIcon = (weatherId) => {
    const adjustedSunrise = sunrise + timezone; // Sunrise adjusted to local time
    const adjustedSunset = sunset + timezone; // Sunset adjusted to local time

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const isDayTime = currentTime >= adjustedSunrise && currentTime < adjustedSunset;
    const timeOfDay = isDayTime ? "day" : "night";

    // Return the appropriate weather icon based on the weatherId
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

  const imageUrl = getWeatherIcon(weatherId);
  console.log("Image URL:", imageUrl); // Debugging log

  return (
    <div className="weather-icon">
      <img src={imageUrl} alt="Weather icon" />
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
