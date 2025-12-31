#!/usr/bin/env node

import { Command } from "commander";
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

program.parse();
