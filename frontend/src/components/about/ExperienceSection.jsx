// components/about/ExperienceSection.jsx
import React from "react";
import "./ExperienceSection.css";

const experiences = [
  {
    role: "TAC Engineer (System Administrator)",
    company: "Tejas Networks",
    duration: "Aug 2024 – Present",
    description: [
      "Key member of R&D TAC Team for BSNL MAAN project.",
      "Automated crash log collection and analysis using Python.",
      "Built Python-based SSH scripts to gather performance data.",
      "Improved troubleshooting efficiency by 30%.",
      "Collaborated with engineering to boost product reliability."
    ],
  },
  {
    role: "Machine Learning Intern",
    company: "Pralo Tech Solutions LLP",
    duration: "June 2024 – Oct 2024",
    description: [
      "Performed sentiment analysis on IPL tweets.",
      "Used K-means for clustering before prediction.",
      "Predicted match outcomes based on tweet sentiments."
    ],
  },
  {
    role: "Cloud & DevOps Intern",
    company: "Intellipaat",
    duration: "Mar 2024 – Present",
    description: [
      "Hands-on with AWS, Jenkins, Docker, CI/CD.",
      "Deployed Jenkins on AWS EC2.",
      "Automated infra setup with Terraform & Ansible.",
      "Integrated Python scripting with cloud tasks."
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section className="experience-section">
      <h2 className="experience-title">💼 Experience</h2>
      <div className="experience-timeline">
        {experiences.map((exp, idx) => (
          <div className="experience-card" key={idx}>
            <h3>{exp.role}</h3>
            <p className="company">{exp.company}</p>
            <p className="duration">{exp.duration}</p>
            <ul>
              {exp.description.map((point, index) => (
                <li key={index}>➤ {point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
