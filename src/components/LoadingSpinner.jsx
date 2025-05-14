import React from 'react';
import { Spin } from 'antd';

const LoadingSpinner = ({ size = 'large', fullScreen = true }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: fullScreen ? '100vh' : 'auto',
    }}
  >
    <Spin size={size} />
  </div>
);

export default LoadingSpinner;