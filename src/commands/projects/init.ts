import chalk from "chalk";
import { addProject } from "../../db/queries/projects.js";
import type { Project } from "../../types/Project.js";

export const initProject = (name: string): void => {
  const project: Project = addProject(name);

  console.log(
    `\n✅ ${chalk.bold("Project created:")} ${chalk.cyan(project.name)}`
  );

  console.log(
    chalk.dim(
      `  -> Run ${chalk.white.italic.bold(
        "devtask projects"
      )} to view all projects\n`
    )
  );
};
