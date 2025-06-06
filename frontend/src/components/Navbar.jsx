import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaPenNib, FaEnvelope, FaBars } from 'react-icons/fa';
import './Navbar.css';

const navItems = [
  { path: '/', label: 'Home', icon: <FaHome /> },
  { path: '/about', label: 'About Me', icon: <FaUser /> },
  { path: '/blog', label: 'Blog', icon: <FaPenNib /> },
  { path: '/connect', label: 'Connect', icon: <FaEnvelope /> },
];

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <motion.nav
      className="animated-navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 70 }}
    >
      <div className="brand">✨ Keshava World</div>

      <div className="hamburger" onClick={toggleMenu}>
        <FaBars />
      </div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
            <Link to={item.path}>
              {item.icon}
              <span>{item.label}</span>
              {location.pathname === item.path && (
                <motion.div
                  className="underline"
                  layoutId="underline"
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default Navbar;
