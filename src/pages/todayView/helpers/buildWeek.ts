import dayjs from "dayjs";
import { IDay } from "../components/LineCalendar";

export const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const buildWeek = () => {
  let thisWeek: IDay[] = [];
  //The day of the week, with Sunday as 0
  const weekDay = dayjs().format("d");
  for (let day = Number(weekDay); day >= 0; day--) {
    const dayValue = dayjs().subtract(Number(weekDay) - day, "day");
    const dayName = dayValue.format("ddd");
    const monthDay = dayValue.format("D");
    const fullDate = dayValue.format("YYYY-MM-DD");

    thisWeek.push({
      dayName,
      monthDay,
      fullDate,
    });
  }
  for (let day = Number(weekDay); day <= 6; day++) {
    const dayValue = dayjs().add(day - Number(weekDay), "day");
    const fullDate = dayValue.format("YYYY-MM-DD");
    const dayName = dayValue.format("ddd");
    const monthDay = dayValue.format("D");
    thisWeek.push({
      dayName,
      monthDay,
      fullDate,
    });
  }
  //clear the result

  let result: IDay[] = [];
  weekDays.forEach((day: string) => {
    const dayToAdd: IDay | undefined = thisWeek.find((d) => d.dayName === day);

    if (!!dayToAdd) {
      result.push(dayToAdd);
    }
  });
  return result;
};
