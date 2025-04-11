import React, { useEffect, useRef } from "react";
import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import emailjs from "emailjs-com";
import "./ConnectPage.css";

const ConnectPage = () => {
  const form = useRef();

  useEffect(() => {
    if (!window.Tawk_API) {
      const script = document.createElement("script");
      script.src = "https://embed.tawk.to/67f2d3e1464a971909ebfdd3/1io68nb3n";
      script.async = true;
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");
      document.body.appendChild(script);
    }
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_kcu9vm9",
      "template_xvytaao",
      form.current,
      "VpUiF68DkwlNPGrNd"
    ).then(
      () => {
        alert("✅ Message sent successfully!");
        form.current.reset();
      },
      (error) => {
        alert("❌ Failed to send. Try again later.");
        console.error(error);
      }
    );
  };

  return (
    <div className="connect-page">
      <div className="connect-hero">
        <h1>🤝 Let's Connect</h1>
        <p>I’d love to hear from you — whether it's for a project, a collaboration, or just a techy chat!</p>
      </div>

      <div className="connect-grid">
        <a href="mailto:ayukeshava@gamil.com" className="connect-card email"><FaEnvelope className="icon" /><span>Email</span></a>
        <a href="https://www.linkedin.com/in/channakeshava-b-l-94552a324" className="connect-card linkedin"><FaLinkedin className="icon" /><span>LinkedIn</span></a>
        <a href="https://github.com/your-username" className="connect-card github"><FaGithub className="icon" /><span>GitHub</span></a>
        <a href="https://twitter.com/your-handle" className="connect-card twitter"><FaTwitter className="icon" /><span>Twitter</span></a>
      </div>

      <form className="contact-form" ref={form} onSubmit={sendEmail}>
        <h2>💬 Send me a message</h2>
        <input type="text" name="user_name" placeholder="Your Name" required />
        <input type="email" name="user_email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ConnectPage;
