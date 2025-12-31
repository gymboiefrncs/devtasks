import type Database from "better-sqlite3";
import type { Project } from "../../types/Project.js";
import { connectToDB } from "../database.js";

export const getAllProjects = (): Project[] => {
  const db = connectToDB();
  const result = db.prepare(`SELECT * FROM projects`).all();
  return result as Project[];
};

export const addProject = (name: string): Project => {
  const db = connectToDB();

  const result: Database.RunResult = db
    .prepare(
      `
      INSERT INTO projects (name, is_active) VALUES (?, 1)
    `
    )
    .run(name);
  const getResult = db
    .prepare(
      `
    SELECT * FROM projects WHERE id = ?
    `
    )
    .get(result.lastInsertRowid) as Project;
  return getResult;
};
