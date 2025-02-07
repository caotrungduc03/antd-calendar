import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { IEvent, TypeCalendar } from "../types";
import "./AntdCalendar.css";
import HeaderCalendar from "./HeaderCalendar/HeaderCalendar";
import MonthlyCalendar from "./MonthlyCalendar/MonthlyCalendar";
import WeeklyCalendar from "./WeeklyCalendar/WeeklyCalendar";

interface IAntdCalendarProps {
  events: IEvent[];
  handleOpenDetail: (date: Dayjs, events: IEvent[]) => void;
}

const AntdCalendar = ({ events, handleOpenDetail }: IAntdCalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const startWeek = useMemo(() => dayjs(currentDate).startOf("week").add(1, "day"), [currentDate]); // add 1 day because start of week is Sunday
  const startMonth = useMemo(() => dayjs(currentDate).startOf("month"), [currentDate]);
  const [typeCalendar, setTypeCalendar] = useState<TypeCalendar>("month");

  return (
    <div className="antd-calendar">
      <div className="tw-flex tw-flex-col tw-gap-y-6 tw-mt-8 tw-px-8 tw-pb-8 tw-bg-white">
        <HeaderCalendar
          title="Cao Trung Đức"
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          typeCalendar={typeCalendar}
          setTypeCalendar={setTypeCalendar}
        />
        {typeCalendar === "month" && (
          <MonthlyCalendar startMonth={startMonth} events={events} handleOpenDetail={handleOpenDetail} />
        )}
        {typeCalendar === "week" && (
          <WeeklyCalendar startWeek={startWeek} events={events} handleOpenDetail={handleOpenDetail} />
        )}
      </div>
    </div>
  );
};

export default AntdCalendar;
