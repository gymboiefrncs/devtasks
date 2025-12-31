import {
  getAllFeatures,
  getAllFeaturesByStatus,
  getAllFeaturesDefault,
} from "../../db/queries/features.js";
import type { Status } from "../../types/Feature.js";

export const listAllFeatures = (options: { all: string; status: Status }) => {
  if (options.all) {
    console.log(getAllFeatures());
  } else if (options.status) {
    console.log(getAllFeaturesByStatus(options.status));
  } else {
    console.log(getAllFeaturesDefault());
  }
};
