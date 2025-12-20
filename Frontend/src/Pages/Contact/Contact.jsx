import React, { useState } from "react";
import cont from "../../assets/cont.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Setting = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Successfully sent 🎉");
    setFormData({ name: "", email: "", message: "" }); // clear fields
  };

  return (
    <div>
      {/* Hero Banner */}
      <div className="contact-hero">
        <img src={cont} alt="Get in touch" />
        <div className="contact-hero-text">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Let's plan your next trip.</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="contact-info-grid">
        <div className="contact-item-card">
          <FaMapMarkerAlt className="card-icon" />
          <h3 className="card-title">Location</h3>
          <p className="card-text">Chandigarh, India</p>
        </div>

        <div className="contact-item-card">
          <FaPhoneAlt className="card-icon" />
          <h3 className="card-title">Phone</h3>
          <p className="card-text">+91 98765 43210</p>
        </div>

        <div className="contact-item-card">
          <FaEnvelope className="card-icon" />
          <h3 className="card-title">Email</h3>
          <p className="card-text">support@trimpmate.com</p>
        </div>
      </div>

      {/* Contact Form */}
      <section className="contact-section">
        <div className="contact-form-card">
          <h3 className="contact-subtitle">Have any question?</h3>
          <h1 className="contact-title">Get in Touch</h1>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-row">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <textarea
              name="message"
              placeholder="Write something..."
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn">Submit</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Setting;
