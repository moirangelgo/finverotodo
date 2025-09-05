import { List, Checkbox, Button, Space, Tag, Popconfirm, message } from "antd";
import type { Task } from "../types";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

type Props = {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({ tasks, onToggle, onDelete }: Props) {

  const [messageApi, contextHolder] = message.useMessage();

  const handleConfirm = (id: string) => {
    onDelete(id);
    messageApi.open({
      type: 'success',
      content: 'Tarea borrada con éxito 👌',
    });
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    messageApi.open({
      type: 'error',
      content: 'Operación cancelada ❌',
    });
  }

  const handleToggle = (id: string, completed: boolean) => {
    onToggle(id, completed);
    messageApi.open({
      type: 'info',
      content: `La tarea se marcó como ${completed ? 'completada' : 'incompleta'} ℹ️`,
    });
  }

  return (
    <>
      {contextHolder} 
      <List
          bordered
          dataSource={tasks}
          renderItem={item => (
            <List.Item
              actions={[
                <Popconfirm
                  title="Borrar tarea"
                  description="¿Seguro de borrar la tarea?"
                  onConfirm={() => handleConfirm(item.id)}
                  onCancel={handleCancel}
                  okText="Sí"
                  cancelText="No"
                >           
                    <Button
                      key="del"
                      color="danger" variant="filled"
                      icon={<DeleteOutlined />}                  
                    />
              </Popconfirm>                        
              ]}
            >
              <List.Item.Meta
                title={
                  <Space>
                    <Checkbox
                      checked={item.completed}
                      onChange={e => handleToggle(item.id, e.target.checked)}
                    />
                    <span style={{ textDecoration: item.completed ? "line-through" : "none" }}>
                      {item.title}
                    </span>
                    {item.completed ? <Tag color="success">Completada</Tag> : null}
                  </Space>
                }
                description={item.description ?? ""}
              />
              <div>{dayjs(item.creation_date).format("DD/MM/YYYY")}</div>
            </List.Item>
          )}
        />      
    </>  
  );
}
