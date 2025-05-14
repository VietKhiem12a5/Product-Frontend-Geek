import React from 'react';
import {
  Spin,
  Avatar,
  Typography,
  Space,
  Card,
  Table,
  Breadcrumb,
  Button,
  Divider,
} from 'antd';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  fetchUser,
  fetchUserAlbums,
  getAvatarUrl,
} from '../api';
import {
  ArrowLeftOutlined,
  UserOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import '../styles/App.css';

const { Title, Text } = Typography;

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
  });

  const { data: albums, isLoading: albumsLoading } = useQuery({
    queryKey: ['userAlbums', id],
    queryFn: () => fetchUserAlbums(id),
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => <span>{text}</span>,
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
    <Spin spinning={userLoading || albumsLoading}>
      <div style={{ padding: 24 }}>
        {/* Breadcrumb + Tiêu đề */}
        <Breadcrumb style={{ marginBottom: 16,fontSize: 20 }}>
        <UserOutlined />
          <Breadcrumb.Item>
            <Link to="/users">Users</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Show</Breadcrumb.Item>
        </Breadcrumb>

        <Space align="center" style={{ marginBottom: 16 }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate('/users');
              }
            }}
          />
          <Title level={3} style={{ margin: 0 }}>
            Show User
          </Title>
        </Space>

        {/* Card chứa thông tin user */}
        <Card style={{ borderRadius: 8 }}>
          {user && (
            <>
              <Space size="middle" align="center" style={{ marginBottom: 12 }}>
                <Avatar
                  src={getAvatarUrl(user.name)}
                  size={48}
                />
                <div>
                  <Text strong style={{ fontSize: 16 }}>{user.name}</Text><br />
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </div>
              </Space>

              <Divider />

              <Title level={4} style={{ marginBottom: 16 }}>Albums</Title>

              <Table
                columns={columns}
                dataSource={albums}
                rowKey="id"
                pagination={false}
                style={{ borderRadius: 8 }}
              />
            </>
          )}
        </Card>
      </div>
    </Spin>
  );
};

export default UserDetail;
