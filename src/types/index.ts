import { DAYS_OF_WEEK } from "../constants";

// Types
export type EventType = "info" | "success" | "warning" | "error" | "default";

export type CalendarMode = "month" | "week";

export type DaysOfWeekKeys = keyof typeof DAYS_OF_WEEK;

// Interfaces
export interface IEvent {
  eventId: string;
  title: string;
  startTime: Date;
  endTime: Date;
  type: EventType;
  description?: string;
}

export type ITableColumn = {
  title: string | React.ReactNode;
  dataIndex: string;
  key: string;
  width?: number | string;
  render?: (value: any) => React.ReactNode;
};
