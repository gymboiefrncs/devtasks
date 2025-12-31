#!/usr/bin/env node

import { Command } from "commander";
import { insertFeat } from "./commands/features/add.js";
import { listAllFeatures } from "./commands/features/listFeat.js";
import { initProject } from "./commands/projects/init.js";
import { listProjects } from "./commands/projects/listProjects.js";

const program = new Command();

program
  .name("devtask")
  .description("Task management CLI for developers")
  .version("1.0.0");

program
  .command("init <projectName>")
  .description("initialize a project")
  .action(initProject);

program
  .command("projects")
  .description("list all projects")
  .action(listProjects);

program.command("feat <description>").option("--subtask").action(insertFeat);

program
  .command("list feat")
  .description("list all features")
  .action(listAllFeatures);

program.parse();
