#!/usr/bin/env node

import { Command } from "commander";
import { insertFeat } from "./commands/features/add.js";
import { listAllFeatures, listFeat } from "./commands/features/listFeat.js";
import { initProject } from "./commands/projects/init.js";
import { listProjects } from "./commands/projects/listProjects.js";
import { insertSubtask } from "./commands/subtasks/addSubtask.js";
import { listSubtask } from "./commands/subtasks/getSubtask.js";

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

program.command("getFeat <id>").description("list feature").action(listFeat);

program
  .command("subtask <featId> <description>")
  .description("add subtask")
  .action(insertSubtask);

program
  .command("listSub <featId>")
  .description("list all subtasks")
  .action(listSubtask);

program.parse();
