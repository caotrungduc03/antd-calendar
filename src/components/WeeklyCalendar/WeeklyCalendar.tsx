import { Table } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { DAYS_OF_WEEK, HOURS_PER_DAY } from "../../constants";
import { DaysOfWeekKeys, IEvent, ITableColumn } from "../../types";
import WeeklyCell from "./WeeklyCell";

interface IWeeklyCalendarProps {
  startWeek: Dayjs;
  events: IEvent[];
  handleOpenDetail: (date: Date, events: IEvent[]) => void;
  handleOpenCreate: (date: Date) => void;
}

interface IWeeklyCell {
  events: IEvent[];
  date: Dayjs;
}

type EventsByDay = Record<DaysOfWeekKeys, IWeeklyCell>;

const daysOfWeekKeys = Object.values(DAYS_OF_WEEK);

const getEventAllDay = (events: IEvent[], targetDate: Dayjs) =>
  daysOfWeekKeys.reduce((acc: EventsByDay, day, index) => {
    acc[day] = {
      events: events.filter(
        (event) =>
          dayjs(event.startDate).isSame(targetDate.add(index, "day").startOf("day"), "hour") &&
          dayjs(event.endDate).isSame(targetDate.add(index, "day").endOf("day"), "hour")
      ),
      date: targetDate.add(index, "day"),
    };
    return acc;
  }, {} as EventsByDay);

const getEventsOfDay = (events: IEvent[], targetHour: Dayjs) =>
  daysOfWeekKeys.reduce((acc: EventsByDay, day, index) => {
    acc[day] = {
      events: events.filter((event) => dayjs(event.startDate).isSame(targetHour.add(index, "day"), "hour")),
      date: targetHour.add(index, "day"),
    };
    return acc;
  }, {} as EventsByDay);

const WeeklyCalendar = ({ startWeek, events, handleOpenDetail, handleOpenCreate }: IWeeklyCalendarProps) => {
  const getTableColumns = () => {
    const hourColumn: ITableColumn = {
      title: (
        <div className="flex flex-col gap-y-0.5 w-[100px] text-center font-semibold text-sm">
          <div>Weekly Norm</div>
          <div>5/7</div>
        </div>
      ),
      dataIndex: "hour",
      key: "hour",
      width: 1,
      render: (value: string) => <div className="text-center text-xs">{value}</div>,
    };

    const dayColumns: ITableColumn[] = Object.values(DAYS_OF_WEEK).map((day, index) => ({
      title: (
        <div className="flex flex-col gap-y-0.5 text-center font-semibold text-sm">
          <div>{day.slice(0, 3)}</div>
          <div>{dayjs(startWeek).add(index, "day").format("DD/MM")}</div>
        </div>
      ),
      dataIndex: day,
      key: day,
      render: (value: IWeeklyCell) => (
        <WeeklyCell
          key={index}
          events={value.events}
          date={value.date}
          handleOpenDetail={handleOpenDetail}
          handleOpenCreate={handleOpenCreate}
        />
      ),
    }));

    return [hourColumn, ...dayColumns];
  };

  const getDataSource = () => {
    const data = [];
    // All day
    data.push({
      id: -1,
      hour: "All day",
      ...getEventAllDay(events, startWeek),
    });
    // Hour
    for (let i = 0; i < HOURS_PER_DAY; i++) {
      const targetHour = dayjs(startWeek).add(i, "hour");

      data.push({
        id: i,
        hour: targetHour.format("HH:mm"),
        ...getEventsOfDay(events, targetHour),
      });
    }

    return data;
  };

  return (
    <Table
      rowKey={(record) => record.id}
      columns={getTableColumns()}
      dataSource={getDataSource()}
      pagination={false}
      rowHoverable={false}
      className="weekly-calendar overflow-hidden"
    />
  );
};

export default WeeklyCalendar;
