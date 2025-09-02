import React, { useState } from "react";
import cont from "../../assets/cont.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";

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
      {/* Contact Image */}
      <div>
        <img src={cont} alt="Contact" className="c-img" />
      </div>

      {/* Contact Info */}
      <div className="contact-container">
        <div className="contact-item">
          <span className="icon">📍</span>
          <h3 className="title">Location</h3>
          <p className="text">Chandigarh, India</p>
        </div>

        <div className="contact-item">
          <span className="icon">📞</span>
          <h3 className="title">Phone</h3>
          <p className="text">987654321</p>
        </div>

        <div className="contact-item">
          <span className="icon">✉️</span>
          <h3 className="title">Email</h3>
          <p className="text">support@trisog.com</p>
        </div>
      </div>

      {/* Contact Form */}
      <section className="contact">
        <h3 className="subtitle">Have any question?</h3>
        <h1 className="title">Get in Touch</h1>

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
            placeholder="Write something"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default Setting;
