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
  Spin,
} from 'antd';

import './index.scss';



const { Title } = Typography;

export const Landing = () => {
  const [form] = Form.useForm();
  const [info, setInfo] = useState(null);





  return (
    <>
      <div className="screen">
        {info?.length ? (
          <>
          
          </>
        ) : (
          <Spin size="large" className="form-input" />
        )}
      </div>
    </>
  );
};
