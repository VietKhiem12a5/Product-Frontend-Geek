import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchAlbums = async (page, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/albums`, {
      params: { _page: page, _limit: limit },
    });
    const total = parseInt(response.headers['x-total-count']) || 100; // Tổng số bản ghi
    return { data: response.data, total };
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
};

export const fetchAlbum = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/albums/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching album:', error);
    throw error;
  }
};

export const fetchUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const fetchUsers = async (page, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: { _page: page, _limit: limit },
    });
    const total = parseInt(response.headers['x-total-count']) || 10;
    return { data: response.data, total };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchPhotos = async (albumId) => {
  try {
    const response = await axios.get(`${API_URL}/photos`, {
      params: { albumId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const fetchUserAlbums = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/albums`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user albums:', error);
    throw error;
  }
};

export const getAvatarUrl = (name) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=32&background=random&color=ffffff&bold=true`;
};
