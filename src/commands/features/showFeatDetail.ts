import { getFeatureDetails } from "../../db/queries/features.js";

export const showFeatureDetails = (id: number) => {
  console.log(getFeatureDetails(id));
};
