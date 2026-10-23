import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MainMenu from "../MainMenu";
import MobileMenu from "../MobileMenu";
import { getAdmin } from "@/api/admin";

const HeaderDashBoard = () => {
  const [navbar, setNavbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [adminName, setAdminName] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    const body = document.querySelector("body");
    if (isOpen) {
      body.classList.add("-is-sidebar-open");
    } else {
      body.classList.remove("-is-sidebar-open");
    }
  }, [isOpen]);

  useEffect(() => {
    let userId = localStorage.getItem('userId');
    
    if (!userId) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          userId = payload.sub || payload.id || payload.userId;
          console.log('UserId from token:', userId);
        } catch (error) {
          console.error('Error decoding token:', error);
          return;
        }
      } else {
        console.log('No userId or token found');
        return;
      }
    }

    if (userId) {
      const cachedAdminName = localStorage.getItem(`adminName_${userId}`);
      if (cachedAdminName) {
        setAdminName(cachedAdminName);
        return;
      }

      const fetchAdminData = async () => {
        try {
          const response = await getAdmin();
          if (response && response.firstName && response.lastName) {
            const fullName = `${response.firstName} ${response.lastName}`;
            setAdminName(fullName);
            localStorage.setItem(`adminName_${userId}`, fullName);
          }
        } catch (error) {
          console.error("Error fetching admin data:", error);
        }
      };
      fetchAdminData();
    }
  }, []);

  return (
    <>
      <header
        className={`header -dashboard ${navbar ? "is-sticky bg-white" : ""}`}
      >
        <div className="header__container px-20 sm:px-10">
          <div className="-left-side">
            <Link to="/" className="header-logo">
              <img src="/img/general/logo-jpeg_dark.jpg" alt="logo icon" />
            </Link>
            {/* End logo */}
          </div>
          {/* End _left-side */}

          <div className="row justify-between items-center pl-60 lg:pl-20">
            <div className="col-auto">
              <div className="d-flex items-center">
                <button className="d-flex" onClick={handleToggle}>
                  <i className="icon-menu-2 text-20"></i>
                </button>

                <div className="single-field relative d-flex items-center md:d-none ml-30">
                  <input
                    className="pl-50 border-light text-dark-1 h-50 rounded-8"
                    type="email"
                    placeholder="Search"
                  />
                  <button className="absolute d-flex items-center h-full">
                    <i className="icon-search text-20 px-15 text-dark-1"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* End .col-auto */}

            <div className="col-auto">
              <div className="d-flex items-center">
                {/* <div className="header-menu">
                  <div className="header-menu__content">
                    <MainMenu style="text-dark-1" />
                  </div>
                </div> */}
                {/* End header-menu */}

                {/* <div className="row items-center x-gap-5 y-gap-20 pl-20 lg:d-none">
                  <div className="col-auto">
                    <button className="button -blue-1-05 size-50 rounded-22 flex-center">
                      <i className="icon-email-2 text-20"></i>
                    </button>
                  </div>
                  <div className="col-auto">
                    <button className="button -blue-1-05 size-50 rounded-22 flex-center">
                      <i className="icon-notification text-20"></i>
                    </button>
                  </div>
                </div> */}
                
                <div className="pl-20 lg:d-none">
                  <span className="text-18 fw-500" style={{color: '#004080'}}>Welcome {adminName || 'Admin'}</span>
                </div>
                {/* End .row */}

                <div className="pl-15">
                  <img
                    src="https://cdn-icons-png.freepik.com/512/3135/3135715.png?ga=GA1.1.852988304.1732155881"
                    alt="image"
                    className="size-50 rounded-22 object-cover"
                  />
                </div>

                <div className="d-none xl:d-flex x-gap-20 items-center pl-20">
                  <div>
                    <button
                      className="d-flex items-center icon-menu text-20"
                      data-bs-toggle="offcanvas"
                      aria-controls="mobile-sidebar_menu"
                      data-bs-target="#mobile-sidebar_menu"
                    ></button>
                  </div>

                  <div
                    className="offcanvas offcanvas-start  mobile_menu-contnet "
                    tabIndex="-1"
                    id="mobile-sidebar_menu"
                    aria-labelledby="offcanvasMenuLabel"
                    data-bs-scroll="true"
                  >
                    <MobileMenu />
                    {/* End MobileMenu */}
                  </div>
                </div>
              </div>
              {/* End -flex items-center */}
            </div>
            {/* End col-auto */}
          </div>
          {/* End .row */}
        </div>
        {/* End header_container */}
      </header>
      {/* End header */}
    </>
  );
};

export default HeaderDashBoard;
