import chalk from "chalk";
import { addProject } from "../../db/queries/projects.js";

export const initProject = (name: string): void => {
  const project = addProject(name);
  console.log(chalk.green.bold(`project created ${project}`));
};
