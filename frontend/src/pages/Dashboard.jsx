// src/pages/Dashboard.jsx
import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-card">
        <h1 className="intro-title">👋 Hey, I'm <span className="highlight">Keshava</span></h1>
        <p className="intro-subtitle">Engineer | Cloud Enthusiast | DevOps Explorer 🚀</p>

        <div className="glow-divider"></div>

        <div className="button-group">
          <Link to="/about" className="btn btn-blue">About Me</Link>
          <Link to="/connect" className="btn btn-green">Connect</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
