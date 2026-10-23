import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainMenu from "../MainMenu";
import MobileMenu from "../MobileMenu";
import { getAuthData, getAuthDatum } from "@/utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "@/assets/img/BELIEVE3.jpg";

const Header1 = () => {
  const [navbar, setNavbar] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [mobileUserDropdownOpen, setMobileUserDropdownOpen] = useState(false);
  const authdata = getAuthData();
  const navigate = useNavigate();
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 768);
    window.addEventListener("scroll", changeBackground);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", changeBackground);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };
  const onnavigate = () => {
    navigate("/profile");
  };
  const logoutADMIN = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/adminlogin/BelieveHRDConsultancy");
    }, 100);
  };

  const user = getAuthDatum();

  return (
    <>
      <header className={`header`} style={{ backgroundColor: '#004080' }}>
        <div className="header__container px-30 sm:px-20">
          <div className="row justify-between items-center">
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

                <div className="header-menu">
                  <div className="header-menu__content">
                    <MainMenu style="text-white"  />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="row x-gap-20 items-center xxl:d-none">
                  <div className="col-auto">
                    <div className="w-1 h-20 bg-white-20" />
                  </div>
                </div>
                <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                  {authdata ? (
                    authdata.role === "ADMIN" ? (
                      <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                        <Link
                          onClick={logoutADMIN}
                          className="button px-30 fw-400 text-14 text-white h-50"
                          style={{ backgroundColor: '#ff6600' }}
                        >
                          <img
                            width="29"
                            className="me-2"
                            src={
                              user?.user?.profilePicture ||
                              `https://cdn-icons-png.freepik.com/512/3135/3135715.png?ga=GA1.1.852988304.1732155881`
                            }
                            alt=""
                          />{" "}
                          LogOut
                        </Link>
                      </div>
                    ) : authdata.role === "job_seeker" ? (
                      <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                        <Link
                          to="/contact"
                          className="button px-30 fw-400 text-18 text-white h-50"
                          style={{ backgroundColor: '#ff6600',fontWeight: "500" }}
                        >
                          Contact
                        </Link>
                        <Link
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          className="dropdown-toggle button px-30 fw-400 text-18 h-50 text-white ml-20"
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
                                authdata?.picture ||
                                "https://cdn-icons-png.freepik.com/512/3135/3135715.png?ga=GA1.1.852988304.1732155881"
                              }
                              alt="User Avatar"
                              className="avatar-icon"
                            />
                          </span>
                          view Profile
                          <div className="btn-group">
                            <ul className="dropdown-menu mt-2 text-center p-2" style={{ backgroundColor: '#004080' }}>
                              <li className="mt-2 p-2">
                                <Link
                                  onClick={() => navigate("/myapplications")}
                                  className="text-white"
                                >
                                  {" "}
                                  My Application
                                </Link>
                              </li>
                              <li className="mt-2 p-2">
                                <Link onClick={onnavigate} className="text-white">
                                  {" "}
                                  My Profile
                                </Link>
                              </li>
                              <li className="mt-4 p-2">
                                <Link
                                  onClick={logout}
                                  className="text-center w-100 text-white"
                                >
                                  <FontAwesomeIcon
                                    icon={faSignOutAlt}
                                    className="me-1"
                                    color="white"
                                  />{" "}
                                  <span className="ms-1">LogOut </span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                        <Link
                          to="/contact"
                          className="button px-30 fw-400 text-18 text-white h-50"
                          style={{ backgroundColor: '#ff6600',fontWeight: "500" }}
                        >
                          Contact
                        </Link>
                       <Link
                      to="/login"
                      className="button px-30 fw-400 text-18 h-50 ml-20"
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
                      Job Seeker Login
                    </Link>
                      </div>
                    )
                  ) : (
                    <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                      <Link
                        to="/contact"
                        className="button px-30 fw-400 text-18 text-white h-50"
                        style={{ backgroundColor: '#ff6600',fontWeight: "500" }}
                      >
                        Contact
                      </Link>
                      <Link
                        to="/login"
                        className="button px-30 fw-400 text-18 h-50 ml-20"
                        style={{
                          borderColor: "#004080",
                          borderWidth: "1px",
                          color: "#ffffff",
                          backgroundColor: "#228B22",
                          borderRadius: "4px",
                          fontWeight: "500",
                          fontSize: "18px",
                        }}
                      >
                        Job Seeker Login
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile User Dropdown */}
                {authdata && authdata.role === "job_seeker" && isMobileView && (
                  <div style={{ position: "relative", marginRight: "15px" }}>
                    <button
                      onClick={() => setMobileUserDropdownOpen(!mobileUserDropdownOpen)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <img
                        src={
                          authdata?.picture ||
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
                          right: "-50px",
                          backgroundColor: "#fff",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          borderRadius: "6px",
                          width: "180px",
                          zIndex: 1200,
                          padding: "10px 0",
                        }}
                      >
                        <Link
                          to="/myapplications"
                          onClick={() => setMobileUserDropdownOpen(false)}
                          className="d-block px-15 py-2"
                          style={{ color: "#004080", textDecoration: "none" }}
                        >
                          My Application
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => setMobileUserDropdownOpen(false)}
                          className="d-block px-15 py-2"
                          style={{ color: "#004080", textDecoration: "none" }}
                        >
                          My Profile
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setMobileUserDropdownOpen(false);
                          }}
                          className="w-100 text-left px-15 py-2"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#004080",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faSignOutAlt}
                            className="me-2"
                          />
                          LogOut
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className="d-none xl:d-flex x-gap-20 items-center pl-3">
                  <div>
                    <button
                      className="d-flex items-center icon-menu text-inherit text-20"
                      style={{ color: "#ffffff", background: "none", border: "none" }}
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
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header1;