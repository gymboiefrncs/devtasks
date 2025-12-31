import type Database from "better-sqlite3";
import type { Project } from "../../types/Project.js";
import { db } from "../database.js";

export const getAllProjects = (): Project[] => {
  const result = db.prepare(`SELECT * FROM projects`).all();
  return result as Project[];
};

export const getActiveProjects = (): Project => {
  const result = db
    .prepare("SELECT * FROM projects where is_active = 1")
    .get() as Project;
  return result;
};

export const addProject = (name: string): Project => {
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
