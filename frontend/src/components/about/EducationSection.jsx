// src/components/about/EducationSection.jsx

import React from "react";
import "./EducationSection.css";

const EducationSection = () => {
  return (
    <section className="education">
      <h2>🎓 Education</h2>

      <div className="edu-card">
        <h3>Bachelor of Engineering in Computer Science</h3>
        <p>K R Pete Krishna Government Engineering College, Mandya</p>
        <p>CGPA: 7.7 / 10.0</p>
        <span className="edu-year">2019 - 2023</span>
      </div>

      <div className="edu-card">
        <h3>Pre-University (PU)</h3>
        <p>Government PU College, Koratagere</p>
        <p>Percentage: 71%</p>
        <span className="edu-year">2017 - 2019</span>
      </div>

      <div className="edu-card">
        <h3>SSLC</h3>
        <p>Government High School, Byalya, Madhugiri</p>
        <p>Percentage: 90%</p>
        <span className="edu-year">2016 – 2017</span>
      </div>
    </section>
  );
};

export default EducationSection;
