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
