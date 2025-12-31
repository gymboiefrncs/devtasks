import type { Feature, Status } from "../../types/Feature.js";
import { db } from "../database.js";

export const addFeature = (
  activeProjectId: number,
  description: string
): Feature => {
  const result = db
    .prepare(
      `
    INSERT INTO features (project_id, description) VALUES (?, ?)
    `
    )
    .run(activeProjectId, description);

  const getResult = db
    .prepare(
      `
    SELECT * FROM features WHERE id = ?
    `
    )
    .get(result.lastInsertRowid) as Feature;
  return getResult;
};

export const getAllFeaturesDefault = (): Feature[] => {
  const result = db
    .prepare(
      `
    SELECT * FROM features WHERE status = ?
    `
    )
    .all("in-progress");
  return result as Feature[];
};

export const getAllFeaturesByStatus = (status: Status): Feature[] => {
  const result = db
    .prepare(
      `
    SELECT * FROM features WHERE status = ?
    `
    )
    .all(status);
  return result as Feature[];
};

export const getAllFeatures = (): Feature[] => {
  const result = db
    .prepare(
      `
    SELECT * FROM features
    `
    )
    .all();
  return result as Feature[];
};
