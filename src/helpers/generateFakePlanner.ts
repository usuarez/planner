import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
const month = dayjs().format("YYYY-MM");

let templateTasks = [
  {
    id: uuid(),
    categories: ["Development"],
    title: "Deploy React project",
    time: {
      from: "18:00",
      to: "19:00",
    },
    isDone: false,
  },
  {
    id: uuid(),
    categories: ["Office"],
    title: "Make Coffee",
    time: {
      from: "8:00",
      to: "10:00",
    },
    isDone: false,
  },
  {
    id: uuid(),
    categories: ["home"],
    title: "Make breakfast",
    time: {
      from: "8:00",
      to: "10:00",
    },
    isDone: true,
  },
];

let templateTasksb = [
  {
    id: uuid(),
    categories: ["Development"],
    title: "Deploy Vue project",
    time: {
      from: "18:00",
      to: "19:00",
    },
    isDone: false,
  },
  {
    id: uuid(),
    categories: ["Office"],
    title: "Print Documents",
    time: {
      from: "8:00",
      to: "10:00",
    },
    isDone: false,
  },
  {
    id: uuid(),
    categories: ["home"],
    title: "Clean the room",
    time: {
      from: "8:00",
      to: "10:00",
    },
    isDone: true,
  },
];

let templateTasksc = [
  {
    id: uuid(),
    categories: ["Development"],
    title: "Learn NestJs",
    time: {
      from: "18:00",
      to: "19:00",
    },
    isDone: false,
  },
  {
    id: uuid(),
    categories: ["Office"],
    title: "Fix the printer",
    time: {
      from: "8:00",
      to: "10:00",
    },
    isDone: false,
  },
  {
    id: uuid(),
    categories: ["home"],
    title: "Turn on the lights",
    time: {
      from: "8:00",
      to: "10:00",
    },
    isDone: true,
  },
];

export const fakePlanner = {
  [`${month}-04`]: templateTasksb,
  [`${month}-07`]: templateTasksc,
  [`${month}-08`]: templateTasks,
  [`${month}-14`]: templateTasksc,
  [`${month}-15`]: templateTasksb,
  [`${month}-18`]: templateTasks,
  [`${month}-20`]: templateTasksb,
  [`${month}-21`]: templateTasksc,
  [`${month}-24`]: templateTasks,
  [`${month}-28`]: templateTasksc,
};
