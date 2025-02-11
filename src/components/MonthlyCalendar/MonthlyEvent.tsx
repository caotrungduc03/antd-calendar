import dayjs from "dayjs";
import { IEvent } from "../../types";
import { convertType } from "../../utils";

interface IMonthlyEventProps {
  event: IEvent;
  isSameMonth: boolean;
}

const MonthlyEvent = ({ event, isSameMonth }: IMonthlyEventProps) => {
  return (
    <li
      className={`tw-px-2 tw-py-0.5 tw-rounded event-${convertType[event.type]} ${
        !isSameMonth ? "tw-bg-secondary tw-text-gray-2" : ""
      }`}
    >
      <div className="tw-text-[13px] tw-font-medium tw-line-clamp-1">{event.title}</div>
      <div className="tw-text-[13px] tw-font-normal">
        {dayjs(event.startTime).format("HH:mm")} - {dayjs(event.endTime).format("HH:mm")}
      </div>
    </li>
  );
};

export default MonthlyEvent;
