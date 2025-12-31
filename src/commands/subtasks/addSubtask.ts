import { addSubtask, createBatchSubTask } from "../../db/queries/subtasks.js";
export const insertSubtask = (featId: number, description: string) => {
  console.log(addSubtask(featId, description));
};

export const insertBatchSubtask = (featId: number, subtasks: string[]) => {
  createBatchSubTask(featId, subtasks);
};
