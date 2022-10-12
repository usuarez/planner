import dayjs from "dayjs";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { buildWeek, weekDays } from "../helpers/buildWeek";

export interface IDay {
  dayName: string;
  monthDay: string;
  fullDate?: string;
}

export const LineCalendar = () => {
  const week: IDay[] = buildWeek();
  const [activeDay, setActiveDay] = useState<string>();
  const handleActiveDay = (day: string) => {
    setActiveDay(day);
  };
  return (
    <>
      <h3 className="text-center">
        {dayjs().format("MMMM")} {dayjs().format("YYYY")}
      </h3>
      <div className="LineCalendar">
        {week.length > 0 &&
          weekDays.map((wd, idx) => {
            const day = week.find((d) => wd === d.dayName);
            return (
              <div className="LineDay" key={idx}>
                <span
                  className={`${
                    day?.fullDate === dayjs().format("YYYY-MM-DD")
                      ? "isTodayText"
                      : ""
                  }`}
                >
                  {wd}
                </span>
                <Button
                  onClick={() => handleActiveDay(day!.monthDay)}
                  className={`LineButton ${
                    activeDay === day!.monthDay ? "ActiveDay" : ""
                  }
                  ${
                    day?.fullDate === dayjs().format("YYYY-MM-DD")
                      ? "isToday"
                      : ""
                  }`}
                >
                  {day!.monthDay}
                </Button>
              </div>
            );
          })}
      </div>
    </>
  );
};
