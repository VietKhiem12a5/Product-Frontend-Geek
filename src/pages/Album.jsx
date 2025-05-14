import React from 'react';
import { Typography } from 'antd';
import AlbumDetail from '../components/AlbumDetail.jsx';

const { Title } = Typography;

const Album = () => (
  <div style={{ padding: 24 }}>
    <Title level={2}>Album Detail</Title>
    <AlbumDetail />
  </div>
);

export default Album;