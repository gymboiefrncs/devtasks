import chalk from "chalk";
import { setActiveProject } from "../../db/queries/projects.js";

export const switchProjects = (projectId: number) => {
  const project = setActiveProject(projectId);

  console.log(
    `\n✅ ${chalk.bold("Active project switched to:")} ${chalk.cyan(
      project.name
    )}`
  );
  console.log(
    chalk.dim(`  ID: ${project.id} • Status: ${chalk.green("Active")}\n`)
  );
};
