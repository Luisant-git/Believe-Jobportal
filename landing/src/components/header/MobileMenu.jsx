import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Social from "../common/social/Social";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSignOutAlt, 
  faBriefcase, 
  faBuilding, 
  faUserGraduate,
  faChevronDown,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";

const MobileMenu = ({ authdata }) => {
  const { pathname } = useLocation();
  const [isActiveParent, setIsActiveParent] = useState(false);
  const [isActiveNestedParentTwo, setisActiveNestedParentTwo] = useState(false);
  const [isActiveNestedParent, setisActiveNestedParent] = useState(false);
  const navigate = useNavigate();
  const [mobileJobsOpen, setMobileJobsOpen] = useState(false);
  const [mobileCompaniesOpen, setMobileCompaniesOpen] = useState(false);
  const [mobileCareerOpen, setMobileCareerOpen] = useState(false);
  const [applicationCounts, setApplicationCounts] = useState(0);

  // Sample data for dropdowns
  const latestJobs = [
    {
      id: 1,
      title: "WarehouseHelper",
      url: "/jobs/c19ba4dd-3b2e-4d5e-bcf9-e6d3653fcb29",
    },
    {
      id: 2,
      title: "Teacher",
      url: "/jobs/00de126a-fe17-4534-8d3f-be8ff4329530",
    },
    {
      id: 3,
      title: "DeliveryDriver",
      url: "/jobs/7614dfc4-468f-4c4d-94e5-56cfe8310277",
    },
    {
      id: 4,
      title: "SecurityGuard",
      url: "/jobs/be4e6768-968e-4827-9ff0-321189c174fa",
    },
  ];

  const featuredCompanies = [
    { id: 1, name: "SISSecurity", url: "/jobs/techcorp" },
    { id: 2, name: "Flipkart", url: "/jobs/designhub" },
    { id: 3, name: "UrbanClap", url: "/jobs/datasystems" },
    { id: 4, name: "AmazonIndia", url: "/jobs/cloudsolutions" },
  ];

  const careerServicesLinks = [
    { id: 1, title: "Job Listings", url: "/jobs" },
    { id: 2, title: "Resume Builder", url: "/resume-builder" },
    { id: 3, title: "Interview Mastery Program", url: "/master-program"},
    { id: 4, title: "Assisted Hiring Service", url: "/hiring-service" },
    { id: 5, title: "FAQ", url: "/faq" },
  ];

  const handleLogout = () => {
    Modal.confirm({
      title: "Are you sure you want to log out?",
      content: "You will be logged out and redirected to the login page.",
      onOk: () => {
        localStorage.removeItem("authToken");
        navigate("/login");
      },
    });
  };

  // Toggle functions for mobile
  const toggleMobileJobs = () => {
    setMobileJobsOpen(!mobileJobsOpen);
    if (mobileCompaniesOpen) setMobileCompaniesOpen(false);
    if (mobileCareerOpen) setMobileCareerOpen(false);
  };

  const toggleMobileCompanies = () => {
    setMobileCompaniesOpen(!mobileCompaniesOpen);
    if (mobileJobsOpen) setMobileJobsOpen(false);
    if (mobileCareerOpen) setMobileCareerOpen(false);
  };

  const toggleMobileCareer = () => {
    setMobileCareerOpen(!mobileCareerOpen);
    if (mobileJobsOpen) setMobileJobsOpen(false);
    if (mobileCompaniesOpen) setMobileCompaniesOpen(false);
  };

  return (
    <>
      <div className="pro-header d-flex align-items-center justify-between border-bottom-light" style={{ padding: "15px 20px", backgroundColor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Link to="/">
          <img 
            src="/img/general/BELIEVE JOBS-LOGO.png" 
            alt="brand" 
            style={{
              height: "50px",
              width: "100%",
              maxWidth: "180px",
              objectFit: "contain",
            }}
          />
        </Link>
        <div
          className="fix-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          style={{
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            backgroundColor: "#f8f9fa",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
        >
          <i className="icon icon-close" style={{ color: "#004080", fontSize: "18px" }}></i>
        </div>
      </div>

      <Sidebar width="400" backgroundColor="#fff">
        <Menu>
          <MenuItem
            onClick={() => navigate("/")}
            className={pathname === "/" ? "menu-active-link" : ""}
            style={{
              fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              fontSize: "16px",
              fontWeight: "600",
              color: "#004080",
              padding: "15px 20px",
              borderBottom: "1px solid #f0f0f0",
              transition: "all 0.3s ease"
            }}
          >
            Home
          </MenuItem>
          
          {/* Jobs Dropdown */}
          <MenuItem 
            onClick={toggleMobileJobs}
            style={{
              fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              fontSize: "16px",
              fontWeight: "600",
              color: "#004080",
              padding: "15px 20px",
              borderBottom: "1px solid #f0f0f0",
              backgroundColor: mobileJobsOpen ? "#f8f9fa" : "transparent",
              transition: "all 0.3s ease"
            }}
          >
            <div className="d-flex justify-between items-center w-100">
              <div className="d-flex items-center">
                <FontAwesomeIcon 
                  icon={faBriefcase} 
                  className="me-3" 
                  style={{ width: "18px", color: "#004080" }} 
                />
                <span style={{ fontWeight: "700" }}>Jobs</span>
              </div>
              <FontAwesomeIcon 
                icon={mobileJobsOpen ? faChevronUp : faChevronDown} 
                style={{ width: "14px", color: "#004080", transition: "transform 0.3s ease" }} 
              />
            </div>
          </MenuItem>
          
          {mobileJobsOpen && (
            <div style={{ backgroundColor: "#f8f9fa", borderLeft: "3px solid #004080" }}>
              {latestJobs.map((job) => (
                <MenuItem
                  key={job.id}
                  onClick={() => {
                    navigate(`/jobs?search=${encodeURIComponent(job.title)}`);
                    setMobileJobsOpen(false);
                  }}
                  style={{
                    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#004080",
                    padding: "12px 20px 12px 50px",
                    borderBottom: "1px solid #e9ecef",
                    transition: "all 0.3s ease"
                  }}
                >
                  {job.title}
                </MenuItem>
              ))}
              <MenuItem
                onClick={() => {
                  navigate("/jobs");
                  setMobileJobsOpen(false);
                }}
                style={{ 
                  color: "#ff6600", 
                  fontWeight: "700",
                  fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  fontSize: "14px",
                  padding: "12px 20px 12px 50px",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap"
                }}
              >
                View All Jobs →
              </MenuItem>
            </div>
          )}
          
          {/* Companies Dropdown */}
          <MenuItem 
            onClick={toggleMobileCompanies}
            style={{
              fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              fontSize: "16px",
              fontWeight: "600",
              color: "#004080",
              padding: "15px 20px",
              borderBottom: "1px solid #f0f0f0",
              backgroundColor: mobileCompaniesOpen ? "#f8f9fa" : "transparent",
              transition: "all 0.3s ease"
            }}
          >
            <div className="d-flex justify-between items-center w-100">
              <div className="d-flex items-center">
                <FontAwesomeIcon 
                  icon={faBuilding} 
                  className="me-3" 
                  style={{ width: "18px", color: "#004080" }} 
                />
                <span style={{ fontWeight: "700" }}>Companies</span>
              </div>
              <FontAwesomeIcon 
                icon={mobileCompaniesOpen ? faChevronUp : faChevronDown} 
                style={{ width: "14px", color: "#004080", transition: "transform 0.3s ease" }} 
              />
            </div>
          </MenuItem>
          
          {mobileCompaniesOpen && (
            <div style={{ backgroundColor: "#f8f9fa", borderLeft: "3px solid #004080" }}>
              {featuredCompanies.map((company) => (
                <MenuItem
                  key={company.id}
                  onClick={() => {
                    navigate(`/jobs?search=${encodeURIComponent(company.name)}`);
                    setMobileCompaniesOpen(false);
                  }}
                  style={{
                    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#004080",
                    padding: "12px 20px 12px 50px",
                    borderBottom: "1px solid #e9ecef",
                    transition: "all 0.3s ease"
                  }}
                >
                  {company.name}
                </MenuItem>
              ))}
              <MenuItem
                onClick={() => {
                  navigate("/companies");
                  setMobileCompaniesOpen(false);
                }}
                style={{ 
                  color: "#ff6600", 
                  fontWeight: "700",
                  fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  fontSize: "14px",
                  padding: "12px 20px 12px 50px",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap"
                }}
              >
                View All Companies →
              </MenuItem>
            </div>
          )}
          
          {/* Career Services Dropdown */}
          <MenuItem 
            onClick={toggleMobileCareer}
            style={{
              fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              fontSize: "16px",
              fontWeight: "600",
              color: "#004080",
              padding: "15px 20px",
              borderBottom: "1px solid #f0f0f0",
              backgroundColor: mobileCareerOpen ? "#f8f9fa" : "transparent",
              transition: "all 0.3s ease"
            }}
          >
            <div className="d-flex justify-between items-center w-100">
              <div className="d-flex items-center">
                <FontAwesomeIcon 
                  icon={faUserGraduate} 
                  className="me-3" 
                  style={{ width: "18px", color: "#004080" }} 
                />
                <span style={{ fontWeight: "700" }}>Services</span>
              </div>
              <FontAwesomeIcon 
                icon={mobileCareerOpen ? faChevronUp : faChevronDown} 
                style={{ width: "14px", color: "#004080", transition: "transform 0.3s ease" }} 
              />
            </div>
          </MenuItem>
          
          {mobileCareerOpen && (
            <div style={{ backgroundColor: "#f8f9fa", borderLeft: "3px solid #004080" }}>
              {careerServicesLinks.map((link) => (
                <MenuItem
                  key={link.id}
                  onClick={() => {
                    navigate(link.url);
                    setMobileCareerOpen(false);
                  }}
                  style={{
                    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#004080",
                    padding: "12px 20px 12px 50px",
                    borderBottom: "1px solid #e9ecef",
                    transition: "all 0.3s ease"
                  }}
                >
                  {link.title}
                </MenuItem>
              ))}
            </div>
          )}
          
          <MenuItem
            onClick={() => navigate("/contact")}
            className={pathname === "/contact" ? "menu-active-link" : ""}
            style={{
              fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              fontSize: "16px",
              fontWeight: "600",
              color: "#004080",
              padding: "15px 20px",
              borderBottom: "1px solid #f0f0f0",
              transition: "all 0.3s ease"
            }}
          >
            Contact
          </MenuItem>
        </Menu>
      </Sidebar>

      <div className="mobile-footer px-20 py-5 border-top-light"></div>

      <div className="pro-footer">
        {/* Contact Info */}
        <div className="mt-10 mb-20">
          <h5 className="text-16 fw-500 mb-10" style={{ color: "#004080" }}>
            Contact Us
          </h5>
          <div className="mb-5">
            <a
              href="tel:+9193600917123"
              style={{
                color: "#004080",
                fontWeight: 500,
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              +91 93600917123
            </a>
          </div>
          <div>
            <a
              href="mailto:believejobs@gmail.com"
              style={{
                color: "#004080",
                fontWeight: 500,
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              believejobs@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-10">
          <h5 
            className="text-16 fw-500 mb-10" 
            style={{ 
              color: "#004080",
              fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              fontWeight: "700"
            }}
          >
            Follow us on social media
          </h5>
          <div className="d-flex x-gap-20 items-center">
            <Social />
          </div>
        </div>

        <div className="mobile-footer px-20 py-5 border-top-light"></div>
        <div>
          {/* Display authdata if logged in */}
          {authdata ? (
            <div className="mt-20">
              <div className="d-flex items-center mb-15">
                {authdata?.picture ? (
                  <img
                    src={authdata?.picture}
                    alt="User Profile"
                    className="user-profile-img"
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      marginRight: "15px",
                    }}
                  />
                ) : (
                  <img
                    src="https://cdn-icons-png.freepik.com/512/3135/3135715.png?ga=GA1.1.852988304.1732155881"
                    alt="Default Avatar"
                    className="user-profile-img"
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      marginRight: "15px",
                    }}
                  />
                )}
                <div>
                  <h5 
                    className="text-16 fw-500 mb-0" 
                    style={{ 
                      color: "#004080",
                      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                      fontWeight: "700"
                    }}
                  >
                    {authdata?.name || authdata?.email}
                  </h5>
                  <span 
                    className="text-14" 
                    style={{ 
                      color: "#666",
                      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                      fontWeight: "500"
                    }}
                  >
                    {authdata?.role || "Member"}
                  </span>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <Link
                  to="/myapplications"
                  className="button -outline-blue-1 text-blue-1 px-30 fw-400 text-14 h-50"
                  style={{
                    borderRadius: "8px",
                    borderColor: "#004080",
                    position: "relative",
                    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    fontWeight: "600",
                    color: "#004080",
                    transition: "all 0.3s ease"
                  }}
                >
                  My Applications
                  {applicationCounts > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        backgroundColor: "#ff6600",
                        color: "white",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "700"
                      }}
                    >
                      {applicationCounts}
                    </span>
                  )}
                </Link>
                <Link
                  to="/profile"
                  className="button -outline-blue-1 text-blue-1 px-30 fw-400 text-14 h-50"
                  style={{
                    borderRadius: "8px",
                    borderColor: "#004080",
                    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    fontWeight: "600",
                    color: "#004080",
                    transition: "all 0.3s ease"
                  }}
                >
                  My Profile
                </Link>
                
                {/* Logout button */}
                <div
                  onClick={handleLogout}
                  className="logout-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    color: "#004080",
                    cursor: "pointer",
                    fontWeight: "600",
                    marginTop: "10px",
                    padding: "12px",
                    border: "1px solid #004080",
                    borderRadius: "8px",
                    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    transition: "all 0.3s ease",
                    backgroundColor: "transparent"
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                  <span>Logout</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-20 d-flex flex-column gap-3">
              <Link
                className="button -dark-1 px-30 fw-400 text-14 h-50 text-white mb-2"
                to="/employee/login"
                style={{
                  backgroundColor: "#ff6600",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  fontWeight: "700",
                  textAlign: "center",
                  fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  transition: "all 0.3s ease",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(255, 102, 0, 0.3)"
                }}
              >
                Employer Login
              </Link>
              <Link
                className="button px-30 fw-400 text-14 h-50 text-white"
                to="/login"
                style={{
                  backgroundColor: "#004080",
                  border: "1px solid #004080",
                  borderRadius: "8px",
                  fontWeight: "700",
                  textAlign: "center",
                  fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(0, 64, 128, 0.3)"
                }}
              >
                Job Seeker Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;