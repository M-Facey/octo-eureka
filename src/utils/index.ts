export function strToDate(dateString: string | Date) {
  if (typeof dateString === "string") {
    return new Date(dateString);
  }
  return dateString;
}
