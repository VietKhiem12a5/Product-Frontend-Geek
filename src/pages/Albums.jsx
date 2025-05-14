import React from 'react';
import { Typography } from 'antd';
import AlbumList from '../components/AlbumList.jsx';

const { Title } = Typography;

const Albums = () => (
  <div style={{ padding: 24 }}>
    <AlbumList />
  </div>
);

export default Albums;