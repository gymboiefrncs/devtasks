import Database from "better-sqlite3";
import { getDbPath } from "../utils/config.js";
import { initializeSchema } from "./migrations.js";

export const connectToDB = (): Database.Database => {
  const dbPath = getDbPath();
  const db = new Database(dbPath);
  initializeSchema(db);
  return db;
};
