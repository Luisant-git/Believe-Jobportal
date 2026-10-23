import { Link, useNavigate } from "react-router-dom";
import { isActiveLink } from "@/utils/linkActiveChecker";
import { useLocation } from "react-router-dom";
import { Modal } from "antd";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faListAlt,
  faLayerGroup,
  faBuilding,
  faUserTie,
  faUsers,
  faSignOutAlt,
  faCreditCard
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const sidebarContent = [
    {
      id: 1,
      icon: faHome,
      name: "Dashboard",
      routePath: "/em-dashboard",
    },
    {
      id: 2,
      icon: faLayerGroup,
      name: "Job Categories",
      routePath: "/em-CategoryList",
    },
    

    {
      id: 3,
      icon: faBriefcase,
      name: "Jobs",
      routePath: "/em-JobList",
    },

    // {
    //   id: 5,
    //   icon: faBuilding,
    //   name: "Companies",
    //   routePath: "/dashboard/db-companies",
    // },
    // {
    //   id: 6,
    //   icon: faUserTie,
    //   name: "Employers",
    //   routePath: "/dashboard/db-interviewlist",
    // },
    // {
    //   id: 7,
    //   icon: faUsers,
    //   name: "Job Seekers",
    //   routePath: "/dashboard/db-job-seeker",
    // },
    {
      id: 2,
      icon: faListAlt,
      name: "Applications",
      routePath: "/em-ApplicationList",
    },

   {
  id: 2,
  icon: faCreditCard,        
  name: "Subscription",
  routePath: "/em-subscription",
},

    {
      id: 8,
      icon: faSignOutAlt,
      name: "Logout",
      routePath: "/employee/login",
      isLogout: true,
    },

  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/employee/login");
  };

  const showLogoutConfirmation = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to log out?",
      okText: "Yes, Logout",
      cancelText: "Cancel",
      onOk: handleLogout,
    });
  };

  return (
    <div className="sidebar -dashboard">
      {sidebarContent.map((item) => (
        <div className="sidebar__item" key={item.id}>
          <div
            className={`${
              isActiveLink(item.routePath, pathname) ? "-is-active" : ""
            } sidebar__button `}
          >
            {item.isLogout ? (
              <button
                onClick={showLogoutConfirmation}
                className="d-flex items-center text-15 lh-1 fw-500"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  textAlign: "left",
                }}
              >
                <FontAwesomeIcon icon={item.icon} className="mr-15" />
                {item.name}
              </button>
            ) : (
              <Link
                to={item.routePath}
                className="d-flex items-center text-15 lh-1 fw-500"
                style={{ color: "#004080" }}
              >
                <FontAwesomeIcon icon={item.icon} className="mr-15" />
                {item.name}
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;