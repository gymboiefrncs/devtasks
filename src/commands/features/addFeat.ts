import chalk from "chalk";
import { addFeature } from "../../db/queries/features.js";
import { getActiveProject } from "../../db/queries/projects.js";
import { promptSubtask } from "../../utils/prompt.js";

export const insertFeat = (
  description: string,
  options: { subtask?: boolean }
) => {
  const { id: activeProjectId } = getActiveProject();
  const { id: featId } = addFeature(activeProjectId, description);
  console.log(chalk.green.bold("Feature added!"));

  if (options.subtask) {
    promptSubtask(featId);
  }
};
