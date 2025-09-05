import { api } from "./api";
import type { ServerTask, Task } from "../types";

const normalize = (t: ServerTask): Task => {
  const id = t.id ?? t._id ?? "";
  return {
    id,
    title: t.title,
    description: t.description ?? null,
    completed: t.completed,
    creation_date: t.creation_date,
  };
};

export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get<ServerTask[]>("/tasks");
  return res.data.map(normalize);
};

export const createTask = async (payload: { title: string; description?: string }) => {
  const res = await api.post<ServerTask>("/tasks", payload);
  return normalize(res.data);
};

// Nota: el backend definido tiene PUT /tasks/{task_id} con param `completed` (query)
// Usamos axios.put(url, null, { params: { completed }})
export const updateTaskCompleted = async (id: string, completed: boolean) => {
  const res = await api.put<ServerTask>(`/tasks/${id}`, null, { params: { completed } });
  return normalize(res.data);
};

export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
  return;
};
