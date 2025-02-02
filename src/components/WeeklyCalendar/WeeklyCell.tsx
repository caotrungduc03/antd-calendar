import dayjs, { Dayjs } from "dayjs";
import { IEvent } from "../../types";
import WeeklyEvent from "./WeeklyEvent";

interface IWeeklyCellProps {
  events: IEvent[];
  date: Dayjs;
  handleOpenDetail: (date: Dayjs, events: IEvent[]) => void;
}

const WeeklyCell = ({ events, date, handleOpenDetail }: IWeeklyCellProps) => {
  const isToday = dayjs().isSame(date, "day");

  return (
    <div className={`tw-h-[60px] tw-w-full ${isToday ? "tw-bg-info/10" : "tw-bg-white"}`}>
      {events.map((event, index) => (
        <WeeklyEvent key={index} event={event} handleOpenDetail={handleOpenDetail} />
      ))}
    </div>
  );
};

export default WeeklyCell;
