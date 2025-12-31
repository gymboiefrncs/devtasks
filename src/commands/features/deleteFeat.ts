import { deleteFeature } from "../../db/queries/features.js";

export const removeFeature = (id: number) => {
  deleteFeature(id);
  console.log("deleted");
};
