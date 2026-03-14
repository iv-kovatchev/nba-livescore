export const getLocalDate = (offset: number): string => {
  const now = new Date();
  now.setDate(now.getDate() + offset);
  const etDate = new Date(
    now.toLocaleString("en-US", { timeZone: "America/New_York" }),
  );
  return `${etDate.getFullYear()}-${String(etDate.getMonth() + 1).padStart(2, "0")}-${String(etDate.getDate()).padStart(2, "0")}`;
};

export const formatDisplayDate = (dateStr: string): string => {
  const date = new Date(`${dateStr}T12:00:00`);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};
