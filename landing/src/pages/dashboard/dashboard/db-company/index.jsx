import React from "react";
import DashboardPage from "../../../../components/dashboard/dashboard/db-company";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Category || Believe Jobs ",
  description: "Believe Jobs",
};

export default function CompanyList() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
