// /pages/EditBlog.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getBlogById, updateBlog } from '../api/blogApi';
import { motion } from 'framer-motion';
import './Create_Blog.css'; // Reuse same styles

const EditBlog = () => {
  const { id } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: '',
    snippet: '',
    content: '',
    image_url: '',
    video_url: '',
    is_published: true,
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogById(id);
        const data = response.data;
        setFormData({
          title: data.title || '',
          snippet: data.snippet || '',
          content: data.content || '',
          image_url: data.image_url || '',
          video_url: data.video_url || '',
          is_published: data.is_published,
        });
      } catch (err) {
        console.error('Failed to fetch blog for editing:', err);
      }
    };

    fetchBlog();
  }, [id]);

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
      await updateBlog(id, formData);
      history.push(`/blog/${id}`);
    } catch (err) {
      console.error('Failed to update blog:', err);
    }
  };

  return (
    <motion.div 
      className="form-container"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="animated-heading">✏️ Edit Blog</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <label>Title</label>
        <input 
          type="text" 
          name="title" 
          value={formData.title}
          onChange={handleChange}
          required
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
          ✅ Update Blog
        </motion.button>
      </form>
    </motion.div>
  );
};

export default EditBlog;
