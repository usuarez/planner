import dayjs from "dayjs";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setActiveDay } from "../../../store/slices/toDoSlice";
import { buildWeek, weekDays } from "../helpers/buildWeek";

export interface IDay {
  dayName: string;
  monthDay: string;
  fullDate?: string;
}

export const LineCalendar = () => {
  const dispatch = useAppDispatch();
  const { planner, activeDay } = useAppSelector((st) => st.todo);
  const week: IDay[] = buildWeek();
  const [activeLineDay, setActiveLineDay] = useState<string>();
  const handleActiveLineDay = (day: string) => {
    dispatch(setActiveDay({ date: `${dayjs().format("YYYY-MM")}-${day}` }));
    setActiveLineDay(day);
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
                  onClick={() => handleActiveLineDay(day!.monthDay)}
                  className={`LineButton ${
                    activeLineDay === day!.monthDay ? "ActiveDay" : ""
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
