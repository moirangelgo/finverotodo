export type ServerTask = {
  _id?: string;        // mongo default field OR
  id?: string;         // some backends may return id
  title: string;
  description?: string | null;
  completed: boolean;
  creation_date: string; // ISO string
};

// Normalized client Task
export type Task = {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  creation_date: string;
};
