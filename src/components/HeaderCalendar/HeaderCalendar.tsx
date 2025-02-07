import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { Left, Right } from "../../icons";
import { CalendarMode } from "../../types";
import { customDateFormat } from "../../utils";
import Button from "../common/Button";
import AntdIcon from "../common/Icon";

interface IHeaderCalendarProps {
  currentDate: Dayjs;
  setCurrentDate: Dispatch<SetStateAction<Dayjs>>;
  title: string;
  calendarMode: CalendarMode;
  setCalendarMode: Dispatch<SetStateAction<CalendarMode>>;
}

const HeaderCalendar = ({
  currentDate,
  setCurrentDate,
  title,
  calendarMode,
  setCalendarMode,
}: IHeaderCalendarProps) => {
  const handleChangeDate = (date: Dayjs) => {
    setCurrentDate(date);
  };

  return (
    <div className="tw-flex tw-justify-between tw-items-center tw-py-4 tw-border-b-0.25 tw-border-solid tw-border-[#F1F1F4]">
      <div className="tw-flex tw-items-center tw-gap-x-4">
        <AntdIcon icon={<Left />} onClick={() => handleChangeDate(currentDate.subtract(1, calendarMode))} />
        <DatePicker
          picker={calendarMode}
          onChange={handleChangeDate}
          format={customDateFormat}
          value={currentDate}
          allowClear={false}
          suffixIcon={null}
          className="tw-p-0 tw-border-none focus-within:tw-border-none focus-within:tw-shadow-none tw-text-lg tw-font-semibold"
          size={"large"}
        />
        <AntdIcon icon={<Right />} onClick={() => handleChangeDate(currentDate.add(1, calendarMode))} />
      </div>
      <div className="tw-text-[18px] tw-font-semibold tw-text-black">{title}</div>
      <div className="tw-flex tw-items-center tw-gap-x-4">
        <Button onClick={() => handleChangeDate(dayjs())}>Today</Button>
        <div className="tw-h-8 tw-border-0.25 tw-border-solid tw-border-input"></div>
        <Button color={calendarMode === "month" ? "primary" : "default"} onClick={() => setCalendarMode("month")}>
          Month
        </Button>
        <Button color={calendarMode === "week" ? "primary" : "default"} onClick={() => setCalendarMode("week")}>
          Week
        </Button>
      </div>
    </div>
  );
};

export default HeaderCalendar;
