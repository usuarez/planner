import React, { FC, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { SelectButton } from "primereact/selectbutton";
import { Calendar, InputText } from "primereact";
import { InputNumber } from "primereact/inputnumber";
import { MultiSelect } from "primereact/multiselect";
import { X } from "react-bootstrap-icons";
import { v4 as uuid } from "uuid";
import { Toast } from "primereact";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import dayjs from "dayjs";
import { addTask } from "../store/slices/toDoSlice";
export interface ITaskForm {
  showCreateTask?: boolean;
  setShowCreateTask: (a: boolean) => void;
}

export const AddTask: FC<ITaskForm> = ({
  showCreateTask,
  setShowCreateTask,
}) => {
  const toast = useRef<Toast>(null);
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.todo);
  const [dueHour, setdueHour] = useState(14);
  const [dueMins, setdueMins] = useState(30);
  const [date, setDate] = useState(new Date());
  const [taskTitle, settaskTitle] = useState("");
  const [taskDate, settaskDate] = useState("today");
  const [selectedCategories, setselectedCategories] = useState<
    { name: string }[]
  >([{ name: "Design" }]);

  const dueItems = [
    { label: "Today", value: "today" },
    { label: "Tomorrow", value: "tomorrow" },
    { label: "Custom", value: "custom" },
  ];

  const toastError = (summary: string, detail: string) => {
    toast.current?.show({
      detail,
      summary,
      life: 3000,
      severity: "error",
    });
  };
  const handleCreateTask = () => {
    //guard clauses
    if (taskTitle.length === 0) {
      toastError("Add a title", "Your task need a name");
      return null;
    }
    if (selectedCategories.length === 0) {
      toastError(
        "Select a category",
        "It helps you to find your tasks more fast"
      );
      return null;
    }

    //declarations
    let formatedDate = "";
    const task = {
      id: uuid(),
      categories: selectedCategories.map((c) => c.name),
      title: taskTitle,
      time: {
        from: `${dueHour}:${dueMins}`,
        to: `${dueHour + 1}:${dueMins}`,
      },
      isDone: false,
    };

    //date format
    if (taskDate === "today") formatedDate = dayjs().format("YYYY-MM-DD");
    else if (taskDate === "tomorrow")
      formatedDate = dayjs().add(1, "day").format("YYYY-MM-DD");
    else formatedDate = dayjs(date).format("YYYY-MM-DD");

    dispatch(
      addTask({
        date: formatedDate,
        task,
      })
    );

    setShowCreateTask(false);
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Task created succesfully",
      life: 2000,
    });
  };

  return (
    <div className={`addTaskForm ${showCreateTask ? "show" : ""}`}>
      <Row>
        <Col
          xs={12}
          className="d-flex align-items-center justify-content-between"
        >
          <h3>Add Task</h3>
          <Button className="closeBtn" onClick={() => setShowCreateTask(false)}>
            <X width={28} height={28} />
          </Button>
        </Col>
      </Row>
      <Row className="mb-4 mt-4">
        <span className="text-caption">Task title</span>
        <Col xs={12}>
          <InputText
            onChange={(e) => settaskTitle(e.target.value)}
            placeholder="Make coffee"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <span className="text-caption">Due</span>
        <Col xs={12}>
          <SelectButton
            value={taskDate}
            options={dueItems}
            onChange={(e) => settaskDate(e.value)}
          ></SelectButton>
        </Col>
      </Row>
      {taskDate !== "custom" ? (
        <Row className="mb-4">
          <Col xs={{ span: 3, offset: 3 }}>
            <InputNumber
              value={dueHour}
              onValueChange={(e) => setdueHour(e.value as number)}
              showButtons
              buttonLayout="vertical"
              min={0}
              max={23}
            />
          </Col>
          <Col xs={3}>
            <InputNumber
              value={dueMins}
              onValueChange={(e) => setdueMins(e.value as number)}
              showButtons
              buttonLayout="vertical"
              min={0}
              max={59}
            />
          </Col>
        </Row>
      ) : (
        <Row className="mb-4">
          <Col xs={12}>
            <Calendar
              panelClassName="addTaskCalendar"
              minDate={new Date()}
              placeholder="Select a date"
              value={date}
              showTime
              onChange={(e) => setDate(e.value as Date)}
            ></Calendar>
          </Col>
        </Row>
      )}

      <Row className="mb-4">
        <span className="text-caption">Category</span>
        <Col cs={12}>
          <MultiSelect
            value={selectedCategories}
            options={categories}
            onChange={(e) => setselectedCategories(e.value)}
            optionLabel="name"
            placeholder="Select a category"
            display="chip"
            showSelectAll={false}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Button onClick={handleCreateTask} className="save-btn">
            Save
          </Button>
          <Button className="btn-link" onClick={() => setShowCreateTask(false)}>
            cancel
          </Button>
        </Col>
      </Row>
      <Toast ref={toast} />
    </div>
  );
};
