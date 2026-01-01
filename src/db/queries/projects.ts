import type { Project } from "../../types/Project.js";
import { db } from "../database.js";

export const getAllProjects = (): Project[] => {
  return db.prepare(`SELECT * FROM projects`).all() as Project[];
};

export const getActiveProject = (): Project => {
  return db
    .prepare("SELECT * FROM projects where is_active = 1")
    .get() as Project;
};

export const addProject = (name: string): Project => {
  const createActiveProject = db.transaction((projectName: string) => {
    db.prepare(`UPDATE projects SET is_active = 0 WHERE is_active = 1`).run();

    const result = db
      .prepare(
        `INSERT INTO projects (name, is_active)
         VALUES (?, 1)
         RETURNING * `
      )
      .get(projectName) as Project | undefined;

    if (!result)
      throw new Error(
        "DATABASE_ERROR: The insert statement failed to return data"
      );

    return result;
  });

  return createActiveProject(name);
};
