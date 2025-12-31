import { connectToDB } from "../database.js";

export const addSubtask = (feature_id: number, description: string) => {
  const db = connectToDB();
  const result = db
    .prepare(
      `
    INSERT INTO subtasks (feature_id, description) VALUES (?, ?)
    `
    )
    .run(feature_id, description);
  return result;
};

export const getSubtask = (id: number) => {
  const db = connectToDB();
  const result = db
    .prepare(
      `
      SELECT * FROM subtasks where feature_id = ?
    `
    )
    .all(id);
  return result;
};
