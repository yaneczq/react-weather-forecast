// CustomWeatherIcon.jsx
import PropTypes from "prop-types";
import getWeatherImage from "./weatherImages";

const CustomWeatherIcon = ({ weatherId }) => {
  const imageUrl = getWeatherImage(weatherId);
  console.log("Image URL:", imageUrl); // Debugging log

  return (
    <div className="weather-icon">
      <img src={`/images/${imageUrl}`} alt="weather-icon" />
    </div>
  );
};

CustomWeatherIcon.propTypes = {
  weatherId: PropTypes.number.isRequired
};

export default CustomWeatherIcon;
