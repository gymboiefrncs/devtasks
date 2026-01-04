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
): Feature | undefined => {
  const result = db
    .prepare(
      `
    INSERT INTO features (project_id, description) VALUES (?, ?) RETURNING *
    `
    )
    .get(activeProjectId, description) as Feature | undefined;
  if (!result) throw new Error("DATAEBSAE_ERROR: failed to add feature");
  return result;
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
export const getAllFeaturesDefault = (id: number): Feature[] => {
  const result = db
    .prepare(
      `
    SELECT * FROM features WHERE status = ? and project_id = ?
    `
    )
    .all("in-progress", id);
  return result as Feature[];
};

export const getAllFeaturesByStatus = (
  status: Status,
  id: number
): Feature[] => {
  const result = db
    .prepare(
      `
    SELECT * FROM features WHERE status = ? AND project_id = ?
    `
    )
    .all(status, id);
  return result as Feature[];
};

export const getAllFeatures = (id: number): Feature[] => {
  const result = db
    .prepare(
      `
    SELECT * FROM features WHERE project_id = ?
    `
    )
    .all(id);
  return result as Feature[];
};

// -----------
// Delete feat
// -----------
export const deleteFeature = (id: number) => {
  const result = db
    .prepare(
      `
    DELETE FROM features WHERE id = ?
    `
    )
    .run(id);
  return result.changes;
};

// ---------------
// Focus commands
// ---------------
export const focusFeature = (featId: number): Feature | undefined => {
  const result = db
    .prepare(
      "UPDATE features SET is_focused = ?, status = 'in-progress' WHERE id = ? RETURNING *"
    )
    .get(1, featId);
  if (!result) throw new Error("DATAEBSAE_ERROR: failed to add feature");

  return result as Feature | undefined;
};

export const setUnfocusFeature = (featId: number): Feature | undefined => {
  const result = db
    .prepare(
      "UPDATE features SET is_focused = ?, status = 'todo' WHERE id = ? RETURNING *"
    )
    .get(0, featId);
  if (!result) throw new Error("DATAEBSAE_ERROR: failed to add feature");

  return result as Feature | undefined;
};

export const setUnfocusAllFeature = () => {
  const result = db.transaction(() => {
    db.prepare("UPDATE features SET is_focused = 0, status = 'todo'").run();
  });

  result();
};
