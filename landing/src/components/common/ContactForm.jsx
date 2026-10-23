import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobileno: "",
    queries: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.mobileno)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/enquiry`,
        formData
      );
      toast.success("Enquiry submitted successfully!");
      setFormData({
        username: "",
        email: "",
        mobileno: "",
        queries: "",
      });
    } catch (error) {
      toast.error("Error submitting enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-40">
      {/* Custom styles for blue color and section */}
      <style>{`
        .about-us-section {
          background: #f8f9fa;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          padding: 32px;
          margin-bottom: 40px;
        }
        .blue-text {
          color: #004080 !important;
        }
        .blue-bg {
          background: #004080 !important;
        }
        .blue-border {
          border-color: #004080 !important;
        }
        .fw-700 { font-weight: 700; }
        .fw-600 { font-weight: 600; }
        .text-32 { font-size: 2rem; }
        .text-24 { font-size: 1.5rem; }
        .mb-16 { margin-bottom: 16px; }
        .mb-8 { margin-bottom: 8px; }
        .mb-4 { margin-bottom: 4px; }
        .mb-0 { margin-bottom: 0; }
        .mt-24 { margin-top: 24px; }
        .mt-10 { margin-top: 10px; }
        .mt-50 { margin-top: 50px; }
        .pl-20 { padding-left: 20px; }
        .rounded { border-radius: 12px; }
        .shadow { box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
        .button {
          border: none;
          border-radius: 6px;
          padding: 0 24px;
          height: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .form-input input,
        .form-input textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 1rem;
          margin-bottom: 8px;
        }
        .form-input label {
          display: block;
          margin-bottom: 4px;
          color: #004080;
          font-weight: 500;
        }
      `}</style>

      {/* About Us Section */}
      <section className="about-us-section">
        <h2 className="text-32 fw-700 mb-16 blue-text">About Us</h2>
        <p className="mb-16">
          <strong>Believe Jobs</strong> is a professionally managed career platform committed to bridging the gap between skilled individuals and potential employers. Our objective is to facilitate a seamless and efficient recruitment process that serves both job seekers and organizations with integrity and precision.
        </p>
        <p className="mb-16">
          Whether you're a fresh graduate, an experienced professional, or a growing business, our platform is designed to support every stage of your career or hiring journey. We offer personalized services including resume building, interview preparation, career counseling, and employer branding solutions — all tailored to meet evolving industry needs.
        </p>
        <h3 className="text-24 fw-600 mt-24 mb-8 blue-text">Our Vision</h3>
        <p className="mb-16">
          To become a trusted career partner, transforming the way individuals discover opportunities and how companies discover talent.
        </p>
        <h3 className="text-24 fw-600 mt-24 mb-8 blue-text">Our Mission</h3>
        <ul className="mb-16 pl-20" style={{ color: "#004080" }}>
          <li className="mb-4">To empower job seekers with the tools, guidance, and visibility they need to succeed.</li>
          <li className="mb-4">To support organizations in hiring the right people through smart, tech-enabled solutions.</li>
          <li>To create a transparent, inclusive, and growth-focused employment ecosystem.</li>
        </ul>
        <p className="mb-16">
          At Believe Jobs, we are dedicated to creating opportunities, building careers, and shaping futures.
        </p>
        <h3 className="text-24 fw-600 mt-24 mb-8 blue-text">Why Believe Jobs?</h3>
<ul className="mb-0 pl-20 mt-10" style={{ color: "#004080" }}>
  <li className="mb-4">✔ <strong>User-Centric Platform</strong> – Intuitive design, easy navigation, and personalized job recommendations.</li>
  <li className="mb-4">✔ <strong>Assisted Hiring Services</strong> – Expert matchmakers to fast-track hiring.</li>
  <li className="mb-4">✔ <strong>Verified Listings</strong> – Authentic job postings from reliable employers.</li>
  <li>✔ <strong>Career Resources</strong> – Blogs, webinars, and expert advice to boost your career growth.</li>
</ul>

        <p className="mt-50 fw-600 blue-text">
          Join the Believe Jobs community - where talent meets trust, and careers find direction.
        </p>
      </section>

      {/* Contact Form */}
      <form className="row g-3 pt-4" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="email" className="form-label fw-medium blue-text">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="username" className="form-label fw-medium blue-text">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="mobileno" className="form-label fw-medium blue-text">
            Mobile Number
          </label>
          <input
            type="text"
            className="form-control"
            id="mobileno"
            value={formData.mobileno}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="queries" className="form-label fw-medium blue-text">
            Queries (optional)
          </label>
          <textarea
            className="form-control"
            id="queries"
            value={formData.queries}
            onChange={handleInputChange}
            rows="4"
          ></textarea>
        </div>
        <div className="col-auto">
          <button
            type="submit"
            className="btn btn-primary blue-bg"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Enquire"}
            <span style={{ marginLeft: 10, fontWeight: 700 }}>→</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;