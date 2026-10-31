// Turns "YYYY-MM-DD" into a Date. Returns null if the text is not a real date.
export function parseDueDate(text) {
  if (typeof text !== "string") return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text.trim());
  if (!match) return null;
  const [, y, m, d] = match.map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  if (date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) return null;
  return date;
}