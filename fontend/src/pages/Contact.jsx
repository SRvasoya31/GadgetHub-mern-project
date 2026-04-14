import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./Contact.css";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    const formData = new FormData(e.target);
    formData.append("access_key", "f27e78d4-2adc-44d0-b82a-5426f2696fa0");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message Sent Successfully 🎉");
        e.target.reset();
      } else {
        setResult("Something went wrong ❌");
      }
    } catch (error) {
      console.error(error);
      setResult("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="contact-container">

        <h1>Contact Us</h1>
        <p className="contact-sub">
          We’d love to hear from you 🚀
        </p>

        <form onSubmit={onSubmit} className="contact-form">

          <div className="input-row">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
          </div>

          <input type="text" name="subject" placeholder="Subject" required />

          <textarea
            name="message"
            placeholder="Your Message"
            required
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>

        {result && <p className="result">{result}</p>}

      </div>
    </>
  );
};

export default Contact;