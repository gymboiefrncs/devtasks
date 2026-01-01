import type { Project } from "../../types/Project.js";
import { db } from "../database.js";

export const getAllProjects = (): Project[] => {
  return db.prepare(`SELECT * FROM projects`).all() as Project[];
};

export const getActiveProjects = (): Project[] => {
  return db
    .prepare("SELECT * FROM projects where is_active = 1")
    .all() as Project[];
};

export const addProject = (name: string): Project => {
  return db
    .prepare(`INSERT INTO projects (name, is_active) VALUES (?, 1) RETURNING *`)
    .get(name) as Project;
};
