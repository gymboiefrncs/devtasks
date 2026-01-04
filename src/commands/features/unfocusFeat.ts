import chalk from "chalk";
import { setUnfocusFeature } from "../../db/queries/features.js";

export const unfocusFeature = (featId: number) => {
  const result = setUnfocusFeature(featId);

  if (!result) {
    console.log(chalk.redBright(`✖ Failed to unfocus feature ${featId}.`));
    return;
  }

  console.log(chalk.greenBright.bold("✔ Feature unfocused!\n"));
  console.log(
    chalk.cyan(`   [ID: ${result.id}]`) +
      " " +
      chalk.white.bold(result.description) +
      " " +
      `is now todo`
  );
  console.log(chalk.gray("──────────────────────────────\n"));
};
