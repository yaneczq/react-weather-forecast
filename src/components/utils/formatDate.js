export const formatDate = (dateString) => {
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
