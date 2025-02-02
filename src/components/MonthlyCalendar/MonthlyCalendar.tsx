import { Table } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { DAYS_OF_WEEK, START_OF_WEEK } from "../../constants";
import { DaysOfWeekKeys, IEvent, ITableColumn } from "../../types";
import MonthlyCell from "./MonthlyCell";

interface IMonthlyCalendarProps {
  startMonth: Dayjs;
  events: IEvent[];
  handleOpenDetail: (date: Dayjs, events: IEvent[]) => void;
}

interface IMonthlyCell {
  events: IEvent[];
  date: Dayjs;
}

type EventsByDay = Record<DaysOfWeekKeys, IMonthlyCell>;

const daysOfWeekKeys = Object.keys(DAYS_OF_WEEK) as DaysOfWeekKeys[];

const getEventsOfWeek = (events: IEvent[], targetDate: Dayjs): EventsByDay =>
  daysOfWeekKeys.reduce((acc: EventsByDay, day, index) => {
    acc[day] = {
      events: events.filter((event) => dayjs(event.startTime).isSame(targetDate.add(index, "day"), "date")),
      date: targetDate.add(index, "day"),
    };
    return acc;
  }, {} as EventsByDay);

const MonthlyCalendar = ({ startMonth, events, handleOpenDetail }: IMonthlyCalendarProps) => {
  const getTableColumns = () => {
    const weeklyNormColumn: ITableColumn = {
      title: <div className="tw-text-center tw-font-semibold tw-text-xs tw-w-[100px]">Weekly Norm</div>,
      dataIndex: "weeklyNorm",
      key: "weeklyNorm",
      width: 1,
      render: (value: string) => (
        <div className="tw-flex tw-flex-col tw-border-t-0.25 tw-border-solid tw-border-gray-4">
          <div className="tw-pt-2 tw-px-2">{value}</div>
        </div>
      ),
    };

    const dayColumns: ITableColumn[] = Object.keys(DAYS_OF_WEEK).map((day, index) => ({
      title: <div className="tw-text-center tw-font-semibold tw-text-xs">{day.slice(0, 3)}</div>,
      dataIndex: day,
      key: day,
      width: "14%",
      render: (value: IMonthlyCell) => (
        <MonthlyCell
          key={index}
          events={value.events}
          date={value.date}
          startMonth={startMonth}
          handleOpenDetail={handleOpenDetail}
        />
      ),
    }));

    return [weeklyNormColumn, ...dayColumns];
  };

  const getWeeksOfFullMonth = () => {
    const weeks: Dayjs[] = [];
    let targetDate = startMonth.clone();

    if (targetDate.format("dddd") !== START_OF_WEEK) {
      targetDate = dayjs(startMonth).startOf("week");
      weeks.push(targetDate);
      targetDate = targetDate.add(1, "week");
    }

    while (startMonth.isSame(targetDate, "month")) {
      weeks.push(targetDate);
      targetDate = targetDate.add(1, "week");
    }

    return weeks;
  };

  const getDataSource = () => {
    const weeks = getWeeksOfFullMonth();

    const data = weeks.map((week, index) => {
      const eventsOfWeek = getEventsOfWeek(events, week);

      let count = 0;
      Object.entries(eventsOfWeek).forEach(([_key, value]: [any, any]) => {
        if (Array.isArray(value.events) && value.events.length > 0) {
          count++;
        }
      });

      return {
        id: index,
        weeklyNorm: `${count}/7`,
        ...eventsOfWeek,
      };
    });

    return data;
  };

  return (
    <Table
      rowKey={(record) => record.id}
      columns={getTableColumns()}
      dataSource={getDataSource()}
      pagination={false}
      rowHoverable={false}
      className="monthly-calendar tw-overflow-hidden"
    />
  );
};

export default MonthlyCalendar;
