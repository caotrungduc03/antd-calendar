import { DAYS_OF_WEEK, EVENT_TYPES } from "../constants";

// Types
export type CalendarMode = "month" | "week";

export type EventType = keyof typeof EVENT_TYPES;

export type DaysOfWeekKeys = keyof typeof DAYS_OF_WEEK;

// Interfaces
export interface IEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
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
