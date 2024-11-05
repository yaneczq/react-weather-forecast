import PropTypes from "prop-types";
import { useEffect } from "react";
import { getWeatherIcon } from "../utils/getWeatherIcon";

const imageWidth = 100;
const imageHeight = 100;

const WeatherIcon = ({ weatherId, sunrise, sunset, timezone }) => {
  const imageUrl = getWeatherIcon(weatherId, sunrise, sunset, timezone);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = imageUrl;
    link.as = "image";
    document.head.appendChild(link);

    const img = new Image();
    img.src = imageUrl;

    return () => {
      document.head.removeChild(link);
    };
  }, [imageUrl]);

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
