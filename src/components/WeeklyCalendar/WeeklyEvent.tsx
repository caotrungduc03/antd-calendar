import dayjs from "dayjs";
import { MINUTES_PER_HOUR } from "../../constants";
import { IEvent } from "../../types";
import { convertType } from "../../utils";

interface IWeeklyEventProps {
  event: IEvent;
  handleOpenDetail: (date: Date, events: IEvent[]) => void;
}

const calculateBoxSize = (startTime: Date, endTime: Date) => {
  const minutes = dayjs(startTime).minute();
  const diffMinutes = dayjs(endTime).diff(dayjs(startTime), "minute", true);

  return {
    top: Math.floor((minutes / MINUTES_PER_HOUR) * 100),
    height: Math.floor((diffMinutes / MINUTES_PER_HOUR) * 100),
  };
};

const WeeklyEvent = ({ event, handleOpenDetail }: IWeeklyEventProps) => {
  const { top, height } = calculateBoxSize(event.startDate, event.endDate);
  return (
    <div
      className={`tw-absolute tw-z-10 top-[${top}%] tw-left-[5%] tw-w-[85%] tw-h-[${height}%] tw-border-l-2 tw-border-solid tw-rounded-sm tw-p-1 event-${
        convertType[event.type]
      } tw-cursor-pointer`}
      onClick={() => handleOpenDetail(dayjs(event.startDate).toDate(), [event])}
    >
      <div className={`tw-text-sm tw-font-normal tw-line-clamp-${Math.min(height / 100, 6)}`}>{event.title}</div>
      <div className="tw-text-sm tw-font-normal">
        {dayjs(event.startDate).format("HH:mm")} - {dayjs(event.endDate).format("HH:mm")}
      </div>
    </div>
  );
};

export default WeeklyEvent;
