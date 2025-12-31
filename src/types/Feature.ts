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
