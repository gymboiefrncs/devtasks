import type Database from "better-sqlite3";

export const initializeSchema = (db: Database.Database): void => {
  db.pragma("foreign_keys = ON");
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_active DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_active BOOLEAN DEFAULT 0
    )
    `);
  db.exec(`
    CREATE TABLE IF NOT EXISTS features (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER,
      description TEXT NOT NULL,
      status TEXT DEFAULT 'todo' CHECK( status IN ('todo', 'in-progress', 'done')),
      is_focused BOOLEAN DEFAULT 0,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      total_time_spent INTEGER DEFAULT 0,
      time_start DATETIME,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    )
    `);
  db.exec(`
      CREATE TABLE IF NOT EXISTS subtasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        feature_id INTEGER,
        description TEXT NOT NULL,
        is_done BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (feature_id) REFERENCES features(id) ON DELETE CASCADE
        )
      `);
  db.exec(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_active_project ON projects(name);
      CREATE INDEX IF NOT EXISTS idx_projects_active ON projects(is_active);
      CREATE INDEX IF NOT EXISTS idx_features_project ON features(project_id);
      CREATE INDEX IF NOT EXISTS idx_features_status ON features(status);
      CREATE INDEX IF NOT EXISTS idx_features_focused ON features(is_focused);
      CREATE INDEX IF NOT EXISTS idx_subtasks_feature ON subtasks(feature_id);
      `);
};
