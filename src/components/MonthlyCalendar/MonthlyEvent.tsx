import { TIME_FORMAT } from "../../constants";
import { IEvent } from "../../types";
import { convertType, customDateFormat } from "../../utils";

interface IMonthlyEventProps {
  event: IEvent;
  isSameMonth: boolean;
}

const MonthlyEvent = ({ event, isSameMonth }: IMonthlyEventProps) => {
  const formattedDate =
    customDateFormat(event.startDate, TIME_FORMAT) + " - " + customDateFormat(event.endDate, TIME_FORMAT);

  return (
    <li className={`px-2 py-0.5 rounded event-${isSameMonth ? convertType[event.type] : "default"}`}>
      <div className="text-[13px] font-medium line-clamp-1">{event.title}</div>
      <div className="text-[13px] font-normal line-clamp-1">{formattedDate}</div>
    </li>
  );
};

export default MonthlyEvent;
