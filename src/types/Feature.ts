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

export type FeatureWithSubtaskRow = {
  feature_id: number;
  project_id: number;
  feature_description: string;
  status: "todo" | "in-progress" | "done";
  is_focused: number | boolean;
  notes: string | null;
  feature_created_at: string;
  total_time_spent: number;
  time_start: string | null;

  subtask_id: number | null;
  subtask_description: string | null;
  subtask_is_done: number | null;
  subtask_created_at: string | null;
};
