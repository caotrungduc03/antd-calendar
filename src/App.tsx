import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import AntdCalendar from "./";
import { EVENT_TYPES } from "./constants";
import { IEvent } from "./types";

const isEventOverlap = (newEvent: IEvent, existingEvents: IEvent[]): boolean => {
  return existingEvents.some((existingEvent) => {
    const newStart = dayjs(newEvent.startDate);
    const newEnd = dayjs(newEvent.endDate);
    const existingStart = dayjs(existingEvent.startDate);
    const existingEnd = dayjs(existingEvent.endDate);

    return newStart < existingEnd && newEnd > existingStart;
  });
};

const generateRandomEvents = (numberOfEvents: number): IEvent[] => {
  const fakeEvents: IEvent[] = [];
  const eventTypes = Object.values(EVENT_TYPES);

  for (let i = 0; i < numberOfEvents; i++) {
    const randomDaysOffset = Math.floor(Math.random() * 30) - 15; // Random offset between -15 and +15 days
    const randomDate = dayjs().add(randomDaysOffset, "day");

    const randomHourStart = Math.floor(Math.random() * 24);
    const randomMinuteStart = Math.floor(Math.random() * 60);
    const randomDurationHours = Math.floor(Math.random() * 4) + 1; // event duration between 1-4 hours

    const startDate = randomDate.set("hour", randomHourStart).set("minute", randomMinuteStart).toDate();
    const endDate = dayjs(startDate).add(randomDurationHours, "hour").toDate();

    const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

    const newEvent: IEvent = {
      id: `${Date.now()}-${i}`, // Unique id
      title: `Random Event ${i + 1}`,
      startDate,
      endDate,
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
