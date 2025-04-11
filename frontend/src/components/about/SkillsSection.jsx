import React from "react";
import "./SkillsSection.css"; // 👈 import the CSS file

const skills = [
  { name: "Python", icon: "🐍" },
  { name: "AWS", icon: "☁️" },
  { name: "Docker", icon: "🐳" },
  { name: "Jenkins", icon: "🧰" },
  { name: "Terraform", icon: "🛠️" },
  { name: "Kubernetes", icon: "☸️" },
  { name: "Linux", icon: "🐧" },
  { name: "Git", icon: "🔧" },
];

const SkillsSection = () => {
  return (
    <div className="skills-section">
      <h2 className="section-title">🚀 Skills & Tools</h2>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.name} className="skill-card">
            <div className="skill-icon">{skill.icon}</div>
            <div className="skill-name">{skill.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
