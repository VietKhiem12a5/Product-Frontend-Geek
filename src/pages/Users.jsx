import React from 'react';
import { Typography } from 'antd';
import UserList from '../components/UserList.jsx';

const { Title } = Typography;

const Users = () => (
  <div style={{ padding: 24 }}>
    <Title level={2}>Users</Title>
    <UserList />
  </div>
);

export default Users;