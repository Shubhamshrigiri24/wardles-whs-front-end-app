import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Availability } from "./types";

export function parseSelectedDate(date: MaterialUiPickersDate) {
  try {
    if (!date || !date?.toISOString()) {
      console.log("not valid", date);
      return null;
    }
    const parsedDate = new Date(date?.toISOString());
    return parsedDate;
  } catch {
    return null;
  }
}

export function getAppointmentKey(a: Availability) {
  const startTime = new Date(a.startTime);
  const rowKey = startTime.toISOString();
  return `${rowKey}-${a.resourceId}`;
}
