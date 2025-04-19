import dayjs, { Dayjs } from "dayjs";
import { MouseEvent, useMemo } from "react";
import { EventType } from "../../constants";
import { IEvent } from "../../types";
import WeeklyEvent from "./WeeklyEvent";

interface IWeeklyCellProps {
  events: IEvent[];
  date: Dayjs;
  onOpenDetail: (date: Date, events: IEvent[]) => void;
  onOpenCreate: (date: Date) => void;
  onEventDetail?: (event: IEvent) => void;
}

const WeeklyCell = ({ events, date, onOpenDetail, onOpenCreate, onEventDetail }: IWeeklyCellProps) => {
  const isToday = dayjs().isSame(date, "day");

  const handleOpenCreateModal = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;

    onOpenCreate(dayjs(date).toDate());
  };

  events.sort((a, b) => (a.type === EventType.BUSY && b.type !== EventType.BUSY ? 1 : -1));

  const renderWeeklyEvent = useMemo(() => {
    return events.map((event, index) => (
      <WeeklyEvent
        key={index}
        event={event}
        onOpenDetail={onOpenDetail}
        onEventDetail={onEventDetail}
        zIndex={index + 1}
      />
    ));
  }, [events]);

  return (
    <div className={`weekly-calendar__cell ${isToday ? "bg-info/10" : "bg-white"}`} onClick={handleOpenCreateModal}>
      {renderWeeklyEvent}
    </div>
  );
};

export default WeeklyCell;
