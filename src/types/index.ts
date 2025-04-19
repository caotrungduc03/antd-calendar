import { Dayjs } from "dayjs";
import { DaysOfWeek, EventType } from "../constants";

// Types
export type ButtonType = "button" | "submit" | "reset";

export type ButtonColor = "primary" | "default";

export type CalendarMode = "month" | "week";

export type EventsByDay = Record<DaysOfWeek, ICell>;

// Interfaces
export interface IEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  type: EventType;
  isRepeat: boolean;
  description?: string;
  classroomName?: string;
  classroomAddress?: string;
  meetingLink?: string;
  isAllDay?: boolean;
}

export interface ITableColumn {
  title: React.ReactNode;
  dataIndex: string;
  key: string;
  width?: number | string;
  minWidth?: number;
  render?: (value: any) => React.ReactNode;
}

export interface ICell {
  events: IEvent[];
  date: Dayjs;
}

export interface INorm {
  id: string;
  startDate: Date;
  endDate: Date;
  maxShift: number;
}

export interface INormOfWeek {
  normOfWeek: number;
  totalNorm: number;
}
