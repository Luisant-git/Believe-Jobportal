import React from "react";
import DashboardPage from "../../../../components/dashboard/dashboard/db-jobseeker";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job-Seeker || Believe Jobs ",
  description: "Believe Jobs",
};

export default function JobSeekerList() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
