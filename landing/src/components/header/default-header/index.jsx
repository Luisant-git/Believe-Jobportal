import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import MainMenu from "../MainMenu";
import SearchBoxContent from "../../hero/hero-8/SearchBoxContent";
import MobileMenu from "../MobileMenu";
import { getAuthDatum, clearAuthDatum } from "@/utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faBriefcase,
  faBuilding,
  faChevronDown,
  faChevronUp,
  faUserGraduate,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";
import { getUsersWithJobSeeker } from "@/api/user";
import logo from "@/assets/img/BELIEVE3.jpg";

const Header1 = () => {
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();
  const authData = getAuthDatum();
  const userId = localStorage.getItem("userId");
  const [applicationCounts, setApplicationCounts] = useState(0);
  // State for dropdown menus
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [companiesDropdownOpen, setCompaniesDropdownOpen] = useState(false);
  const [careerDropdownOpen, setCareerDropdownOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [mobileJobsOpen, setMobileJobsOpen] = useState(false);
  const [mobileCompaniesOpen, setMobileCompaniesOpen] = useState(false);
  const [mobileCareerOpen, setMobileCareerOpen] = useState(false);
  // new: state for mobile user dropdown
  const [mobileUserDropdownOpen, setMobileUserDropdownOpen] = useState(false);

  const getlist = () => {
    getUsersWithJobSeeker(userId)
      .then((res) => {
        const apps = res.data || [];
        setApplicationCounts(apps.length);
      })
  };

  useEffect(() => {
    getlist();
  }, []);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const confirmLogout = (logoutFunction) => {
    Modal.confirm({
      title: "Are you sure you want to log out?",
      content: "You will be logged out from your account.",
      okText: "Yes",
      cancelText: "No",
      onOk: () => logoutFunction(),
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    if (clearAuthDatum) clearAuthDatum();
    setTimeout(() => {
        navigate("/login");
    }, 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);

    // Check if mobile view on mount and resize
    const checkIfMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("scroll", changeBackground);
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

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

  // Career Services dropdown data
  const careerServicesLinks = [
    { id: 1, title: "Job Listings", url: "/jobs" },
    { id: 2, title: "Resume Builder", url: "/resume-builder" },
    { id: 3, title: "Interview Mastery Program", url: "/master-program"},
    { id: 4, title: "Assited Hiring Service", url: "/hiring-service" },
    { id: 5, title: "FAQ", url: "/faq" },
  ];

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

  // For closing mobile user dropdown on navigation or logout
  const closeMobileUserDropdown = () => setMobileUserDropdownOpen(false);

  return (
    <>
      <header
        className="header"
        style={{
          backgroundColor: "#004080",
          transition: "background-color 0.3s ease",
          minHeight: isMobileView ? "70px" : "110px",
          padding: "0",
        }}
      >
        <div className="header__container mx-auto" style={{
          maxWidth: "1500px",
          padding: isMobileView ? "0 10px" : "0 30px",
        }}>
          <div className="row justify-between items-center" style={{
            minHeight: isMobileView ? "70px" : "110px",
          }}>
            <div className="col-auto">
              <div className="d-flex items-center">
              <Link to="/" className="header-logo" style={{
                marginRight: isMobileView ? "8px" : "50px",
              }}>
              <img
                src={logo}
                alt="logo icon"
                style={{
                  height: isMobileView ? "60px" : "110px",
                  width: "100%",
                  maxWidth: isMobileView ? "200px" : "250px",
                  objectFit: "contain",
                }}
              />
              </Link>

                {/* Desktop View - Jobs, Companies, Career Services Buttons */}
                {!isMobileView && (
                  <div
                    className="d-flex items-center"
                    style={{ 
                      gap: window.innerWidth > 1200 ? "12px" : "8px",
                      marginRight: window.innerWidth > 1200 ? "30px" : "15px",
                    }}
                  >
                    {/* Home Button */}
                    <div>
                      <Link
                        to="/"
                        className="d-flex items-center px-15 py-8 rounded-4"
                        style={{
                          backgroundColor: "#004080",
                          border: "none",
                          color: "#f5f5f5",
                          fontWeight: "500",
                          fontSize: "18px",
                          transition: "all 0.3s ease",
                          gap: "10px",
                          textDecoration: "none"
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faHome}
                          style={{
                            width: "18px",
                            height: "18px",
                            flexShrink: 0,
                          }}
                        />
                        <span style={{fontWeight:600}}>Home</span>
                      </Link>
                    </div>
                    <div
                      className={`menu-item-has-children text-dark-1`}
                      onMouseEnter={() => setJobsDropdownOpen(true)}
                      onMouseLeave={() => setJobsDropdownOpen(false)}
                      style={{ position: "relative" }}
                    >
                      <button
                        className="d-flex items-center px-15 py-8 rounded-4"
                        style={{
                           backgroundColor: "#004080",
                          border: "none",
                          color: "#f5f5f5",
                          fontWeight: "500",
                          fontSize: "18px",
                          transition: "all 0.3s ease",
                          gap: "10px",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faBriefcase}
                          style={{
                            width: "18px",
                            height: "18px",
                            flexShrink: 0,
                          }}
                        />
                        <span>Jobs</span>
                      </button>
                      {jobsDropdownOpen && (
                        <div
                          className="sub-menu"
                          style={{
                            position: "absolute",
                            top: "calc(100% + 15px)",
                            left: 0,
                            backgroundColor: "#fff",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            borderRadius: "4px",
                            padding: "10px 20px",
                            minWidth: "200px",
                            zIndex: 1000,
                            pointerEvents: jobsDropdownOpen ? "auto" : "none",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              bottom: "100%",
                              left: 0,
                              right: 0,
                              height: "15px",
                              backgroundColor: "transparent",
                            }}
                          />

                          <div style={{ pointerEvents: "auto" }}>
                            {latestJobs.map((job) => (
                              <Link
                                key={job.id}
                                to={job.url}
                                className="block px-4 py-1 hover:bg-blue-50"
                                style={{ color: "#004080", fontWeight: "600", fontSize: "14px", marginBottom: "2px", display: "block" }}
                              >
                                {job.title}
                              </Link>
                            ))}
                            <div className="border-t mt-2 pt-2">
                              <Link
                                to="/jobs"
                                className="block px-4 py-2 font-semibold hover:bg-blue-50"
                                style={{ color: "#ff6600", fontWeight: "bold", whiteSpace: "nowrap" }}
                              >
                                View All Jobs →
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      className={`menu-item-has-children text-dark-1`}
                      onMouseEnter={() => setCompaniesDropdownOpen(true)}
                      onMouseLeave={() => setCompaniesDropdownOpen(false)}
                      style={{ position: "relative" }}
                    >
                      <button
                        className="d-flex items-center px-15 py-8 rounded-4"
                        style={{
                          backgroundColor: "#004080",
                          border: "none",
                          color: "#f5f5f5",
                          fontWeight: "500",
                          fontSize: "18px",
                          transition: "all 0.3s ease",
                          gap: "8px",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faBuilding}
                          style={{
                            width: "18px",
                            height: "18px",
                            flexShrink: 0,
                          }}
                        />
                        <span>Companies</span>
                      </button>
                      {companiesDropdownOpen && (
                        <div
                          className="sub-menu"
                          style={{
                            position: "absolute",
                            top: "calc(100% + 15px)",
                            left: 0,
                            backgroundColor: "#fff",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            borderRadius: "4px",
                            padding: "10px 20px",
                            minWidth: "200px",
                            zIndex: 1000,
                            pointerEvents: companiesDropdownOpen
                              ? "auto"
                              : "none",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              bottom: "100%",
                              left: 0,
                              right: 0,
                              height: "15px",
                              backgroundColor: "transparent",
                            }}
                          />

                          <div style={{ pointerEvents: "auto" }}>
                            {featuredCompanies.map((company) => (
                              <Link
                                key={company.id}
                                to={company.url}
                                className="block px-4 py-1 hover:bg-blue-50 transition-colors"
                                style={{
                                  color: "#004080",
                                  paddingLeft: "20px",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  marginBottom: "2px",
                                  display: "block"
                                }}
                              >
                                {company.name}
                              </Link>
                            ))}
                            <div className="border-t border-gray-100 mt-2 pt-2">
                              <Link
                                to="/companies"
                                className="block px-4 py-2 font-semibold hover:bg-blue-50 transition-colors"
                                style={{
                                  color: "#ff6600",
                                  paddingLeft: "20px",
                                  fontWeight: "bold",
                                  whiteSpace: "nowrap"
                                }}
                              >
                                View All Companies →
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Career Services Dropdown */}
                    <div
                      className={`menu-item-has-children text-dark-1`}
                      onMouseEnter={() => setCareerDropdownOpen(true)}
                      onMouseLeave={() => setCareerDropdownOpen(false)}
                      style={{ position: "relative" }}
                    >
                      <button
                        className="d-flex items-center px-15 py-8 rounded-4"
                        style={{
                          backgroundColor: "#004080",
                          border: "none",
                          color: "#f5f5f5",
                          fontWeight: "500",
                          fontSize: "18px",
                          transition: "all 0.3s ease",
                          gap: "8px",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faUserGraduate}
                          style={{
                            width: "18px",
                            height: "18px",
                            flexShrink: 0,
                          }}
                        />
                        <span>Services</span>
                      </button>
                      {careerDropdownOpen && (
                        <div
                          className="sub-menu"
                          style={{
                            position: "absolute",
                            top: "calc(100% + 15px)",
                            left: 0,
                            backgroundColor: "#fff",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            borderRadius: "4px",
                            padding: "10px 20px",
                            minWidth: "200px",
                            zIndex: 1000,
                            pointerEvents: careerDropdownOpen
                              ? "auto"
                              : "none",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              bottom: "100%",
                              left: 0,
                              right: 0,
                              height: "15px",
                              backgroundColor: "transparent",
                            }}
                          />
                          <div
                            style={{
                              pointerEvents: "auto",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {careerServicesLinks.map((link) => (
                              <Link
                                key={link.id}
                                to={link.url}
                                className="block px-4 py-2  transition-colors"
                                style={{
                                  color: "#004080",
                                  fontWeight: "500",
                                  marginBottom: 1,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {link.title}
                              </Link>
                            ))}
                          </div>

                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* <div className="header-menu">
                  <div className="header-menu__content">
                    <MainMenu style="text-dark-1" />
                  </div>
                </div> */}
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="mr-15 xxl:d-none">
                  <button
                    className="text-26"
                    style={{ color: "#f5f5f5" }}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasTop"
                    aria-controls="offcanvasTop"
                  >
                    <div className="icon-search"></div>
                  </button>
                </div>

                <div
                  className="offcanvas offcanvas-top vh-100"
                  tabIndex={-1}
                  id="offcanvasTop"
                  aria-labelledby="offcanvasTopLabel"
                >
                  <div className="offcanvas-header position-absolute top-0 end-0">
                    <button
                      type="button"
                      className="btn-close text-reset"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    />
                  </div>
                  <SearchBoxContent />
                </div>

                {authData?.decodedToken ? (
                  <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                    <Link
                      to="/contact"
                      className="button px-30 fw-400 text-18 h-50 ml-20"
                      style={{
                        backgroundColor: "#ff6600",
                        color: "#ffffff",
                        border: "none",
                         fontWeight: "500",
                        borderRadius: "4px",
                        fontSize: "18px",
                      }}
                    >
                      Contact
                    </Link>
                    <div className="dropdown">
                      <button
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className="dropdown-toggle button px-30 fw-400 text-18 h-50 ml-20"
                        style={{
                          borderColor: "#004080",
                          borderWidth: "1px", // thin border
                          color: "#ffffff",
                          backgroundColor: "#228B22",
                          borderRadius: "4px",
                          fontWeight: "500", // bold text
                          fontSize: "18px",
                        }}
                      >
                        <span className="d-flex items-center text-inherit text-22 me-2">
                          <img
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                            }}
                            src={
                              authData?.user?.profilePicture ||
                              "https://cdn-icons-png.freepik.com/512/3135/3135715.png?ga=GA1.1.852988304.1732155881"
                            }
                            alt="User Avatar"
                            className="avatar-icon"
                          />
                        </span>
                        View Profile
                      </button>
                      <div className="dropdown-menu mt-2 text-center p-2">
                        <li className="mt-2 p-2">
                          <Link
                            to="/myapplications"
                            className="text-dark-1"
                            style={{ display: "block", position: "relative",color:"#004080" }}
                          >
                            My Application
                            {applicationCounts > 0 && (
                              <span
                                style={{
                                  position: "absolute",
                                  top: "-5px",
                                  right: "-5px",
                                  backgroundColor: "#ff6600",
                                  color: "white",
                                  borderRadius: "50%",
                                  width: "18px",
                                  height: "18px",
                                  fontSize: "10px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {applicationCounts}
                              </span>
                            )}
                          </Link>
                        </li>
                        <li className="mt-2 p-2">
                          <Link
                            to="/profile"
                            className="text-dark-1"
                            style={{ display: "block", color:"#004080", }}
                          >
                            My Profile
                          </Link>
                        </li>
                        <li className="mt-4 p-2">
                          <button
                            onClick={() => {
                              confirmLogout(logout);
                            }}
                            className="text-center w-100 text-dark-1"
                            style={{
                              background: "none",
                              border: "none",
                               color:"#004080",
                              padding: 0,
                              font: "inherit",
                              cursor: "pointer",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faSignOutAlt}
                              className="me-1"
                              color="#004080"
                            />{" "}
                            <span className="ms-1">LogOut</span>
                          </button>
                        </li>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex items-center is-menu-opened-hide md:d-none" style={{
                    marginLeft: window.innerWidth > 1200 ? "20px" : "10px",
                    gap: window.innerWidth > 1200 ? "20px" : "10px",
                  }}>
                    <Link
                      to="/employee/login"
                      className="button fw-400 text-white"
                      style={{
                        backgroundColor: "#ff6600",
                        borderRadius: "4px",
                         fontWeight: "500",
                        fontSize: window.innerWidth > 1200 ? "18px" : "14px",
                        padding: window.innerWidth > 1200 ? "12px 30px" : "10px 15px",
                        height: window.innerWidth > 1200 ? "50px" : "40px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {window.innerWidth > 1200 ? "Employer Login" : "Employer"}
                    </Link>
                    <Link
                      to="/login"
                      className="button fw-400"
                      style={{
                        borderColor: "#004080",
                        borderWidth: "1px",
                        color: "#ffffff",
                        backgroundColor: "#228B22",
                        borderRadius: "4px",
                        fontWeight: "500",
                        fontSize: window.innerWidth > 1200 ? "18px" : "14px",
                        padding: window.innerWidth > 1200 ? "12px 30px" : "10px 15px",
                        height: window.innerWidth > 1200 ? "50px" : "40px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {window.innerWidth > 1200 ? "Job Seeker Login" : "Job Seeker"}
                    </Link>
                  </div>
                )}

                {/* --- MOBILE USER ICON + DROPDOWN (ONLY MOBILE) --- */}
                <div className="d-none xl:d-flex x-gap-20 items-center pl-3">
                  {isMobileView ? (
                    <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "16px" }}>
                      {authData?.decodedToken ? (
                        <>
                          <button
                            onClick={() => setMobileUserDropdownOpen((prev) => !prev)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: "#004080",
                              fontSize: "24px",
                              padding: 0,
                              marginLeft: 0,
                            }}
                            aria-label="User menu"
                          >
                            <img
                              src={
                                authData?.user?.profilePicture ||
                                "https://cdn-icons-png.freepik.com/512/3135/3135715.png?ga=GA1.1.852988304.1732155881"
                              }
                              alt="User Avatar"
                              style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          </button>
                          {mobileUserDropdownOpen && (
                            <div
                              style={{
                                position: "absolute",
                                top: "calc(100% + 8px)",
                                right: "-40px",
                                backgroundColor: "#fff",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                borderRadius: "6px",
                                width: "180px",
                                zIndex: 1200,
                                padding: "10px 20px",
                              }}
                            >
                              <Link
                                to="/myapplications"
                                onClick={closeMobileUserDropdown}
                                className="d-block px-4 py-2 text-dark-1"
                                style={{ position: "relative", color:"#004080" }}
                              >
                                My Application
                                {applicationCounts > 0 && (
                                  <span
                                    style={{
                                      position: "absolute",
                                      top: "8px",
                                      right: "12px",
                                       color:"#004080",
                                      backgroundColor: "#ff6600",
                                      color: "white",
                                      borderRadius: "50%",
                                      width: "18px",
                                      height: "18px",
                                      fontSize: "10px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {applicationCounts}
                                  </span>
                                )}
                              </Link>
                              <Link
                                to="/profile"
                                onClick={closeMobileUserDropdown}
                                className="d-block px-4 py-2 "
                                 style={{ position: "relative", color:"#004080" }}
                              >
                                My Profile
                              </Link>
                              <button
                                onClick={() => {
                                  confirmLogout(() => {
                                    logout();
                                    closeMobileUserDropdown();
                                  });
                                }}
                                className="w-100 text-left px-4 py-2 text-dark-1"
                                style={{
                                  background: "none",
                                  border: "none",
                                   color:"#004080",
                                  cursor: "pointer",
                                  fontSize: "14px",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faSignOutAlt}
                                  className="me-2"
                                  color="#004080"
                                />
                                LogOut
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <Link
                          to="/login"
                          className="d-flex items-center icon-user text-inherit text-22"
                          style={{ color: "#ffffffff" }}
                        />
                      )}
                    </div>
                  ) : (
                    // Desktop view: just show user icon linking to profile or login
                    <div>
                     
                        <Link
                          to="/login"
                          className="d-flex items-center icon-user text-inherit text-22"
                          style={{ color: "#ffffffff" }}
                        />
                    </div>
                  )}
                  <div>

                    
                    <button
                      className="d-flex items-center icon-menu text-inherit text-20"
                      style={{ color: "#ffffffff", marginLeft: -8 }}
                      data-bs-toggle="offcanvas"
                      aria-controls="mobile-sidebar_menu"
                      data-bs-target="#mobile-sidebar_menu"
                    />

                    <div
                      className="offcanvas offcanvas-start mobile_menu-contnet"
                      tabIndex={-1}
                      id="mobile-sidebar_menu"
                      aria-labelledby="offcanvasMenuLabel"
                      data-bs-scroll="true"
                    >
                      <MobileMenu />
                    </div>
                  </div>
                </div>
                {/* --- END MOBILE USER ICON + DROPDOWN --- */}

              </div>
            </div>
          </div>
        </div>

        {/* Mobile View - Jobs and Companies and Career Services Dropdowns */}
        {isMobileView && (
          <div
            className="mobile-dropdowns md:d-none"
            style={{
              backgroundColor: "#ffffff",
              padding: window.innerWidth > 480 ? "10px 20px" : "8px 15px",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            {/* Home Button for Mobile */}
            <div className="mobile-dropdown-item">
              <Link
                to="/"
                className="d-block py-2"
                style={{
                  color: "#004080",
                  fontWeight: 600,
                  fontSize: window.innerWidth > 480 ? "16px" : "14px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: window.innerWidth > 480 ? "8px" : "6px"
                }}
              >
                <FontAwesomeIcon
                  icon={faHome}
                  style={{ 
                    width: window.innerWidth > 480 ? "16px" : "14px", 
                    height: window.innerWidth > 480 ? "16px" : "14px", 
                    flexShrink: 0 
                  }}
                />
                Home
              </Link>
            </div>
            <div className="mobile-dropdown-item">
              <button
                onClick={toggleMobileJobs}
                className="w-100 d-flex justify-between items-center py-2"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#004080",
                  fontSize: window.innerWidth > 480 ? "16px" : "14px",
                  fontWeight: "500",
                }}
              >
                <div className="d-flex items-center">
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    className="me-2"
                    style={{ width: window.innerWidth > 480 ? "16px" : "14px" }}
                  />
                  Jobs
                </div>
                <FontAwesomeIcon
                  icon={mobileJobsOpen ? faChevronUp : faChevronDown}
                  style={{ width: window.innerWidth > 480 ? "14px" : "12px" }}
                />
              </button>

              {mobileJobsOpen && (
                <div
                  className="mobile-dropdown-content"
                  style={{
                    padding: "10px 0 10px 20px",
                    borderTop: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  {latestJobs.map((job) => (
                    <Link
                      key={job.id}
                      to={job.url}
                      className="d-block py-2"
                      style={{
                        color: "#004080",
                        opacity: 0.9,
                      }}
                      onClick={() => setMobileJobsOpen(false)}
                    >
                      {job.title}
                    </Link>
                  ))}
                  <Link
                    to="/jobs"
                    className="d-block py-2 font-weight-bold"
                    style={{
                      color: "#ff6600",
                    }}
                    onClick={() => setMobileJobsOpen(false)}
                  >
                    View All Jobs →
                  </Link>
                </div>
              )}
            </div>

            <div className="mobile-dropdown-item" style={{ marginTop: "10px" }}>
              <button
                onClick={toggleMobileCompanies}
                className="w-100 d-flex justify-between items-center py-2"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#004080",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                <div className="d-flex items-center">
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className="me-2"
                    style={{ width: "16px" }}
                  />
                  Companies
                </div>
                <FontAwesomeIcon
                  icon={mobileCompaniesOpen ? faChevronUp : faChevronDown}
                  style={{ width: "14px" }}
                />
              </button>

              {mobileCompaniesOpen && (
                <div
                  className="mobile-dropdown-content"
                  style={{
                    padding: "10px 0 10px 20px",
                    borderTop: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  {featuredCompanies.map((company) => (
                    <Link
                      key={company.id}
                      to={company.url}
                      className="d-block py-2"
                      style={{
                        color: "#004080",
                        opacity: 0.9,
                      }}
                      onClick={() => setMobileCompaniesOpen(false)}
                    >
                      {company.name}
                    </Link>
                  ))}
                  <Link
                    to="/companies"
                    className="d-block py-2 font-weight-bold"
                    style={{
                      color: "#ff6600",
                    }}
                    onClick={() => setMobileCompaniesOpen(false)}
                  >
                    View All Companies →
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Career Services Dropdown */}
            <div className="mobile-dropdown-item" style={{ marginTop: "10px" }}>
              <button
                onClick={toggleMobileCareer}
                className="w-100 d-flex justify-between items-center py-2"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#004080",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                <div className="d-flex items-center">
                  <FontAwesomeIcon
                    icon={faUserGraduate}
                    className="me-2"
                    style={{ width: "16px",color:"004080" }}
                  />
                  Career Services
                </div>
                <FontAwesomeIcon
                  icon={mobileCareerOpen ? faChevronUp : faChevronDown}
                  style={{ width: "14px" }}
                />
              </button>

              {mobileCareerOpen && (
                <div
                  className="mobile-dropdown-content"
                  style={{
                    padding: "10px 0 10px 20px",
                    borderTop: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  {careerServicesLinks.map((link) => (
                    <Link
                      key={link.id}
                      to={link.url}
                      className="d-block py-2"
                      style={{
                        color: "#004080",
                        opacity: 0.9,
                      }}
                      onClick={() => setMobileCareerOpen(false)}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header1;