import React from "react";
import { Container, Accordion } from "react-bootstrap";
import {
  FaQuestionCircle,
  FaUserTie,
  FaFileAlt,
  FaCheckCircle,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

const Faq = () => {
  const primaryColor = "#004080";
  const primaryLight = "rgba(0, 64, 128, 0.1)";
  const whatsappNumber = "9600917123";
  const whatsappUrl = `https://wa.me/91${whatsappNumber}`;

  return (
    <div className="faq-section py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <Container>
        <div className="text-center mb-5">
          <h2
            className="display-5 fw-bold mb-3 mt-50"
            style={{ color: "#004080" }}
          >
            Frequently Asked Questions
          </h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
            Find answers to common questions about our services and platform
          </p>
        </div>

        <div className="mx-auto" style={{ maxWidth: "800px" }}>
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item
              eventKey="0"
              className="mb-3 border-0 shadow-sm rounded-3 overflow-hidden"
            >
              <Accordion.Header
                className="p-3"
                style={{ backgroundColor: "white" }}
              >
                <div className="d-flex align-items-center">
                  <FaQuestionCircle
                    className="me-3"
                    style={{ color: primaryColor }}
                  />
                  <h5 className="mb-0 fw-bold">What is Believe Jobs?</h5>
                </div>
              </Accordion.Header>
              <Accordion.Body
                className="p-4"
                style={{ backgroundColor: "#fefefe" }}
              >
                <div className="d-flex">
                  <FaCheckCircle
                    className="me-3 mt-1 flex-shrink-0"
                    style={{ color: primaryColor }}
                  />
                  <p className="mb-0">
                    Believe Jobs is a comprehensive career platform that
                    connects job seekers with verified employment opportunities
                    across various sectors. We provide end-to-end recruitment
                    solutions including job postings, resume assistance, and
                    interview preparation services.
                  </p>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item
              eventKey="1"
              className="mb-3 border-0 shadow-sm rounded-3 overflow-hidden"
            >
              <Accordion.Header
                className="p-3"
                style={{ backgroundColor: "white" }}
              >
                <div className="d-flex align-items-center">
                  <FaUserTie className="me-3" style={{ color: primaryColor }} />
                  <h5 className="mb-0 fw-bold">
                    How do I post my job vacancies on Believe Jobs?
                  </h5>
                </div>
              </Accordion.Header>
              <Accordion.Body
                className="p-4"
                style={{ backgroundColor: "#fefefe" }}
              >
                <div className="d-flex">
                  <FaCheckCircle
                    className="me-3 mt-1 flex-shrink-0"
                    style={{ color: primaryColor }}
                  />
                  <div>
                    <p className="mb-3">
                      Posting jobs on Believe Jobs is simple and free:
                    </p>
                    <ol className="mb-0">
                      <li className="mb-2">Go to the Employer Login page</li>
                      <li className="mb-2">
                        Sign up for a free employer account
                      </li>
                      <li className="mb-2">
                        Click "Post a Job" in your dashboard
                      </li>
                      <li className="mb-2">
                        Fill in the job details and requirements
                      </li>
                      <li>
                        Submit for verification (typically completed within 24
                        hours)
                      </li>
                    </ol>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item
              eventKey="2"
              className="mb-3 border-0 shadow-sm rounded-3 overflow-hidden"
            >
              <Accordion.Header
                className="p-3"
                style={{ backgroundColor: "white" }}
              >
                <div className="d-flex align-items-center">
                  <FaFileAlt className="me-3" style={{ color: primaryColor }} />
                  <h5 className="mb-0 fw-bold">
                    How do I apply for a job through Believe Jobs?
                  </h5>
                </div>
              </Accordion.Header>
              <Accordion.Body
                className="p-4"
                style={{ backgroundColor: "#fefefe" }}
              >
                <div className="d-flex">
                  <FaCheckCircle
                    className="me-3 mt-1 flex-shrink-0"
                    style={{ color: primaryColor }}
                  />
                  <div>
                    <p className="mb-3">
                      Applying for jobs is straightforward:
                    </p>
                    <ol className="mb-0">
                      <li className="mb-2">
                        Create your candidate profile (or sign in if you already
                        have one)
                      </li>
                      <li className="mb-2">
                        Browse available jobs using our search filters
                      </li>
                      <li className="mb-2">
                        Click "Apply Now" on jobs you're interested in
                      </li>
                      <li>
                        Upload your resume and complete any required questions
                      </li>
                    </ol>
                    <p className="mt-3 mb-0">
                      You'll receive confirmation and can track applications in
                      your dashboard.
                    </p>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item
              eventKey="3"
              className="mb-3 border-0 shadow-sm rounded-3 overflow-hidden"
            >
              <Accordion.Header
                className="p-3"
                style={{ backgroundColor: "white" }}
              >
                <div className="d-flex align-items-center">
                  <FaCheckCircle
                    className="me-3"
                    style={{ color: primaryColor }}
                  />
                  <h5 className="mb-0 fw-bold">
                    How do I know if a job listing is genuine?
                  </h5>
                </div>
              </Accordion.Header>
              <Accordion.Body
                className="p-4"
                style={{ backgroundColor: "#fefefe" }}
              >
                <div className="d-flex">
                  <FaCheckCircle
                    className="me-3 mt-1 flex-shrink-0"
                    style={{ color: primaryColor }}
                  />
                  <div>
                    <p className="mb-3">
                      We take several measures to ensure job authenticity:
                    </p>
                    <ul className="mb-3">
                      <li className="mb-2">
                        All employer accounts are verified before job posting
                      </li>
                      <li className="mb-2">
                        Each job listing undergoes manual review by our team
                      </li>
                      <li className="mb-2">
                        We validate company information and contact details
                      </li>
                      <li>
                        Look for our "Verified Employer" badge on listings
                      </li>
                    </ul>
                    <p className="mb-0 fst-italic">
                      If you encounter any suspicious listings, please report
                      them immediately.
                    </p>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item
              eventKey="4"
              className="mb-3 border-0 shadow-sm rounded-3 overflow-hidden"
            >
              <Accordion.Header
                className="p-3"
                style={{ backgroundColor: "white" }}
              >
                <div className="d-flex align-items-center">
                  <FaPhoneAlt
                    className="me-3"
                    style={{ color: primaryColor }}
                  />
                  <h5 className="mb-0 fw-bold">
                    Can I get help with resume writing or interview preparation?
                  </h5>
                </div>
              </Accordion.Header>
              <Accordion.Body
                className="p-4"
                style={{ backgroundColor: "#fefefe" }}
              >
                <div className="d-flex">
                  <FaCheckCircle
                    className="me-3 mt-1 flex-shrink-0"
                    style={{ color: primaryColor }}
                  />
                  <div>
                    <p className="mb-3">
                      Absolutely! We offer comprehensive career support
                      services:
                    </p>
                    <ul className="mb-4">
                      <li className="mb-2">
                        <strong>Resume Writing:</strong> Professionally crafted,
                        ATS-optimized resumes
                      </li>
                      <li className="mb-2">
                        <strong>Interview Coaching:</strong> Mock interviews
                        with detailed feedback
                      </li>
                      <li className="mb-2">
                        <strong>Career Counseling:</strong> Personalized
                        guidance for your job search
                      </li>
                      <li>
                        <strong>LinkedIn Profile Optimization:</strong> Make
                        your profile stand out to recruiters
                      </li>
                    </ul>
                    <div className="alert alert-primary" role="alert">
                      <div className="d-flex align-items-center">
                        <FaWhatsapp className="me-2" size={20} />
                        <span>
                          Contact our career experts at{" "}
                          <strong>+91 96009 17123</strong> via WhatsApp for
                          assistance
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>

        <div className="text-center mt-5 pt-3" style={{ marginBottom: "40px" }}>
          <h4 className="mb-4" style={{ color: "#004080" }}>
            Still have questions?
          </h4>
          <a
            className="btn btn-primary btn-lg px-15 py-2 fw-bold mt-15"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: primaryColor,
              borderColor: primaryColor,
              borderRadius: "50px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <FaWhatsapp className="me-2" /> Contact Support
          </a>
        </div>
      </Container>
    </div>
  );
};

export default Faq;
