import Database from "better-sqlite3";
import { getDbPath } from "../src/utils/config.js";

export function resetFeaturesAndSubtasks(): Record<string, any[]> {
  const dbFile: string = getDbPath();
  const db = new Database(dbFile);

  const tablesToReset = ["features", "subtasks"];
  const remainingData: Record<string, any[]> = {};

  db.transaction(() => {
    for (const table of tablesToReset) {
      // Delete all rows
      db.prepare(`DELETE FROM ${table};`).run();
      // Reset autoincrement IDs
      db.prepare(`DELETE FROM sqlite_sequence WHERE name='${table}';`).run();
    }
  })();

  // Fetch remaining data for verification
  for (const table of tablesToReset) {
    remainingData[table] = db.prepare(`SELECT * FROM ${table};`).all();
  }

  return remainingData;
}
resetFeaturesAndSubtasks();
