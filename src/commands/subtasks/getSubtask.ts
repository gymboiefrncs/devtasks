import { getSubtask } from "../../db/queries/subtasks.js";

export const listSubtask = (featId: number) => {
  console.log(getSubtask(featId));
};
