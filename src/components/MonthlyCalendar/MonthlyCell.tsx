import dayjs, { Dayjs } from "dayjs";
import { MouseEvent } from "react";
import { IEvent } from "../../types";
import MonthlyEvent from "./MonthlyEvent";

interface IMonthlyCellProps {
  events: IEvent[];
  date: Dayjs;
  currentDate: Dayjs;
  onOpenDetail: (date: Date, events: IEvent[]) => void;
  onOpenCreate: (date: Date) => void;
}

const MonthlyCell = ({ currentDate, events, date, onOpenDetail, onOpenCreate }: IMonthlyCellProps) => {
  const hasMore = events.length > 2;
  const isSameMonth = currentDate.isSame(date, "month");
  const isToday = dayjs().isSame(date, "day");

  const handleOpenCreateModal = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;

    onOpenCreate(dayjs(date).hour(dayjs().hour()).minute(dayjs().minute()).toDate());
  };

  return (
    <div
      className={`flex flex-col justify-between border-t-0.25 border-solid ${
        isToday ? "border-info !bg-info/10" : "border-gray-200"
      } ${isSameMonth ? "bg-white" : "bg-gray-50"}`}
      onClick={handleOpenCreateModal}
    >
      <div className={`pt-2 px-2 text-sm font-normal ${isSameMonth ? "text-black" : "text-gray-500"}`}>
        {date.format("DD")}
      </div>
      <ul className="flex flex-col gap-y-1 cursor-pointer" onClick={() => onOpenDetail(date.toDate(), events)}>
        {events.slice(0, 2).map((event, index) => (
          <MonthlyEvent key={index} event={event} isSameMonth={isSameMonth} />
        ))}
        {hasMore && (
          <div className={`text-[13px] font-medium ${isSameMonth ? "text-info" : "text-gray-500"}`}>
            +{Math.max(events.length - 2, 0)} More
          </div>
        )}
      </ul>
    </div>
  );
};

export default MonthlyCell;
