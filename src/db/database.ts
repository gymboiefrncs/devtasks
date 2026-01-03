import type { Database as dbType } from "better-sqlite3";
import Database from "better-sqlite3";
import { getDbPath } from "../utils/config.js";
import { initializeSchema } from "./setupTables.js";

const dbPath = getDbPath();
export const db: dbType = new Database(dbPath);
db.pragma("journal_mode = WAL");

initializeSchema(db);
