import React from "react";
import DashboardPage from "../../../components/dashboard/dashboard/em-jobs";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job || Believe Jobs",
  description: "Believe Jobs",
};

export default function JobList() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
