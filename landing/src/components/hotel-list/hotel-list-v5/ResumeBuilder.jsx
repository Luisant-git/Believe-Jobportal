import React, { useRef } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import {
  FaCheckCircle,
  FaStar,
  FaFileAlt,
  FaUserTie,
  FaChartLine,
} from "react-icons/fa";

// Add this CSS in your stylesheet or a <style> tag to support hover effects!
const pricingCardHoverStyles = `
.pricing-card {
  transition: transform 0.25s cubic-bezier(.4,2,.6,.9), box-shadow 0.25s;
  cursor: pointer;
}
.pricing-card:hover, .pricing-card.active {
  transform: translateY(-16px) scale(1.025) rotate(-1deg);
  box-shadow: 0 8px 32px 0 rgba(0,64,128,0.18), 0 4px 12px 0 rgba(0,0,0,0.05);
  z-index: 2;
  border-color: #004080 !important;
  background: linear-gradient(135deg, #f5fafd, #e3f1fb 90%);
}
.pricing-card .card-title,
.pricing-card .card-subtitle {
  transition: color 0.15s;
}
.pricing-card:hover .card-title,
.pricing-card.active .card-title {
  color: #004080 !important;
}
`;

const ResumeBuilder = () => {
  // For scrolling to Pricing Plans
  const pricingRef = useRef(null);

  const primaryColor = "#004080";
  const primaryLight = "rgba(0, 64, 128, 0.1)";
  const textColor = "#2c3e50";
  const gradientBackground = "linear-gradient(135deg, #004080, #002147)";

  // Scroll to Pricing Plans smoothly
  const handleScrollToPricing = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Redirect to WhatsApp
  const handleWhatsAppRedirect = (plan) => {
    const phoneNumber = "919600917123";
    const message = `Hi, I'm interested in the ${plan} resume writing package. Please provide more details.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      className="resume-builder my-5"
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      {/* Inject hover styles */}
      <style>{pricingCardHoverStyles}</style>
      <Container>
        {/* Hero Section */}
        <section className="text-center mb-5 py-4">
          <div className="mb-4">
            <span
              className="badge"
              style={{
                backgroundColor: primaryLight,
                color: primaryColor,
                padding: "10px 20px",
                marginBottom: "16px",
                fontWeight: "700", // makes text bold
                fontSize: "16px", // increases font size
                letterSpacing: "1px", // adds spacing between letters
                textTransform: "uppercase", // optional: makes it all uppercase
              }}
            >
              PROFESSIONAL RESUME WRITING
            </span>

            <h1 className="display-5 fw-bold mb-3" style={{ color: "#004080" }}>
              Craft a Resume That Gets You{" "}
              <span style={{ color: primaryColor }}>Noticed</span>
            </h1>
            <h2 className="h5 text-muted mb-4">
              Resume Writing Services That Get You Hired Faster
            </h2>
            <p className="lead mb-4 mx-auto" style={{ maxWidth: "700px" }}>
              Our expert writers create ATS-optimized resumes tailored to your
              industry and career level.
            </p>
            <Button
              className="mb-5 px-10 py-2 fw-bold"
              style={{
                backgroundColor: primaryColor,
                borderRadius: "50px",
                color: "white",
                fontSize: "20px",
              }}
              onClick={handleScrollToPricing}
            >
              Get Started Now
            </Button>
          </div>

          <div className="features mb-4 p-4 bg-light rounded-3">
            <p className="fw-bold mb-3 text-uppercase small">
              Trusted by professionals worldwide
            </p>
            <div className="d-flex justify-content-center flex-wrap mb-3">
              <span className="badge bg-white text-dark mx-2 mb-2 px-3 py-2 rounded-pill shadow-sm">
                <FaCheckCircle style={{ color: "#004080" }} className="me-2" /> ATS-Friendly
              </span>
              <span className="badge bg-white text-dark mx-2 mb-2 px-3 py-2 rounded-pill shadow-sm">
                <FaCheckCircle style={{ color: "#004080" }} className="me-2" />{" "}
                Keyword-Optimized
              </span>
              <span className="badge bg-white text-dark mx-2 mb-2 px-3 py-2 rounded-pill shadow-sm">
                <FaCheckCircle style={{ color: "#004080" }} className="me-2" /> 24-48h Delivery
              </span>
              <span className="badge bg-white text-dark mx-2 mb-2 px-3 py-2 rounded-pill shadow-sm">
                <FaCheckCircle style={{ color: "#004080" }} className="me-2" /> Satisfaction
                Guarantee
              </span>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section
          className="my-5 py-4 rounded-3"
          style={{ backgroundColor: primaryLight }}
        >
          <Row className="g-4 text-center">
            <Col md={3} sm={6}>
              <div className="p-3">
                <h3
                  className="display-6 fw-bold"
                  style={{ color: primaryColor }}
                >
                  95%
                </h3>
                <p className="mb-0">Interview Call Rate</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="p-3">
                <h3
                  className="display-6 fw-bold"
                  style={{ color: primaryColor }}
                >
                  24h
                </h3>
                <p className="mb-0">Avg. Delivery Time</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="p-3">
                <h3
                  className="display-6 fw-bold"
                  style={{ color: primaryColor }}
                >
                  10k+
                </h3>
                <p className="mb-0">Resumes Created</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="p-3">
                <h3
                  className="display-6 fw-bold"
                  style={{ color: primaryColor }}
                >
                  4.9
                </h3>
                <p className="mb-0">
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  (1,200+ Reviews)
                </p>
              </div>
            </Col>
          </Row>
        </section>

        {/* What We Offer */}
        <section className="my-5 py-4">
          <div className="text-center mb-5">
            <h2 className="h3 fw-bold mb-3" style={{ color: textColor }}>
              What We Offer
            </h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Our comprehensive resume writing services are designed to meet the
              needs of professionals at all career levels.
            </p>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div
                    className="mb-3 p-3 rounded-circle d-inline-flex"
                    style={{ backgroundColor: primaryLight }}
                  >
                    <FaFileAlt style={{ color: primaryColor }} size={24} />
                  </div>
                  <Card.Title className="fw-bold mb-3">
                    Resume Writing
                  </Card.Title>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>ATS-optimized formatting</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Industry-specific keywords</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Professional layout & design</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Content tailored to your goals</span>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div
                    className="mb-3 p-3 rounded-circle d-inline-flex"
                    style={{ backgroundColor: primaryLight }}
                  >
                    <FaUserTie style={{ color: primaryColor }} size={24} />
                  </div>
                  <Card.Title className="fw-bold mb-3">
                    Cover Letters
                  </Card.Title>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Personalized for each application</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Highlight key achievements</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Professional tone & structure</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Matching design to your resume</span>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div
                    className="mb-3 p-3 rounded-circle d-inline-flex"
                    style={{ backgroundColor: primaryLight }}
                  >
                    <FaChartLine style={{ color: primaryColor }} size={24} />
                  </div>
                  <Card.Title className="fw-bold mb-3">
                    LinkedIn Profile
                  </Card.Title>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Profile optimization</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Keyword-rich headline</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Compelling summary</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Increased visibility</span>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Pricing Plans */}
        <section ref={pricingRef} className="my-5 py-4">
          <div className="text-center mb-5">
            <h2 className="h3 fw-bold mb-3" style={{ color: textColor }}>
              Choose Your Plan
            </h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Select the package that best fits your career level and needs
            </p>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <Card className="pricing-card h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <span className="badge bg-secondary bg-opacity-10 text-secondary mb-3">
                      BASIC
                    </span>
                    <Card.Title className="fw-bold mb-1 display-6">
                      ₹399
                    </Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                      For Freshers & Entry-Level
                    </Card.Subtitle>
                  </div>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-3 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>1 Page Resume</span>
                    </li>
                    <li className="mb-3 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Basic Formatting</span>
                    </li>
                    <li className="mb-3 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>PDF & Word Format</span>
                    </li>
                    <li className="mb-3 d-flex text-muted">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Cover Letter (Add-on)</span>
                    </li>
                  </ul>
                  <Button
                    variant="outline-primary"
                    className="w-100 py-2 fw-bold"
                    style={{
                      borderRadius: "50px",
                      borderColor: primaryColor,
                      color: primaryColor,
                      backgroundColor: "transparent",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#004080";
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.borderColor = "#004080";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = primaryColor;
                      e.currentTarget.style.borderColor = primaryColor;
                    }}
                    onClick={() => handleWhatsAppRedirect('Basic Plan (₹399)')}
                  >
                    Get Started
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card
                className="pricing-card h-100 border-0 shadow-lg"
                style={{ borderTop: `4px solid ${primaryColor}` }}
              >
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <span
                      className="badge"
                      style={{
                        backgroundColor: primaryLight,
                        color: primaryColor,
                        marginBottom: "12px",
                      }}
                    >
                      POPULAR
                    </span>
                    <Card.Title className="fw-bold mb-1 display-6">
                      ₹799
                    </Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                      For Professionals (1-5 Yrs)
                    </Card.Subtitle>
                  </div>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-3 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>1-2 Page Resume</span>
                    </li>
                    <li className="mb-3 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Keyword Optimization</span>
                    </li>
                    <li className="mb-3 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Cover Letter Included</span>
                    </li>
                    <li className="mb-3 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>1 Free Revision</span>
                    </li>
                  </ul>
                  <Button
                    variant="primary"
                    className="w-100 py-2 fw-bold"
                    style={{
                      backgroundColor: primaryColor,
                      borderColor: primaryColor,
                      borderRadius: "50px",
                      boxShadow: `0 4px 15px ${primaryLight}`,
                    }}
                    onClick={() => handleWhatsAppRedirect('Popular Plan (₹799)')}
                  >
                    Get Started
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="pricing-card h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <span className="badge bg-warning bg-opacity-10 text-warning mb-3">
                      PREMIUM
                    </span>
                    <Card.Title className="fw-bold mb-1 display-6">
                      ₹999
                    </Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                      For Senior Professionals
                    </Card.Subtitle>
                  </div>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-3 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>2-3 Page Resume</span>
                    </li>
                    <li className="mb-3 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Advanced Optimization</span>
                    </li>
                    <li className="mb-3 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Cover Letter & LinkedIn</span>
                    </li>
                    <li className="mb-3 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>2 Free Revisions</span>
                    </li>
                  </ul>
                  <Button
                    variant="outline-primary"
                    className="w-100 py-2 fw-bold"
                    style={{
                      borderRadius: "50px",
                      borderColor: primaryColor,
                      color: primaryColor,
                      backgroundColor: "transparent",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#004080";
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.borderColor = "#004080";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = primaryColor;
                      e.currentTarget.style.borderColor = primaryColor;
                    }}
                    onClick={() => handleWhatsAppRedirect('Premium Plan (₹999)')}
                  >
                    Get Started
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Testimonials */}
        <section className="my-5 py-4 bg-light rounded-3">
          <div className="text-center mb-5">
            <h2 className="h3 fw-bold mb-3" style={{ color: textColor }}>
              What Our Clients Say
            </h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Don't just take our word for it - hear from professionals who
              landed their dream jobs
            </p>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                  </div>
                  <Card.Text className="mb-4">
                    "The resume I received was professional and perfectly
                    highlighted my skills. I got interview calls from 3 out of 5
                    companies I applied to!"
                  </Card.Text>
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div
                        style={{
                          backgroundColor: primaryLight,
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{ color: primaryColor, fontSize: "20px" }}
                        />
                      </div>
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">Rahul Sharma</h6>
                      <small className="text-muted">
                        Software Engineer, Bangalore
                      </small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                  </div>
                  <Card.Text className="mb-4">
                    "As a fresh graduate, I was struggling to get noticed. This
                    resume made all the difference - landed my first job in just
                    2 weeks!"
                  </Card.Text>
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div
                        style={{
                          backgroundColor: primaryLight,
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{ color: primaryColor, fontSize: "20px" }}
                        />
                      </div>
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">Priya Patel</h6>
                      <small className="text-muted">
                        Marketing Associate, Mumbai
                      </small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                    <FaStar className="text-warning" />
                  </div>
                  <Card.Text className="mb-4">
                    "The executive package was worth every rupee. The LinkedIn
                    optimization brought me multiple recruiter inquiries within
                    days."
                  </Card.Text>
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div
                        style={{
                          backgroundColor: primaryLight,
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{ color: primaryColor, fontSize: "20px" }}
                        />
                      </div>
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">Anil Gupta</h6>
                      <small className="text-muted">
                        Senior Manager, Delhi
                      </small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* CTA Section */}
        <section
          className="my-5 py-3 text-center text-white rounded-3"
          style={{
            background: gradientBackground,
          }}
        >
          <h2 className="h2 fw-bold mb-4">Ready to Transform Your Career?</h2>
          <p
            className="lead mb-5 mx-auto"
            style={{ maxWidth: "600px", opacity: 0.9, color: "white" }}
          >
            Get started with a professionally written resume that showcases your
            true potential
          </p>
          <Button
            className="px-30 py-3 fw-bold"
            style={{
              backgroundColor: "#ff6600",
              borderRadius: "50px",
              color: "white",
              fontSize: "14px",
            }}
            onClick={() => handleWhatsAppRedirect('Resume Writing Service')}
          >
            Get Your Resume Now
          </Button>
        </section>
      </Container>
    </div>
  );
};

export default ResumeBuilder;
