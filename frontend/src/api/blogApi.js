// File: /api/blogApi.js
import axios from 'axios';

// Just use '/api' as baseURL — Ingress will route this to backend
const API = axios.create({ baseURL: '/api' });

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
