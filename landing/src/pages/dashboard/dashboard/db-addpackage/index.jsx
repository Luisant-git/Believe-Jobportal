import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/header/default-header";
import Footer from "@/components/dashboard/dashboard/common/Footer";
import Sidebar from "@/components/dashboard/dashboard/common/Sidebar";
import Form from "./Form";
import HeaderDashBoard from "@/components/header/dashboard-header";

const metadata = {
  title: "Post Job || Believe Jobs",
  description: "Believe Jobs",
};

export default function DBaddPack() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <>
        {/*  */}
        {/* End Page Title */}

        <div className="header-margin"></div>
        <HeaderDashBoard />
        {/* <Header1 /> */}
        {/* End dashboard-header */}

        <div className="dashboard">
          <div className="dashboard__sidebar bg-white scroll-bar-1">
            <Sidebar />
            {/* End sidebar */}
          </div>
          {/* End dashboard__sidebar */}

          <div className="dashboard__main">
            <div className="dashboard__content bg-light-2">
              <div className="row y-gap-10 justify-between items-end pb-30 lg:pb-30 md:pb-12">
                <div className="col-12"></div>
                {/* End .col-12 */}
              </div>
              {/* End .row */}

              <div className="py-30 px-30 rounded-4 bg-white shadow-3">
                <Form />
                <div className="col-xl-12">{/* End .dashboard__content */}</div>
              </div>

              <Footer />
            </div>
            {/* End .dashboard__content */}
          </div>
          {/* End dashbaord content */}
        </div>
        {/* End dashbaord content */}
      </>
    </>
  );
}
