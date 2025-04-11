// src/components/about/HobbiesInterestsSection.jsx

import React from "react";
import "./HobbiesInterestsSection.css";
import { FaCloud, FaTree, FaHiking, FaBrush, FaPlane } from "react-icons/fa";
import { GiCricketBat } from "react-icons/gi";
import { GiSkier } from "react-icons/gi";
import { MdComputer } from "react-icons/md";

const hobbies = [
  {
    icon: <FaCloud />,
    title: "Cloud Computing & Automation",
    description: "Exploring DevOps, scripting, and contributing to open-source.",
  },
  {
    icon: <GiCricketBat />,
    title: "Cricket & Tech",
    description: "Passionate about cricket and staying updated with tech trends.",
  },  
  {
    icon: <FaTree />,
    title: "Environmental Conservation",
    description: "Actively support eco-friendly causes and green practices.",
  },
  {
    icon: <FaBrush />,
    title: "Art & Creativity",
    description: "Love painting, sketching and visual storytelling.",
  },
  {
    icon: <FaHiking />,
    title: "Adventure & Hiking",
    description: "Exploring nature through hiking trails and outdoor activities.",
  },
  {
    icon: <GiSkier />,
    title: "Skiing & Travel",
    description: "Enjoy skiing trips and discovering new places.",
  },
];

const HobbiesInterestsSection = () => {
  return (
    <section className="hobbies">
      <h2>🎯 Activities & Interests</h2>
      <div className="hobby-cards">
        {hobbies.map((hobby, index) => (
          <div className="hobby-card" key={index}>
            <div className="hobby-icon">{hobby.icon}</div>
            <h3>{hobby.title}</h3>
            <p>{hobby.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HobbiesInterestsSection;
