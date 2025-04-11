// components/about/AboutTabs.jsx
import React, { useState } from "react";
import HeroSection from "./HeroSection";
import FounderSection from "./FounderSection";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import EducationSection from "./EducationSection";
import CertificationsSection from "./CertificationsSection";
import HobbiesInterestsSection from "./HobbiesInterestsSection";
import "./AboutTabs.css";

const tabs = [
  { title: "Skills" },
  { title: "Experience" },
  { title: "Projects" },
  { title: "Education" },
  { title: "Certifications" },
  { title: "Hobbies & Interests" }
];

const AboutTabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].title);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabClick = (tab) => {
    if (tab === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
    }, 300);
  };

  const renderSection = () => {
    switch (activeTab) {
      case "Skills":
        return <SkillsSection />;
      case "Experience":
        return <ExperienceSection />;
      case "Projects":
        return <ProjectsSection />;
      case "Education":
        return <EducationSection />;
      case "Certifications":
        return <CertificationsSection />;
      case "Hobbies & Interests":
        return <HobbiesInterestsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="about-tabs-wrapper">
      <HeroSection />
      <FounderSection />

      <div className="animated-tab-container">
        <div className="tabs-glassy">
          {tabs.map((tab) => (
            <button
              key={tab.title}
              className={`tab-button ${activeTab === tab.title ? "active" : ""}`}
              onClick={() => handleTabClick(tab.title)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className={`tab-content-wrapper ${isTransitioning ? "fade-out" : "fade-in"}`}>
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default AboutTabs;
