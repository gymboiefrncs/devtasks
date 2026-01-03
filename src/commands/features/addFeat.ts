import chalk from "chalk";
import { addFeature } from "../../db/queries/features.js";
import { getActiveProject } from "../../db/queries/projects.js";
import { promptSubtask } from "../../utils/prompt.js";

export const insertFeat = (
  description: string,
  options: { subtask?: boolean }
) => {
  const activeProject = getActiveProject();
  if (!activeProject) {
    console.log(chalk.yellow("       ⚠  No active project"));
    console.log(
      chalk.bold(
        `       Try adding a project: ${chalk.italic.dim(
          "devtask init <project name>"
        )}`
      )
    );
    return;
  }

  const { id: activeProjectId } = activeProject;

  const { id: featId } = addFeature(activeProjectId, description);
  console.log(chalk.green.bold("Feature added!"));

  if (options.subtask) {
    promptSubtask(featId);
  }
};
