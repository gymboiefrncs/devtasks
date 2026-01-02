#!/usr/bin/env node
import { Command } from "commander";
import { insertFeat } from "./commands/features/addFeat.js";
import { removeFeature } from "./commands/features/deleteFeat.js";
import { listAllFeatures } from "./commands/features/listFeat.js";
import { showFeatureDetails } from "./commands/features/showFeatDetail.js";
import { displayCurrentProject } from "./commands/projects/displayProject.js";
import { initProject } from "./commands/projects/initProject.js";
import { listProjects } from "./commands/projects/listProjects.js";
import { switchProjects } from "./commands/projects/switchProject.js";
import { insertSubtask } from "./commands/subtasks/addSubtask.js";
import { db } from "./db/database.js";

const program = new Command();

program
  .name("devtask")
  .description("Task management CLI for developers")
  .version("1.0.0");

// ---------
// Project Commands
// ---------
program
  .command("init <projectName>")
  .option("-s", "switch to newly created project")
  .description("initialize a project")
  .action(initProject);

program
  .command("projects")
  .description("list all projects")
  .action(listProjects);

program
  .command("switch <projectId>")
  .description("Switch between projects")
  .action(switchProjects);

program
  .command("current")
  .description("Display current active projevct with details")
  .action(displayCurrentProject);

// -------------------
//  Feature Commands
// -------------------
const feat = program.command("feat").description("Manage feature");

feat
  .command("add <description>")
  .description("Add new feature")
  .option("--subtask", "Include subtasks")
  .action(insertFeat);

feat
  .command("list")
  .description("List features")
  .option("--all", "List all features")
  .option("--status <status>", "Filter by status")
  .action(listAllFeatures);

feat
  .command("show <id>")
  .description("Show feature details")
  .action(showFeatureDetails);

feat
  .command("remove <id>")
  .description("Remove a feature")
  .action(removeFeature);

// ------------------
// Subtasks command
// ------------------
const subtask = program.command("subtask").description("Manage subtasks");
subtask
  .command("add <featId> <description>")
  .description("Add subtask to a feature")
  .action(insertSubtask);

subtask
  .command("done <featId> <subId>")
  .description("Mark subtask as done")
  .action((featId, subId) => {
    console.log("Mark as done", featId, subId);
  });

program.parse();

process.on("exit", () => {
  db.close();
});
