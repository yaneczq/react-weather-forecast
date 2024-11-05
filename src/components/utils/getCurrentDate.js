export const getCurrentDate = (timestamp, timezone) => {
  const localTime = new Date((timestamp + timezone) * 1000);
  return localTime.toLocaleString("en-US", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
};
