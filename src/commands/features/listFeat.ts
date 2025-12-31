import { getAllFeature, getFeature } from "../../db/queries/features.js";

export const listAllFeatures = () => {
  console.log(getAllFeature());
};

export const listFeat = (id: number) => {
  console.log(getFeature(id));
};
