import React from "react";
import DashboardPage from "../../../../components/dashboard/dashboard/db-banner";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Banner || Believe Jobs",
  description: "Believe Jobs",
};

export default function BannerPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
