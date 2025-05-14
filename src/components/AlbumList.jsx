import React, { useMemo } from 'react';
import { Table, Avatar, Spin, Typography, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAlbums, fetchUser, getAvatarUrl } from '../api';
import '../styles/App.css';

const { Title } = Typography;

const UserCell = ({ userId }) => {
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });

  if (userLoading || !user) {
    return <Spin size="small" />;
  }

  return (
    <Link to={`/users/${userId}`}>
      <Avatar src={getAvatarUrl(user.name)} alt={`${user.name}'s avatar`} />
      <span style={{ marginLeft: 8 }}>{user.name}</span>
    </Link>
  );
};

const AlbumList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('current') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

  const { data: albums, isLoading } = useQuery({
    queryKey: ['albums', page, pageSize],
    queryFn: () => fetchAlbums(page, pageSize),
  });

  const columns = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => <span>{text}</span>,
      },
      {
        title: 'User',
        dataIndex: 'userId',
        key: 'user',
        render: (userId) => <UserCell userId={userId} />,
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
    ],
    []
  );

  const dataSource = useMemo(() => {
  if (!albums?.data) return [];
  return albums.data.map((album) => ({
    ...album,
    userId: Math.floor((album.id - 1) / 10) + 1, // Tính userId dựa trên album.id (giả định mỗi user có 10 albums)
  }));
  }, [albums]);

  return (
    <div className="content-container">
      <Title level={2}>Albums</Title>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: page,
          pageSize,
          total: albums?.total || 100,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          showQuickJumper: false,
          onChange: (newPage, newPageSize) => {
            setSearchParams({
              current: newPage.toString(),
              pageSize: newPageSize.toString(),
            });
          },
        }}
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default AlbumList;