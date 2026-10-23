import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBriefcase, faBuilding, faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import {
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuthData } from "@/utils/auth";
import {
  homeItems,
  blogItems,
  pageItems,
  dashboardItems,
} from "../../data/mainMenuData";
import CategoriesMegaMenu from "./CategoriesMegaMenu";

const jobsLinks = [
  { id: 1, title: "WarehouseHelper", url: `/jobs?search=${encodeURIComponent("WarehouseHelper")}` },
  { id: 2, title: "Teacher", url: `/jobs?search=${encodeURIComponent("Teacher")}` },
  { id: 3, title: "DeliveryDriver", url: `/jobs?search=${encodeURIComponent("DeliveryDriver")}` },
  { id: 4, title: "SecurityGuard", url: `/jobs?search=${encodeURIComponent("SecurityGuard")}` },
  { id: 99, title: "View All Jobs →", url: "/jobs", highlight: true }
];

const companiesLinks = [
  { id: 1, name: "SISSecurity", url: `/jobs?search=${encodeURIComponent("SISSecurity")}` },
  { id: 2, name: "Flipkart", url: `/jobs?search=${encodeURIComponent("Flipkart")}` },
  { id: 3, name: "UrbanClap", url: `/jobs?search=${encodeURIComponent("UrbanClap")}` },
  { id: 4, name: "AmazonIndia", url: `/jobs?search=${encodeURIComponent("AmazonIndia")}` },
  { id: 99, name: "View All Companies →", url: "/companies", highlight: true }
];

const servicesLinks = [
  { id: 1, title: "Job Listings", url: "/jobs" },
  { id: 2, title: "Resume Builder", url: "/resume-builder" },
  { id: 3, title: "Interview Mastery Program", url: "/master-program"},
  { id: 4, title: "Assited Hiring Service", url: "/hiring-service" },
  { id: 5, title: "FAQ", url: "/faq" },
];

const MainMenu = ({ style = "" }) => {
  const { pathname } = useLocation();
  const [isActiveParent, setIsActiveParent] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [jobsDropdown, setJobsDropdown] = useState(false);
  const [companiesDropdown, setCompaniesDropdown] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const authsata = getAuthData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Button styles
  const getButtonStyle = () => ({
    backgroundColor: 'transparent',
    color:  '#fff',
    border: 'none',
    fontWeight: '500',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    gap: '8px'
  });

  return (
    <nav className="menu js-navList">
      <ul className={`menu__nav ${style} -is-active`}>
        <li className={`${isActiveParentChaild(homeItems, pathname) ? "current" : ""} menu-item-has-children`} style={{marginRight: '16px'}}>
          <Link
            to="/"
            style={{
              ...getButtonStyle(),
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FontAwesomeIcon icon={faHome} style={{ width: '18px', height: '18px', color: '#fff' }} />
            <span>Home</span>
          </Link>
        </li>

        <li
          className={
            isActiveParent
              ? "menu-item-has-children -has-mega-menu current"
              : "menu-item-has-children -has-mega-menu"
          }
          style={{marginRight: '16px'}}
        >
          <div className="mega">
            <CategoriesMegaMenu setIsActiveParent={setIsActiveParent} />
          </div>
        </li>

        <li
          className="menu-item-has-children"
          onMouseEnter={() => setJobsDropdown(true)}
          onMouseLeave={() => setJobsDropdown(false)}
          style={{ position: "relative", marginRight: '16px' }}
        >
          <button
            className="d-flex items-center px-15 py-8 rounded-4"
            style={{
              ...getButtonStyle(),
              fontSize: "18px",
              gap: "10px"
            }}
          >
            <FontAwesomeIcon icon={faBriefcase} style={{ width: "18px", height: "18px", color: '#fff' }} />
            <span>Jobs</span>
          </button>
          {jobsDropdown && (
            <div
              className="sub-menu"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                backgroundColor: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                borderRadius: "4px",
                padding: "10px 20px",
                minWidth: "200px",
                zIndex: 1000
              }}
            >
              {jobsLinks.map((job) =>
                job.highlight
                  ? <Link key={job.id} to={job.url} style={{ color: "#ff6600", fontWeight: "bold", whiteSpace: "nowrap" }}>{job.title}</Link>
                  : <Link key={job.id} to={job.url} style={{ color: "#004080", display: "block", padding: "4px 0" }}>{job.title}</Link>
              )}
            </div>
          )}
        </li>

        <li
          className="menu-item-has-children"
          onMouseEnter={() => setCompaniesDropdown(true)}
          onMouseLeave={() => setCompaniesDropdown(false)}
          style={{ position: "relative", marginRight: '16px' }}
        >
          <button
            className="d-flex items-center px-15 py-8 rounded-4"
            style={{
              ...getButtonStyle(),
              fontSize: "18px",
              gap: "8px"
            }}
          >
            <FontAwesomeIcon icon={faBuilding} style={{ width: "18px", height: "18px", color: '#fff' }} />
            <span>Companies</span>
          </button>
          {companiesDropdown && (
            <div
              className="sub-menu"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                backgroundColor: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                borderRadius: "4px",
                padding: "10px 20px",
                minWidth: "200px",
                zIndex: 1000
              }}
            >
              {companiesLinks.map((company) =>
                company.highlight
                  ? <Link key={company.id} to={company.url} style={{ color: "#ff6600", fontWeight: "bold", whiteSpace: "nowrap" }}>{company.name}</Link>
                  : <Link key={company.id} to={company.url} style={{ color: "#004080", display: "block", padding: "4px 0" }}>{company.name}</Link>
              )}
            </div>
          )}
        </li>

        <li
          className="menu-item-has-children"
          onMouseEnter={() => setServicesDropdown(true)}
          onMouseLeave={() => setServicesDropdown(false)}
          style={{ position: "relative", marginRight: '16px' }}
        >
          <button
            className="d-flex items-center px-15 py-8 rounded-4"
            style={{
              ...getButtonStyle(),
              fontSize: "18px",
              gap: "8px"
            }}
          >
            <FontAwesomeIcon icon={faUserGraduate} style={{ width: "18px", height: "18px", color: '#fff' }} />
            <span>Services</span>
          </button>
          {servicesDropdown && (
            <div
              className="sub-menu"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                backgroundColor: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                borderRadius: "4px",
                padding: "10px 20px",
                minWidth: "200px",
                zIndex: 1000
              }}
            >
              {servicesLinks.map((service) =>
                <Link key={service.id} to={service.url} style={{ color: "#004080", display: "block", padding: "4px 0" }}>{service.title}</Link>
              )}
            </div>
          )}
        </li>

        {authsata?.role === "USER" ? (
          <li className={pathname === "/contact" ? "current" : ""} style={{marginRight: '16px'}}>
            <Link
              to="/contact"
              style={getButtonStyle()}
            >
              Contact
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default MainMenu;