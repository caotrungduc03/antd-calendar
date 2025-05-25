import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { DaysOfWeek, EventType } from "../constants";
import { IEvent, INorm, INormOfWeek } from "../types";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

export const customDateFormat = (value: Dayjs | Date, formatStr: string) => dayjs(value).format(formatStr);

export const convertType: Record<EventType, string> = {
  [EventType.TEACHING]: "info",
  [EventType.BUSY]: "error",
  [EventType.HOLIDAY]: "warning",
  [EventType.OTHER]: "success",
};

export const checkIsAllday = (startDate: Dayjs, endDate: Dayjs) => {
  return startDate.hour() === 0 && startDate.minute() === 0 && endDate.hour() === 23 && endDate.minute() === 59;
};

export const daysOfWeekKeys = Object.values(DaysOfWeek);

export const calculateNormOfWeek = (
  norms: INorm[],
  events: IEvent[],
  startOfWeek: Dayjs,
  endOfWeek: Dayjs
): INormOfWeek => {
  // Calculate number of events in the week
  const normOfWeek = events.filter((event) => {
    const eventDate = dayjs(event.startDate);
    return event.type === EventType.TEACHING && eventDate.isAfter(startOfWeek) && eventDate.isBefore(endOfWeek);
  }).length;

  // Find applicable norm for this week
  const applicableNorm = norms.find(
    (norm) => dayjs(endOfWeek).isAfter(norm.startDate) && dayjs(startOfWeek).isBefore(norm.endDate)
  );

  // Return the calculated norm and total
  return {
    normOfWeek,
    totalNorm: applicableNorm?.maxShift || 0,
  };
};
