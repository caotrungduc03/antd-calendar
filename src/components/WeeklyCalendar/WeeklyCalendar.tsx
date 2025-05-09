import { Table } from "antd";
import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import React from "react";
import { DaysOfWeek, HOURS_PER_DAY } from "../../constants";
import { EventsByDay, ICell, IEvent, INorm, ITableColumn } from "../../types";
import { calculateNormOfWeek, checkIsAllday, daysOfWeekKeys } from "../../utils";
import WeeklyCell from "./WeeklyCell";

dayjs.extend(isBetween);

interface IWeeklyCalendarProps {
  startDate: Dayjs;
  endDate: Dayjs;
  events: IEvent[];
  norms: INorm[];
  showWeeklyNorm: boolean;
  onOpenDetail: (date: Date, events: IEvent[]) => void;
  onOpenCreate: (date: Date) => void;
  onEventDetail?: (event: IEvent) => void;
  loading?: boolean;
}

const getEventAllDay = (events: IEvent[], targetDate: Dayjs) =>
  daysOfWeekKeys.reduce((acc: EventsByDay, day, index) => {
    const currentDate = targetDate.add(index, "day");

    acc[day] = {
      events: events.reduce((filteredEvents: IEvent[], event) => {
        if (
          dayjs(event.startDate).isSame(currentDate.startOf("day")) &&
          checkIsAllday(dayjs(event.startDate), dayjs(event.endDate))
        ) {
          filteredEvents.push({
            ...event,
            isAllDay: true,
          });
        }

        return filteredEvents;
      }, []),
      date: currentDate,
    };
    return acc;
  }, {} as EventsByDay);

const getEventsOfDay = (events: IEvent[], targetHour: Dayjs) =>
  daysOfWeekKeys.reduce((acc: EventsByDay, day, index) => {
    const currentDate = targetHour.add(index, "day");

    acc[day] = {
      events: events.filter(
        (event) =>
          dayjs(event.startDate).isSame(currentDate, "hour") &&
          !checkIsAllday(dayjs(event.startDate), dayjs(event.endDate))
      ),
      date: currentDate,
    };
    return acc;
  }, {} as EventsByDay);

const WeeklyCalendar = ({
  startDate,
  endDate,
  events,
  norms,
  showWeeklyNorm,
  onOpenDetail,
  onOpenCreate,
  onEventDetail,
  loading,
}: IWeeklyCalendarProps) => {
  const getTableColumns = () => {
    const { normOfWeek, totalNorm } = calculateNormOfWeek(norms, events, startDate, endDate);
    const hourColumn: ITableColumn = {
      title: (
        <div className="weekly-calendar__title">
          {showWeeklyNorm && (
            <React.Fragment>
              <div>Weekly Norm</div>
              <div className={clsx(normOfWeek > totalNorm && "!text-error")}>{`${normOfWeek}/${totalNorm}`}</div>
            </React.Fragment>
          )}
        </div>
      ),
      dataIndex: "hour",
      key: "hour",
      width: 1,
      render: (value: string) => <div>{value}</div>,
    };

    const dayColumns: ITableColumn[] = Object.values(DaysOfWeek).map((day, index) => ({
      title: (
        <div className="weekly-calendar__title">
          <div>{day.slice(0, 3)}</div>
          <div>{dayjs(startDate).add(index, "day").format("DD/MM")}</div>
        </div>
      ),
      dataIndex: day,
      key: day,
      render: (value: ICell) => (
        <WeeklyCell
          key={index}
          events={value.events}
          date={value.date}
          onOpenDetail={onOpenDetail}
          onOpenCreate={onOpenCreate}
          onEventDetail={onEventDetail}
        />
      ),
    }));

    return [hourColumn, ...dayColumns];
  };

  const getTableData = () => {
    const data = [];
    // All day
    data.push({
      id: -1,
      hour: "All day",
      ...getEventAllDay(events, startDate),
    });
    // Hour
    for (let i = 0; i < HOURS_PER_DAY; i++) {
      const targetHour = dayjs(startDate).add(i, "hour");

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
      dataSource={getTableData()}
      pagination={false}
      rowHoverable={false}
      className="weekly-calendar"
      loading={loading}
    />
  );
};

export default WeeklyCalendar;
