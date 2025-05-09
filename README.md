# Antd Calendar

> 📅 **Antd Calendar** inspired by Ant Design, with weekly and monthly views.

## Installation

```bash
npm install antd-calendar
```

```bash
yarn add antd-calendar
```

## Usage

```tsx
import AntdCalendar from "antd-calendar";
import { IEvent } from "antd-calendar/dist/types";

function App() {
  const events = [
    {
      id: "1738514496343-0",
      title: "Event 1",
      startDate: new Date("2025-01-24T11:20:36.343Z"),
      endDate: new Date("2025-01-24T15:20:36.343Z"),
      type: "TEACHER_OTHER",
      description: "Description of Event 1",
    },
    {
      id: "1738514496343-1",
      title: "Event 2",
      startDate: new Date("2025-01-25T02:48:36.343Z"),
      endDate: new Date("2025-01-25T06:48:36.343Z"),
      type: "TEACHER_OTHER",
    },
    {
      id: "1738514496343-2",
      title: "Event 3",
      startDate: new Date("2025-01-17T19:57:36.343Z"),
      endDate: new Date("2025-01-17T21:57:36.343Z"),
      type: "TEACHER_SCHEDULE_BUSY",
    },
  ] as IEvent[];

  const onOpenDetail = (date: Date, events: IEvent[]) => {
    console.log("Click handle open detail");
    console.log({ date, events });
  };

  const onOpenCreate = (date: Date) => {
    console.log("Click handle open create");
    console.log({ date });
  };

  return <AntdCalendar events={events} onOpenDetail={onOpenDetail} onOpenCreate={onOpenCreate} />;
}

export default App;
```
