export const getDailyMaxTemps = (forecastData) => {
  const dailyTemps = {};

  forecastData.list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0];
    if (!dailyTemps[date]) {
      dailyTemps[date] = entry.main.temp_max;
    } else {
      dailyTemps[date] = Math.max(dailyTemps[date], entry.main.temp_max);
    }
  });

  return Object.entries(dailyTemps).slice(0, 5); 
};
