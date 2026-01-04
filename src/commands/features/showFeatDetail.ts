import chalk from "chalk";
import { getFeatureDetails } from "../../db/queries/features.js";

export const showFeatureDetails = (id: number) => {
  const rows = getFeatureDetails(id);
  if (!rows.length) return;

  const base = rows[0];
  if (!base) return;

  const feature = {
    feature_id: base.feature_id,
    project_id: base.project_id,
    description: base.feature_description,
    status: base.status,
    is_focused: !!base.is_focused,
    notes: base.notes,
    created_at: base.feature_created_at,
    total_time_spent: base.total_time_spent,
    time_start: base.time_start,
    subtasks: rows
      .filter((r) => r.subtask_id !== null)
      .map((r) => ({
        id: r.subtask_id,
        description: r.subtask_description,
        is_done: r.subtask_is_done,
        created_at: r.subtask_created_at,
      })),
  };

  const separator = chalk.gray("─".repeat(60));

  // Feature block
  console.log(separator);
  console.log(
    chalk.bold.underline(
      `Feature [${feature.feature_id}] ${feature.description} - ${chalk.blue(
        "Created At:"
      )} ${feature.created_at}\n`
    )
  );
  console.log(
    `${chalk.yellow("Status:")} ${feature.status}           ${chalk.blue(
      "Time Start:"
    )} ${feature.time_start ?? "Not started"}`
  );
  console.log(
    `${chalk.cyan("Focused:")} ${feature.is_focused}         ${chalk.red(
      "Total Time Spent:"
    )} ${feature.total_time_spent} mins`
  );
  console.log(`${chalk.magenta("Notes:")} ${feature.notes ?? "None"}`);

  console.log(chalk.gray("─".repeat(60)));
  if (feature.subtasks.length) {
    console.log(chalk.bold.underline("Subtasks:\n"));
    feature.subtasks.forEach((st) => {
      console.log(
        `  ${chalk.green(`[${st.id}]`)} ${st.description} - ` +
          `${st.is_done ? chalk.bgGreen(" DONE ") : chalk.bgRed(" TODO ")} - ` +
          `${chalk.blue(st.created_at)}`
      );
    });
  } else {
    console.log(chalk.gray("  No subtasks."));
  }
  console.log(separator + "\n");
};
