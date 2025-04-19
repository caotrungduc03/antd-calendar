import dayjs from "dayjs";
import { IEvent } from "../../types";
import { convertType } from "../../utils";

interface IMonthlyEventProps {
  event: IEvent;
  isSameMonth: boolean;
}

const MonthlyEvent = ({ event, isSameMonth }: IMonthlyEventProps) => {
  return (
    <li className={`px-2 py-0.5 rounded event-${isSameMonth ? convertType[event.type] : "default"}`}>
      <div className="text-[13px] font-medium line-clamp-1">{event.title}</div>
      <div className="text-[13px] font-normal">
        {dayjs(event.startDate).format("HH:mm")} - {dayjs(event.endDate).format("HH:mm")}
      </div>
    </li>
  );
};

export default MonthlyEvent;
