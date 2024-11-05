// WeatherDetails.js
import React from "react";
import { GiWindsock } from "react-icons/gi";
import {
  PiCloudSunDuotone,
  PiSpeedometerDuotone,
  PiApproximateEqualsDuotone,
  PiWindFill,
} from "react-icons/pi";
import styles from "./WeatherDetails.module.scss";

const WeatherDetails = ({ weatherData }) => {
  // Check if weatherData exists
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.weatherDetails}>
      <div className={styles.appHeader}>
        <h1>Weather Details</h1>
        <p>Humidity, Pressure, Clouds, Wind Speed & Angle</p>
      </div>

      <div className={styles.detailsItem}>
        <div className={styles.detailsItemHeader}>
          <PiApproximateEqualsDuotone size={24} />
          <p>Humidity</p>
        </div>
        <span className={styles.value}>{weatherData?.main?.humidity ?? "N/A"}%</span>
      </div>

      <div className={styles.detailsItem}>
        <div className={styles.detailsItemHeader}>
          <PiSpeedometerDuotone size={24} />
          <p>Pressure</p>
        </div>
        <span className={styles.value}>
          {weatherData?.main?.pressure ?? "N/A"} hPa
        </span>
      </div>

      <div className={styles.detailsItem}>
        <div className={styles.detailsItemHeader}>
          <PiCloudSunDuotone size={24} />
          <p>Cloudiness</p>
        </div>
        <span className={styles.value}>{weatherData?.clouds?.all ?? "N/A"}%</span>
      </div>

      <div className={styles.detailsItem}>
        <div className={styles.detailsItemHeader}>
          <GiWindsock size={24} />
          <p>Wind Speed</p>
        </div>
        <span className={styles.value}>{weatherData?.wind?.speed ?? "N/A"} m/s</span>
      </div>

      <div className={styles.detailsItem}>
        <div className={styles.detailsItemHeader}>
          <PiWindFill size={24} />
          <p>Wind Angle</p>
        </div>
        <span className={styles.value}>{weatherData?.wind?.deg ?? "N/A"}°</span>
      </div>
    </div>
  );
};

export default WeatherDetails;
