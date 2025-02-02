import { Dayjs } from "dayjs";
import AntdCalendar from "./";
import { IEvent } from "./types";

function App() {
  const handleOpenDetail = (date: Dayjs, events: IEvent[]) => {
    console.log(date, events);
  };

  return <AntdCalendar events={[]} handleOpenDetail={handleOpenDetail} />;
}

export default App;
