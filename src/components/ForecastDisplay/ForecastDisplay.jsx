import PropTypes from "prop-types";
import { formatDate } from "../utils/formatDate";
import { getDailyMaxTemps } from "../utils/getDailyMaxTemps";

const ForecastDisplay = ({ forecastData }) => {
  const dailyMaxTemps = getDailyMaxTemps(forecastData);

  return (
    <div className="forecast-display">
      <div className="app_header">
        <h1>Check the Forecast</h1>
        <p>for the upcoming five days in your city...</p>
      </div>
      <div className="forecast-list">
        {dailyMaxTemps.map(([date, temp], index) => (
          <div key={index} className="forecast-item">
            <p>{formatDate(date)}</p>
            <p>{temp.toFixed(1)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

ForecastDisplay.propTypes = {
  forecastData: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        dt_txt: PropTypes.string.isRequired,
        main: PropTypes.shape({
          temp_max: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
};

export default ForecastDisplay;
