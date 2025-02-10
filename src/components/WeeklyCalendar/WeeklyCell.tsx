import dayjs, { Dayjs } from "dayjs";
import { MouseEvent } from "react";
import { IEvent } from "../../types";
import WeeklyEvent from "./WeeklyEvent";

interface IWeeklyCellProps {
  events: IEvent[];
  date: Dayjs;
  handleOpenDetail: (date: Dayjs, events: IEvent[]) => void;
  handleOpenCreate: (date: Dayjs) => void;
}

const WeeklyCell = ({ events, date, handleOpenDetail, handleOpenCreate }: IWeeklyCellProps) => {
  const isToday = dayjs().isSame(date, "day");

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;

    handleOpenCreate(dayjs(date));
  };

  return (
    <div className={`tw-h-[60px] tw-w-full ${isToday ? "tw-bg-info/10" : "tw-bg-white"}`} onClick={handleClick}>
      {events.map((event, index) => (
        <WeeklyEvent key={index} event={event} handleOpenDetail={handleOpenDetail} />
      ))}
    </div>
  );
};

export default WeeklyCell;
