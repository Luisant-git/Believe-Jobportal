import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import {
  FaWhatsapp,
  FaPhone,
  FaCalendarAlt,
  FaUserTie,
  FaGraduationCap,
  FaExchangeAlt,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

const MasterProgram = () => {
  const primaryColor = "#004080";
  const primaryLight = "rgba(0, 64, 128, 0.1)";
  const textColor = "#2c3e50";
  const gradientBackground = "linear-gradient(135deg, #004080, #002147)";
  const whatsappNumber = "9600917123"; // No spaces
  const phoneNumber = "9600917123";

  // WhatsApp redirect link
  const whatsappUrl = `https://wa.me/91${whatsappNumber}`;
  // Tel link for mobile
  const telUrl = `tel:91${phoneNumber}`;

  return (
    <div
      className="interview-mastery"
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <Container>
        {/* Hero Section */}
        <section className="text-center my-3 my-md-5 py-2 py-md-4">
          <div className="mb-4">
            <Badge
              pill
              bg=""
              className="mb-3"
              style={{
                backgroundColor: primaryLight,
                color: primaryColor,
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: "700",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              INTERVIEW MASTERY PROGRAM
            </Badge>

            <h1 className="display-6 display-md-5 fw-bold mb-3 px-2" style={{ color: "#004080" }}>
              Ace Every Interview with{" "}
              <span style={{ color: primaryColor }}>Confidence</span>
            </h1>
            <p className="lead mb-4 mx-auto px-3" style={{ maxWidth: "700px", fontSize: "1.1rem" }}>
              Our comprehensive program helps job seekers, students, and
              professionals prepare effectively through expert-led training and
              mock interviews.
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mb-5">
              <Button
                as="a"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="px-4 px-sm-10 py-2 fw-bold"
                style={{
                  backgroundColor: primaryColor,
                  borderColor: primaryColor,
                  borderRadius: "50px",
                  boxShadow: `0 4px 15px ${primaryLight}`,
                  fontSize: "",
                }}
              >
                <FaWhatsapp
                  className="me-1"
                  style={{ position: "relative", top: "-2px" }}
                />{" "}
                WhatsApp Us
              </Button>
              <Button
                as="a"
                href={telUrl}
                variant="outline-primary"
                size="lg"
                className="px-4 px-sm-10 py-2 fw-bold"
                style={{
                  borderRadius: "50px",
                  borderColor: primaryColor,
                  color: primaryColor,
                  backgroundColor: "white",
                }}
              >
                <FaPhone className="me-2" /> Call Now
              </Button>
            </div>
          </div>
        </section>

        {/* Ideal For Section */}
        <section className="my-5 py-4">
          <div className="text-center mb-5">
            <h2 className="h3 fw-bold mb-3" style={{ color: textColor }}>
              Ideal For
            </h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Whether you're just starting out or looking to advance, our
              program adapts to your needs
            </p>
          </div>

          <Row className="g-3 g-md-4">
            <Col lg={3} md={6} sm={6} xs={12}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-3 p-md-4">
                  <div
                    className="mb-3 p-3 rounded-circle d-inline-flex"
                    style={{ backgroundColor: primaryLight }}
                  >
                    <FaGraduationCap
                      style={{ color: primaryColor }}
                      size={24}
                    />
                  </div>
                  <Card.Title className="fw-bold fs-6 fs-md-5">Fresh Graduates</Card.Title>
                  <Card.Text className="small">
                    Stand out in campus placements and land your first job
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3} md={6} sm={6} xs={12}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-3 p-md-4">
                  <div
                    className="mb-3 p-3 rounded-circle d-inline-flex"
                    style={{ backgroundColor: primaryLight }}
                  >
                    <FaUserTie style={{ color: primaryColor }} size={24} />
                  </div>
                  <Card.Title className="fw-bold fs-6 fs-md-5">Job Seekers</Card.Title>
                  <Card.Text className="small">
                    Overcome interview anxiety and showcase your best self
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3} md={6} sm={6} xs={12}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-3 p-md-4">
                  <div
                    className="mb-3 p-3 rounded-circle d-inline-flex"
                    style={{ backgroundColor: primaryLight }}
                  >
                    <FaExchangeAlt style={{ color: primaryColor }} size={24} />
                  </div>
                  <Card.Title className="fw-bold fs-6 fs-md-5">Career Switchers</Card.Title>
                  <Card.Text className="small">
                    Successfully transition to new industries or roles
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3} md={6} sm={6} xs={12}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-3 p-md-4">
                  <div
                    className="mb-3 p-3 rounded-circle d-inline-flex"
                    style={{ backgroundColor: primaryLight }}
                  >
                    <FaChartLine style={{ color: primaryColor }} size={24} />
                  </div>
                  <Card.Title className="fw-bold fs-6 fs-md-5">Professionals</Card.Title>
                  <Card.Text className="small">
                    Prepare for promotions and leadership interviews
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* What We Offer */}
        <section className="my-3 my-md-5 py-3 py-md-4 bg-light rounded-3">
          <div className="text-center mb-4 mb-md-5 px-3">
            <h2 className="h4 h-md-3 fw-bold mb-3" style={{ color: textColor }}>
              What We Offer
            </h2>
            <p className="text-muted mx-auto small" style={{ maxWidth: "700px" }}>
              Comprehensive training to help you excel in any interview scenario
            </p>
          </div>

          <Row className="g-3 g-md-4">
            <Col xl={3} lg={6} md={6} sm={12}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <Card.Title className="fw-bold mb-3">
                    Interview Training
                  </Card.Title>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>HR, technical, and panel interviews</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Body language mastery</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Effective communication techniques</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Answer framing strategies</span>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <Card.Title className="fw-bold mb-3">
                    Interview Preparation
                  </Card.Title>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Personalized coaching</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Career goal alignment</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Common question responses</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Tricky question strategies</span>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <Card.Title className="fw-bold mb-3">
                    Mock Interviews
                  </Card.Title>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Real-time simulations</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Expert feedback</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Strength identification</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Weakness improvement</span>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <Card.Title className="fw-bold mb-3">
                    Hands-on Experience
                  </Card.Title>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Continuous mock drills</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Scenario-based role plays</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Professional feedback</span>
                    </li>
                    <li className="mb-2 d-flex">
                      <FaCheckCircle style={{ color: "#004080" }} className="mt-1 me-2" />
                      <span>Confidence building</span>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Why Choose Us */}
        <section className="my-3 my-md-5 py-3 py-md-4">
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="h3 h-md-2 fw-bold mb-4 px-2" style={{ color: textColor }}>
                Why Choose Our Interview Mastery Program?
              </h2>
              <div className="pe-lg-5 px-2">
                <div className="d-flex mb-4 mt-40">
                  <div className="me-4 ">
                    <div
                      className="p-3 rounded-circle d-inline-flex"
                      style={{ backgroundColor: primaryLight }}
                    >
                      <FaUserTie style={{ color: primaryColor }} size={20} />
                    </div>
                  </div>

                  <div>
                    <h5 style={{color:'#004080'}} className="fw-bold">
                      One-on-One Personalized Sessions
                    </h5>
                    <p className="mb-0">
                      Individual attention tailored to your specific needs and
                      career goals.
                    </p>
                  </div>
                </div>
                <div className="d-flex mb-4">
                  <div className="me-4">
                    <div
                      className="p-3 rounded-circle d-inline-flex"
                      style={{ backgroundColor: primaryLight }}
                    >
                      <FaGraduationCap
                        style={{ color: primaryColor }}
                        size={20}
                      />
                    </div>
                  </div>
                  <div>
                    <h5 style={{color:'#004080'}} className="fw-bold">
                      Industry-Specific Mock Interviews
                    </h5>
                    <p className="mb-0">
                      Practice with scenarios relevant to your target industry
                      and role.
                    </p>
                  </div>
                </div>
                <div className="d-flex mb-4">
                  <div className="me-4">
                    <div
                      className="p-3 rounded-circle d-inline-flex"
                      style={{ backgroundColor: primaryLight }}
                    >
                      <FaChartLine style={{ color: primaryColor }} size={20} />
                    </div>
                  </div>
                  <div>
                    <h5 style={{color:'#004080'}} className="fw-bold">
                      Detailed Feedback & Confidence Building
                    </h5>
                    <p className="mb-0">
                      Constructive feedback to improve performance and boost
                      confidence.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="p-4 p-lg-5 bg-light rounded-3 h-100">
                <h3 style={{color:'#004080'}} className="h4 fw-bold mb-4">Program Highlights</h3>
                <ul className="list-unstyled">
                  <li className="mb-3 d-flex">
                    <FaCheckCircle
                      style={{ color: "#004080" }}
                      className="mt-1 me-3"
                      size={20}
                    />
                    <span style={{color:'#004080'}}>
                      Personalized interview coaching based on your career level
                    </span>
                  </li>
                  <li className="mb-3 d-flex">
                    <FaCheckCircle
                      style={{ color: "#004080" }}
                      className="mt-1 me-3"
                      size={20}
                    />
                    <span style={{color:'#004080'}}>Practice with real-world interview scenarios</span>
                  </li>
                  <li className="mb-3 d-flex">
                    <FaCheckCircle
                      style={{ color: "#004080" }}
                      className="mt-1 me-3"
                      size={20}
                    />
                    <span style={{color:'#004080'}}>Learn to handle stress and unexpected questions</span>
                  </li>
                  <li className="mb-3 d-flex">
                    <FaCheckCircle
                      style={{ color: "#004080" }}
                      className="mt-1 me-3"
                      size={20}
                    />
                    <span style={{color:'#004080'}}>Develop a winning interview mindset</span>
                  </li>
                  <li className="mb-3 d-flex">
                    <FaCheckCircle
                      style={{ color: "#004080" }}
                      className="mt-1 me-3"
                      size={20}
                    />
                    <span style={{color:'#004080'}}>Master professional etiquette and presentation</span>
                  </li>
                </ul>
                <Button
                  as="a"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                  className="w-100 mt-4 py-3 fw-bold"
                  style={{
                    backgroundColor: primaryColor,
                    borderColor: primaryColor,
                    borderRadius: "50px",
                  }}
                >
                  <FaCalendarAlt className="me-2" /> Book Your Session Now
                </Button>
              </div>
            </Col>
          </Row>
        </section>

        {/* CTA Section */}
        <section
          className="my-3 my-md-5 py-4 py-md-5 text-center text-white rounded-3"
          style={{
            background: gradientBackground,
          }}
        >
          <h2 className="h3 h-md-2 fw-bold mb-4 px-2">Ready to Ace Your Next Interview?</h2>
          <p
            className="mb-4 mb-md-5 mx-auto px-3"
            style={{ maxWidth: "600px", opacity: 0.9, color: "white", fontSize: "1.1rem" }}
          >
            Get the confidence and skills you need to succeed in any interview
            scenario
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <Button
              as="a"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
              size="lg"
              className="px-4 px-sm-10 py-3 fw-bold"
              style={{
                borderRadius: "50px",
                color: primaryColor,
              }}
            >
              <FaWhatsapp
                className="me-1"
                style={{ position: "relative", top: "-2px" }}
              />{" "}
              WhatsApp Us
            </Button>
            <Button
              as="a"
              href={telUrl}
              size="lg"
              className="px-4 px-sm-10 py-3 fw-bold"
              style={{
                borderRadius: "50px",
                backgroundColor: "#ff6600",
                color: "#ffffff",
              }}
            >
              <FaPhone
                className="me-1"
                style={{ position: "relative", top: "-2px" }}
              />{" "}
              Call Now
            </Button>
          </div>
          <div className="mt-4">
            <p className="mb-0 fw-bold" style={{
              fontSize: "1.2rem",
              color: "#ff8826ff",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              letterSpacing: "1px"
            }}>+91 9600917123</p>
            <small>Get Trained. Get Confident. Get Hired.</small>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default MasterProgram;
