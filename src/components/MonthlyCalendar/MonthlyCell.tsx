import dayjs, { Dayjs } from "dayjs";
import { MouseEvent } from "react";
import { IEvent } from "../../types";
import MonthlyEvent from "./MonthlyEvent";

interface IMonthlyCellProps {
  events: IEvent[];
  date: Dayjs;
  startMonth: Dayjs;
  handleOpenDetail: (date: Date, events: IEvent[]) => void;
  handleOpenCreate: (date: Date) => void;
}

const MonthlyCell = ({ startMonth, events, date, handleOpenDetail, handleOpenCreate }: IMonthlyCellProps) => {
  const hasMore = events.length > 2;
  const isSameMonth = startMonth.isSame(date, "month");
  const isToday = dayjs().isSame(date, "day");

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;

    handleOpenCreate(dayjs(date).startOf("day").add(dayjs().hour(), "hour").toDate());
  };

  return (
    <div
      className={`flex flex-col justify-between border-t-0.25 border-solid ${
        isToday ? "border-info !bg-info/10" : "border-gray-200"
      } ${isSameMonth ? "bg-white" : "bg-gray-50 rounded"}`}
      onClick={handleClick}
    >
      <div className={`pt-2 px-2 text-sm font-normal ${isSameMonth ? "text-black" : "text-gray-500"} line-clamp-1`}>
        {date.format("DD")}
      </div>
      <ul className="flex flex-col gap-y-1 cursor-pointer" onClick={() => handleOpenDetail(date.toDate(), events)}>
        {events.slice(0, 2).map((event, index) => (
          <MonthlyEvent key={index} event={event} isSameMonth={isSameMonth} />
        ))}
        {hasMore && (
          <li className="text-[13px] font-medium text-info cursor-pointer">+{Math.max(events.length - 2, 0)} More</li>
        )}
      </ul>
    </div>
  );
};

export default MonthlyCell;
