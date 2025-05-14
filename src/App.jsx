import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Albums from './pages/Albums';
import Album from './pages/Album';
import Users from './pages/Users';
import User from './pages/User';
import './styles/App.css';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarWidth = 200;
  const sidebarCollapsedWidth = 80;
  const borderWidth = 1;
  const gap = 50;

  const effectiveSidebarWidth = collapsed ? sidebarCollapsedWidth + borderWidth : sidebarWidth + borderWidth;
  const contentMarginLeft = effectiveSidebarWidth + gap;

  const menuItems = [
  {
    key: '/albums',
    label: 'Albums',
    icon: <span className="custom-album-icon" />,
    onClick: () => navigate('/albums'),
  },
  {
    key: '/users',
    label: 'Users',
    icon: <span className="custom-user-icon" />,
    onClick: () => navigate('/users'),
  },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        className="custom-header"
        style={{
          padding: '0 24px',
          background: '#fff',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://geekup.vn/Icons/geekup-logo-general.svg"
            alt="Geek Up Logo"
            style={{ height: '40px', width: 'auto' }}
          />
        </div>
      </Header>

      <div
        className="body-wrapper"
        style={{
          marginTop: 64,
          display: 'flex',
          minHeight: 'calc(100vh - 64px)',
          flex: 1,
        }}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="white-sider"
          width={sidebarWidth}
          collapsedWidth={sidebarCollapsedWidth}
          style={{
            position: 'fixed',
            top: 64,
            left: 0,
            height: 'calc(100vh - 64px)',
            zIndex: 998,
            overflow: 'auto',
          }}
        >
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
          />

          <div
            className="collapse-toggle"
            onClick={() => setCollapsed(!collapsed)}
            style={{
              position: 'absolute',
              bottom: '16px',
              width: '100%',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 1024 1024"
              fill="currentColor"
              style={{
                fontSize: '16px',
                transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s',
              }}
            >
              <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" />
            </svg>
          </div>
        </Sider>

        <Content
          style={{
            marginLeft: contentMarginLeft,
            marginTop: 50,
            marginRight: 50,
            padding: 24,
            flex: 1,
            minHeight: '100%',
            transition: 'margin-left 0.3s',
          }}
        >
          <ErrorBoundary navigate={navigate}>
            <Routes>
              <Route path="/" element={<Albums />} />
              <Route path="/albums" element={<Albums />} />
              <Route path="/albums/:id" element={<Album />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
            </Routes>
          </ErrorBoundary>
        </Content>
      </div>
    </Layout>
  );
};

export default App;
