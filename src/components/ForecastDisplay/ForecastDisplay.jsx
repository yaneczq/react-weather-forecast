import PropTypes from "prop-types";

const ForecastDisplay = ({ forecastData }) => {

  // Helper function to format date string
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year.slice(-2)}`; // Format to MM/DD/YY
  };
  // Helper function to get daily max temperatures
  const getDailyMaxTemps = () => {
    const dailyTemps = {};

    forecastData.list.forEach((entry) => {
      const date = entry.dt_txt.split(" ")[0];
      if (!dailyTemps[date]) {
        dailyTemps[date] = entry.main.temp_max;
      } else {
        dailyTemps[date] = Math.max(dailyTemps[date], entry.main.temp_max);
      }
    });

    return Object.entries(dailyTemps).slice(0, 5); // Get first 5 days
  };

  const dailyMaxTemps = getDailyMaxTemps();

  return (
    <div className="forecast-display">
      <h2>5-Day Forecast</h2>
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

// PropTypes validation

export default ForecastDisplay;
