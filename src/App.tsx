import { Card, Modal } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import AntdCalendar from "./";
import { IEvent, TypeEvent } from "./types";

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
  const eventTypes: TypeEvent[] = ["info", "success", "warning", "error"];

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
    };

    if (!isEventOverlap(newEvent, fakeEvents)) {
      fakeEvents.push(newEvent);
    }
  }

  return fakeEvents;
};

function App() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [detailEvents, setDetailEvents] = useState<IEvent[]>([]);
  const [detailDate, setDetailDate] = useState<Dayjs | null>(null);
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);

  useEffect(() => {
    setEvents(generateRandomEvents(20));
  }, []);

  const handleOpenDetail = (date: Dayjs, events: IEvent[]) => {
    setDetailDate(date);
    setDetailEvents(events);
    setIsOpenDetail(true);
  };

  return (
    <main
      style={{
        padding: "20px 100px",
      }}
    >
      <AntdCalendar events={events} handleOpenDetail={handleOpenDetail} />

      <Modal
        title={dayjs(detailDate ?? Date.now()).format("MMMM DD, YYYY")}
        open={isOpenDetail}
        onCancel={() => setIsOpenDetail(false)}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {detailEvents.map((event) => (
            <Card key={event.eventId} className={`event-${event.type}`} style={{ borderWidth: "0" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Event name:</div>
                <div>{event.title}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Time:</div>
                <div>
                  {dayjs(event.startTime).format("HH:mm")} - {dayjs(event.endTime).format("HH:mm")}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Event types:</div>
                <div>
                  {event.type === "info" && "Info"}
                  {event.type === "success" && "Success"}
                  {event.type === "warning" && "Warning"}
                  {event.type === "error" && "Error"}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Node:</div>
                <div>
                  {event.type === "info" && "Info"}
                  {event.type === "success" && "Success"}
                  {event.type === "warning" && "Warning"}
                  {event.type === "error" && "Error"}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Modal>
    </main>
  );
}

export default App;
