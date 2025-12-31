import type { Feature } from "../../types/Feature.js";
import { connectToDB } from "../database.js";
export const addFeature = (activeProjectId: number, description: string) => {
  const db = connectToDB();
  const result = db
    .prepare(
      `
    INSERT INTO features (project_id, description) VALUES (?, ?)
    `
    )
    .run(activeProjectId, description);
  return result;
};

export const getAllFeature = (): Feature[] => {
  const db = connectToDB();

  const result = db
    .prepare(
      `
    SELECT * FROM features
    `
    )
    .all();
  return result as Feature[];
};
