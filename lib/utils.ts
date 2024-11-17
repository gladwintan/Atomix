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

export const formatPostTime = (date: string): string => {
  const currentDate = new Date()
  const pastDate = new Date(date)
  const diff = currentDate.getTime() - pastDate.getTime(); // Difference in milliseconds

  const units: [string, number][] = [
    ["years", Math.floor(diff / (1000 * 60 * 60 * 24 * 365))],
    ["months", Math.floor(diff / (1000 * 60 * 60 * 24 * 30))],
    ["weeks", Math.floor(diff / (1000 * 60 * 60 * 24 * 7))],
    ["days", Math.floor(diff / (1000 * 60 * 60 * 24))],
    ["hours", Math.floor(diff / (1000 * 60 * 60))],
    ["minutes", Math.floor(diff / (1000 * 60))],
    ["seconds", Math.floor(diff / 1000)]   
  ]

  for (const [unit, value] of units) {
    if (value == 1 && unit == "years") {
      return "last year"
    }
    if (value == 1 && unit == "months") {
      return "last month"
    }
    if (value == 1 && unit == "weeks") {
      return "last week"
    }
    if (value == 1 && unit == "days") {
      return "yesterday"
    }
    if (value >= 1) {
      return value + " " + unit + " ago"
    }
  }

  return "just now";
}
