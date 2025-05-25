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
  weeklyNormTitle?: string;
  monthTitles?: string[];
  weekTitles?: string[];
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
  weeklyNormTitle = "Weekly Norms",
  monthTitles,
  weekTitles,
}: IAntdCalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [calendarMode, setCalendarMode] = useState<CalendarMode>("month");

  const startDate = useMemo(
    () => dayjs(currentDate).startOf(calendarMode).startOf("week"),
    [currentDate, calendarMode]
  );

  const endDate = useMemo(() => dayjs(currentDate).endOf(calendarMode).endOf("week"), [currentDate, calendarMode]);

  useEffectAfterMounted(() => {
    if (onRefetchAPI) {
      onRefetchAPI(startDate.toDate(), endDate.toDate());
    }
  }, [startDate, endDate, onRefetchAPI]);

  return (
    <div className="antd-calendar">
      <div className="flex flex-col gap-y-6 bg-white">
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
            weeklyNormTitle={weeklyNormTitle}
            monthTitles={monthTitles}
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
            weeklyNormTitle={weeklyNormTitle}
            weekTitles={weekTitles}
          />
        )}
      </div>
    </div>
  );
};

export default AntdCalendar;
