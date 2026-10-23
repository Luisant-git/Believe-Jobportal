import React from "react";
import DashboardPage from "../../../../components/dashboard/dashboard/db-interview";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Employers || Believe Jobs ",
  description: "Believe Jobs",
};

export default function InterviewList() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
