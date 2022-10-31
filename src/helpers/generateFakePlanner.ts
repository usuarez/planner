import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
const month = dayjs().format("YYYY-MM");
const categories = [
  "Any",
  "Design",
  "Development",
  "Backend",
  "FrontEnd",
  "Office",
];

const generateTemplateTasks = (titles: string[]) => {
  const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const templateTasks = titles.map((title) => ({
    id: uuid(),
    categories: [categories[random(0, 5)]],
    title,
    time: {
      from: `${random(6, 14)}:00`,
      to: `${random(14, 23)}:00`,
    },
    isDone: false,
  }));
  return templateTasks;
};
generateTemplateTasks([
  "Deploy React project",
  "Deploy Vue project",
  "Deploy docker server",
  "Restart Node",
  "Make Coffee",
  "Make breakfast",
  "Buy sheets",
  "Buy coffee",
  "Print Documents",
  "Clean the room",
  "Learn Flutter",
  "Learn React Native",
  "Learn NestJs",
  "Fix the printer",
  "Turn on the lights",
]);

export const fakePlanner = {
  [`${month}-04`]: generateTemplateTasks([
    "Deploy React project",
    "Deploy Vue project",
    "Deploy docker server",
    "Restart Node",
    "Make Coffee",
    "Make breakfast",
    "Buy sheets",
    "Buy coffee",
    "Print Documents",
    "Clean the room",
    "Learn Flutter",
    "Learn React Native",
    "Learn NestJs",
    "Fix the printer",
    "Turn on the lights",
  ]),
  [`${month}-07`]: generateTemplateTasks([
    "Make breakfast",
    "Buy sheets",
    "Buy coffee",
    "Print Documents",
    "Clean the room",
    "Learn Flutter",
  ]),
  [`${month}-08`]: generateTemplateTasks([
    "Deploy docker server",
    "Restart Node",
  ]),
  [`${month}-14`]: generateTemplateTasks([
    "Clean the room",
    "Learn Flutter",
    "Learn React Native",
    "Learn NestJs",
    "Fix the printer",
    "Turn on the lights",
  ]),
  [`${month}-15`]: generateTemplateTasks([
    "Deploy Vue project",
    "Deploy docker server",
    "Restart Node",
    "Make Coffee",
    "Make breakfast",
    "Buy sheets",
    "Buy coffee",
    "Print Documents",
  ]),
  [`${month}-18`]: generateTemplateTasks([
    "Learn Flutter",
    "Learn React Native",
    "Learn NestJs",
    "Fix the printer",
  ]),
  [`${month}-20`]: generateTemplateTasks([
    "Buy sheets",
    "Buy coffee",
    "Print Documents",
    "Clean the room",
    "Learn Flutter",
    "Learn React Native",
  ]),
  [`${month}-21`]: generateTemplateTasks([
    "Deploy docker server",
    "Restart Node",
    "Make Coffee",
    "Make breakfast",
    "Buy sheets",
  ]),
  [`${month}-24`]: generateTemplateTasks([
    "Make Coffee",
    "Make breakfast",
    "Buy sheets",
    "Buy coffee",
  ]),
  [`${month}-28`]: generateTemplateTasks([
    "Clean the room",
    "Learn Flutter",
    "Learn React Native",
    "Learn NestJs",
    "Fix the printer",
    "Turn on the lights",
  ]),
};
