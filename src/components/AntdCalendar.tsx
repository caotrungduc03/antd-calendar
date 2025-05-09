import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { useEffectAfterMounted } from "../hooks/useEffectAfterMounted";
import { CalendarMode, IEvent, INorm } from "../types";
import "./AntdCalendar.css";
import HeaderCalendar from "./HeaderCalendar/HeaderCalendar";
import MonthlyCalendar from "./MonthlyCalendar/MonthlyCalendar";
import WeeklyCalendar from "./WeeklyCalendar/WeeklyCalendar";

interface IAntdCalendarProps {
  events: IEvent[];
  norms?: INorm[];
  teacherName?: string;
  showTeacherName?: boolean;
  showWeeklyNorm?: boolean;
  onOpenDetail: (date: Date, events: IEvent[]) => void;
  onOpenCreate: (date: Date) => void;
  onRefetchAPI?: (startDate: Date, endDate: Date) => Promise<void>;
  loading?: boolean;
}

const AntdCalendar = ({
  events,
  norms = [],
  teacherName,
  showTeacherName = true,
  showWeeklyNorm = true,
  onOpenDetail,
  onOpenCreate,
  onRefetchAPI,
  loading,
}: IAntdCalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [calendarMode, setCalendarMode] = useState<CalendarMode>("month");

  const startDate = useMemo(
    () => dayjs(currentDate).startOf(calendarMode).startOf("week").add(1, "day"),
    [currentDate, calendarMode]
  ); // add 1 day because start of week is Sunday

  const endDate = useMemo(
    () => dayjs(currentDate).endOf(calendarMode).endOf("week").add(1, "day"),
    [currentDate, calendarMode]
  ); // add 1 day because end of week is Saturday

  useEffectAfterMounted(() => {
    if (onRefetchAPI) {
      onRefetchAPI(startDate.toDate(), endDate.toDate());
    }
  }, [startDate, endDate, onRefetchAPI]);

  return (
    <div className="antd-calendar">
      <div className="flex flex-col gap-y-6 p-8 bg-white">
        <HeaderCalendar
          title={teacherName}
          showTeacherName={showTeacherName}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          calendarMode={calendarMode}
          setCalendarMode={setCalendarMode}
        />
        {calendarMode === "month" && (
          <MonthlyCalendar
            currentDate={currentDate}
            startDate={startDate}
            endDate={endDate}
            events={events}
            norms={norms}
            showWeeklyNorm={showWeeklyNorm}
            onOpenDetail={onOpenDetail}
            onOpenCreate={onOpenCreate}
            loading={loading}
          />
        )}
        {calendarMode === "week" && (
          <WeeklyCalendar
            startDate={startDate}
            endDate={endDate}
            events={events}
            norms={norms}
            showWeeklyNorm={showWeeklyNorm}
            onOpenDetail={onOpenDetail}
            onOpenCreate={onOpenCreate}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default AntdCalendar;
