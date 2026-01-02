import chalk from "chalk";
import { getActiveProject } from "../../db/queries/projects.js";

export const displayCurrentProject = () => {
  const project = getActiveProject();

  if (!project) {
    console.log(`\n${chalk.dim.bold("Something went wrong.")}`);
    return;
  }

  console.log(`
  ${chalk.cyan.bold("CURRENTs PROJECT")}
  ${chalk.dim("──────────────────────────────────────────")}
  ${chalk.bold("ID:")}     ${chalk.dim(project.id)}
  ${chalk.bold("Name:")}   ${chalk.white(project.name)}
  ${chalk.bold("Status:")} ${chalk.green("● Active")}
  ${chalk.dim("──────────────────────────────────────────")}
  `);
};
