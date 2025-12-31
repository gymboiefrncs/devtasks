import { addSubtask } from "../../db/queries/subtasks.js";

export const insertSubtask = (featId: number, description: string) => {
  console.log(addSubtask(featId, description));
};
