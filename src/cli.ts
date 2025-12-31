#!/usr/bin/env node

import { connectToDB } from "./db/database.js";

const db = connectToDB();

console.log("Database connected!");

const tables = db
  .prepare(
    `
  SELECT name FROM sqlite_master
  WHERE type='table'
`
  )
  .all();

console.log("Tables in DB:", tables);
