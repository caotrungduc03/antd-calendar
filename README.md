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
      eventId: "1738514496343-0",
      title: "Random Event 1",
      startTime: new Date("2025-01-24T11:20:36.343Z"),
      endTime: new Date("2025-01-24T15:20:36.343Z"),
      type: "info",
    },
    {
      eventId: "1738514496343-1",
      title: "Random Event 2",
      startTime: new Date("2025-01-25T02:48:36.343Z"),
      endTime: new Date("2025-01-25T06:48:36.343Z"),
      type: "info",
    },
    {
      eventId: "1738514496343-2",
      title: "Random Event 3",
      startTime: new Date("2025-01-17T19:57:36.343Z"),
      endTime: new Date("2025-01-17T21:57:36.343Z"),
      type: "warning",
    },
  ] as IEvent[];

  const handleOpenDetail = (date: Dayjs, events: IEvent[]) => {
    console.log("Click handle open detail");
    console.log({
      date: date.format("YYYY-MM-DD HH:mm:ss"),
      events,
    });
  };

  const handleOpenCreate = (date: Dayjs) => {
    console.log("Click handle open create");
    console.log({
      date: date.format("YYYY-MM-DD HH:mm:ss"),
    });
  };

  return <AntdCalendar events={events} handleOpenDetail={handleOpenDetail} handleOpenCreate={handleOpenCreate} />;
}

export default App;
```
