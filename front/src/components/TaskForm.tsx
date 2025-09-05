import { Form, Input, Button, Row, Col } from "antd";

type Props = {
  onAdd: (title: string, description?: string) => void;
};

export default function TaskForm({ onAdd }: Props) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onAdd(values.title, values.description);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} style={{ marginBottom: 16 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>   
          <Form.Item name="title" label="Título" rules={[{ required: true, message: "Título requerido" }]}>
            <Input placeholder="Nueva tarea..." />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="description" label="Descripción">
            <Input placeholder="Descripción (opcional)" />
          </Form.Item>
        </Col>
        <Col xs={24} md={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Agregar
            </Button>
          </Form.Item>
        </Col>        
      </Row>
    </Form>
  );
}
