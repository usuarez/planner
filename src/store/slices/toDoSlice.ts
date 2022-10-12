import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { fakePlanner } from "../../helpers/generateFakePlanner";
import { ITask } from "../../pages/todayView/components/TaskCard";

interface IAppState {
  activeDay: string;
  planner: {
    [key: string]: ITask[];
  };
  categories: { name: string }[];
}
const initialState: IAppState = {
  activeDay: dayjs().format("YYYY-MM-DD"),
  planner: fakePlanner,
  categories: [
    { name: "Any" },
    { name: "Design" },
    { name: "Development" },
    { name: "Backend" },
    { name: "FrontEnd" },
    { name: "Office" },
  ],
};

export const toDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    //Set as Active
    setActiveDay: (state, action) => {
      state.activeDay = action.payload.date;
    },
    //Add New Task
    addTask: (state, action) => {
      let newTaskDay = state?.planner[action.payload.date as string];
      if (!!newTaskDay) newTaskDay?.push(action.payload.task);
      else newTaskDay = [action.payload.task];

      state.planner = Object.assign(state.planner, {
        [action.payload.date]: newTaskDay,
      });
    },
    //Set task as done
    setTaskAsDone: (state, action) => {
      let toUpdate = state.planner[state.activeDay].find(
        (t) => t.id === action.payload.id
      );

      if (!!toUpdate) {
        toUpdate!.isDone = true;
        let tasks = state.planner[state.activeDay].filter(
          (t) => t.id !== action.payload.id
        );

        state.planner[state.activeDay] = [...tasks, toUpdate];
      } else {
        console.log("no existe la tarea");
      }
    },
    //delete tasks
    deleteTask: (state, action) => {
      let tasks = state.planner[state.activeDay].filter(
        (t) => t.id !== action.payload.id
      );

      if (state.planner[state.activeDay].length - 1 > 0)
        state.planner[state.activeDay] = [...tasks];
      else delete state.planner[state.activeDay];
    },
  },
});

export const { addTask, deleteTask, setActiveDay, setTaskAsDone } =
  toDoSlice.actions;

export default toDoSlice.reducer;
