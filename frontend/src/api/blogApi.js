// File: /api/blogApi.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000/api' });

export const fetchBlogs = () => API.get('/blogs/');
export const getBlogById = (id) => API.get(`/blogs/${id}`);
export const likeBlog = (id) => API.post(`/blogs/${id}/like`);
export const dislikeBlog = (id) => API.post(`/blogs/${id}/dislike`);
export const createBlog = (newBlog) => API.post('/blogs/', newBlog);
export const updateBlog = (id, data) => API.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Auth
export const registerUser = (data) => API.post('/users/register', data);
export const loginUser = (data) => API.post('/users/login', data);

