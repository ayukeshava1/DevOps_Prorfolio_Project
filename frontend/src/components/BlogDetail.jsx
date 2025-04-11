// File: /components/BlogDetail.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './BlogDetail.css';

const BlogDetail = ({ blog, onLike, onDislike }) => {
  return (
    <motion.div 
      className="blog-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>{blog.title}</h1>
      
      <div className="blog-meta">
        <span>📅 {new Date(blog.created_at).toLocaleDateString()}</span>
        <span>{blog.is_published ? '✅ Published' : '⏳ Draft'}</span>
      </div>

      {blog.image_url && (
        <img src={blog.image_url} alt="Blog" className="blog-image" />
      )}

      {blog.video_url && (
        <video controls className="blog-video">
          <source src={blog.video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <p className="blog-content">{blog.content}</p>

      <div className="blog-actions">
        <button onClick={onLike}>👍 {blog.likes}</button>
        <button onClick={onDislike}>👎 {blog.dislikes}</button>
      </div>
    </motion.div>
  );
};

export default BlogDetail;
