import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainMenu from "../MainMenu";
import MobileMenu from "../MobileMenu";
import { getAuthData } from "@/utils/auth";
import { Modal } from "antd"; // Import Modal from Ant Design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Header1 = () => {
  const [navbar, setNavbar] = useState(false);
  const authdata = getAuthData();

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  const navigate = useNavigate(); // Hook to navigate to different routes

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

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
    setTimeout(() => {
      navigate("/login"); // Redirect to login after logging out
    }, 100); // Adding a small delay to ensure the localStorage is cleared before redirecting
  };

  const logoutADMIN = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/adminlogin/BelieveHRDConsultancy");
    }, 100);
  };
  const onnavigate = () => {
    navigate("/mybookings");
  };

  return (
    <>
      <header className={`header ${navbar ? "bg-dark-1 is-sticky" : ""}`}>
        <div className="header__container px-30 sm:px-20">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <Link to="/" className="header-logo mr-20">
                  <img src="/img/general/logo-jpeg_white.jpg" alt="logo icon" />
                  <img src="/img/general/logo-jpeg_dark.jpg" alt="logo icon" />
                </Link>
                {/* End logo */}

                <div className="header-menu">
                  <div className="header-menu__content">
                    <MainMenu style="text-white" />
                  </div>
                </div>
                {/* End header-menu */}
              </div>
              {/* End d-flex */}
            </div>
            {/* End col */}

            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="row x-gap-20 items-center xxl:d-none">
                  {/* Start vertical devider */}
                  <div className="col-auto">
                    <div className="w-1 h-20 bg-white-20" />
                  </div>
                  {/* End vertical devider */}
                </div>

                {/* Start btn-group */}
                <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                  {authdata ? (
                    // If user is logged in and has role "ADMIN", show admin profile and log out
                    authdata.role === "ADMIN" ? (
                      <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                        <Link
                          onClick={() => confirmLogout(logoutADMIN)} // Show confirmation modal
                          className="button px-30 fw-400 text-14 -white bg-white h-50 text-dark-1"
                        >
                          <img
                            width="29"
                            className="me-2"
                            src="https://cdn-icons-png.freepik.com/512/3135/3135715.png?ga=GA1.1.852988304.1732155881"
                            alt=""
                          />{" "}
                          LogOut
                        </Link>
                        {/* <Link className="button px-30 fw-400 text-14 border-white -outline-white h-50 text-white ml-20">
                          <span className="d-flex items-center icon-user text-inherit text-22 me-2"></span>{" "}
                          Admin Profile
                        </Link> */}
                      </div>
                    ) : authdata.role === "job_seeker" ? (
                      // If the user is logged in with role "USER", show user profile and log out
                      <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                        <Link
                          to="/contact"
                          className="button px-30 fw-400 text-18 -white bg-white h-50 text-dark-1"
                        >
                          Contact
                        </Link>
                        <Link
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          className="button px-30 fw-400 text-18 border-white -outline-white h-50 text-white ml-20 dropdown-toggle"
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
                          <span className="d-flex items-center  text-inherit text-22 me-2">
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
                            <ul className="dropdown-menu mt-2 text-center p-2">
                              <li className="mt-2 p-2">
                                <Link onClick={onnavigate} className="">
                                  {" "}
                                  My Bookings
                                </Link>
                              </li>
                              <li className="mt-4 p-2">
                                <Link
                                  onClick={() => confirmLogout(logout)}
                                  className="text-center w-100"
                                >
                                  <FontAwesomeIcon
                                    icon={faSignOutAlt}
                                    className="me-1"
                                    color="gray"
                                  />{" "}
                                  <span className="ms-1">LogOut </span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </Link>
                      </div>
                    ) : (
                      // If not logged in
                      <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                        <Link
                          to="/contact"
                          className="button px-30 fw-400 text-14 -white bg-white h-50 text-dark-1"
                        >
                          Contact
                        </Link>
                        <Link
                          to="/login"
                          className="button px-30 fw-400 text-14 border-white -outline-white h-50 text-white ml-20"
                        >
                          Job Seeker Login
                        </Link>
                      </div>
                    )
                  ) : (
                    // If not logged in at all
                    <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                      <Link
                        to="/contact"
                        className="button px-30 fw-400 text-14 -white bg-white h-50 text-dark-1"
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
                  )}
                </div>
                {/* End btn-group */}

                {/* Start mobile menu icon */}
                <div className="d-none xl:d-flex x-gap-20 items-center pl-30 text-white">
                  <span>
                    {authdata ? (
                      <div>
                        {" "}
                        {authdata?.picture ? (
                          <img
                            src={authdata?.picture}
                            alt="User Profile"
                            className="user-profile-img"
                            style={{
                              borderRadius: "50%",
                              width: "30px",
                              height: "30px",
                            }}
                          />
                        ) : (
                          <Link
                            to="/login"
                            className="d-flex items-center icon-user text-inherit text-22"
                          />
                        )}{" "}
                      </div>
                    ) : (
                      <span></span>
                    )}

                    <span>{authdata?.email.split("@")[0]}</span>
                  </span>
                  <div>
                    <button
                      className="d-flex items-center icon-menu text-inherit text-20"
                      data-bs-toggle="offcanvas"
                      aria-controls="mobile-sidebar_menu"
                      data-bs-target="#mobile-sidebar_menu"
                    />
                    <div
                      className="offcanvas offcanvas-start  mobile_menu-contnet"
                      tabIndex="-1"
                      id="mobile-sidebar_menu"
                      aria-labelledby="offcanvasMenuLabel"
                      data-bs-scroll="true"
                    >
                      <MobileMenu authdata={authdata} />
                    </div>
                  </div>
                </div>
                {/* End mobile menu icon */}
              </div>
            </div>
            {/* End col-auto */}
          </div>
          {/* End .row */}
        </div>
        {/* End header_container */}
      </header>
    </>
  );
};

export default Header1;
