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
  faMoneyCheckAlt,
  faPaperPlane,
  faStreetView,
  faTelevision,
  faPhotoVideo
} from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { getAuthData } from "@/utils/auth";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const decodedData = getAuthData();

  const isSuperAdmin = decodedData?.role === "super_admin";
  const isAdmin = decodedData?.role === "admin";

  const sidebarContent = [
    {
      id: 1,
      icon: faHome,
      name: "Dashboard",
      routePath: "/dashboard/db-dashboard",
    },
    {
      id: 4,
      icon: faLayerGroup,
      name: "Job Categories",
      routePath: "/dashboard/db-categorylist",
    },

    {
      id: 3,
      icon: faBriefcase,
      name: "Jobs",
      routePath: "/dashboard/db-joblist",
    },

    // {
    //   id: 5,
    //   icon: faBuilding,
    //   name: "Companies",
    //   routePath: "/dashboard/db-companies",
    // },
    // super admin can only access employers
    ...(isSuperAdmin
      ? [
        {
          id: 6,
          icon: faUserTie,
          name: "Employers",
          routePath: "/dashboard/db-interview",
        },
      ]
      : []),
    {
      id: 7,
      icon: faUsers,
      name: "Job Seekers",
      routePath: "/dashboard/db-job-seeker",
    },
    {
      id: 2,
      icon: faListAlt,
      name: "Applications",
      routePath: "/dashboard/db-booking",
    },
    {
      id: 2,
      icon: faMoneyCheckAlt,
      name: "Payment",
      routePath: "/dashboard/db-payment",
    },
    {
      id: 2,
      icon: faPaperPlane,
      name: "Poster",
      routePath: "/dashboard/db-poster",
    },
    {
      id: 2,
      icon: faPhotoVideo,
      name: "Banner",
      routePath: "/dashboard/db-banner",
    },
    ...(isSuperAdmin
      ? [
        {
          id: 2,
          icon: faTelevision,
          name: "Role Management",
          routePath: "/dashboard/db-role-managment",
        },
      ]
      : []),
    {
      id: 8,
      icon: faSignOutAlt,
      name: "Logout",
      routePath: "/adminlogin/BelieveHRDConsultancy",
      isLogout: true,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/adminlogin/BelieveHRDConsultancy");
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
                  color: 'black'
                }}
              >
                <FontAwesomeIcon icon={item.icon} className="mr-15" />
                {item.name}
              </button>
            ) : (
              <Link
                to={item.routePath}
                style={{color:'#004080'}}
                className="d-flex items-center text-15 lh-1 fw-500"
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
