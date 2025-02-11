import dayjs from "dayjs";
import { IEvent } from "../../types";
import { convertType } from "../../utils";

interface IMonthlyEventProps {
  event: IEvent;
  isSameMonth: boolean;
}

const MonthlyEvent = ({ event, isSameMonth }: IMonthlyEventProps) => {
  return (
    <li className={`tw-px-2 tw-py-0.5 tw-rounded event-${isSameMonth ? convertType[event.type] : "default"}`}>
      <div className="tw-text-[13px] tw-font-medium tw-line-clamp-1">{event.title}</div>
      <div className="tw-text-[13px] tw-font-normal">
        {dayjs(event.startDate).format("HH:mm")} - {dayjs(event.endDate).format("HH:mm")}
      </div>
    </li>
  );
};

export default MonthlyEvent;
