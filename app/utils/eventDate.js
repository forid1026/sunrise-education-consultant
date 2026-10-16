const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// "2026-10-23" -> { day: "23", month: "Oct", year: "2026", full: "23 October 2026" }
export const eventDate = (iso) => {
  if (!iso) return { day: "--", month: "---", year: "", full: "" };
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  const full = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return {
    day: String(d).padStart(2, "0"),
    month: MONTHS[m - 1],
    year: String(y),
    full,
  };
};
