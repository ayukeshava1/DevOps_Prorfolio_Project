import React from "react";
import "./HeroSection.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>👨‍💻 Channakeshava B L</h1>
        <h2>Passionate Computer Science Graduate</h2>
        <p>
        Phase-1 Electronic City, Bangalore, Karnataka | Ayukeshava@gmail.com ☁️⚙️
        </p>
        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/channakeshava-b-l-94552a324"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a
            href="https://github.com/your-github-username" // Replace with your GitHub
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
