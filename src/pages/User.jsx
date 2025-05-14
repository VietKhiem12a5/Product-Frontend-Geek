import React from 'react';
import { Typography } from 'antd';
import UserDetail from '../components/UserDetail.jsx';

const { Title } = Typography;

const User = () => (
  <div style={{ padding: 24 }}>
    <Title level={2}>User Detail</Title>
    <UserDetail />
  </div>
);

export default User;