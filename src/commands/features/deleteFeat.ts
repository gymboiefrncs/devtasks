import chalk from "chalk";
import { deleteFeature } from "../../db/queries/features.js";

export const removeFeature = (id: number) => {
  const deletedCount = deleteFeature(id);
  if (deletedCount > 0) {
    console.log(chalk.green(`✔  Feature [${id}] deleted successfully`));
  } else {
    console.log(chalk.yellow(`⚠  No feature found with ID [${id}]`));
  }
};
