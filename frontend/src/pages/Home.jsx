import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchBlogs } from '../api/blogApi';
import BlogCard from '../components/BlogCard';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await fetchBlogs();
        setBlogs(response.data || []);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const handleCreateBlog = () => {
    history.push('/create');
  };

  const userBlogs = blogs.filter((blog) => blog.author_id === user?.id);

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <motion.div
        className="hero-section gradient-bg"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="hero-title">🚀 Welcome to DevSphere</h1>
        <p className="hero-subtitle">Where your tech thoughts turn into real stories 💡</p>
      </motion.div>

      {/* Create Blog Button */}
      {user && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="create-blog-button pulse"
          onClick={handleCreateBlog}
        >
          <PlusCircle className="icon" size={20} />
          Create Blog
        </motion.button>
      )}

      {/* Blog Section */}
      {loading ? (
        <div className="loader">Loading your blogs...</div>
      ) : userBlogs.length === 0 ? (
        <motion.div
          className="no-blogs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p>✨ You haven't posted anything yet. Start sharing your brilliance!</p>
        </motion.div>
      ) : (
        <motion.div
          className="blog-grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {userBlogs.map((blog) => (
            <motion.div
              key={blog.id}
              className="card-wrapper"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Home;
