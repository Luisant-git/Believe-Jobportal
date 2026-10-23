import React from "react";
import DashboardPage from "../../../components/dashboard/dashboard/em-applications";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Application || Believe Jobs ",
  description: "TravelMoyo - Travel & Tour ReactJs Template",
};

export default function ApplicationList() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
