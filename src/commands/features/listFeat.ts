import chalk from "chalk";
import {
  getAllFeatures,
  getAllFeaturesByStatus,
  getAllFeaturesDefault,
} from "../../db/queries/features.js";
import { getActiveProject } from "../../db/queries/projects.js";
import type { Status } from "../../types/Feature.js";

export const listAllFeatures = (options: { all: string; status: Status }) => {
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
  const { id } = activeProject;
  if (options.all) {
    const features = getAllFeatures(id);
    if (!features.length) {
      console.log(chalk.yellow("     ⚠ No features found for this project"));
      console.log(
        chalk.bold(
          `     Try adding a feature: ${chalk.italic.dim(
            "devtask feat add <description> or devtask feat add <description> --subtask"
          )}`
        )
      );
      return;
    }

    console.log(chalk.bold.underline.blue("\n=== Features List ===\n"));

    for (const feature of features) {
      console.log(
        chalk.bold.cyan(`#${feature.id}`) +
          " " +
          chalk.bold.white(feature.description)
      );

      console.log(
        `  ${chalk.bgYellow.black(" STATUS ")}: ${chalk.yellowBright(
          feature.status
        )}  |` +
          ` ${chalk.bgGreen.black(" FOCUSED ")}: ${
            feature.is_focused ? chalk.greenBright("✔") : chalk.redBright("✖")
          }`
      );

      console.log(
        `  ${chalk.bgMagenta.black(" STARTED ")}: ${chalk.magentaBright(
          feature.time_start ?? "N/A"
        )}  |` +
          ` ${chalk.bgBlue.black(" TIME SPENT ")}: ${chalk.blueBright(
            feature.total_time_spent ?? "0h"
          )}`
      );

      console.log(chalk.gray("──────────────────────────────\n"));
    }
  } else if (options.status) {
    console.log(getAllFeaturesByStatus(options.status));
  } else {
    console.log(getAllFeaturesDefault());
  }
};
