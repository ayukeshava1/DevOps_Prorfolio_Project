import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getBlogById, likeBlog, dislikeBlog, deleteBlog } from '../api/blogApi';
import BlogDetail from '../components/BlogDetail';
import "./BlogView.css";

const BlogView = () => {
  const { id } = useParams();
  const history = useHistory();
  const [blog, setBlog] = useState(null);
  const user = JSON.parse(localStorage.getItem('user')); // assuming user info is stored after login

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogById(id);
        setBlog(response.data);
      } catch (err) {
        console.error('Failed to fetch blog:', err);
      }
    };

    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    await likeBlog(id);
    const updated = await getBlogById(id);
    setBlog(updated.data);
  };

  const handleDislike = async () => {
    await dislikeBlog(id);
    const updated = await getBlogById(id);
    setBlog(updated.data);
  };

  const handleEdit = () => {
    history.push(`/edit/${id}`);
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this blog?');
    if (confirm) {
      try {
        await deleteBlog(id);
        history.push('/');
      } catch (err) {
        console.error('Failed to delete blog:', err);
      }
    }
  };

  if (!blog) return <p>Loading...</p>;

  const isOwner = user?.username === blog?.author;

  return (
    <div className="view-container">
      <BlogDetail blog={blog} onLike={handleLike} onDislike={handleDislike} />

      <p className="blog-meta">👤 Author: <strong>{blog.author}</strong></p>

      {isOwner && (
        <div className="owner-actions">
          <button onClick={handleEdit} className="btn-edit">✏️ Edit</button>
          <button onClick={handleDelete} className="btn-delete">🗑️ Delete</button>
        </div>
      )}
    </div>
  );
};

export default BlogView;
