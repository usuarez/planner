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
  const { planner, activeDay } = useAppSelector((st) => st.todo);
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
  }, []);

  const dateTemplate = (SelectedDateInCalendar: any) => {
    const { day, month, year } = SelectedDateInCalendar;

    if (`${year}-${month + 1}-${day < 10 ? `0${day}` : day}` === activeDay) {
      return <div className={`CalendarActiveDay`}>{day}</div>;
    } else if (
      Object.keys(planner)
        .map((d) => Number(dayjs(d).format("DD")))
        .includes(day) &&
      month === Number(dayjs().format("MM")) - 1
    ) {
      return <div className={`CalendarCircle`}>{day}</div>;
    } else {
      return day;
    }
  };

  return (
    <div className="TodayView">
      <Row>
        <Col xs={12} md={6} lg={5} xl={4}>
          {!toggleCalendar && !isDesk ? (
            <LineCalendar />
          ) : (
            <div className="mainCalendar">
              <Calendar
                inline
                selectOtherMonths={true}
                value={new Date()}
                monthNavigator={false}
                onSelect={handleActiveDay}
                dateTemplate={dateTemplate}
                className="todayViewCalendar"
              ></Calendar>
            </div>
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
        <Col xs={12} md={6} lg={7} xl={8} className="noPadding">
          <ActiveTasks
            isATMinified={isATMinified}
            setIsATMinified={setIsATMinified}
          />
        </Col>
      </Row>
    </div>
  );
};
