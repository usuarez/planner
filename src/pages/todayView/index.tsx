import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { LineCalendar } from "./components/LineCalendar";
import { ChevronDown } from "react-bootstrap-icons";
import { Calendar } from "primereact/calendar";
import { Button, Col, Row } from "react-bootstrap";
import { ActiveTasks } from "./components/ActiveTasks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setActiveDay } from "../../store/slices/toDoSlice";

export const TodayView = () => {
  const dispatch = useAppDispatch();
  const { planner } = useAppSelector((st) => st.todo);
  const [date, setDate] = useState<Date[] | Date>(new Date());
  const [toggleCalendar, setToggleCalendar] = useState(false);
  const [isATMinified, setIsATMinified] = useState(true);
  const [isDesk, setisDesk] = useState(false);

  const handleActiveDay = (e: any) => {
    console.log(dayjs(e.value).format("YYYY-MM-DD"));
    dispatch(setActiveDay({ date: dayjs(e.value).format("YYYY-MM-DD") }));
  };

  useEffect(() => {
    setToggleCalendar((b) => isATMinified);
  }, [isATMinified]);

  useEffect(() => {
    if (!!window && window.innerWidth > 768) setisDesk(true);
    else setisDesk(false);

    const monthlyTasks = Object.keys(planner).map((t) => dayjs(t).toDate());
    setDate(monthlyTasks);
  }, []);

  const dateTemplate = (SelectedDateInCalendar: any) => {
    if (
      Object.keys(planner)
        .map((d) => Number(dayjs(d).format("DD")))
        .includes(SelectedDateInCalendar.day) &&
      SelectedDateInCalendar.month === Number(dayjs().format("MM")) - 1
    ) {
      return <div className="CalendarCircle">{SelectedDateInCalendar.day}</div>;
    } else {
      return SelectedDateInCalendar.day;
    }
  };

  return (
    <div className="TodayView">
      <Row>
        <Col xs={12} md={6} lg={4}>
          {!toggleCalendar && !isDesk ? (
            <LineCalendar />
          ) : (
            <Calendar
              inline
              value={date}
              onSelect={handleActiveDay}
              dateTemplate={dateTemplate}
              className="todayViewCalendar"
              onChange={(e) => setDate(e.value as Date)}
            ></Calendar>
          )}
          {!isDesk && (
            <div className="d-flex justify-content-center">
              <Button
                onClick={() => {
                  setToggleCalendar((b) => !b);
                  setIsATMinified((b) => !toggleCalendar);
                }}
                className={`calendarExpand ${toggleCalendar ? "up" : ""}`}
              >
                <ChevronDown width={28} height={28} />
              </Button>
            </div>
          )}
        </Col>
        <Col xs={12} md={6} lg={8} className="noPadding">
          <ActiveTasks
            isATMinified={isATMinified}
            setIsATMinified={setIsATMinified}
          />
        </Col>
      </Row>
    </div>
  );
};
