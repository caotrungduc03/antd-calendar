import { BookOutlined, CalendarOutlined, CheckCircleOutlined, StarOutlined } from "@ant-design/icons";
import clsx from "clsx";
import dayjs from "dayjs";
import {
  BORDER_WEEKLY_CELL,
  EventType,
  MIN_HEIGHT_EVENT,
  MIN_HEIGHT_HIDE_ALL,
  MIN_HEIGHT_HIDE_DETAILS,
  MINUTES_PER_HOUR,
  TIME_FORMAT,
} from "../../constants";
import { IEvent } from "../../types";
import { convertType, customDateFormat } from "../../utils";

interface IWeeklyEventProps {
  event: IEvent;
  onOpenDetail: (date: Date, events: IEvent[]) => void;
  onEventDetail?: (event: IEvent) => void;
  zIndex: number;
}

const calculateBoxSize = (startTime: Date, endTime: Date, isAllDay?: boolean) => {
  if (isAllDay) {
    return {
      top: 10,
      height: 50,
    };
  }

  const minutes = dayjs(startTime).minute();
  const diffMinutes = dayjs(endTime).diff(startTime, "minute", true);

  const top = Math.floor((minutes / MINUTES_PER_HOUR) * 100);
  const height = Math.floor((diffMinutes / MINUTES_PER_HOUR) * 100);
  const border = Math.floor(((top + height) / MINUTES_PER_HOUR) * BORDER_WEEKLY_CELL);

  return {
    top,
    height: height + border,
  };
};

const getIconEvent = {
  [EventType.TEACHING]: <BookOutlined />,
  [EventType.BUSY]: <CalendarOutlined />,
  [EventType.HOLIDAY]: <StarOutlined />,
  [EventType.OTHER]: <CheckCircleOutlined />,
} as const;

const WeeklyEvent = ({ event, onOpenDetail, onEventDetail, zIndex }: IWeeklyEventProps) => {
  const { top, height } = calculateBoxSize(event.startDate, event.endDate, event.isAllDay);

  const formattedDate =
    customDateFormat(event.startDate, TIME_FORMAT) + " - " + customDateFormat(event.endDate, TIME_FORMAT);

  return (
    <div
      className={`event-${convertType[event.type]}`}
      onClick={() => {
        onOpenDetail(dayjs(event.startDate).toDate(), [event]);
        onEventDetail && onEventDetail(event);
      }}
      style={{
        top: `${top}%`,
        height: `${Math.max(height, MIN_HEIGHT_EVENT)}%`,
        zIndex,
      }}
    >
      <div
        className={clsx("weekly-event", {
          "weekly-event--collapse": height <= MIN_HEIGHT_HIDE_ALL,
          "weekly-event--min-height": height <= MIN_HEIGHT_EVENT,
        })}
      >
        <div className="flex">{getIconEvent[event.type]}</div>
        <div
          className={clsx({
            "weekly-event--collapse": height <= MIN_HEIGHT_HIDE_DETAILS,
          })}
        >
          <div className="weekly-event__title">
            <div title={event.title}>{event.title}</div>
          </div>
          <div className="weekly-event__date">
            <div title={formattedDate}>{formattedDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyEvent;
