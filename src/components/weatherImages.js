// weatherImages.js
const weatherImages = {
  thunderstorm: "thunderstorm.png",
  drizzle: "drizzle.png",
  rain: "rain.svg",
  snow: "snow.png",
  atmosphere: "atmosphere.png",
  clear: "clear.png",
  clouds: "clouds.svg",
  default: "default.png"
};

const getWeatherImage = (weatherId) => {
  if (weatherId >= 200 && weatherId < 300) return weatherImages.thunderstorm;
  if (weatherId >= 300 && weatherId < 400) return weatherImages.drizzle;
  if (weatherId >= 500 && weatherId < 600) return weatherImages.rain;
  if (weatherId >= 600 && weatherId < 700) return weatherImages.snow;
  if (weatherId >= 700 && weatherId < 800) return weatherImages.atmosphere;
  if (weatherId === 800) return weatherImages.clear;
  if (weatherId >= 801 && weatherId < 900) return weatherImages.clouds;
  return weatherImages.default; // Fallback image
};

export default getWeatherImage;
