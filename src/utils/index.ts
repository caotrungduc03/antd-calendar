import dayjs, { Dayjs } from "dayjs";

export const customDateFormat = (value: Dayjs) => dayjs(value).format("MMMM, YYYY");
