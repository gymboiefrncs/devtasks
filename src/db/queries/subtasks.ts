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

export const createBatchSubTask = (featId: number, subtasks: string[]) => {
  const db = connectToDB();
  const stmt = db.prepare(`
    INSERT INTO subtasks (feature_id, description) VALUES (?, ?)
    `);
  const batchInsert = db.transaction((tasks: string[]) => {
    for (const desc of tasks) {
      stmt.run(featId, desc);
    }
  });
  batchInsert(subtasks);
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
