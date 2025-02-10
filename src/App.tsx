import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import AntdCalendar from "./";
import { EventType, IEvent } from "./types";

const isEventOverlap = (newEvent: IEvent, existingEvents: IEvent[]): boolean => {
  return existingEvents.some((existingEvent) => {
    const newStart = dayjs(newEvent.startTime);
    const newEnd = dayjs(newEvent.endTime);
    const existingStart = dayjs(existingEvent.startTime);
    const existingEnd = dayjs(existingEvent.endTime);

    return newStart < existingEnd && newEnd > existingStart;
  });
};

const generateRandomEvents = (numberOfEvents: number): IEvent[] => {
  const fakeEvents: IEvent[] = [];
  const eventTypes: EventType[] = ["info", "success", "warning", "error"];

  for (let i = 0; i < numberOfEvents; i++) {
    const randomDaysOffset = Math.floor(Math.random() * 30) - 15; // Random offset between -15 and +15 days
    const randomDate = dayjs().add(randomDaysOffset, "day");

    const randomHourStart = Math.floor(Math.random() * 24);
    const randomMinuteStart = Math.floor(Math.random() * 60);
    const randomDurationHours = Math.floor(Math.random() * 4) + 1; // event duration between 1-4 hours

    const startTime = randomDate.set("hour", randomHourStart).set("minute", randomMinuteStart).toDate();
    const endTime = dayjs(startTime).add(randomDurationHours, "hour").toDate();

    const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

    const newEvent: IEvent = {
      eventId: `${Date.now()}-${i}`, // Unique id
      title: `Random Event ${i + 1}`,
      startTime,
      endTime,
      type: randomType,
      description: "This is a random event",
    };

    if (!isEventOverlap(newEvent, fakeEvents)) {
      fakeEvents.push(newEvent);
    }
  }

  return fakeEvents;
};

function App() {
  const [events, setEvents] = useState<IEvent[]>([]);
  useEffect(() => {
    setEvents(generateRandomEvents(20));
  }, []);

  const handleOpenDetail = (date: Date, events: IEvent[]) => {
    console.log("Click handle open detail");
    console.log({ date, events });
  };

  const handleOpenCreate = (date: Date) => {
    console.log("Click handle open create");
    console.log({ date });
  };

  return (
    <main
      style={{
        padding: "20px 100px",
      }}
    >
      <AntdCalendar events={events} handleOpenDetail={handleOpenDetail} handleOpenCreate={handleOpenCreate} />
    </main>
  );
}

export default App;
