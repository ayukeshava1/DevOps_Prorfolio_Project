import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ blog }) => {
  return (
    <motion.div 
      className="blog-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
    >
      <Link to={`/blog/${blog.id}`} className="card-link">
        {blog.image_url && (
          <img src={blog.image_url} alt="Blog Thumbnail" className="thumbnail" />
        )}
        <div className="blog-content">
          <h3>{blog.title}</h3>
          <p className="snippet">{blog.snippet}</p>
          <div className="info">
            <span className="published">
              {blog.is_published ? '✅ Published' : '⏳ Draft'}
            </span>
            <span className="date">
              📅 {blog.created_at ? new Date(blog.created_at).toLocaleDateString() : 'Unknown'}
            </span>
            <span className="author">✍️ {blog.author_name}</span>
          </div>
          <div className="stats">
            <span>👍 {blog.likes ?? 0}</span>
            <span>👎 {blog.dislikes ?? 0}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
