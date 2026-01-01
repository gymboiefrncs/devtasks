import chalk from "chalk";
import { addProject } from "../../db/queries/projects.js";

export const initProject = (name: string): void => {
  const project = addProject(name);

  console.log(
    `\n✅ ${chalk.bold("Project created:")} '${chalk.cyan(project.name)}'`
  );

  console.log(
    chalk.dim(
      `  -> Run ${chalk.cyan.italic.bold(
        "devtask projects"
      )} to view all projects\n`
    )
  );
};
