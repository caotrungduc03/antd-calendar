import dayjs, { Dayjs } from "dayjs";
import { DaysOfWeek, EventType } from "../constants";
import { IEvent, INorm, INormOfWeek } from "../types";

export const customDateFormat = (value: Dayjs | Date, formatStr: string) => dayjs(value).format(formatStr);

export const convertType: Record<EventType, string> = {
  [EventType.TEACHING]: "info",
  [EventType.BUSY]: "warning",
  [EventType.HOLIDAY]: "error",
  [EventType.OTHER]: "success",
};

export const splitEventsIntoDays = (events: IEvent[]): IEvent[] => {
  const result: IEvent[] = [];

  events.forEach((event) => {
    const start = dayjs(event.startDate);
    const end = dayjs(event.endDate);
    const diffDays = end.diff(start, "day");

    if (diffDays === 0) {
      result.push(event);
    } else {
      // Split the event into multiple day events
      for (let i = 0; i <= diffDays; i++) {
        const currentDate = start.add(i, "day");

        const newEvent: IEvent = {
          ...event,
          id: `${event.id}-${i}`,
          startDate: i === 0 ? event.startDate : new Date(currentDate.format("YYYY-MM-DD 00:00:00")),
          endDate: i === diffDays ? event.endDate : new Date(currentDate.format("YYYY-MM-DD 23:59:59")),
        };

        result.push(newEvent);
      }
    }
  });

  return result;
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
    return eventDate.isAfter(startOfWeek) && eventDate.isBefore(endOfWeek);
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
