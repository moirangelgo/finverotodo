import { useEffect, useState } from "react";
import { Layout, Spin, message } from "antd";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import type { Task } from "./types";
import * as tasksService from "./services/tasks";
import { Image } from "antd";
import logo from "./assets/logo.svg";

const { Header, Content } = Layout;

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [messageApi] = message.useMessage();

  const load = async () => {
    setLoading(true);
    try {
      const data = await tasksService.getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      message.error("No se pudieron obtener las tareas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleAdd = async (title: string, description?: string) => {
    try {
      const newTask = await tasksService.createTask({ title, description });
      setTasks(prev => [newTask, ...prev]);
      messageApi.open({
        type: 'success',
        content: 'Tarea creada',
      });
    } catch (err) {
      console.error(err);
      messageApi.open({
        type: 'error',
        content: 'Error creando tarea',
      });
    }
  };

  const handleToggle = async (id: string, newCompleted: boolean) => {
    // optimista: actualizar UI inmediatamente
    const prev = tasks;
    setTasks(ts => ts.map(t => (t.id === id ? { ...t, completed: newCompleted } : t)));
    try {
      const updated = await tasksService.updateTaskCompleted(id, newCompleted);
      setTasks(ts => ts.map(t => (t.id === id ? updated : t)));      
    } catch (err) {
      console.error(err);
      setTasks(prev);      
    }
  };

  const handleDelete = async (id: string) => {
    const prev = tasks;
    setTasks(ts => ts.filter(t => t.id !== id));
    try {
      await tasksService.deleteTask(id);      
    } catch (err) {
      console.error(err);
      setTasks(prev);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", padding: 24, backgroundColor: 'white' }}>
      <Header style={{ background: "transparent", padding: 0 }}>
        <Image
          width={200}
          src={logo}
        />
      </Header>
      <br /><br />
      <Content>
        <TaskForm onAdd={handleAdd} />
        {loading ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <Spin />
          </div>
        ) : (
          <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
        )}
      </Content>
    </Layout>
  );
}
