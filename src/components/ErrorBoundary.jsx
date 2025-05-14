import React from 'react';
import { Alert, Button } from 'antd';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    const { navigate } = this.props; // Lấy navigate từ props
    if (this.state.hasError) {
      return (
        <Alert
          message="Đã xảy ra lỗi"
          description={this.state.error?.message || 'Đã xảy ra lỗi không xác định.'}
          type="error"
          showIcon
          action={
            <div>
              <Button onClick={() => window.location.reload()}>Tải lại</Button>
              <Button onClick={() => navigate(-1)} style={{ marginLeft: 8 }}>Quay lại</Button>
            </div>
          }
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;