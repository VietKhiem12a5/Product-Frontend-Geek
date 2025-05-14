import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Spin,
  Avatar,
  Typography,
  Space,
  Image,
  Button,
  Breadcrumb,
  Card,
  Divider,
  Row,
  Col,
} from 'antd';
import { UnorderedListOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { fetchAlbum, fetchUser, fetchPhotos, getAvatarUrl } from '../api';

const { Title, Text } = Typography;

const AlbumDetail = () => {
  const { id } = useParams();
  const [visibleCount, setVisibleCount] = useState(20);
  const { PreviewGroup } = Image;
  const navigate = useNavigate();

  const { data: album, isLoading: albumLoading } = useQuery({
    queryKey: ['album', id],
    queryFn: () => fetchAlbum(id),
  });

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user', album?.userId],
    queryFn: () => fetchUser(album?.userId),
    enabled: !!album?.userId,
  });

  const { data: photos, isLoading: photosLoading } = useQuery({
    queryKey: ['photos', id],
    queryFn: () => fetchPhotos(id),
  });

  return (
     <Spin spinning={albumLoading || userLoading || photosLoading} style={{background: 'transparent !important'}}>
      <div style={{ padding: 24}}>
        {/* Breadcrumb + Tiêu đề */}
        <Breadcrumb style={{ marginBottom: 16, fontSize:20 }}>
        <UnorderedListOutlined/>
          <Breadcrumb.Item>
            <Link to="/albums">Albums</Link>
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
          <Title level={3} style={{ margin: 0 }}>Show Album</Title>
        </Space>


        {/* Nội dung chính trong Card */}
        <Card style={{ borderRadius: 8, marginBottom: 0, backgroundColor: '#fff' }}>
          {/* Avatar + User info */}
          {user && (
            <Space direction="vertical" size={0} style={{ marginBottom: 12 }}>
              <Link to={`/users/${user.id}`} style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={getAvatarUrl(user.name)} size={48} style={{ marginRight: 12 }} />
                <div>
                  <Text strong style={{ fontSize: 16, color: '#1677ff' }}>{user.name}</Text><br />
                </div>
              </Link>
              <a href={`mailto:${user.email}`} style={{ fontSize: 13, marginLeft:60 }}>{user.email}</a>
            </Space>
          )}

          <Divider style={{ marginTop: 12, marginBottom: 16 }} />

          {/* Tiêu đề album */}
          <Title level={4} style={{ marginBottom: 24 }}>{album?.title}</Title>

          {/* Ảnh theo grid */}
          <PreviewGroup>
            <Row gutter={[16, 16]}>
              {photos?.slice(0, visibleCount).map((photo) => (
                <Col xs={24} sm={12} md={8} lg={6} key={photo.id}>
                  <Image
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    preview={{ 
                      src: photo.url,
                      visible: false, // Bỏ qua prop visible nếu không cần control
                    }}
                    style={{ width: '100%' }}
                  />
                  <Text>{photo.title}</Text>
                </Col>
              ))}
            </Row>
          </PreviewGroup>

          {/* Nút Load More */}
          {photos?.length > visibleCount && (
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Button onClick={() => setVisibleCount((prev) => prev + 20)}>
                Load More
              </Button>
            </div>
          )}
        </Card>
      </div>
    </Spin> 
  );
};

export default AlbumDetail;
