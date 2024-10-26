import PropTypes from "prop-types";

const ForecastDisplay = ({ forecastData }) => {
  // Helper function to format date string
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    const date = new Date(year, month - 1, day); // Create a Date object
    const options = {
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options); // Format to Day, MM/DD/YYYY
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
