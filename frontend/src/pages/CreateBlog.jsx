// /pages/CreateBlog.jsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createBlog } from '../api/blogApi';
import { motion } from 'framer-motion';
import './Create_Blog.css';

const CreateBlog = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: '',
    snippet: '',
    content: '',
    image_url: '',
    video_url: '',
    is_published: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBlog(formData);
      history.push('/');
    } catch (err) {
      console.error('Failed to create blog:', err);
    }
  };

  return (
    <motion.div 
      className="form-container"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="animated-heading">📝 Create a New Blog</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <motion.label whileHover={{ scale: 1.02 }}>Title</motion.label>
        <motion.input 
          type="text" 
          name="title" 
          value={formData.title}
          onChange={handleChange}
          required
          whileFocus={{ scale: 1.01 }}
        />

        <label>Snippet</label>
        <input 
          type="text" 
          name="snippet" 
          value={formData.snippet}
          onChange={handleChange}
        />

        <label>Content</label>
        <textarea 
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>

        <label>Image URL</label>
        <input 
          type="text" 
          name="image_url" 
          value={formData.image_url}
          onChange={handleChange}
        />

        <label>Video URL</label>
        <input 
          type="text" 
          name="video_url" 
          value={formData.video_url}
          onChange={handleChange}
        />

        <div className="checkbox-group">
          <label>
            <input 
              type="checkbox" 
              name="is_published"
              checked={formData.is_published}
              onChange={handleChange}
            />
            Publish Now
          </label>
        </div>

        <motion.button 
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🚀 Create Blog
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CreateBlog;