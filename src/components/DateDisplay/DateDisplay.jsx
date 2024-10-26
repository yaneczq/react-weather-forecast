const DisplayDate = () => {
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <p className="date">{getCurrentDate()}</p>
    </div>
  );
};

export default DisplayDate;
