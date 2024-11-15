export const formatCourseName = (courseName: string) => {
  return courseName.split(" ").join("-").toLowerCase();
};

export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  };

  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString("en-GB", options);
  return formattedDate.replace(/(\d{2})$/, "'$1");
};
