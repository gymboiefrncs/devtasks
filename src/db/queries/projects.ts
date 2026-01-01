import type { Project } from "../../types/Project.js";
import { db } from "../database.js";

// --------------------
// Get projects queries
// --------------------
export const getAllProjects = (): Project[] => {
  return db.prepare(`SELECT * FROM projects`).all() as Project[];
};

export const getActiveProject = (): Project => {
  return db
    .prepare("SELECT * FROM projects where is_active = 1")
    .get() as Project;
};

// ----------------------
// Insert project query
// ----------------------
export const addProject = (name: string): Project => {
  const createActiveProject = db.transaction((projectName: string) => {
    // to ensure that theres only one active project
    db.prepare(`UPDATE projects SET is_active = 0 WHERE is_active = 1`).run();

    const newProject = db
      .prepare(
        `INSERT INTO projects (name, is_active)
         VALUES (?, 1)
         RETURNING * `
      )
      .get(projectName) as Project | undefined;

    if (!newProject)
      throw new Error(
        "DATABASE_ERROR: The insert statement failed to return data"
      );

    return newProject;
  });

  return createActiveProject(name);
};

// --------------------
// Switch project query
// --------------------
export const setActiveProject = (projectId: number): Project => {
  const performSwitch = db.transaction((id: number) => {
    const targetProject = db
      .prepare("SELECT * FROM projects WHERE id = ?")
      .get(id) as Project | undefined;

    if (!targetProject) {
      throw new Error(`Project with ID ${id} not found`);
    }

    // clear previous active project first
    db.prepare("UPDATE projects SET is_active = 0 WHERE is_active = 1").run();

    const updatedProject = db
      .prepare(`UPDATE projects SET is_active = 1 WHERE id = ? RETURNING *`)
      .get(id) as Project | undefined;

    if (!updatedProject)
      throw new Error("DATEBASAE_ERROR: failed to update project");

    return updatedProject;
  });
  return performSwitch(projectId);
};
