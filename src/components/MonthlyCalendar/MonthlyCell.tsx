import dayjs, { Dayjs } from "dayjs";
import { MouseEvent } from "react";
import { IEvent } from "../../types";
import MonthlyEvent from "./MonthlyEvent";

interface IMonthlyCellProps {
  events: IEvent[];
  date: Dayjs;
  startMonth: Dayjs;
  handleOpenDetail: (date: Dayjs, events: IEvent[]) => void;
  handleOpenCreate: (date: Dayjs) => void;
}

const MonthlyCell = ({ startMonth, events, date, handleOpenDetail, handleOpenCreate }: IMonthlyCellProps) => {
  const hasMore = events.length > 2;
  const isSameMonth = startMonth.isSame(date, "month");
  const isToday = dayjs().isSame(date, "day");

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;

    handleOpenCreate(dayjs(date).startOf("day").add(dayjs().hour(), "hour"));
  };

  return (
    <div
      className={`tw-flex tw-flex-col tw-justify-between tw-border-t-0.25 tw-border-solid ${
        isToday ? "tw-border-info" : "tw-border-gray-4"
      } ${isSameMonth ? "tw-bg-white" : "tw-bg-button tw-rounded"}`}
      onClick={handleClick}
    >
      <div
        className={`tw-pt-2 tw-px-2 tw-text-sm tw-font-normal ${
          isSameMonth ? "tw-text-black" : "tw-text-[#8e94a0]"
        } tw-line-clamp-1`}
      >
        {date.format("DD")}
      </div>
      <ul className="tw-flex tw-flex-col tw-gap-y-1 tw-cursor-pointer" onClick={() => handleOpenDetail(date, events)}>
        {events.slice(0, 2).map((event, index) => (
          <MonthlyEvent key={index} event={event} isSameMonth={isSameMonth} />
        ))}
        {hasMore && (
          <li className="tw-text-[13px] tw-font-medium tw-text-info tw-cursor-pointer">
            +{Math.max(events.length - 2, 0)} More
          </li>
        )}
      </ul>
    </div>
  );
};

export default MonthlyCell;
