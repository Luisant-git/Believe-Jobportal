import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import {
  FaCheck,
  FaUserTie,
  FaClock,
  FaHandshake,
  FaListAlt,
  FaSearch,
  FaBullseye,
  FaCheckCircle,
  FaCalendarAlt,
  FaPhone,
} from "react-icons/fa";

const HiringService = () => {
  const primaryColor = "#004080";
  const primaryLight = "rgba(0, 64, 128, 0.1)";
  const textColor = "#2c3e50";
  const gradientBackground = "linear-gradient(135deg, #004080, #002147)";
  const phoneNumber = "9600917123";
  const telUrl = `tel:91${phoneNumber}`;
  const whatsappUrl = `https://wa.me/91${phoneNumber}`;

  return (
    <div className="hiring-service py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <Container>
        {/* Hero Section */}
        <section className="text-center my-3 my-md-5 py-3 py-md-4 px-3 px-md-0">
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
              ASSISTED HIRING SERVICE
            </Badge>

            <h1
              className="display-6 display-md-5 fw-bold mb-3"
              style={{ color: primaryColor }}
            >
              Personalized Recruitment.{" "}
              <span style={{ color: primaryColor }}>Guaranteed Results.</span>
            </h1>
            <p
              className="lead mb-4 mx-auto px-2"
              style={{
                maxWidth: "800px",
                lineHeight: "1.6",
                fontSize: "1rem",
              }}
            >
              Finding the right talent doesn't have to be time-consuming. With
              our <strong>Assisted Hiring Service</strong>, you get end-to-end
              support from sourcing to shortlisting all handled by a dedicated
              expert who understands your hiring needs.
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Button
                as="a"
                href={`${whatsappUrl}?text=Hi, I'm interested in learning more about your Assisted Hiring Service. Can you provide more details?`}
                target="_blank"
                variant="primary"
                size="lg"
                className="px-4 py-2 fw-bold"
                style={{
                  backgroundColor: primaryColor,
                  borderColor: primaryColor,
                  borderRadius: "50px",
                  boxShadow: `0 4px 15px ${primaryLight}`,
                  minWidth: "180px",
                }}
              >
                KNOW MORE
              </Button>
              <Button
                as="a"
                href={telUrl}
                variant="outline-primary"
                size="lg"
                className="px-4 py-2 fw-bold"
                style={{
                  borderRadius: "50px",
                  borderColor: primaryColor,
                  color: primaryColor,
                  backgroundColor: "white",
                  minWidth: "180px",
                }}
              >
                <FaPhone className="me-2" /> CALL US
              </Button>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="my-3 my-md-5 py-3 py-md-4 px-3 px-md-0">
          <div className="text-center mb-4 mb-md-5">
            <h2 className="h4 h3-md fw-bold mb-3" style={{ color: textColor }}>
              What We Offer
            </h2>
            <p
              className="text-muted mx-auto px-2"
              style={{
                maxWidth: "700px",
                lineHeight: "1.6",
              }}
            >
              Comprehensive hiring solutions tailored to your specific needs
            </p>
          </div>

          <Row className="g-4 justify-content-center">
            <Col xs={12} md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-start">
                    <div
                      className="me-3 p-2 rounded-circle flex-shrink-0"
                      style={{
                        backgroundColor: primaryLight,
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaSearch style={{ color: primaryColor }} size={20} />
                    </div>
                    <div>
                      <Card.Title className="fw-bold mb-2">
                        Verified Candidate Profiles
                      </Card.Title>
                      <Card.Text
                        className="text-muted"
                        style={{ lineHeight: "1.6" }}
                      >
                        Receive handpicked and pre-screened candidates tailored
                        to your job requirements.
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-start">
                    <div
                      className="me-3 p-2 rounded-circle flex-shrink-0"
                      style={{
                        backgroundColor: primaryLight,
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaBullseye style={{ color: primaryColor }} size={20} />
                    </div>
                    <div>
                      <Card.Title className="fw-bold mb-2">
                        Better Response Rates
                      </Card.Title>
                      <Card.Text
                        className="text-muted"
                        style={{ lineHeight: "1.6" }}
                      >
                        Connect with active job seekers ready to join your team.
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-start">
                    <div
                      className="me-3 p-2 rounded-circle flex-shrink-0"
                      style={{
                        backgroundColor: primaryLight,
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaClock style={{ color: primaryColor }} size={20} />
                    </div>
                    <div>
                      <Card.Title className="fw-bold mb-2">
                        Save Time & Effort
                      </Card.Title>
                      <Card.Text
                        className="text-muted"
                        style={{ lineHeight: "1.6" }}
                      >
                        We manage sourcing, filtering, and follow-ups, so you
                        can focus on making the final decision.
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-start">
                    <div
                      className="me-3 p-2 rounded-circle flex-shrink-0"
                      style={{
                        backgroundColor: primaryLight,
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaUserTie style={{ color: primaryColor }} size={20} />
                    </div>
                    <div>
                      <Card.Title className="fw-bold mb-2">
                        Dedicated Relationship Manager
                      </Card.Title>
                      <Card.Text
                        className="text-muted"
                        style={{ lineHeight: "1.6" }}
                      >
                        Work one-on-one with an expert who offers personalized
                        hiring support from start to finish.
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-start">
                    <div
                      className="me-3 p-2 rounded-circle flex-shrink-0"
                      style={{
                        backgroundColor: primaryLight,
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaListAlt style={{ color: primaryColor }} size={20} />
                    </div>
                    <div>
                      <Card.Title className="fw-bold mb-2">
                        Expert-Curated Talent Lists
                      </Card.Title>
                      <Card.Text
                        className="text-muted"
                        style={{ lineHeight: "1.6" }}
                      >
                        Access a shortlist of qualified professionals across
                        roles and industries.
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-start">
                    <div
                      className="me-3 p-2 rounded-circle flex-shrink-0"
                      style={{
                        backgroundColor: primaryLight,
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaHandshake style={{ color: primaryColor }} size={20} />
                    </div>
                    <div>
                      <Card.Title className="fw-bold mb-2">
                        Guaranteed Satisfaction
                      </Card.Title>
                      <Card.Text
                        className="text-muted"
                        style={{ lineHeight: "1.6" }}
                      >
                        Our commitment to quality ensures you find the perfect
                        candidate for your team.
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Why Choose Us Section */}
        <section className="my-3 my-md-5 py-3 py-md-4 text-center px-3 px-md-0">
          <div className="mb-4 mb-md-5">
            <h2 className="h4 h3-md fw-bold mb-3" style={{ color: textColor }}>
              Why Choose Believe Jobs?
            </h2>
            <p
              className="text-muted mx-auto px-2"
              style={{
                maxWidth: "700px",
                lineHeight: "1.6",
              }}
            >
              We go beyond traditional recruitment to deliver exceptional
              results
            </p>
          </div>

          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
              <div className="d-flex flex-wrap justify-content-center gap-2 gap-md-3 mb-4 mb-md-5">
                <Badge
                  pill
                  bg=""
                  className="px-3 py-2"
                  style={{
                    backgroundColor: primaryLight,
                    color: textColor,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.85rem",
                  }}
                >
                  <FaCheck className="me-2" style={{ color: "#004080" }} /> Tailored hiring
                  campaigns
                </Badge>
                <Badge
                  pill
                  bg=""
                  className="px-3 py-2"
                  style={{
                    backgroundColor: primaryLight,
                    color: textColor,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.85rem",
                  }}
                >
                  <FaCheck className="me-2" style={{ color: "#004080" }} /> Quicker hiring
                  process
                </Badge>
                <Badge
                  pill
                  bg=""
                  className="px-3 py-2"
                  style={{
                    backgroundColor: primaryLight,
                    color: textColor,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.85rem",
                  }}
                >
                  <FaCheck className="me-2" style={{ color: "#004080" }} /> End-to-end
                  assistance
                </Badge>
                <Badge
                  pill
                  bg=""
                  className="px-3 py-2"
                  style={{
                    backgroundColor: primaryLight,
                    color: textColor,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.85rem",
                  }}
                >
                  <FaCheck className="me-2" style={{ color: "#004080" }} /> Industry-specific
                  support
                </Badge>
              </div>
            </Col>
          </Row>

          <Card
            className="border-0 shadow mx-auto  "
            style={{
              background: gradientBackground,
              overflow: "hidden",
              maxWidth: "1000px",
            }}
          >
            <Card.Body className="p-3 p-md-5 text-white">
              <div className="row align-items-center">
                <div className="col-md-8 text-center text-md-start mb-3 mb-md-0">
                  <h3 className="h4 h2-md fw-bold mb-2">
                    Ready to Simplify Your Hiring?
                  </h3>
                  <p className="mb-0" style={{ opacity: 0.9, fontSize: "1rem" }}>
                    Tap below to connect with our hiring expert now.
                  </p>
                </div>
                <div className="col-md-4 text-center text-md-end">
                  <div className="d-flex flex-column flex-sm-row flex-md-column flex-lg-row justify-content-center justify-content-md-end gap-2 gap-md-3">
                    <Button
                      as="a"
                      href={`${whatsappUrl}?text=Hi, I'm interested in learning more about your Assisted Hiring Service. Can you provide more details?`}
                      target="_blank"
                      variant="light"
                      size="lg"
                      className="px-3 px-md-8 fw-bold"
                      style={{
                        borderRadius: "50px",
                        color: primaryColor,
                        minWidth: "140px",
                        fontSize: "0.9rem",
                      }}
                    >
                      KNOW MORE
                    </Button>
                    <Button
                      as="a"
                      href="/employee/login"
                      variant="outline-light"
                      size="lg"
                      className="px-3 px-md-4 fw-bold"
                      style={{
                        borderRadius: "50px",
                        minWidth: "140px",
                        fontSize: "0.9rem",
                      }}
                    >
                      <FaCalendarAlt className="me-2" /> SIGN UP
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </section>

        {/* Interview Mastery Program Section */}
        <section className="my-3 my-md-5 py-3 py-md-5 px-3 px-md-0">
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0 pe-lg-5">
              <Badge
                pill
                bg=""
                className="mb-3 px-3 py-2"
                style={{
                  backgroundColor: primaryLight,
                  color: primaryColor,
                  fontSize: "0.75rem",
                }}
              >
                INTERVIEW MASTERY PROGRAM
              </Badge>
              <h2 className="h4 h2-md fw-bold mb-3" style={{ color: textColor }}>
                Ace Every Interview with Confidence
              </h2>
              <p
                className="mb-4"
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.6",
                }}
              >
                At Believe Jobs we offer a comprehensive Interview Mastery
                Program designed to help job seekers, students, and
                professionals prepare effectively for interviews through
                expert-led training, structured preparation, and mock interviews
                that provide real-time hands-on experience.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <Button
                  as="a"
                  href={`${whatsappUrl}?text=Hi, I'm interested in your Interview Mastery Program. Can you provide more details about the training sessions?`}
                  target="_blank"
                  variant="primary"
                  className="px-4 py-2 fw-bold"
                  style={{
                    borderRadius: "50px",
                    backgroundColor: primaryColor,
                    borderColor: primaryColor,
                    minWidth: "160px",
                  }}
                >
                  LEARN MORE
                </Button>
                <Button
                  as="a"
                  href={telUrl}
                  variant="outline-primary"
                  className="px-4 py-2 fw-bold"
                  style={{
                    borderRadius: "50px",
                    borderColor: primaryColor,
                    color: primaryColor,
                    backgroundColor: "white",
                    minWidth: "160px",
                  }}
                >
                  <FaPhone className="me-2" /> CONTACT NOW
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-3 p-md-4 p-lg-5">
                  <h5 className="fw-bold mb-4 d-flex align-items-center">
                    <FaCheck className="me-2" size={20} style={{ color: "#004080" }} /> What We
                    Offer:
                  </h5>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="mt-1 me-3 flex-shrink-0" style={{ color: "#004080" }} />
                      <span>Expert-led interview training sessions</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="mt-1 me-3 flex-shrink-0" style={{ color: "#004080" }} />
                      <span>Structured preparation materials</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="mt-1 me-3 flex-shrink-0" style={{ color: "#004080" }} />
                      <span>Mock interviews with feedback</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="mt-1 me-3 flex-shrink-0" style={{ color: "#004080" }} />
                      <span>Industry-specific interview questions</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="mt-1 me-3 flex-shrink-0" style={{ color: "#004080" }} />
                      <span>Real-time hands-on experience</span>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="mt-1 me-3 flex-shrink-0" style={{ color: "#004080" }} />
                      <span>Confidence-building exercises</span>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default HiringService;
