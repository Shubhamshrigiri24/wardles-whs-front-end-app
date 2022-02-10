export function validateDob(dob: Date, now?: Date): boolean {
  const currentTime = now || new Date();
  const twoYearsAgo = roundDate(currentTime);
  twoYearsAgo.setFullYear(currentTime.getFullYear() - 2);
  const roundedDob = roundDate(dob);
  if (roundedDob > twoYearsAgo) {
    return false;
  }
  return true;
}

export function roundDate(date: Date): Date {
  const roundedDate = new Date(0);
  roundedDate.setUTCFullYear(date.getFullYear());
  roundedDate.setUTCMonth(date.getMonth());
  roundedDate.setUTCDate(date.getDate());
  return roundedDate;
}
