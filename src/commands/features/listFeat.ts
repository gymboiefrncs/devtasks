import { getAllFeature } from "../../db/queries/features.js";

export const listAllFeatures = () => {
  console.log(getAllFeature());
};
