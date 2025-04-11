// src/components/about/CertificationsSection.jsx

import React from "react";
import "./CertificationsSection.css";
import { FaCertificate } from "react-icons/fa";

const certifications = [
  {
    title: "Python Language Certification",
    platform: "Udemy",
    date: "March 2023",
  },
  {
    title: "Python for Data Structures and Algorithms",
    platform: "Udemy",
    date: "November 2023",
  },
  {
    title: "Python for Data Science and ML Algorithms",
    platform: "Udemy",
    date: "March 2024",
  },
  {
    title: "Advanced Certification in Cloud Computing & DevOps",
    platform: "Intellipaat",
    date: "January 2025",
  },
];

const CertificationsSection = () => {
  return (
    <section className="certifications">
      <h2>🎖️ Certifications</h2>
      <div className="cert-cards">
        {certifications.map((cert, index) => (
          <div className="cert-card" key={index}>
            <FaCertificate className="cert-icon" />
            <div className="cert-content">
              <h3>{cert.title}</h3>
              <p>{cert.platform}</p>
              <span>{cert.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;
