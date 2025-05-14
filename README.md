# Product Frontend - - Geek Up Technical Assessment
Ứng dụng web hiển thị danh sách albums và users, tích hợp API từ JSONPlaceholder và UI-Avatars, đáp ứng yêu cầu giao diện responsive và chức năng điều hướng.
Yêu cầu hệ thống
## Cài đặt
Clone repository:
```bash
git clone https://github.com/VietKhiem12a5/Product-Frontend-Geek.git
cd <repository-folder>
```
Cài đặt dependencies:
```bash
npm install
```
Chạy ứng dụng ở chế độ development:
```bash
npm run dev
```
Truy cập: http://localhost:5173

## Stack
- React 18 + Vite: Framework và công cụ build nhanh, hỗ trợ HMR.
- Ant Design: Thư viện UI cho giao diện responsive, đẹp mắt.
- React Router DOM: Điều hướng và đồng bộ phân trang với URL.
- React Query: Quản lý API calls hiệu quả, hỗ trợ caching và loading state.
- Axios: Gửi HTTP requests đến JSONPlaceholder API.
- UI-Avatars: Tạo avatar động dựa trên tên user.

## Cấu trúc
- /src: Mã nguồn chính
- /api: Hàm gọi API (fetch users, albums, photos).
- /components: Component tái sử dụng (UserList, AlbumDetail, v.v.).
- /pages: Trang chính (Albums, Users, User, Album).
- /styles: File CSS tùy chỉnh.

## API sử dụng

Dữ liệu: https://jsonplaceholder.typicode.com/ 
Avatar: https://ui-avatars.com/ 

## Chức năng chính

- Album Module:
+ Danh sách albums (ID, Title, User, Actions) với phân trang đồng bộ URL.
+ Chi tiết album: Hiển thị user (avatar, tên, email), tiêu đề, và danh sách ảnh (thumbnail, nhấp để xem ảnh lớn).


- User Module:
+ Danh sách users (ID, Avatar, Name, Email, Phone, Website, Actions).
+ Chi tiết user: Hiển thị thông tin user và danh sách albums.


