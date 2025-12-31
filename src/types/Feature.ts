export type Feature = {
  id: number;
  project_id: number;
  description: string;
  status: "todo" | "in-progress" | "done";
  is_focused: boolean;
  notes: string;
  created_at: string;
  total_time_spent: number;
  time_start: string;
};

export type Status = {
  status: "todo" | "in-progress" | "done";
};

export interface FeatureWithSubtaskRow {
  // Feature Columns (aliased)
  feature_id: number;
  project_id: number;
  feature_description: string;
  status: Status; // Assuming you have a Status type defined
  is_focused: number | boolean; // SQLite uses 0/1 for booleans
  notes: string | null;
  feature_created_at: string; // SQLite dates are usually stored as strings
  total_time_spent: number;
  time_start: string | null;

  // Subtask Columns (aliased)
  subtask_id: number | null; // Nullable if using LEFT JOIN
  subtask_description: string | null;
  subtask_is_done: number | boolean | null;
  subtask_created_at: string | null;
}
