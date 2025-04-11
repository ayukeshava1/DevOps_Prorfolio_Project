// pages/AboutMe.jsx
import React from "react";
import AboutTabs from "../components/about/AboutTabs";
import styles from "./AboutMe.module.css"; // ✅ Import CSS Module

const AboutMe = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.hero}>
          <h1>About Me</h1>
          <p className={styles.subtitle}>A quick look at my journey and skills 🚀</p>
        </div>
        <AboutTabs />
      </div>
    </div>
  );
};

export default AboutMe;
