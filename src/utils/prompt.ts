import { input } from "@inquirer/prompts";
import chalk from "chalk";
import { insertBatchSubtask } from "../commands/subtasks/addSubtask.js";

export const promptSubtask = async (featId: number) => {
  console.log(
    chalk.blue.bold(
      "Enter subtask (press enter after each, empty line to finish"
    )
  );
  const subtasks: string[] = [];
  while (true) {
    const task = await input({
      message: "> ",
    });
    if (!task.trim()) break;
    subtasks.push(task.trim());
  }

  insertBatchSubtask(featId, subtasks);
};
