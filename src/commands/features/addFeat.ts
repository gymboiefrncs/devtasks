import chalk from "chalk";
import { addFeature } from "../../db/queries/features.js";
import { getActiveProject } from "../../db/queries/projects.js";
import { promptSubtask } from "../../utils/prompt.js";

export const insertFeat = async (
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

  const newFeature = addFeature(activeProjectId, description);
  if (!newFeature) {
    console.log(chalk.red("✖  Something went wrong"));
    return;
  }
  const { id: featId, description: desc } = newFeature;

  if (options.subtask) {
    try {
      const success = await promptSubtask(featId);
      if (!success) {
        console.log(chalk.dim.italic("\n -- No subtask added\n"));
      } else {
        console.log(
          chalk.green.bold(`\n✔  Subtask added to feature [${featId}] ${desc}`)
        );
      }
    } catch (error) {
      console.error(chalk.red("✖  Something went wrong", error));
    }
  }
  console.log(chalk.green.bold("✔  Feature added successfully \n"));
  console.log(chalk.cyan(`   [ID: ${featId}]  ${desc}`));
  console.log(chalk.gray("──────────────────────────────\n"));
};
