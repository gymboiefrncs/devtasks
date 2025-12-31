import chalk from "chalk";
import { addFeature } from "../../db/queries/features.js";
import { getActiveProjects } from "../../db/queries/projects.js";

export const insertFeat = (description: string) => {
  const { id: activeProjectId } = getActiveProjects();
  addFeature(activeProjectId, description);
  console.log(chalk.green.bold("Feature added!"));
};
