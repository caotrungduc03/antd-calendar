import React, { useEffect, useState } from "react";
import AntdCalendar from "./";
import { EventType } from "./constants";
import { IEvent, INorm } from "./types";

const fakeEvents: IEvent[] = [
  {
    id: "1739958920995-0-0",
    title: "Random Event 1",
    startDate: new Date("2025-02-03T22:03:20.994Z"),
    endDate: new Date("2025-02-04T01:03:20.994Z"),
    type: EventType.OTHER,
    description: "This is a random event",
  },
  {
    id: "1739958920995-1-0",
    title: "Random Event 2",
    startDate: new Date("2025-02-18T06:52:20.994Z"),
    endDate: new Date("2025-02-18T09:52:20.994Z"),
    type: EventType.OTHER,
    description: "This is a random event",
  },
  {
    id: "1739958920995-2-0",
    title: "Random Event 3",
    startDate: new Date("2025-02-07T11:18:20.994Z"),
    endDate: new Date("2025-02-07T14:18:20.994Z"),
    type: EventType.TEACHING,
    description: "This is a random event",
  },
  {
    id: "1739958920995-3-0",
    title: "Random Event 4",
    startDate: new Date("2025-02-19T14:17:20.994Z"),
    endDate: new Date("2025-02-19T16:17:20.994Z"),
    type: EventType.TEACHING,
    description: "This is a random event",
  },
  {
    id: "1739958920995-4-0",
    title: "Random Event 5",
    startDate: new Date("2025-01-21T01:00:20.994Z"),
    endDate: new Date("2025-01-21T04:00:20.994Z"),
    type: EventType.HOLIDAY,
    description: "This is a random event",
  },
  {
    id: "1739958920995-5-0",
    title: "Random Event 6",
    startDate: new Date("2025-02-02T11:45:20.994Z"),
    endDate: new Date("2025-02-02T14:45:20.994Z"),
    type: EventType.HOLIDAY,
    description: "This is a random event",
  },
  {
    id: "1739958920995-6-0",
    title: "Random Event 7",
    startDate: new Date("2025-03-11T01:54:20.994Z"),
    endDate: new Date("2025-03-11T04:54:20.994Z"),
    type: EventType.HOLIDAY,
    description: "This is a random event",
  },
  {
    id: "1739958920995-7-0",
    title: "Random Event 8",
    startDate: new Date("2025-02-17T23:12:20.994Z"),
    endDate: new Date("2025-02-18T01:12:20.994Z"),
    type: EventType.BUSY,
    description: "This is a random event",
  },
  {
    id: "1739958920995-8-0",
    title: "Random Event 9",
    startDate: new Date("2025-03-06T00:54:20.994Z"),
    endDate: new Date("2025-03-06T01:54:20.994Z"),
    type: EventType.BUSY,
    description: "This is a random event",
  },
  {
    id: "1739958920995-9-0",
    title: "Random Event 10",
    startDate: new Date("2025-01-22T01:23:20.994Z"),
    endDate: new Date("2025-01-22T04:23:20.994Z"),
    type: EventType.TEACHING,
    description: "This is a random event",
  },
  {
    id: "1739958920995-10-0",
    title: "Random Event 11",
    startDate: new Date("2025-03-08T21:39:20.994Z"),
    endDate: new Date("2025-03-09T00:39:20.994Z"),
    type: EventType.HOLIDAY,
    description: "This is a random event",
  },
  {
    id: "1739958920995-11-0",
    title: "Random Event 12",
    startDate: new Date("2025-02-26T00:23:20.994Z"),
    endDate: new Date("2025-02-26T02:23:20.994Z"),
    type: EventType.BUSY,
    description: "This is a random event",
  },
  {
    id: "1739958920996-12-0",
    title: "Random Event 13",
    startDate: new Date("2025-02-23T05:52:20.994Z"),
    endDate: new Date("2025-02-23T08:52:20.994Z"),
    type: EventType.BUSY,
    description: "This is a random event",
  },
  {
    id: "1739958920996-13-0",
    title: "Random Event 14",
    startDate: new Date("2025-01-28T13:09:20.994Z"),
    endDate: new Date("2025-01-28T16:09:20.994Z"),
    type: EventType.BUSY,
    description: "This is a random event",
  },
  {
    id: "1739958920996-14-0",
    title: "Random Event 15",
    startDate: new Date("2025-03-15T17:00:00.000Z"),
    endDate: new Date("2025-03-16T16:59:59.999Z"),
    type: EventType.HOLIDAY,
    description: "This is a random event",
  },
  {
    id: "1739958920996-15-0",
    title: "Random Event 16",
    startDate: new Date("2025-01-26T07:05:20.994Z"),
    endDate: new Date("2025-01-26T09:05:20.994Z"),
    type: EventType.BUSY,
    description: "This is a random event",
  },
  {
    id: "1739958920996-16-0",
    title: "Random Event 17",
    startDate: new Date("2025-01-29T16:52:20.994Z"),
    endDate: new Date("2025-01-29T19:52:20.994Z"),
    type: EventType.BUSY,
    description: "This is a random event",
  },
  {
    id: "1739958920996-18-1",
    title: "Random Event 18 - 1",
    startDate: new Date("2025-03-23T03:56:20.994Z"),
    endDate: new Date("2025-03-23T01:56:20.994Z"),
    type: EventType.TEACHING,
    description: "This is a random event",
  },
  {
    id: "1739958920996-18-2",
    title: "Random Event 18 - 2",
    startDate: new Date("2025-03-23T07:56:20.994Z"),
    endDate: new Date("2025-03-23T09:16:20.994Z"),
    type: EventType.TEACHING,
    description: "This is a random event",
  },
  {
    id: "1739958920996-18-3",
    title: "Random Event 18 - 3",
    startDate: new Date("2025-03-23T09:56:20.994Z"),
    endDate: new Date("2025-03-23T11:06:20.994Z"),
    type: EventType.TEACHING,
    description: "This is a random event",
  },
  {
    id: "1739958920996-18-4",
    title: "Random Event 18 - 4",
    startDate: new Date("2025-03-23T11:56:20.994Z"),
    endDate: new Date("2025-03-23T12:56:20.994Z"),
    type: EventType.TEACHING,
    description: "This is a random event",
  },
  {
    id: "1739958920996-18-5",
    title: "Random Event 18 - 5",
    startDate: new Date("2025-03-23T14:56:20.994Z"),
    endDate: new Date("2025-03-23T15:56:20.994Z"),
    type: EventType.TEACHING,
    description: "This is a random event",
  },
  {
    id: "1739958920996-18-6",
    title: "Random Event 18 - 6",
    startDate: new Date("2025-03-22T14:56:20.994Z"),
    endDate: new Date("2025-03-23T15:56:20.994Z"),
    type: EventType.TEACHING,
    description: "This is a random event",
  },
  {
    id: "1739958920996-18-7",
    title: "Random Event 18 - 7",
    startDate: new Date("2025-03-20T14:56:20.994Z"),
    endDate: new Date("2025-03-24T15:56:20.994Z"),
    type: EventType.TEACHING,
    description: "This is a random event",
  },
  {
    id: "1739958920996-18-8",
    title: "Random Event 18 - 8",
    startDate: new Date("2025-03-20T05:16:20.994Z"),
    endDate: new Date("2025-03-24T11:56:20.994Z"),
    type: EventType.BUSY,
    description: "This is a random event",
  },
  {
    id: "1739958920996-18-9",
    title: "Random Event 18 - 9",
    startDate: new Date("2025-03-20T05:56:20.994Z"),
    endDate: new Date("2025-03-20T18:00:00.000Z"),
    type: EventType.BUSY,
    description: "This is a random event",
  },
  {
    id: "1739958920996-18-10",
    title: "Random Event 18 - 10",
    startDate: new Date("2025-03-20T05:56:20.994Z"),
    endDate: new Date("2025-03-22T18:00:00.000Z"),
    type: EventType.BUSY,
    description: "This is a random event",
  },
  {
    id: "1739958920996-18-0",
    title: "Random Event 19",
    startDate: new Date("2025-01-26T03:33:20.994Z"),
    endDate: new Date("2025-01-26T06:33:20.994Z"),
    type: EventType.HOLIDAY,
    description: "This is a random event",
  },
  {
    id: "1739958920996-19-0",
    title: "Random Event 20",
    startDate: new Date("2025-02-20T16:54:20.994Z"),
    endDate: new Date("2025-02-20T18:54:20.994Z"),
    type: EventType.OTHER,
    description: "This is a random event",
  },
  {
    id: "1739958920996-19-0",
    title: "Random Event 20",
    startDate: new Date("2025-03-25T07:44:20.994Z"),
    endDate: new Date("2025-03-25T07:54:20.994Z"),
    type: EventType.OTHER,
    description: "This is a random event",
  },
];

