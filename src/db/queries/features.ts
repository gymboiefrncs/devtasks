import type {
  Feature,
  FeatureWithSubtaskRow,
  Status,
} from "../../types/Feature.js";
import { db } from "../database.js";

// -----------
// Add feature
// -----------
export const addFeature = (
  activeProjectId: number,
  description: string
): Feature => {
  const result = db
    .prepare(
      `
    INSERT INTO features (project_id, description) VALUES (?, ?)
    `
    )
    .run(activeProjectId, description);

  const getResult = db
    .prepare(
      `
    SELECT * FROM features WHERE id = ?
    `
    )
    .get(result.lastInsertRowid) as Feature;
  return getResult;
};

// -----------
// Show feature details
// -----------

export const getFeatureDetails = (id: number): FeatureWithSubtaskRow[] => {
  const result = db
    .prepare(
      `
      SELECT
        f.id AS feature_id,
        f.project_id,
        f.description AS feature_description,
        f.status,
        f.is_focused,
        f.notes,
        f.created_at AS feature_created_at,
        f.total_time_spent,
        f.time_start,
        s.id AS subtask_id,
        s.description AS subtask_description,
        s.is_done AS subtask_is_done,
        s.created_at AS subtask_created_at
      FROM features f
      LEFT JOIN subtasks s ON f.id = s.feature_id
      WHERE f.id = ?
    `
    )
    .all(id);

  return result as FeatureWithSubtaskRow[];
};

// -----------
// Get feature
// -----------
export const getAllFeaturesDefault = (): Feature[] => {
  const result = db
    .prepare(
      `
    SELECT * FROM features WHERE status = ?
    `
    )
    .all("in-progress");
  return result as Feature[];
};

export const getAllFeaturesByStatus = (status: Status): Feature[] => {
  const result = db
    .prepare(
      `
    SELECT * FROM features WHERE status = ?
    `
    )
    .all(status);
  return result as Feature[];
};

export const getAllFeatures = (): Feature[] => {
  const result = db
    .prepare(
      `
    SELECT * FROM features
    `
    )
    .all();
  return result as Feature[];
};
