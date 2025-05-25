import { Table } from "antd";
import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import { DaysOfWeek } from "../../constants";
import { EventsByDay, ICell, IEvent, INorm, INormOfWeek, ITableColumn } from "../../types";
import { calculateNormOfWeek, daysOfWeekKeys } from "../../utils";
import MonthlyCell from "./MonthlyCell";

interface IMonthlyCalendarProps {
  currentDate: Dayjs;
  startDate: Dayjs;
  endDate: Dayjs;
  events: IEvent[];
  norms: INorm[];
  showWeeklyNorm: boolean;
  onOpenDetail: (date: Date, events: IEvent[]) => void;
  onOpenCreate: (date: Date) => void;
  loading?: boolean;
  weeklyNormTitle?: string;
  monthTitles?: string[];
}

const getEventsOfWeek = (events: IEvent[], targetDate: Dayjs): EventsByDay =>
  daysOfWeekKeys.reduce((acc: EventsByDay, day, index) => {
    const currentDate = targetDate.add(index, "day");

    acc[day] = {
      events: events.filter((event) => dayjs(event.startDate).isSame(currentDate, "date")),
      date: currentDate,
    };
    return acc;
  }, {} as EventsByDay);

const MonthlyCalendar = ({
  currentDate,
  startDate,
  endDate,
  events,
  norms,
  showWeeklyNorm,
  onOpenDetail,
  onOpenCreate,
  loading,
  weeklyNormTitle,
  monthTitles,
}: IMonthlyCalendarProps) => {
  const getTableColumns = () => {
    const weeklyNormColumn: ITableColumn = {
      title: <div className="text-center font-semibold text-sm weekly-norm-title text-warning">{weeklyNormTitle}</div>,
      dataIndex: "norm",
      key: "norm",
      minWidth: 100,
      render: (value: INormOfWeek) => {
        const { normOfWeek, totalNorm } = value;
        return (
          <div className="weekly-norm-cell">
            <div
              className={clsx(
                "border-t-0.25 border-solid border-gray-200",
                normOfWeek > totalNorm ? "text-error" : "text-warning"
              )}
            >
              {`${normOfWeek}/${totalNorm}`}
            </div>
          </div>
        );
      },
    };

    const dayColumns: ITableColumn[] = Object.values(DaysOfWeek).map((day, index) => ({
      title: (
        <div className="text-center font-semibold text-sm">{monthTitles ? monthTitles[index] : day.slice(0, 3)}</div>
      ),
      dataIndex: day,
      key: day,
      width: "14%",
      render: (value: ICell) => (
        <MonthlyCell
          key={index}
          events={value.events}
          date={value.date}
          currentDate={currentDate}
          onOpenDetail={onOpenDetail}
          onOpenCreate={onOpenCreate}
        />
      ),
    }));

    return showWeeklyNorm ? [weeklyNormColumn, ...dayColumns] : dayColumns;
  };

  const getWeeksOfFullMonth = () => {
    const weeks: Dayjs[] = [];
    let targetDate = startDate.clone();

    while (targetDate.isBefore(endDate)) {
      weeks.push(targetDate);
      targetDate = targetDate.add(1, "week");
    }

    return weeks;
  };

  const getTableData = () => {
    const weeks = getWeeksOfFullMonth();

    const data = weeks.map((week, index) => {
      const eventsOfWeek = getEventsOfWeek(events, week);

      if (!showWeeklyNorm) {
        return {
          id: index,
          ...eventsOfWeek,
        };
      }

      return {
        id: index,
        norm: calculateNormOfWeek(norms, events, week, week.endOf("week")),
        ...eventsOfWeek,
      };
    });

    return data;
  };

  return (
    <Table
      rowKey={(record) => record.id}
      columns={getTableColumns()}
      dataSource={getTableData()}
      pagination={false}
      rowHoverable={false}
      className="monthly-calendar overflow-hidden"
      loading={loading}
    />
  );
};

export default MonthlyCalendar;
