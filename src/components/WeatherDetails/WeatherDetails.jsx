// WeatherDetails.js
import React from "react";
import { RiWaterPercentLine } from "react-icons/ri";

import { FaWind } from "react-icons/fa";
import { GiWindsock, GiWindpump } from "react-icons/gi";
import {
  PiCloudSunDuotone,
  PiSpeedometerDuotone,
  PiApproximateEqualsDuotone,
  PiWindFill,
} from "react-icons/pi";
import { BsSpeedometer2 } from "react-icons/bs";

const WeatherDetails = ({ weatherData }) => {
  // Check if weatherData exists
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="weather-details">
      <div className="app_header">
        <h1>Weather Details</h1>
        <p>Humidity, Pressure, Clouds, Wind Speed & Angle</p>
      </div>

      <div className="detail-item">
        <div className="detail-item_header">
          <PiApproximateEqualsDuotone size={24} />

          <p>Humidity</p>
        </div>
        <span className="value">{weatherData?.main?.humidity ?? "N/A"}%</span>
      </div>
      <div className="detail-item">
        <div className="detail-item_header">
          <PiSpeedometerDuotone size={24} />

          <p>Pressure</p>
        </div>

        <span className="value">
          {weatherData?.main?.pressure ?? "N/A"} hPa
        </span>
      </div>
      <div className="detail-item">
        <div className="detail-item_header">
          <PiCloudSunDuotone size={24} />

          <p>Cloudiness</p>
        </div>
        <span className="value">{weatherData?.clouds?.all ?? "N/A"}%</span>
      </div>
      <div className="detail-item">
        <div className="detail-item_header">
          <GiWindsock size={24} />
          <p>Wind Speed</p>
        </div>

        <span className="value">{weatherData?.wind?.speed ?? "N/A"} m/s</span>
      </div>
      <div className="detail-item">
        <div className="detail-item_header">
          <PiWindFill size={24} />
          <p>Wind Angle</p>
        </div>
        <span className="value">{weatherData?.wind?.deg ?? "N/A"}°</span>
      </div>
      {/* <div className="detail-item">
          <span className="label">Visibility:</span>
          <span className="value">{weatherData?.visibility != null ? weatherData.visibility / 1000 : "N/A"} km</span>
          </div> */}
    </div>
  );
};

export default WeatherDetails;
