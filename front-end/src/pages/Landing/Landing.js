import React, { useState, useEffect } from 'react';
import {
  Form,
  Card,
  Col,
  Row,
  Typography,
  Button,
  message,
  Space,
  Layout,
  Select,
  Input,
  Spin,
  InputNumber,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import './index.scss';

const { Title } = Typography;

export const Landing = () => {
  const [form] = Form.useForm();
  const [dataPath, setDataPath] = useState([]);
  const [loading, setLoading] = useState(false);

  const onFinish = (formData) => {
    const { startPoint: start, endPoint: goal, points } = formData;
    const listFirst = points.map((item) => item.first);
    const listEnd = points.map((item) => item.end);
    const listPoint = [...new Set([...listFirst, ...listEnd])];

    const graph = listPoint.reduce((pre, cur) => ({ ...pre, [cur]: [] }), {});
    points.forEach((element) => {
      graph[element.first].push(element.end);
    });
    const data = {
      graph,
    };

    fetch(`http://localhost:8000/ids?start=${start}&goal=${goal}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setDataPath(data.path))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="screen">
        <Form
          form={form}
          name="dynamic_form_nest_item"
          className="form-input"
          onFinish={onFinish}
          autoComplete="off">
          <h4>Đường đi từ các điểm</h4>
          <Form.List name="points">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                    }}
                    align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'first']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing start point',
                        },
                      ]}>
                      <Input placeholder="Start point" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'end']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing end point',
                        },
                      ]}>
                      <Input placeholder="End point" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}>
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <h4>Điểm bắt đầu</h4>

          <Form.Item name="startPoint">
            <Input />
          </Form.Item>
          <h4>Điểm kết thúc</h4>

          <Form.Item name="endPoint">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div
          style={{
            fontSize: 18,
            fontWeight: 500,
          }}>
          {!!dataPath.length &&
            dataPath.map((item, index) => (
              <span>
                {item} {index !== dataPath.length - 1 ? 'đến' : ''}{' '}
              </span>
            ))}
        </div>
      </div>
    </>
  );
};
