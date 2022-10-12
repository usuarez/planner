import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Dropdown } from "primereact/dropdown";
import { useAppSelector } from "../../../store/hooks";
import { ITask, TaskCard } from "./TaskCard";
import NotasksImg from "./../../../assets/notasks.png";

export const ActiveTasks: React.FC<{
  isATMinified: boolean;
  setIsATMinified: (a: boolean) => void;
}> = ({ isATMinified, setIsATMinified }) => {
  const { categories } = useAppSelector((state) => state.todo);
  const tasks = useAppSelector(
    (state) => state.todo.planner[state.todo.activeDay]
  );

  const [selectedCategory, setselectedCategory] = useState<{ name: string }>({
    name: "Any",
  });
  const [filteredTasks, setfilteredTasks] = useState<ITask[] | null>(tasks);

  useEffect(() => {
    if (!!tasks) setfilteredTasks(tasks);
    else setfilteredTasks(null);
  }, [tasks]);

  useEffect(() => {
    if (!!tasks) {
      if (!!selectedCategory && selectedCategory.name !== "Any")
        setfilteredTasks(
          tasks.filter((t) => t.categories.includes(selectedCategory!.name))
        );
      else setfilteredTasks(tasks);
    }
  }, [selectedCategory]);

  return (
    <div className={`activeTasks ${isATMinified ? "minified" : ""}`}>
      <Row>
        <h2 onClick={() => setIsATMinified(!isATMinified)}>Active Tasks</h2>
        {!!tasks && tasks.length > 0 && (
          <Col className="d-flex align-items-center">
            <p className="px-3 my-0">Filter By category</p>
            <Dropdown
              value={selectedCategory}
              options={categories}
              onChange={(e) => setselectedCategory(e.value)}
              optionLabel="name"
              placeholder="Filter by category"
            />
          </Col>
        )}
        <Col className="pt-3" xs={{ span: 10, offset: 1 }}>
          <Row>
            {!!filteredTasks && filteredTasks.length > 0 ? (
              filteredTasks.map((task, idx) => (
                <Col
                  key={`taskCard-${idx}`}
                  xs={12}
                  sm={6}
                  md={12}
                  lg={idx % 2 === 0 ? { span: 5, offset: 1 } : 5}
                >
                  <TaskCard {...task} />
                </Col>
              ))
            ) : (
              <Row className="notasksRow">
                {!!tasks && tasks.length > 0 ? (
                  <p className="text-center">No tasks in this category today</p>
                ) : (
                  <>
                    <img
                      src={NotasksImg}
                      alt="notasks img"
                      className="notasksImg"
                    />
                    <p className="text-center">
                      Nothing here, Try to add tasks for this day
                    </p>
                  </>
                )}
              </Row>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};
