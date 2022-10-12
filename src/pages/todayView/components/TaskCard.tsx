import React, { FC, useRef } from "react";
import { Chip } from "primereact/chip";

import { ConfirmPopup } from "primereact/confirmpopup";
import { confirmPopup } from "primereact/confirmpopup";

import { Check, X } from "react-bootstrap-icons";
import { Toast } from "primereact";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { deleteTask, setTaskAsDone } from "../../../store/slices/toDoSlice";
import { Button } from "react-bootstrap";

export interface ITask {
  categories: string[];
  title: string;
  time: {
    from: string;
    to: string;
  };
  isDone: boolean;
  id?: string;
}
export const TaskCard: FC<ITask> = ({
  categories,
  title,
  time,
  isDone,
  id,
}) => {
  const { activeDay } = useAppSelector((state) => state.todo);
  const toast = useRef<Toast>(null);
  const dispatch = useAppDispatch();

  const toastAccepted = (
    summary: string = "Confirmed",
    detail: string = "You have accepted"
  ) => {
    toast.current?.show({
      severity: "info",
      summary,
      detail,
      life: 2000,
    });
  };
  const toastRejected = (
    summary: string = "Rejected",
    detail: string = "You have rejected"
  ) => {
    toast.current?.show({
      severity: "warn",
      summary,
      detail,
      life: 2000,
    });
  };

  const handleDoneTask = (event: any) => {
    if (!isDone)
      confirmPopup({
        target: event.currentTarget,
        message: "You want to mark as done?",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          dispatch(setTaskAsDone({ activeDay, id }));
          toastAccepted();
        },
        reject: () => toastRejected(),
      });
  };

  const handleDeleteTask = (event: any) => {
    confirmPopup({
      target: event.currentTarget,
      message: "You want to delete this task?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        dispatch(deleteTask({ id }));
        toastAccepted();
      },
      reject: () => toastRejected(),
    });
  };
  return (
    <>
      <ConfirmPopup />
      <div
        onClick={(e) => handleDoneTask(e)}
        className={`taskCard ${isDone ? "done" : ""}`}
      >
        {isDone && (
          <Button
            onClick={(e) => handleDeleteTask(e)}
            className="deleteTaskBtn"
          >
            <X width={24} height={24} />
          </Button>
        )}
        <div className="cateogries">
          {categories.map((cat, idx) => {
            if (idx < 2) {
              return <Chip label={cat} key={`chipCard-${idx}`} />;
            }
          })}
        </div>
        <h3 className="title">
          {title} {isDone && <Check width={24} height={24} />}
        </h3>
        <span className="time">
          {time.from} - {time.to}
        </span>
        <Toast ref={toast} />
      </div>
    </>
  );
};
