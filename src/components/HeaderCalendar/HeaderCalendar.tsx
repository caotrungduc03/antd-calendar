import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { CalendarMode } from "../../types";
import { customDateFormat } from "../../utils";

interface IHeaderCalendarProps {
  currentDate: Dayjs;
  setCurrentDate: Dispatch<SetStateAction<Dayjs>>;
  title?: string;
  showTeacherName?: boolean;
  calendarMode: CalendarMode;
  setCalendarMode: Dispatch<SetStateAction<CalendarMode>>;
}

const HeaderCalendar = ({
  currentDate,
  setCurrentDate,
  title,
  showTeacherName,
  calendarMode,
  setCalendarMode,
}: IHeaderCalendarProps) => {
  const handleChangeDate = (date: Dayjs) => {
    setCurrentDate(date);
  };

  const handleChangeMode = (mode: CalendarMode) => {
    setCalendarMode(mode);
    setCurrentDate(dayjs());
  };

  return (
    <div className="flex justify-between items-center py-4 border-b-0.25 border-solid border-gray-200">
      <div className="flex items-center">
        <Button
          type="text"
          size="large"
          icon={<LeftOutlined />}
          onClick={() => handleChangeDate(currentDate.subtract(1, calendarMode))}
        />
        <DatePicker
          picker={calendarMode}
          onChange={handleChangeDate}
          format={(value) => customDateFormat(value, "MMMM, YYYY")}
          value={currentDate}
          allowClear={false}
          suffixIcon={null}
          size={"large"}
        />
        <Button
          type="text"
          size="large"
          icon={<RightOutlined />}
          onClick={() => handleChangeDate(currentDate.add(1, calendarMode))}
        />
      </div>
      {showTeacherName && title && <div className="text-[18px] font-semibold text-colorText">{title}</div>}
      <div className="flex items-center gap-x-4">
        <Button type="default" size="large" onClick={() => handleChangeDate(dayjs())}>
          Today
        </Button>
        <div className="h-5 w-px bg-gray-200"></div>
        <Button
          type={calendarMode === "month" ? "primary" : "default"}
          size="large"
          onClick={() => handleChangeMode("month")}
        >
          Month
        </Button>
        <Button
          type={calendarMode === "week" ? "primary" : "default"}
          size="large"
          onClick={() => handleChangeMode("week")}
        >
          Week
        </Button>
      </div>
    </div>
  );
};

export default HeaderCalendar;
