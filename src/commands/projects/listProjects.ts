import { getAllProjects } from "../../db/queries/projects.js";

export const listProjects = () => {
  const projects = getAllProjects();
  console.log(projects);
};
