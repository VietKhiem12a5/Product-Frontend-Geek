import React from 'react';
import { Table, Avatar, Spin, Button } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers, getAvatarUrl } from '../api';
import { EyeOutlined } from '@ant-design/icons';
import '../styles/App.css';

const UserList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('current') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

  const { data: users, isLoading } = useQuery({
    queryKey: ['users', page, pageSize],
    queryFn: () => fetchUsers(page, pageSize),
  });

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={getAvatarUrl(text)} alt={`${text}'s avatar`} />
          <span style={{ marginLeft: 8 }}>{text}</span>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => <a href={`mailto:${email}`}>{email}</a>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => <a href={`tel:${phone}`}>{phone}</a>,
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      render: (website) => (
        <a href={`http://${website}`} target="_blank" rel="noopener noreferrer">
          {website}
        </a>
      ),
    },
   {
        title: 'Actions',
        key: 'action',
        render: (_, record) => (
          <Link to={`/albums/${record.id}`}>
            <div className="action-box">
              <EyeOutlined style={{ marginRight: 6 }} />
              <span className="action-text">Show</span>
            </div>
          </Link>
        ),
      },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users?.data}
      rowKey="id"
      loading={isLoading}
      pagination={{
        current: page,
        pageSize,
        total: users?.total || 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
        onChange: (newPage, newPageSize) => {
          setSearchParams({
            current: newPage.toString(),
            pageSize: newPageSize.toString(),
          });
        },
      }}
    />
  );
};

export default UserList;