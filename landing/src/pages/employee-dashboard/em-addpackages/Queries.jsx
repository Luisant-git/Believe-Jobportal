import MetaComponent from "@/components/common/MetaComponent";
import Footer from "@/components/dashboard/dashboard/common/Footer";
import Sidebar from "@/components/dashboard/dashboard/common/Sidebar";
import React from "react";

import HeaderDashBoard from "@/components/header/dashboard-header";
import PackageHoliday from "./list/PackageHoliday";
import ContactList from "./ContactList";

function Queries() {
  const metadata = {
    title: "Post Job || Believe Jobs",
    description: "Believe Jobs",
  };

  return (
    <div>
      <MetaComponent meta={metadata} />
      <>
        <div className="header-margin"></div>
        <HeaderDashBoard />
        <div className="dashboard">
          <div className="dashboard__sidebar bg-white scroll-bar-1">
            <Sidebar />
          </div>
          <div className="dashboard__main">
            <div className="dashboard__content bg-light-2">
            <ContactList/>
              <Footer />
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Queries;
