import dayjs, { Dayjs } from "dayjs";
import { EVENT_TYPES } from "../constants";
import { EventType } from "../types";
export const customDateFormat = (value: Dayjs) => dayjs(value).format("MMMM, YYYY");

export const convertType: Record<EventType, string> = {
  [EVENT_TYPES.TEACHING_MODE]: "info",
  [EVENT_TYPES.TEACHER_SCHEDULE_BUSY]: "warning",
  [EVENT_TYPES.TEACHER_SCHEDULE_TIME_OFF]: "error",
  [EVENT_TYPES.TEACHER_OTHER]: "success",
};
