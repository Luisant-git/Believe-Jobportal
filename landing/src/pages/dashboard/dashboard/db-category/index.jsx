import React from "react";
import DashboardPage from "../../../../components/dashboard/dashboard/db-category";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Category || Believe Jobs ",
  description: "Believe Jobs",
};

export default function CategoryList() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
