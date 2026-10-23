import React from "react";
import DashboardEM from "../../../components/dashboard/dashboard/em-dashboard";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Dashboard || Believe Jobs",
  description: "Believe Jobs",
};

export default function EMDashboard() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardEM />
    </>
  );
}