const fakeWeeklyNorms = [
  {
    id: "1739958920996-0",
    startDate: new Date("2025-01-17T00:00:00.000Z"),
    endDate: new Date("2025-01-23T23:59:59.999Z"),
    maxShift: 2,
  },
  {
    id: "1739958920996-1",
    startDate: new Date("2025-01-24T00:00:00.000Z"),
    endDate: new Date("2025-02-09T23:59:59.999Z"),
    maxShift: 4,
  },
  {
    id: "1739958920996-2",
    startDate: new Date("2025-02-10T00:00:00.000Z"),
    endDate: new Date("2025-02-30T23:59:59.999Z"),
    maxShift: 2,
  },
];

function App() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [norms, setWeeklyNorms] = useState<INorm[]>([]);

  useEffect(() => {
    setEvents(fakeEvents);
    setWeeklyNorms(fakeWeeklyNorms);
  }, []);

  const onOpenDetail = (date: Date, events: IEvent[]) => {
    alert("Click handle open detail");
    console.log({ date, events });
  };

  const onOpenCreate = (date: Date) => {
    alert("Click handle open create");
    console.log({ date });
  };

  const handleFetchAPI = async (startDate: Date, endDate: Date) => {
    console.log({ startDate, endDate });
  };

  return (
    <main
      style={{
        padding: "20px 100px",
      }}
    >
      <AntdCalendar
        teacherName="Antd Calendar"
        events={events}
        norms={norms}
        onRefetchAPI={handleFetchAPI}
        onOpenDetail={onOpenDetail}
        onOpenCreate={onOpenCreate}
      />
    </main>
  );
}

export default App;
