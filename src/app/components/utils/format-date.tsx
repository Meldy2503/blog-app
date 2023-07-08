export const formatDate = (date: number) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
