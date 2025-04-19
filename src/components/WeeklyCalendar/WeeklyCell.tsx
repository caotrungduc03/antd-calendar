import dayjs, { Dayjs } from "dayjs";
import { MouseEvent } from "react";
import { IEvent } from "../../types";
import WeeklyEvent from "./WeeklyEvent";

interface IWeeklyCellProps {
  events: IEvent[];
  date: Dayjs;
  handleOpenDetail: (date: Date, events: IEvent[]) => void;
  handleOpenCreate: (date: Date) => void;
}

const WeeklyCell = ({ events, date, handleOpenDetail, handleOpenCreate }: IWeeklyCellProps) => {
  const isToday = dayjs().isSame(date, "day");

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;

    handleOpenCreate(dayjs(date).toDate());
  };

  return (
    <div className={`h-[60px] w-full ${isToday ? "bg-info/10" : "bg-white"}`} onClick={handleClick}>
      {events.map((event, index) => (
        <WeeklyEvent key={index} event={event} handleOpenDetail={handleOpenDetail} />
      ))}
    </div>
  );
};

export default WeeklyCell;
