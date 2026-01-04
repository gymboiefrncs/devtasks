import chalk from "chalk";
import {
  focusFeature,
  setUnfocusAllFeature,
  setUnfocusFeature,
} from "../../db/queries/features.js";

export const focusOnAFeature = (featId: number) => {
  const result = focusFeature(featId);
  if (!result) {
    console.log(chalk.redBright("✖ Failed to focus on feature."));
    return;
  }

  console.log(chalk.greenBright.bold("✔ Feature is now focused!\n"));
  console.log(
    chalk.cyan(`   [ID: ${result.id}]`) +
      " " +
      chalk.white.bold(result.description) +
      " " +
      `is now in-progress`
  );
  console.log(chalk.gray("──────────────────────────────\n"));
};

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

export const unfocusAllFeatures = () => {
  setUnfocusAllFeature();
};
