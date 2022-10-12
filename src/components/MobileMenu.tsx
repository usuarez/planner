import React from "react";
import { Button } from "react-bootstrap";
import { CalendarWeek, PieChart, PlusLg } from "react-bootstrap-icons";
import { ITaskForm } from "./AddTask";

export const MobileMenu: React.FC<ITaskForm> = ({ setShowCreateTask }) => {
  return (
    <div className="mobileMenu">
      <Button className="menuBtn active">
        <CalendarWeek width={28} height={28} color="#000" />
      </Button>
      <Button className="menuBtn">
        <PieChart width={28} height={28} color="#000" />
      </Button>
      <Button
        className="menuBtn addTaskBtn"
        onClick={() => setShowCreateTask(true)}
      >
        <PlusLg width={24} height={24} color="#000" />
      </Button>
    </div>
  );
};
