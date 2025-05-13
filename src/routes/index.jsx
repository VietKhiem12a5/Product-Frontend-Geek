import { BrowserRouter, Routes, Route } from "react-router-dom";
import AlbumList from "../pages/AlbumList";
import AlbumDetail from "../pages/AlbumDetail";
import UserList from "../pages/UserList";
import UserDetail from "../pages/UserDetail";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AlbumList />} />
        <Route path="/albums/:id" element={<AlbumDetail />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}