export default function fixDateFormat(
  originalDate: string
): string | undefined {
  // Try to parse the original date
  const parsedDate = new Date(originalDate || Date.now());

  // Check if the parsed date is valid
  // if (!isNaN(parsedDate.getTime())) {
  // Get the components of the date
  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1; // Months are zero-based
  const day = parsedDate.getDate();

  // Create the fixed date string with zero-padding
  const fixedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  return fixedDate;
  // } else {
  // Return null if the original date is not valid
  //   return undefined;
  // }
}
