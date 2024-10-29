import PropTypes from "prop-types";
import { useEffect } from "react";

const WeatherIcon = ({ weatherId, sunrise, sunset, timezone }) => {
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
      night: "/icons/snowy-1-night.svg",
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

  const getWeatherIcon = () => {
    const adjustedSunrise = sunrise + timezone;
    const adjustedSunset = sunset + timezone;

    const currentTime = Math.floor(Date.now() / 1000);
    const isDayTime = currentTime >= adjustedSunrise && currentTime < adjustedSunset;
    const timeOfDay = isDayTime ? "day" : "night";

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

    return weatherConditions.default[timeOfDay];
  };

  const imageUrl = getWeatherIcon();

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = imageUrl;
    link.as = 'image';
    document.head.appendChild(link);
    
    const img = new Image();
    img.src = imageUrl;

    return () => {
      document.head.removeChild(link);
    };
  }, [imageUrl]);

  // Set explicit width and height for the image
  const imageWidth = 100; // Set your desired width
  const imageHeight = 100; // Set your desired height

  return (
    <div className="weather-icon">
      <img 
        src={imageUrl} 
        alt="Weather icon" 
        width={imageWidth} 
        height={imageHeight} 
      />
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
