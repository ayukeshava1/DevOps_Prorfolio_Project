// src/components/about/ProjectsSection.jsx

import React from "react";
import "./ProjectsSection.css";

const ProjectsSection = () => {
  return (
    <section className="projects">
      <h2>🎯 Projects</h2>

      <div className="project-card">
        <h3>Multi-Image Steganography Using LSB & AES</h3>
        <p>
          Developed a secure information-hiding system using a combination of
          cryptography and steganography. Utilized Least Significant Bit (LSB)
          technique to embed encrypted text into images, ensuring data
          confidentiality and visual integrity.
        </p>
        <ul>
          <li>Implemented AES encryption for enhanced security.</li>
          <li>Used Python and OpenCV for image processing.</li>
          <li>Built a user interface for encoding and decoding messages.</li>
        </ul>
      </div>

      <div className="project-card">
        <h3>IPL Sentiment Analysis & Match Prediction</h3>
        <p>
          Analyzed Twitter sentiments related to IPL using NLP techniques.
          Clustered tweets using K-means and predicted match outcomes based on
          sentiment polarity.
        </p>
        <ul>
          <li>Used scikit-learn and pandas for ML and data wrangling.</li>
          <li>Achieved improved prediction accuracy via clustering strategy.</li>
          <li>Explored social media trends and their real-world impact.</li>
        </ul>
      </div>
    </section>
  );
};

export default ProjectsSection;
